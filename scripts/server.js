/* eslint-disable */
var Hapi = require('hapi');
var Inert = require('inert');
var spdy = require('spdy');
var fs = require('fs');

var config;
try {
    config = require('./config.json');
} catch (e) {
    console.warn('WARNING:: Failed loading config.json, falling back to default.config.json. Copy the default.config.json to config.json for your environment.');
    config = require('./default.config.json');
}

var server = new Hapi.Server();
server.register(Inert, function() {});
server.register({
    register: require('h2o2')
}, function(err) {
    if (err) {
        console.log('Failed to load h2o2');
    }

    server.start(function(err) {
        if (err) {
            throw err;
        }
        console.log('info', 'Started server at: ', server.info.uri);
    });
});

server.connection({
    port: config.port,
    listener: spdy.createServer({
        key: fs.readFileSync('./scripts/server.key'),
        cert: fs.readFileSync('./scripts/server.crt'),
        spdy: {
            protocols: [ 'h2', 'spdy/3.1', 'http/1.1' ],
            plain: config.http2 === true ? false : true, // To enable https on localhost, set this to false
            'x-forwarded-for': true
        }
    }),
    tls: true,
    routes: {
        "cors": {
            "headers": [
                "Accept",
                "Authorization",
                "Content-Type",
                "If-None-Match",
                "Accept-language",
                "X-Application-Name",
                "X-Application-Version",
                "X-Requested-With",
                "X-Authorization",
                "X-Authorization-Mode"
            ]
        }
    }
});

var proxyConfig = config.proxy || {};

server.route({
    method: '*',
    path: '/sdata/{param*}',
    handler: {
        proxy: {
            host: proxyConfig.host || 'localhost',
            port: proxyConfig.port || 80,
            protocol: proxyConfig.protocol || 'http',
            passThrough: true,
            xforward: true,
            localStatePassThrough: true,
            rejectUnauthorized: false
        }
    }
});

server.route({
    method: '*',
    path: '/{param*}',
    config: {
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private'
      },
    },
    handler: {
        directory: {
            path: '../../',
            index: false,
            listing: true,
            redirectToSlash: true
        }
    }
});
