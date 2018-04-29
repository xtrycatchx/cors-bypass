const expect = require('chai').expect;
const CorsBypass = require('../../lib')
const net = require('net');

describe('Creating new instance', () => {
    it('should fail because no target', () => {
        const ret = () => {
            new CorsBypass();
        };
        expect(ret).to.throw(Error, 'target url is not provided');
    })

    it('should fail because not a valid target', () => {
        const ret = () => {
            new CorsBypass({});
        };
        expect(ret).to.throw(Error, 'target url is not valid');
    })

    it('should fail because not a valid target', () => {
        const ret = () => {
            new CorsBypass([]);
        };
        expect(ret).to.throw(Error, 'target url is not valid');
    })

    it('should fail because no port', () => {
        const ret = () => {
            new CorsBypass('http://google.com');
        };
        expect(ret).to.throw(Error, 'listening port is not provided');
    })

    it('should fail because port not correct', () => {
        const ret = () => {
            new CorsBypass('http://google.com', 'abcd');
        };
        expect(ret).to.throw(Error, 'listening port is not valid');
    })

    it('should fail because port not correct', () => {
        const ret = () => {
            new CorsBypass('http://google.com', {});
        };
        expect(ret).to.throw(Error, 'listening port is not valid');
    })

    it('should fail because port not correct', () => {
        const ret = () => {
            new CorsBypass('http://google.com', []);
        };
        expect(ret).to.throw(Error, 'listening port is not valid');
    })

    it('should be able to instantiate', () => {
        const target = 'http://google.com'
        const port = 2000
        const cors = new CorsBypass(target, port)
        expect(cors.info().target).to.equal(target)
        expect(cors.info().port).to.equal(port)
    })
    
})

describe('Starting cors proxy', () => {
    it('should be able to start', () => {
        const target = 'http://google.com'
        const port = 2000
        const cors = new CorsBypass(target, port)
        expect(cors.info().target).to.equal(target)
        expect(cors.info().port).to.equal(port)

        cors.start()


        const client = new net.Socket();
        client.connect(port, '127.0.0.1', () => {
            expect(cors.isStarted()).to.be.true
            client.destroy()
        });

        client.on('close', () => {
            cors.stop();
            expect(cors.isStarted()).to.be.false
        });
    })

    
})
