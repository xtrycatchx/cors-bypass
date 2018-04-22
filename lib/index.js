const httpProxy = require('http-proxy');

class CorsBypass {
    constructor(target, port) {
        this.target = target
        this.port = port;
        this.proxy = httpProxy.createProxyServer({ target: this.target, changeOrigin: true })
    }

    start() {
        this.proxy.listen(this.port);
        this.proxy.on('proxyRes', (proxyReq, req, res, options) => {
            // naa dre ang magic
            res.setHeader('Access-Control-Allow-Origin', '*');
        });
        this.proxy.on('error', error => {
            console.log(error)
        });
    }

    stop() { this.proxy.close() }

    info() {
        return {
            target: this.target,
            port: this.port
        }
    }

}

module.exports = CorsBypass;