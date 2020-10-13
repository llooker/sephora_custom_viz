looker.plugins.visualizations.add({
    options: {
        html_template: {
            type: "string",
            label: "HTML Template",
            default: `<div style="text-align: center; font-family: Arial, Helvetica, sans-serif;">
            <img src="https://1000logos.net/wp-content/uploads/2018/08/Sephora-symbol.jpg" height="100" style="margin: 100px 0;" />
            <p>Notre CA total pour la période:</p>
            <p style="text-align: center; color: #ff484c; font-size: 3rem; font-weight: 500;">
                {{ rendered_value }}
            </p>
        </div>`
        }
    },

    create: function(element, config) {},

    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        this.clearErrors();

        const firstRow = data[0];
        const qFields = queryResponse.fields;

        if (qFields.dimension_like.length === 0 &&
            qFields.measure_like.length === 0) {
            this.addError({
                title: `No visible fields`,
                message: `At least one dimension, measure or table calculation needs to be visible.`
            })
        }

        const firstCell = firstRow[qFields.dimension_like.length > 0 ? qFields.dimension_like[0].name : qFields.measure_like[0].name];

        const formatValue = (x) => "€"+parseFloat(x).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        const htmlForCell = formatValue(LookerCharts.Utils.filterableValueForCell(firstCell));
        const htmlTemplate = config && config.html_template || this.options.html_template.default;

        const htmlFormatted = htmlTemplate.replace(/{{.*}}/g, htmlForCell);

        element.innerHTML = htmlFormatted;

        doneRendering();
    }
});