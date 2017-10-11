# Thrift Client

Thrift client library for NodeJS written in TypeScript.


## Running the Sample Application

```sh
$ npm install
$ npm start
```

This will start a web server on localhost:8080. The sample app has a UI you can visit from a web browser.

The sample app can switch between using a Request client or an Axios client by commenting these lines in example/client.ts

```
// Create thrift client
// Using Request
const requestClient: RequestInstance = request.defaults({})
const connection: HttpConnection<Calculator.Client> = fromRequest(requestClient, config)
const thriftClient: Calculator.Client = createClient(Calculator.Client, connection)

// Using Axios
// const requestClient: AxiosInstance = axios.create()
// const connection: HttpConnection<Calculator.Client> = fromAxios(requestClient, config)
// const thriftClient: Calculator.Client = createClient(Calculator.Client, connection)
```

## Usage

Functions are available to wrap either Request or Axios instances for making requests to a Thrift service.

### Install

```sh
$ npm install --save thrift
$ npm install --save @types/thrift
$ npm install --save @creditkarma/thrift-client
$ npm install --save axios
```

Given the following service definition we will build a sample client.

```c
service Calculator {
  i32 add(1: i32 left, 2: i32 right)
  i32 subtract(1: i32 left, 2: i32 right)
}
```

Would be used in a TypeScript service client as such:

```typescript
import { createClient, fromAxios, HttpConnection } from '@creditkaram/thrift-client'
import { TBinaryProtocol, TBufferedTransport } from 'thrift'
import { default as axios, AxiosInstance }from 'axios'
import * as express from 'express'
import { Calculator } from './codegen/calculator'

const app = express()

// Transport and Protocol are optional and will default to these values
const clientConfig = {
  hostName: 'localhost',
  port: 3000,
  Transport: TBufferedTransport,
  Protocol: TBinaryProtocol,
}

// Create thrift client
const requestClient: AxiosInstance = axios.create()
const connection: HttpConnection<Calculator.Client> = fromAxios(requestClient, clientConfig)
const thriftClient: Calculator.Client = createClient(Calculator.Client, connection)

// This receives a query like "http://localhost:8080/add?left=5&right=3"
app.get('/add', (req: express.Request, res: express.Response): void => {
  // Client methods return a Promise of the expected result
  thriftClient.add(req.query.left, req.query.right).then((result: number) => {
    res.send(result)
  }, (err: any) => {
    res.status(500).send(err)
  })
})

const server = app.listen(8080, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('Web server listening at http://%s:%s', host, port)
})
```

## Contributing

For more information about contributing new features and bug fixes, see our [Contribution Guidelines](https://github.com/creditkarma/CONTRIBUTING.md).
External contributors must sign Contributor License Agreement (CLA)

## License

This project is licensed under [Apache License Version 2.0](./LICENSE)