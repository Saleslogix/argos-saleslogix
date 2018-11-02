/* eslint-disable */
const Hapi = require('hapi');
const Inert = require('inert');
const spdy = require('spdy');
const fs = require('fs');
const h2o2 = require('h2o2');

let config;
try {
    config = require('./config.json');
} catch (e) {
    console.warn('WARNING:: Failed loading config.json, falling back to default.config.json. Copy the default.config.json to config.json for your environment.');
    config = require('./default.config.json');
}

const options = {
    port: config.port,
    tls: true,
    listener: spdy.createServer({
        key: fs.readFileSync('./scripts/server.key'),
        cert: fs.readFileSync('./scripts/server.crt'),
        spdy: {
            protocols: [ 'h2', 'spdy/3.1', 'http/1.1' ],
            plain: config.http2 === true ? false : true, // To enable https on localhost, set this to false
            'x-forwarded-for': true
        }
    }),
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
};

const server = new Hapi.Server(options);

const init = async () => {
    await server.register(Inert);
    await server.register(h2o2);

    const proxyConfig = config.proxy || {};

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

    await server.start();
    console.log('info', 'Started server at: ', server.info.uri);
};



process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
