const mysql = require('mysql')
const DBConfig = require('../config/config')

/*Establish connection pool*/
let pool = mysql.createPool(DBConfig)

/*Connect to the database*/
let allSqlAction = (sql, value) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log('Success')
        connection.query(sql, value, (err, row) => {
          if (err) reject(err)
          else {
            resolve(row)
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  allSqlAction,
}
