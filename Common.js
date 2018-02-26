/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-18 14:00:27
 * @version $Id$
 */

/*********************************************************************** 
 *                           常用操作工具类                          * 
 *                     注：调用方式import {XXX} from 'Common.js'     * 
 * ********************************************************************/  


/**
 * 获取当前页头信息(一般为:http和https),当前页面域名或IP地址
 * @param 
 * @return {String} 当前页头信息(一般为:http和https),当前页面域名或IP地址
 */
export const getAddress = () => {
	if (!window || !window.location) {
		return;
	}
	return [location.protocol + '//', location.host].join('');
}

/**
 * 获取URL的contextPath
 * @param
 * @return URL的contextPath
 */
export const contextPath = ()=>{
	var origin = location.origin;
	var pathname = location.pathname;
	var projectname = pathname.substr(0, pathname.indexOf('/', 1));
	return origin + projectname;
};

/**
 * 获取URL的query
 * @param {String} name参数名
 * @return {String} URL中参数名对应的值
 */
export const query = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
};

/**
 * 布尔值转换
 * @param {String|Number|Boolean} value 参数名
 * @return {Boolean} 布尔值
 */
export const covertToBoolean = (value) => {
	if (typeof value === 'string') {
		if (value.toLowerCase() === 'false') {
			return false;
		} else if (/^[1-9]\d*$/.test(value)) {
			return !!parseInt(value);
		} else {
			return !!value;
		}
	} else {
		return !!value;
	}
}

/**
 * 设置title
 * @param {String} title 要设置的title值
 * @return 
 */
export const setTitle = (title) => {
	if (!window || !window.document) {
		return;
	}
	document.getElementsByTagName('title')[0].innerHTML = title;
}

/**
 * 对象转换成以&拼接的键名=键值字符串形式
 * @param {Object} obj 对象
 * @return {String} 字符串
 */
export const getParams = (obj) => {
	if (!obj) {
		return;
	}
	let keys = Object.keys(obj);
	let frags = keys.map((key, index) => {
		let value = obj[key];
		if (value !== undefined) {
			return [key, value].join('=');
		}
	});
	return frags.join('&');
}

/**
 * 判断当前是否在微信打开
 * @param 
 * @return {Boolean} 是否在微信打开
 */
export const isWeixn = () => { 
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}
/**
 * 设置cookie值
 * @param {String}  c_name key值
 * @param {String} value value值
 * @param {Number} expiredays 过期天数
 * @return 
 */
export const setCookie=(c_name,value,expiredays)=>
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

/**
 * 获取cookie值
 * @param {String} c_name key值
 * @return {String} value
 */
export const getCookie=(c_name)=>{
	var c_start,c_end;
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}

/**
 * 删除cookie值
 * @param {String} name key
 * @return 
 */ 
export const delCookie=(name)=>{   
	var exp = new Date();   
	exp.setTime(exp.getTime() - 1);   
	var cval=getCookie(name);   
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+"; path=/";   
}   

/**
 * 补零
 * @param {Number} num 数字
 * @return {String} n 位数
 */ 
export const  pad=(num, n)=>{
	var len = num.toString().length;
	while (len < n) {
	  num = '0' + num;
	  len++;
	}
	return num;
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

/**
 * 添加浏览器内核前缀
 * @param {String} style 要添加的css样式
 * @return {String} 添加内核前缀的css样式
 */ 
export prefixStyle(style)=>{
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
/**
 * 获取范围内的随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {Number} 范围内的随机数
 */ 
export getRandomInt(min, max)=> {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 *  不修改原数组的前提下对数组进行随机打乱
 * @param {Array} arr 数组
 * @return {Array} 随机打乱后的数组
 */ 
export shuffle(arr)=> {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
