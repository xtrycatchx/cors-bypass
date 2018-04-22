const CorsBypass = require('./lib')
const cors = new CorsBypass('https://rebit.ph', 2000)
cors.start()
console.log('\n', JSON.stringify(cors.info(), null, 2))

/**
 * do an HTTP GET request to http://localhost:2000/api/v1/rates
 * or
 * curl http://localhost:2000/api/v1/rates
 * 
 */