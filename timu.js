/*
 * @Descripttion:
 * @version:
 * @Author: CoderHD
 * @Date: 2021-10-27 19:28:05
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-10-31 20:24:17
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




//京东题目
//1
/*
小W非常喜欢数学，
而现在他很无聊，所以他想玩一种数字小游戏。
这个数字小游戏规则如下：初始有一个数字a，该数字不包含0，同时具有一个数字之间的映射关系f，可以将x替换为f(x)，
其中x为1-9的数字，现在可以选择a中一段连续的数位（也可以不选择），对其应用映射关系f，求能够获得的最大的数。
*/

// var mp = new Map()
// for (var i = 0; i < secondline.length; i++) {
// 	mp.set(i + 1, secondline[i])
// }
// console.log(mp)


var str = '142446768'
console.log(str[1])

var firstline = 8
var secondline = '22114142'
var thirdline = ['2', '1', '1', '1', '1', '1', '1', '1', '1']

//存储对应关系
var mp = new Map()
for (var i = 0; i < thirdline.length; i++) {
	mp.set(i + 1, parseInt(thirdline[i]))
}

//定义一个flag来存储当前数据下标
var left = 0, right = 0

//寻找结果
for (var j = 0; j < firstline; j++) {
	if (secondline[j] != secondline[right]) {
		left = right
		right = j
		console.log(left, right)
		if (mp.get(parseInt(secondline[left])) > parseInt(secondline[left])) {
			break
		}
	}
}

var res = secondline
for (var k = left; k < right; k++) {
	res[k] = mp.get(parseInt(secondline[left]))
}


console.log(res)


//小羊问题

function sheep(year) {
	var num = 1;
	for (var i = 1; i <= year; i++) {
		if (i == 2) {
			num += sheep(year - 2);
		} else if (i == 4) {
			num += sheep(year - 4);
		} else if (i == 5) {
			num--;
		}
	}
	return num;
}

console.log(sheep(10))




