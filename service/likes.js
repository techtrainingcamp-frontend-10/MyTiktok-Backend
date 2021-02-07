const allSqlAction = require('../lib/mysql')

async function like(uid,vid) {
  let sql = "insert into users_like_videos (user_id,video_id) values ( '" + uid + "' , '" + vid + "');";
  let sql1 = "update videos set like_counts = like_counts + 1 where id = '" + vid + "';"
  return allSqlAction.allSqlAction(sql).then(res => {
    if (res.affectedRows == 1) {
      allSqlAction.allSqlAction(sql1)
      return { msg: 'liked', code: 300 }
    } else {
      return { msg: 'liked failed',code: 300 }
    }
  })
}

async function usrComment(uid,video,char) {
  let sql = "insert into video_comments (video_id,user_id,comments) values ( '" + video + "' , '" + uid + "' , '" + char + "');";
  let sql1 = "update videos set comment_counts = comment_counts + 1 where id = '" + video + "';"
  return allSqlAction.allSqlAction(sql).then(res => {
    if (res.affectedRows == 1) {
      allSqlAction.allSqlAction(sql1)
      return { msg: char, code: 300 }
    } else {
      return { msg: 'add comments failed',code: 300 }
    }
  })
}

module.exports = {
  like,
  usrComment,
}