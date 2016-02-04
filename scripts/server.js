var Hapi = require('hapi');
var config;
try {
    config = require('./config.json');
} catch (e) {
    console.warn('WARNING:: Failed loading config.json, falling back to default.config.json. Copy the default.config.json to config.json for your environment.');
    config = require('./default.config.json');
}

var server = new Hapi.Server();
server.connection({port: config.port});

var proxyConfig = config.proxy || {};

server.route({
    method: '*',
    path: '/sdata/{param*}',
    handler: {
        proxy: {
            host:proxyConfig.host || 'localhost',
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
    handler: {
        directory: {
            path: '../../',
            index: false,
            listing: true,
            redirectToSlash: true
        }
    }
});

server.start(function() {
    console.log('info', 'Started server at: ', server.info.uri);
});