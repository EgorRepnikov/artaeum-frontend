import sirv from 'sirv'
import { Dragonrend } from 'dragonrend'
import compression from 'compression'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const app = new Dragonrend()

function wrapMiddleware(middleware) {
	return ({ req, res }) => new Promise((resolve) => middleware(req, res, resolve))
}

app.middleware(
	({ req }) => req.originalUrl = req.url,
	wrapMiddleware(compression({ threshold: 0 })),
	wrapMiddleware(sirv('static', { dev })),
	wrapMiddleware(sapper.middleware())
)

app.toServer().listen(PORT, error => error && console.log(error))
