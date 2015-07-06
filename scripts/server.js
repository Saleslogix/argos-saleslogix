var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 8000});

server.route({
    method: '*',
    path: '/sdata/{param*}',
    handler: {
        proxy: {
            host: 'slx81.saleslogixcloud.com',
            port: 443,
            protocol: 'https',
            // Absolute URI can be used as well
            //uri: 'http://10.33.30.160/sdata/',
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
