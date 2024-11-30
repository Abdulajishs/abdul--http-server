const http = require('http');
const {v4: uuidv4} = require('uuid');

let server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/') {
        res.writeHead(200,{ 'Content-Type': 'text/html' });
        res.write(' HTTP Drills I')
        res.write('<br/>')
        res.write('<a href="/html">Go to /html</a>')
        res.write('<br/>')

        res.write('<a href="/json">Go to /json</a>')
        res.write('<br/>')

        res.write('<a href="/uuid">Go to /uuid</a>')
        res.write('<br/>')

        res.write('<a href="/status/100">Go to /status/100</a>')
        res.write('<br/>')

        res.end('<a href="/delay/3">Go to /delay/3</a>')

    }else if (req.url === '/html') {
        res.writeHead(200,{ 'Content-Type': 'text/html' });
        res.write('<h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>');
        res.end('<p> - Martin Fowler</p>');
    } else if (req.url === '/json') {
        let json = {
            "slideshow": {
              "author": "Yours Truly",
              "date": "date of publication",
              "slides": [
                {
                  "title": "Wake up to WonderWidgets!",
                  "type": "all"
                },
                {
                  "items": [
                    "Why <em>WonderWidgets</em> are great",
                    "Who <em>buys</em> WonderWidgets"
                  ],
                  "title": "Overview",
                  "type": "all"
                }
              ],
              "title": "Sample Slide Show"
            }
          }
        res.writeHead(200,{'Content-Type' : 'application/json'});
        res.end(JSON.stringify(json))
    }else if (req.url === '/uuid'){
        let uuid = {uuid : uuidv4()};
        res.writeHead(200,{'Content-Type' : 'application/json'});
        res.end(JSON.stringify(uuid))
    }else if (req.url.startsWith('/status/')){
        let url = req.url;
        let urlSplit = url.split('/')
        res.writeHead(200,{'Content-Type' : 'text/plain'});
        res.end(JSON.stringify(`status_code  is ${urlSplit[2]}`))
    }else if (req.url.startsWith('/delay/')){
        let url = req.url;
        let urlSplit = url.split('/');
        let delay = urlSplit[2];
        res.writeHead(200,{'Content-Type' : 'text/plain'});
        setTimeout(()=>{
            res.end(`Response after ${delay} seconds`)
        },delay*1000)
    }else {
        res.writeHead(404,{ 'Content-Type': 'text/plain' });
        res.end('404 Not Found')
    }
})

server.listen(3001, () => {
    console.log('Server http://localhost:3000/ is started');
})