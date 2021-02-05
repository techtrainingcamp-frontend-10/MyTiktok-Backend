const Router = require('koa-router')
const service = require('../mysql/mysql')
const controller = require('../control/userControl')

const router = new Router()

//for test
router.get('/', async ctx => {
	ctx.response.body = `<h2> Index </h2>
     <form action="/login" method="post">
       <p>name: <input name="name"> </p>
       <p>password: <input name="password" type="password"></p>
       <p> <input type="submit" value="submit"> </p>
     </form>
`
})
router.get('/res', async ctx => {
	ctx.response.body = `<h2> Index </h2>
     <form action="/register" method="post">
       <p>name: <input name="name"> </p>
       <p>password: <input name="password" type="password"></p>
       <p> <input type="submit" value="submit"> </p>
     </form>
`
})

router.post('login', '/login', controller.checkLogin)
router.post('login', '/register', controller.registerUser)

module.exports = router
