import Koa, { Middleware } from 'koa'
import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import koajwt from 'koa-jwt'

const bodyParser = require('koa-body-parser')

const PORT = 3311
const app = new Koa()
const router = new Router()

const helloWorld: Middleware = async (context) => {
  console.log('receiving hello world')
  context.body = {
    message: 'Hello World',
    ss: 's',
  }
}

const handleLogin: Middleware = async (context) => {
  const { user, password } = context.request.body
  const token = jwt.sign({ user }, 'MY_SECRET', { expiresIn: '1h' })
  context.body = {
    user,
    token,
  }
}

router.get('/', helloWorld)
router.post('/login', handleLogin)

app.use(bodyParser())
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

app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => console.log(`server running on ${PORT}`))
