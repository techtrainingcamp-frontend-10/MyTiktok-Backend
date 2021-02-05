const allSqlAction = require('../mysql/mysql')
/*login*/
async function checkUser(name, password) {
	let sql = 'select * from user where ' + "usrname = '" + name + "' and Password ='" + password + "'"
	return allSqlAction.allSqlAction(sql).then(res => {
		if (res.length == 1 && res[0].usrname === name && res[0].Password === password) {
			return { msg: 'Login successful', code: 200 }
		} else {
			return { msg: 'Login failed', code: 201 }
		}
	})
}
/*register*/
async function findUser(name, password) {
	let sql = 'select * from client where ' + "usrname = '" + name + "'"
	return allSqlAction.allSqlAction(sql).then(res => {
		if (res.length == 0) {
			return registerUser(name, password)
		} else {
			return { msg: 'Username already exists', code: 202 }
		}
	})
}
async function registerUser(name, password) {
	let sql = "insert into client (usrname,Password) values ( '" + name + "' , '" + password + "')"
	return allSqlAction.allSqlAction(sql).then(res => {
		if (res.affectedRows == 1) {
			return { msg: 'registration success', code: 200 }
		} else {
			return { msg: 'registration failed', code: 200 }
		}
	})
}
module.exports = {
	checkUser,
	findUser,
	registerUser,
}
