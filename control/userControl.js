const jwt = require('jsonwebtoken')
const user = require('../service/user')
async function checkLogin(ctx, next) {
  let { name, password } = ctx.request.body
  let data = await user.checkUser(name, password)
  let token
  if (data.code === 200) {
    token = jwt.sign({ user }, 'MY_SECRET', { expiresIn: '1h' })
  }
  return (ctx.response.body = { ...data, token })
}
async function registerUser(ctx, next) {
  let { name, password } = ctx.request.body
  let data = await user.findUser(name, password)
  return (ctx.response.body = data)
}
module.exports = {
  checkLogin,
  registerUser,
}
