const http = require('http');
const fs = require('fs');
const url = require('url');
const multer = require('multer');

// Create an HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Log a message when the server starts listening
  console.log('Server is listening on port 5500');

  // Handle different routes
  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Home Page');
  } else if (parsedUrl.pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is About Page');
  } else if (parsedUrl.pathname === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Contact Page');
  } else if (parsedUrl.pathname === '/file-write') {
    // Use fs.writeFile() to create a file and write text
    fs.writeFile('demo.txt', 'hello world', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('File created and text written successfully');
      }
      res.end();
    });
    return; // Don't proceed to res.end() again in this case
  } else if (parsedUrl.pathname === '/upload-file') {
    // Example using Multer for file upload
    const upload = multer({ dest: 'uploads/' });

    // 'file' should match the field name in the form
    upload.single('file')(req, res, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Error uploading file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('File uploaded successfully');
      }
      res.end();
    });
    return; // Don't proceed to res.end() again in this case
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found');
  }

  // End the server response
  res.end();
});

// Listen on port 5500
server.listen(5500);