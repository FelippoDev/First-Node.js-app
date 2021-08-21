const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer( (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'})
    const file = request.url === '/' ? 'index.html' : request.url
    const filePath = path.join(__dirname, 'templates', 'index.html')

    if (request.url === '/') {
        fs.readFile(
            filePath, (err, content) => {
                if(err) throw err

                response.end(content)
            } 
        )
    }

    if (request.url=== '/contact'){
        fs.readFile(path.join(__dirname, 'templates', 'contact.html'),
        (err, content) => {
            if(err) throw err

            response.end(content)
        })
    }

}).listen(8080, () => console.log('The server is running...\nhttp://127.0.0.1:8080'))

 