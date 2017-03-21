// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
/*jshint esversion: 6 */

const content = document.getElementById('content');
global.jQuery = require('jQuery');
const http = require('http');
const $ = require('jQuery');
require('bootstrap');
require('p-loading');

$("#connection").click(function() {
    changeMenu('connection');
    $("#pane").load("connections.html");
});

$("#dashboard").click(function() {
    changeMenu('dashboard');
    $("#pane").load("dashboard.html");
    show();
    //TODO: implement
    hide();
});

$("#healthCheck").click(function() {
    changeMenu('healthCheck');
    $("#pane").load("healthCheck.html");
    show();
    //TODO: implement
    hide();
});

function getConnections() {
    show();
    var options = {
        host: "",
        port: 80,
        path: '',
        method: 'GET'
    };

    let req = http.request(options, (res) => {
        if (res.statusCode == 200) {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                $("#poolData").html(chunk);
            });
            res.on('end', () => {
                hide();
            });
        }
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        $("#icon" + env).addClass("icon-cancel");
        callback();
    });

    req.end();
}

function executePost(host, port, path, method, errorCallback, successCallback, postData) {
    let options = {
        host: host,
        port: port,
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData))
        },
        timeout: 15000
    };

    let req = http.request(options, successCallback(res));

    req.on('error', errorCallback(e));

    // write data to request body
    if(method === 'POST') {
      req.write(JSON.stringify(postData));
    }
    req.end();
}

function show() {
    $('.pane-group').ploading({
        action: 'show',
        spinner: 'wave'
    });
}

function hide() {
    $('.pane-group').ploading({
        action: 'hide',
        spinner: 'wave'
    });
}

function changeMenu(idMenu) {
    $('.nav-group-item').removeClass("active");
    $('#' + idMenu).addClass("active");
}

$("#dashboard").trigger("click");
