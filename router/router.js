const Router = require('koa-router')
const service = require('../lib/mysql')
const controller = require('../controller/userController')

const router = new Router()

//for test
router.get('/', async ctx => {
  ctx.response.body = `<h2> Index </h2>
     <form action="/test" method="post">
       <p>uid: <input name="uid"> </p>
       <p>vid: <input name="video"></p>
       <p> <input type="submit" value="submit"> </p>
     </form>
`
})

router.get('/new', async ctx => {
  ctx.response.body = `<h2> Index </h2>
     <form action="/testt" method="post">
       <p>uid: <input name="uid"> </p>
       <p>vid: <input name="video"></p>
       <p>comment: <input name="char"></p>
       <p> <input type="submit" value="submit"> </p>
     </form>
`
})


router.post( '/test', controller.upLike)
router.post('/testt', controller.upComment)

module.exports = router
