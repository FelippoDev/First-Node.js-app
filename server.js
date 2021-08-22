const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer( (request, response) => {

    const file = request.url === '/' ? 'index.html' : request.url
    const filePath = path.join(__dirname, 'templates', file)
    const extname = path.extname(filePath)

    const allowedFilesTypes = ['.html', '.css', '.js']
    const allowed = allowedFilesTypes.find(item => item == extname)
    
    if(!allowed) return

    fs.readFile(
        filePath, (err, content) => {
            if(err) throw err

            response.end(content)
        } 
    )

    // if (request.url=== '/contact'){
    //     fs.readFile(path.join(__dirname, 'templates', 'contact.html'),
    //     (err, content) => {
    //         if(err) throw err

    //         response.end(content)
    //     })
    // }

}).listen(8080, () => console.log('The server is running...\nhttp://127.0.0.1:8080'))

 