const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')
const data = require('./urls.json')

function writeFile(callback){
    fs.writeFile(path.join(__dirname, 'urls.json'), JSON.stringify(data, null, 2), 
        err => {
            if(err) {throw err} 
            
            callback(JSON.stringify({message: "ok"}))
        } 
    )
}   

http.createServer( (request, response) => {
    const { name, url, del } = URL.parse(request.url, true).query

    if(!name || !url){
        return response.end(JSON.stringify(data))
    }
    
    if(del){
        data.urls = data.urls.filter(item => String(item.url) !== String(url))

        return writeFile( (message) => {
            response.end(message)
        })
    }

    data.urls.push({name, url})

    return writeFile( (message) => {
        response.end(message)
    })

}).listen(9000, () => console.log('Api is running...\nhttp://127.0.0.1:9000'))

 