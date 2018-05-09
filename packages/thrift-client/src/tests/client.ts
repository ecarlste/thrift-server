import {
    createClient,
} from '../main/'

import * as express from 'express'
import { CoreOptions } from 'request'

import {
    Calculator,
    Operation,
    Work,
} from './generated/calculator/calculator'

import {
    CLIENT_CONFIG,
    SERVER_CONFIG,
} from './config'

// Get express instance
const app = express()

// Create thrift client
const thriftClient: Calculator.Client<CoreOptions> =
    createClient(Calculator.Client, {
        hostName: SERVER_CONFIG.hostName,
        port: SERVER_CONFIG.port,
    })

function symbolToOperation(sym: string): Operation {
    switch (sym) {
        case 'add':
            return Operation.ADD
        case 'subtract':
            return Operation.SUBTRACT
        case 'multiply':
            return Operation.MULTIPLY
        case 'divide':
            return Operation.DIVIDE
        default:
            throw new Error(`Unrecognized operation: ${sym}`)
    }
}

app.get('/ping', (req: express.Request, res: express.Response): void => {
    thriftClient.ping().then(() => {
        res.send('success')
    }, (err: any) => {
        console.log('err: ', err)
        res.status(500).send(err)
    })
})

app.get('/calculate', (req: express.Request, res: express.Response): void => {
    const work: Work = new Work({
        num1: req.query.left,
        num2: req.query.right,
        op: symbolToOperation(req.query.op),
    })

    thriftClient.calculate(1, work).then((val: number) => {
        res.send(`result: ${val}`)
    }, (err: any) => {
        res.status(500).send(err)
    })
})

app.get('/calculate-overwrite', (req: express.Request, res: express.Response): void => {
    const work: Work = new Work({
        num1: req.query.left,
        num2: req.query.right,
        op: symbolToOperation(req.query.op),
    })

    thriftClient.calculate(1, work).then((val: number) => {
        res.send(`result: ${val}`)
    }, (err: any) => {
        res.status(500).send(err)
    })
})

app.listen(CLIENT_CONFIG.port, () => {
    console.log(`Web server listening on port[${CLIENT_CONFIG.port}]`)
})