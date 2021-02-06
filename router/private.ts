import Router from 'koa-router'

const router = new Router()

router.get('/private', async (context) => {
  context.body = 'Something Private'
})

export default router
