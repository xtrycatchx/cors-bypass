# cors-bypass

Small utility proxy to bypass cross-origin resource sharing (CORS) of a target domain

# Installation
```sh
npm install xtrycatchx/cors-bypass#master --save
```

# Usage

Start the cors-bypass server, via javascript
```javascript
const CorsBypass = require('cors-bypass')

const targetDomain = 'https://target.domain.com/'
const corsBypassPort = 2000

const cors = new CorsBypass(targetDomain, corsBypassPort)
cors.start()
```
And once started, do an HTTP request to the target domain
```sh
curl http://localhost:2000/api/v1/rates
```
