/*
 * @Descripttion:
 * @version:
 * @Author: CoderHD
 * @Date: 2021-10-25 23:21:52
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-10-26 00:47:07
 */
//文件上传模块
const multer = require('koa-multer')
//操作本地文件
const fs = require('fs')
//文件路径模块
const path = require('path')
const router = require('koa-router')()
router.prefix('/upload')


//上传文件对象(中间件)
let upload = multer({
	//设置文件存储位置(原视频中没有)
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			let date = new Date();
			let year = date.getFullYear()
			let mouth = date.getMonth() + 1
			let day = date.getDate()
			let dir = './public/uploads/' + year + mouth + day
			//判断目录中是否存在
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, {
					recursive: true
				})
			}
			cb(null, dir)
		},
		filename: function (req, file, cb) {
			//设置上传图片的名称
			let fileName = file.fieldname + "-" + Date.now() + path.extname(file.originalname)
			cb(null, fileName)
		}
	})
})

//上传图片的接口
router.post('/img', upload.single('myfile'), async ctx => {
	//此处没有使用控制层来进行上传,可以优化一下
	ctx.body = {
		data: ctx.req.file
	}
})



module.exports = router




