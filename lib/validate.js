
'use strict'

module.exports.checkTarget = target => {
    if (!target) {
        throw Error('target url is not provided')
    } else if (typeof target !== 'string') {
        throw Error('target url is not valid')
    }
    return target
}

module.exports.checkPort = port => {
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