/*
 * @Descripttion: 
 * @version: 
 * @Author: CoderHD
 * @Date: 2021-10-29 00:21:59
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-11-01 17:09:36
 */
let Article = require('../models/article')

/**
 * @description:发布文章
 * @param {*}
 * @return {*}
 */
const add = async ctx => {
	let article = ctx.request.body
	await Article.create(article).then(rel => {
		if (rel) {
			ctx.body = {
				code: 200,
				msg: '文章发布成功'
			}
		} else {
			ctx.body = {
				code: 300,
				msg: '文章发布失败'
			}
		}
	}).catch(err => {
		ctx.body = {
			code: 500,
			msg: '文章发布时出现异常',
			err
		}
	})
}

/**
 * 查询所有文章(分页)
 */
const findAll = async ctx => {
	//author为作者,page为页数(显示页数)
	let { page, author } = ctx.query

	//判断页码
	if (!page || isNaN(Number(page))) {
		page = 1
	} else {
		page = Number(page)
	}

	//每页条数
	let pageSize = 10

	//计算总页数
	let count = 0
	await Article.find({ author }).count().then(rel => {
		count = rel
	})
	let totalPage = 0
	if (count > 0) {
		totalPage = Math.ceil(count / pageSize)
	}

	//判断当前页码的范围
	if (totalPage > 0 && page > totalPage) {
		page = totalPage
	} else if (page < 1) {
		page = 1
	}

	//计算起始位置
	let start = (page - 1) / pageSize

	//分段查询函数
	await Article.find({ author }).skip(start).limit(pageSize).then(rel => {
		if (rel && rel.length > 0) {
			ctx.body = {
				code: 200,
				msg: '文章查询成功',
				result: rel,
				page,
				pageSize,
				count
			}
		} else {
			ctx.body = {
				code: 300,
				msg: '没有查询到文章'
			}
		}
	}).catch(err => {
		ctx.body = {
			code: 500,
			msg: '文章查询时出现异常',
			err
		}
	})
}

/**
 * 查询单个文章(另外统计阅读量)
 */
const findOne = async ctx => {
	let { id } = ctx.query
	//isRead标记是否查询成功
	let isRead = false
	await Article.findOne({ id }).then(rel => {
		if (rel) {
			//查询成功后变为true
			isRead = true
			ctx.body = {
				code: 200,
				msg: '文章查询成功',
				result: rel
			}
		} else {
			ctx.body = {
				code: 300,
				msg: '没有查询到文章'
			}
		}
	}).catch(err => {
		ctx.body = {
			code: 500,
			msg: '文章查询时出现异常',
			err
		}
	})
	//isRead后，将查询到id文章的read（阅读量）自增
	if (isRead) {
		//注意该条mongoose更新语句
		await Article.updateOne({ id }, { $inc: { read: 1 } })
	}
}


/** 
 * 修改文章
 */
const update = async ctx => {
	let article = ctx.request.body

	await Article.updateOne(
		{ id: article.id },
		{
			//只允许修改标题、来源和内容
			title: article.title,
			stemfrom: article.stemfrom,
			content: article.content
		}
	).then(rel => {
		if (rel.matchedCount > 0) {
			ctx.body = {
				code: 200,
				msg: '文章更新成功',
			}
		} else {
			ctx.body = {
				code: 300,
				msg: '文章更新失败',
			}
		}
	}).catch(err => {
		ctx.body = {
			code: 500,
			msg: '文章更新时出现异常',
			err
		}
	})
}

/** 
 * 删除文章
 */
const del = async ctx => {
	let { id } = ctx.request.body

	await Article.findOneAndDelete({ id }).then(rel => {
		if (rel) {
			ctx.body = {
				code: 200,
				msg: '文章删除成功'
			}
		} else {
			ctx.body = {
				code: 300,
				msg: '文章删除失败',
				result: rel
			}
		}
	}).catch(err => {
		ctx.body = {
			code: 500,
			msg: '文章删除时出现异常',
			err
		}
	})
}



module.exports = {
	add,
	findAll,
	findOne,
	update,
	del
}