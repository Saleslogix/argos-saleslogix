/* eslint-env node */
/* eslint-disable no-console */

const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const serveIndex = require('serve-index');
const httpProxy = require('http-proxy');

let config;
try {
  config = require('./config.json');
} catch (e) {
  console.warn(
    'WARNING:: Failed loading config.json, falling back to default.config.json. Copy the default.config.json to config.json for your environment.'
  );
  config = require('./default.config.json');
}

const proxyConfig = config.proxy || {};
const proxyOptions = {
  target: {
    host: proxyConfig.host,
    port: proxyConfig.port,
    protocol: proxyConfig.protocol,
  },
  secure: false, // ignore cert errors
  xfwd: true,
  ws: false,
  forward: true,
  prependPath: true,
};

const proxy = httpProxy.createProxyServer(proxyOptions);
const app = express();

app.use((req, res, next) => {
  if (req.path.startsWith('/sdata')) {
    proxy.web(req, res);
  } else {
    next();
  }
});
app.use(express.static('../../', { index: false }));
app.use(serveIndex('../../'));

const serverOptions = {
  key: fs.readFileSync('./scripts/server.key'),
  cert: fs.readFileSync('./scripts/server.crt'),
};

const port = Number(config.port);

if (config.https) {
  console.log(`Secure server started on https://localhost:${port}/`);
  https.createServer(serverOptions, app).listen(port);
} else {
  console.log(`Server started on http://localhost:${port}/`);
  http.createServer(app).listen(port);
}
