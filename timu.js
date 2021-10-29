/*
 * @Descripttion:
 * @version:
 * @Author: CoderHD
 * @Date: 2021-10-27 19:28:05
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-10-29 23:17:08
 */
function find(code) {
	// write code here
	var mp = new Map()
		.set('100', '上海')
		.set('101', '上海 浦东')
		.set('102', '上海 浦西')
		.set('200', '杭州')
		.set('201', '杭州 西湖')
		.set('202', '杭州 余杭')
		.set('203', '杭州 西湖 黄龙时代')
	return mp.get(code) ? mp.get(code) : ''
}
console.log(find('111'))


console.log(41 / 10)