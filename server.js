var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    form.parse(req, function (err, fields, files) {
      if (err) {
        res.statusCode = 400;
        res.statusMessage = 'File upload failed';
        res.write(JSON.stringify({errors: ['File is broken', 'Upload failed due to inconditional surcumstancies']}));
        res.end();
      } else {
        console.log("========================================");
        console.log("fields:");
        console.log(fields);
        console.log("files:");
        console.log(files);
        console.log("========================================");
        
        if (files && files.file) {
          var oldpath = files.file.path;
          res.statusCode = 200;
          res.statusMessage = 'Success';
          res.write(`File uploaded: ${oldpath}; Fields: ${fields}`);
        } else {
          res.statusCode = 204;
          res.statusMessage = 'Success';
          res.write(`No files passed!`);
        }
        res.end();
      };
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