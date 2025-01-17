// Copyright (c) 2012-present Tom Zhou<appnet.link@gmail.com>
'use strict';

var nmSrv = require('../appnet.link-server');
var APPNET = nmSrv.Client;
var SEP   = nmSrv.SEP;

// vURL
var vURL = require('../vurl');

var express = require('express');

// create name-client
var nmcln = new APPNET({
    srvinfo: {
        timeout: 20,
        endpoints: [{ip: 'localhost', port: 51686}, {ip: 'localhost', port: 51868}],
        turn: [
            {ip: 'localhost', agent: 51866, proxy: 51688} // every turn-server include proxy and agent port
        ]
    },
    usrinfo: {domain: 'de.webconnect.pro', usrkey: 'public'},
    conmode: SEP.SEP_MODE_CS,    // c/s mode as httpp server
      vmode: vURL.URL_MODE_PATH, // vURL mode: vpath-based
});

nmcln.on('ready', function(){
    console.log('name-client ready on vpath:'+nmcln.vpath);

/////////////////////////////////////////////////////////////////
// file share App
    var app = express();

    app.use(express.directory(__dirname + '/dese'));
    app.use(express.static(__dirname + '/dese'));
    app.use(function(req, res){
        res.end('invalid path');
    });
/////////////////////////////////////////////////////////////////
    
    // hook app on business server 
    nmcln.bsrv.srv.on('request', app);
    
    // monitor network performance
    nmcln.bsrv.srv.on('connection', function(socket){
    
        var intl = setInterval(function(){
            ///console.log('socket network performance:'+JSON.stringify(socket.netPerf));
            if (socket) {
                var perf = socket.netPerf;

                if (perf) {
                    console.log('socket network Bandwidth       :'+JSON.stringify(perf.mbpsBandwidth)+' Mb/s');
                    console.log('socket network RTT             :'+JSON.stringify(perf.msRTT)+' ms');
                    console.log('socket network PktSndPeriod    :'+JSON.stringify(perf.usPktSndPeriod)+' us');
                    console.log('socket network SendRate        :'+JSON.stringify(perf.mbpsSendRate)+' Mb/s');
                    console.log('socket network RecvRate        :'+JSON.stringify(perf.mbpsRecvRate)+' Mb/s');
                    console.log('socket network CongestionWindow:'+JSON.stringify(perf.pktCongestionWindow));
                    console.log('socket network RecvACK         :'+JSON.stringify(perf.pktRecvACK));
                    console.log('socket network RecvNACK        :'+JSON.stringify(perf.pktRecvNAK));
                    console.log('socket network AvailRcvBuf     :'+JSON.stringify(perf.byteAvailRcvBuf));
                    console.log('socket network AvailSndBuf     :'+JSON.stringify(perf.byteAvailSndBuf)+'\n\n');
                }
            }
        }, 10000); // every 10000
        
        socket.on('close', function(){            
            clearInterval(intl);
            console.log('socket closed');
        });
        socket.on('error', function(){            
            clearInterval(intl);
            console.log('socket error');
        });
        socket.on('end', function(){            
            clearInterval(intl);
            console.log('socket end');
        });
    });
        
    console.log('please access URL:'+nmcln.vurl);
});

nmcln.on('error', function (err) {
    console.log('name client error: ' + err);
});

process.on('uncaughtException', function (e) {
    console.log('name client exception: ' + e);
});