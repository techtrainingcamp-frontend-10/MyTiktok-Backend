const user = require('../service/likes')

async function upLike(ctx, next) {
  let { uid, video } = ctx.request.body
  let data = await user.like(uid, video)
  return (ctx.response.body = data)
}

async function upComment(ctx, next) {
  let { uid, video, char} = ctx.request.body
  let data = await user.usrComment(uid, video, char)
  return (ctx.response.body = data)
}

module.exports = {
  upLike,
  upComment,
}