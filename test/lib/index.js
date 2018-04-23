const expect = require('chai').expect;
const CorsBypass = require('../../lib')

describe('Creating new instance', () => {
    it('should fail because no target', () => {
        let ret = () => {
            new CorsBypass();
        };
        expect(ret).to.throw();
    })

    it('should fail because no port', () => {
        let ret = () => {
            new CorsBypass('http://google.com');
        };
        expect(ret).to.throw();
    })

    it('should fail because port not correct', () => {
        let ret = () => {
            new CorsBypass('http://google.com', 'abcd');
        };
        expect(ret).to.throw();
    })

    it('should be able to instantiate', () => {
        const target = 'http://google.com'
        const port = 2000
        const cors = new CorsBypass(target, port)
        expect(cors.info().target).to.equal(target)
        expect(cors.info().port).to.equal(port)
    })
})
