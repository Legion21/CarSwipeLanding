var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var request = require('request');
var app = new express();

app.use('/public', express.static(__dirname + '/public'));
app.use('/bootstrap/dist', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery/dist', express.static(__dirname + '/node_modules/jquery/dist'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.all('/', function(req, res) {
    res.render('index', {
        title: "CarSwipe",
        protocol: req.protocol,
        host: req.headers.host
    })
})

app.all('/vin/:vin', function(req, res) {
    var vin = req.params.vin;
    request.post('http://api.carswipeapp.com/api/v1/cars/get_vehicle', function(err, response) {
        if (!err && response.statusCode == 200) {
            if (response.body.car) {
                res.render('vin', {
                    title: "CarSwipe",
                    protocol: req.protocol,
                    host: req.headers.host,
                    vehicle: response.body.car
                })
                return;
            }
        }
        res.render('vin404', {
            title: "CarSwipe",
            protocol: req.protocol,
            host: req.headers.host,
            description: "Not found vin number",
            error: err
        })
    }).json({
        vin: vin
    });
})

var server = http.createServer(app);

server.listen(8080, function() {
    console.log('CarSwipe Front-End Application listening on port 80');
});