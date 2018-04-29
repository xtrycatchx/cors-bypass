
'use strict'

module.exports.validateTarget = target => {
    if (!target) {
        throw Error('target url is not provided')
    } else if (typeof target !== 'string') {
        throw Error('target url is not valid')
    }
    return target
}

module.exports.validatePort = port => {
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