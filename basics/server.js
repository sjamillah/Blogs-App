const http = require('http')
const fs = require('fs')
const _ = require('lodash')

// creates a server (http.createServer())
const server = http.createServer((req, res) => {
    // lodash
    const num = _.random(0, 20) // gets a random number between 0 and 20 using the random from lodash
    console.log(num)

    const greet = _.once(() => {
        console.log('hello dear user')
    })
    greet()
    greet()

    // set header content type
    res.setHeader('Content-Type', 'text/html')

    let path = '../basics/views/'
    switch(req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break;
        // when we want to do a redirect i.e a page changed the path
        case '/about-us':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            break;
        default:
            path += '404.html'
            res.statusCode = 404
            break;
    }

    // send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end("Error loading page")
        } else {
            // res.write(data)
            res.end(data)
        }
    })
});

// invoke the server
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
})