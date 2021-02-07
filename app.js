const Koa = require('koa')
const router = require('./router/router')
const bodyParser = require('koa-body')

var app = new Koa()

app.use(bodyParser())
app.use(router.routes())

app.use(async ctx => {
  console.log('404 Not Found')
})

console.log('START http://127.0.0.1:8000')
app.listen(8000)
