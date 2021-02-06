import Koa, { Middleware } from 'koa'
import koajwt from 'koa-jwt'
import privateRouter from './router/private'

const bodyParser = require('koa-body')
const publicRouter = require('./router/router')

const PORT = 8000
const app = new Koa()

app.use(bodyParser())
app.use(publicRouter.routes())

app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access\n'
    } else {
      throw err
    }
  })
})
app.use(koajwt({ secret: 'MY_SECRET' }).unless({ path: [/\/login/] }))

app.use(privateRouter.routes()).use(publicRouter.allowedMethods())

app.listen(PORT, () =>
  console.log(`console.log('START http://127.0.0.1:${PORT}')`)
)
