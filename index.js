var fs = require('fs');
var os = require("os");
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
                // Проверка первого изображения, и замена в случае отказа
                var showVinInfo = function() {
                    res.render('vin', {
                        title: "CarSwipe | Vehicle information",
                        protocol: req.protocol,
                        host: req.headers.host,
                        vehicle: response.body.car
                    })
                }
                if (response.body.car.image_url.length() > 0) {
                    request.head(response.body.car.image_url[0], function(err1, response1) {
                        if (err || response.statusCode != 200) {
                            response.body.car.image_url[0] = "http://" + os.hostname() + "/public/app-logo.png"
                        }
                        showVinInfo();
                    })
                } else {
                    response.body.car.image_url.push("http://" + os.hostname() + "/public/app-logo.png")
                    showVinInfo();
                }
                return;
            }
        }
        res.render('p404', {
            title: "CarSwipe | Vehicle not found",
            protocol: req.protocol,
            host: req.headers.host,
            description: "Vehicle not found",
            error: err
        })
    }).json({
        vin: vin
    });
})

app.all('*', function(req, res) {
    res.render('p404', {
        title: "CarSwipe | Page not found",
        protocol: req.protocol,
        host: req.headers.host
    })
})

var server = http.createServer(app);

server.listen(80, function() {
    console.log('CarSwipe Front-End Application listening on port 80');
});