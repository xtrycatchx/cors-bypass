const httpProxy = require('http-proxy');

class CorsBypass {
    constructor(target, port) {
        if (!target) {
            throw Error('target url is not provided')
        } else if (typeof target !== 'string') {
            throw Error('target url is not valid')
        }
        if (!port) {
            throw Error('listening port should be provided')
        } else {
            const normalInt = isFinite(String(port))
            if (!normalInt) {
                throw Error('port provided is not correct')
            }
        }
        this.target = target
        this.port = port;
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