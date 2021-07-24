const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {
        let fileUrl = req.url; //if it is a request
        if (fileUrl === '/') { //
            fileUrl = '/index.html'; //if true d
        }

        const filePath = path.resolve('./public' + fileUrl); //absolute path from relative to absolute
        const fileExt = path.extname(filePath);

        if (fileExt === '.html') { 
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404; //notes
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return; //so next not executed 
                }
                res.statusCode = 200; //success
                res.setHeader('Content-Type', 'text/html'); //expect a html file

                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});