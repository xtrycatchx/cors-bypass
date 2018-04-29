const httpProxy = require('http-proxy');

class CorsBypass {
    constructor(target, port) {
        this.target = verifyTarget(target)
        this.port = verifyPort(port)
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

verifyTarget = target => {
    if (!target) {
        throw Error('target url is not provided')
    } else if (typeof target !== 'string') {
        throw Error('target url is not valid')
    }
    return target
}

verifyPort = port => {
    if (!port) {
        throw Error('listening port is not provided')
    } else if (typeof port === 'object') {
        throw Error('listening port is not valid')
    } else {
        const normalInt = isFinite(String(port))
        if (!normalInt) {
            throw Error('listening port is not valid')
        }
    }
    return port
}

module.exports = CorsBypass;