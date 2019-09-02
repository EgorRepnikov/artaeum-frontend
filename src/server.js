import { Dragonrend } from 'dragonrend'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import compression from 'compression'
import sirv from 'sirv'
import * as sapper from '@sapper/server'

const FileStore = sessionFileStore(session)

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const app = new Dragonrend()

function wrapMiddleware(middleware) {
	return ({ req, res }) => new Promise((resolve) => middleware(req, res, resolve))
}

app.middleware(
	({ req }) => req.originalUrl = req.url,
	wrapMiddleware(session({
		secret: 'temp',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 31536000 },
		store: new FileStore({ path: '.sessions' })
	})),
	({ req }) => {
		if (typeof req.session.user === 'undefined') {
			req.session.user = false
		}
	},
	wrapMiddleware(compression({ threshold: 0 })),
	wrapMiddleware(sirv('static', { dev })),
	wrapMiddleware(sapper.middleware({
		session: (req) => ({ user: req.session.user })
	}))
)

app.toServer().listen(PORT, error => error && console.log(error))
