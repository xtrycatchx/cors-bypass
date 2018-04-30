'use strict'

const httpProxy = require('http-proxy');
const { checkTarget, checkPort } = require('./validate')

class CorsBypass {
    constructor(target, port) {
        this.target = checkTarget(target)
        this.port = checkPort(port)
        this.proxy = httpProxy.createProxyServer({ target: this.target, changeOrigin: true })
        this.started = false;
    }

    start() {
        this.started = true;
        this.proxy.listen(this.port);
        this.proxy.on('proxyRes', (proxyReq, req, res, options) => {
            // naa dre ang magic
            res.setHeader('Access-Control-Allow-Origin', '*');
        });
        this.proxy.on('error', error => {
            console.log(error)
        });
    }

    stop() {
        this.proxy.close()
        this.started = false;
    }

    isStarted() {
        return this.started;
    }

    info() {
        return {
            target: this.target,
            port: this.port
        }
    }
}

module.exports = CorsBypass;