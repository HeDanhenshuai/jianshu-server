/*
 * @Descripttion: 
 * @version: 
 * @Author: CoderHD
 * @Date: 2021-10-23 23:34:49
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-11-02 00:14:36
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const MongoConnect = require('./db')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')

//连接数据库
MongoConnect()

const index = require('./routes/index')
const users = require('./routes/users')
const upload = require('./routes/upload')
const article = require('./routes/article')
const comment = require('./routes/comment')
const fans = require('./routes/fans')




// error handler
onerror(app)

// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(cors())



app.use(views(__dirname + '/views', {
	extension: 'pug'
}))

app.use(koajwt({
	//该密钥不能随意设置
	secret: 'jianshu-server-jwt-hedan'
}).unless({
	//配置相关的路由(便是login登陆注册不通过jwt验证)
	path: [/^\/users\/login/, /^\/users\/reg/]
}))


// logger
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(fans.routes(), fans.allowedMethods())



// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});

module.exports = app
