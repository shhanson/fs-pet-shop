const http = require('http');
const routes = require('./routes');

const port = 3000;

const petRegExp = /^\/pets\/(.*)$/;




let server = http.createServer(function(req, res) {

    console.log(req.url);
    if (req.url === '/pets' || req.url.match(petRegExp)) {
        routes["/pets/"](req, res);

        // res.end(petDataText);
    } else {
        res.status = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not found");
    }



});

server.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});

module.exports = server;
