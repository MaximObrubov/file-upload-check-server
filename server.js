var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const path = require('path');
const os = require('os');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable();
    var file2beUploaded = null;
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    form.parse(req);
    form.on('fileBegin', (name, file) => {
      file.path = path.join(os.tmpdir(), file.name);
    });
    form.on('file', function (name, file) {
      file2beUploaded = file;
      console.log("FILE DESCRIPTION:");
      console.log(file2beUploaded.name);
      console.log(file2beUploaded.path);
      console.log(file2beUploaded.type);
      console.log(file2beUploaded.flag);
      console.log("FD END ---------------------------------\n\n");
    });
    form.on('err', (err) => {
      res.statusCode = 500;
      res.statusMessage = 'Internal server error';
      res.write(err);
      res.end();
    });
    form.on('end', () => {
      res.statusCode = 200;
      res.statusMessage = 'Success';
      res.write(`File uploaded: ${file2beUploaded && file2beUploaded.name ? file2beUploaded.name : null }`);
      res.end();
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="file"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);