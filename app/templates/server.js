var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
<% if (options.disableHeader) { %>
app.disable('x-powered-by');<% } %>
app.use(bodyParser.json());
app.use(logger('dev'));

app.post('/', function (req, res) {
    res.end();
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (res.statusCode >= 500 && err.stack) {
        console.log(err.stack);
    }

    res.end();
});

app.set('port', process.env.PORT || <%= options.port %>);

var server = app.listen(<%= options.port %>, function () {
    console.log('Server listening at http://%s:%s', server.address().address, server.address().port)
});