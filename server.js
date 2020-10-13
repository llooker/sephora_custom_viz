var fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  fs.readFile(__dirname + '/custom_html_viz.js', function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);

// https://cdn.jsdelivr.net/gh/llooker/sephora_custom_viz@main/custom_html_viz.js