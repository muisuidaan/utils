/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-17 17:40:16
 * @version $Id$
 */

/*********************************************************************** 
 *                           日期类操作工具类                          * 
 *                     注：调用方式 DateTransform.方法名                   * 
 * ********************************************************************/  

class DateTransform {

	/**
	 * 将日期格式化成指定格式的字符串
	 * @param {Object|Number} date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
	 * @param {String} fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
	 * @return {String} 返回格式化后的日期字符串
	 */
	static formatDate(date, fmt){
		date = date == undefined ? new Date() : date;
		date = typeof date == 'number' ? new Date(date) : date;
		fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
		var obj =
		{
			'y': date.getFullYear(), // 年份，注意必须用getFullYear
			'M': date.getMonth() + 1, // 月份，注意是从0-11
			'd': date.getDate(), // 日期
			'q': Math.floor((date.getMonth() + 3) / 3), // 季度
			'w': date.getDay(), // 星期，注意是0-6
			'H': date.getHours(), // 24小时制
			'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
			'm': date.getMinutes(), // 分钟
			's': date.getSeconds(), // 秒
			'S': date.getMilliseconds() // 毫秒
		};
		var week = ['天', '一', '二', '三', '四', '五', '六'];
		for(var i in obj)
		{
			fmt = fmt.replace(new RegExp(i+'+', 'g'), function(m)
			{
				var val = obj[i] + '';
				if(i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
				for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
				return m.length == 1 ? val : val.substring(val.length - m.length);
			});
		}
		return fmt;
	}	


	/**
	 * 将一个日期格式化成友好格式，比如，1分钟以内的返回“刚刚”，
	 * 当天的返回时分，当年的返回月日，否则，返回年月日
	 * @param {Object} date 日期
	 * @return {String}返回友好格式后的日期字符串
	 */
	static formatDateToFriendly(date){
		date = date || new Date();
		date = typeof date === 'number' ? new Date(date) : date;
		var now = new Date();
		if((now.getTime() - date.getTime()) < 60*1000) return '刚刚'; // 1分钟以内视作“刚刚”
		var temp = DateTransform.formatDate(date, 'yyyy年M月d');
		if(temp == DateTransform.formatDate(now, 'yyyy年M月d')) return DateTransform.formatDate(date, 'HH:mm');
		if(date.getFullYear() == now.getFullYear()) return DateTransform.formatDate(date, 'M月d日');
		return temp;
	}

	/**
	 * 将一段时长转换成友好格式,如：147->“2分27秒”
	 * @param {Number} second 时长(以秒为单位)
	 * @return {String} 返回友好格式后的时长
	 */
	static formatDurationToFriendly(second){
		if(second < 60) return second + '秒';
		else if(second < 60*60) return (second-second%60)/60+'分'+second%60+'秒';
		else if(second < 60*60*24) return (second-second%3600)/60/60+'小时'+Math.round(second%3600/60)+'分';
		return (second/60/60/24).toFixed(1)+'天';
	}

	

	/* 
     * 方法作用：【字符串转换成日期】 
     * 使用方法：DateTransform.strTurnDate("2010-01-01"); 
     * @param  {String} str 字符串格式的日期，传入格式：yyyy-mm-dd(2015-01-31) 
     * @return {Object}由字符串转换成的日期 
     */  
    static strTurnDate(str){  
        var re = /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;  
        var dt;  
        if (re.test(str)){  
            dt = new Date(RegExp.$1,RegExp.$2 - 1,RegExp.$3);  
        }  
        return dt;  
	}
	
	
	/* 
     * 日期对象转换为毫秒数
     * 使用方法：DateTransform.strTurnDate("2010-01-01"); 
     * @param {String} date 字符串格式的日期，传入格式：yyyy-mm-dd(2015-01-31) 
     * @return {Number}由字符串转换成的时间戳
     */ 

	static dateToLong(date){
		return date.getTime();
	}

	/**
	 * 时间戳为日期对象
	 * @param  {Number} dateVal日期的毫秒数
	 * @return {Object}日期对象
	*/
	static longToDate(dateVal){
		return new Date(dateVal);
	}
	

	/**
	 * 时间戳转换成格林尼治时间
	 * @param {Number} dateVal日期的毫秒数
	 * @return {Number} 格林尼治时间
	*/
	static getGMTToLocale(time) {
		return new Date(time - new Date().getTimezoneOffset() * 60 * 1000);
	}

	/**
	 * 判断字符串是否为日期格式
	 * @param {String} str  字符串
	 * @param {String} formatStr 日期格式， 如下 yyyy-MM-dd
	 * @return {Boolean} 格式是否符合
	 */
	static isDate(str, formatStr){
		let isNumber=(str)=>{
			var regExp = /^\d+$/g;
			return regExp.test(str);
		}
		if (formatStr == null){
			formatStr = "yyyyMMdd";
		}
		var yIndex = formatStr.indexOf("yyyy");
		if(yIndex==-1){
			return false;
		}
		var year = str.substring(yIndex,yIndex+4);
		var mIndex = formatStr.indexOf("MM");
		if(mIndex==-1){
			return false;
		}
		var month = str.substring(mIndex,mIndex+2);
		var dIndex = formatStr.indexOf("dd");
		if(dIndex==-1){
			return false;
		}
		var day = str.substring(dIndex,dIndex+2);
		if(!isNumber(year)||year>"2100" || year< "1900"){
			return false;
		}
		if(!isNumber(month)||month>"12" || month< "01"){
			return false;
		}
		if(day>DateTransform.getMaxDay(year,month) || day< "01"){
			return false;
		}
		return true;
	}
	/**
	 * 判断是否闰年
	 * @param {Number} time 时间戳
	 * @return {Boolean} 是否是闰年
	 */ 
    static isLeapYear(time){  
        var flag = false;  
        if((new Date(time).getYear() % 4 == 0 && new Date(time).getYear() % 100 !=0)  
                || (new Date(time).getYear() % 400 == 0)){  
            flag = true;  
        }         
        return flag;  
    }; 

	/**
	 * 返回月份的最大天数
	 * @param {Number} year 年
	 * @param {Number} month 月
	 * @return {String} 月份最大天数
	 */ 

	static getMaxDay (year,month) {
		if(month==4||month==6||month==9||month==11)
			return "30";
		if(month==2)
			if(year%4==0&&year%100!=0 || year%400==0)
				return "29";
			else
				return "28";
		return "31";
	}
	
	/**
	 * 返回日期对象对应月份的最大天数
	 * @param {Object} date 日期对象
	 * @return {String} 月份最大天数
	 */ 
	static maxDayOfDate(date)
	{
		date = arguments[0] || new Date();
		date.setDate(1);
		date.setMonth(date.getMonth() + 1);
		var time = date.getTime() - 24 * 60 * 60 * 1000;
		var newDate = new Date(time);
		return newDate.getDate();
	}
	/**
	 * 获取两个年份中间年份的每月
	 * @param {Object<string,number>} minDate 起始年份
	 * @param {Object<string,number>} maxDate 结束年份
	 * @return {Object<string,number>} 年份、月份对象
	 */ 
	static getMonths(minDate, maxDate) {
		let minYear = minDate.year;
		let maxYear = maxDate.year;
		console.log(minYear,maxYear)
		let months = [];
		for (let i = maxYear; i >= minYear; i--) {
			for (let j = 12; j > 0; j--) {
				let m = {};
				if ((minYear === maxYear && j <= maxDate.month && j >= minDate.month) || (minYear !== maxYear && i === maxYear && j <= maxDate.month) || (i > minYear && i < maxYear) || (minYear !== maxYear && i === minYear && j >= minDate.month)) {
					m.year = i;
					m.month = j;
					months.push(m);
				}
			}
		}
		return months;
	}

	/**
	 * 时间戳转换成年月
	 * @param {Number} time 时间戳
	 * @return {String} x年x月
	 */ 
	static timeToYearAndMonth(time) {
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth() + 1;
		console.log("year:", year, "month:", month);
		return year + "年" + month + "月";
	}

	/**
	 * 数字转换成年月
	 * @param {Number|String} year 年
	 * @param {Number|String} month 月
	 * @return {String} x年x月
	 */ 
	static getYearAndMonth(year, month) {
		return year + "年" + month + "月";
	}

	/**
	 * 时间戳转换成对应时间该年份一月的第一天
	 * @param {Number} time 时间戳(不传默认为当前时间)
	 * @return {String} x年x月
	 */ 
	static getYearStartTime(time) {
		time=time || new Date().getTime();
		let year = new Date(time).getFullYear();
		return new Date(year, 0, 1).getTime();
	}

	/**
	 * 计算该时间戳是第几周
	 * @param {Number} time 时间戳(不传默认为当前时间)
	 * @return {Number} 第几周
	 */ 
	static getTimeWeek(time) {
		time=time || new Date().getTime();
		let year = new Date(time).getFullYear();
		let yearStart = new Date(year, 0, 0).getTime();
		let week = Math.floor((time - yearStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
		return week;
	}

	/**
	 * 计算该时间戳对应年份的第一周
	 * @param {Number} time 时间戳
	 * @return {Object<string,number>} 时间戳对应年份的第一周的起始时间戳
	 */ 
	static timeGetWeek(time) {
		let day = new Date(time).getDay();
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth();
		let date = new Date(time).getDate();
		let weekStart = new Date(year, month, date).getTime() - 24 * 60 * 60 * 1000 * day;
		let weekEnd = weekStart + 24 * 60 * 60 * 1000 * 7;
		return {
			QWeekStar: weekStart,
			QWeekEnd: weekEnd
		};
	}
	/*static getWeeks(start, end) {
		let num = Math.ceil((end - start) / (7 * 24 * 60 * 60 * 1000));
		let day = new Date(start).getDay();
		let year = new Date(start).getFullYear();
		let month = new Date(start).getMonth();
		let date = new Date(start).getDate();
		let time = new Date(year, month, date).getTime() - 24 * 60 * 60 * 1000 * (day - 1);
		let weeks = [];
		for (var i = 0; i < num; i++) {
			let weekStart = time + 24 * 60 * 60 * 1000 * 7 * i;
			let weekEnd = time + 24 * 60 * 60 * 1000 * 7 * (i + 1);
			weeks.push({
				QWeekStar: weekStart,
				QWeekEnd: weekEnd
			});
		}
		return weeks;
	}*/

	/**
	 * 获取start与end中每一周的起始时间与结束时间
	 * @param {Number} start 时间戳
	 * @param {Number} end 时间戳
	 * @return {Array<object>} 获取start与end中每一周起始时间与结束时间
	 */ 
	static getWeeks(start, end) {
		let num = Math.ceil((end - start) / (7 * 24 * 60 * 60 * 1000));
		let day = new Date(end).getDay();
		let year = new Date(end).getFullYear();
		let month = new Date(end).getMonth();
		let date = new Date(end).getDate();
		let time = new Date(year, month, date).getTime() - 24 * 60 * 60 * 1000 * (day - 1);
		let weeks = [];
		for (var i = 0; i < num; i++) {
			let weekStart = time - 24 * 60 * 60 * 1000 * 7 * i;
			let weekEnd = time - 24 * 60 * 60 * 1000 * 7 * (i - 1);
			weeks.push({
				QWeekStar: weekStart,
				QWeekEnd: weekEnd
			});
		}
		return weeks;
	}

	/**
	 * 时间戳转换成月日形式
	 * @param {Number} time 时间戳
	 * @return {String} x月x日
	 */ 
	static timeToMothAndDate(time) {
		let month = new Date(time).getMonth() + 1;
		let date = new Date(time).getDate();
		return month + '月' + date + '日';
	}

	/**
	 * 时间戳格式转换成x月x日至x月x日形式
	 * @param {Number} weekStart 时间戳
	 * @param {Number} weekEnd 时间戳
	 * @return {String} x月x日至x月x日
	 */ 
	static getWeekTime(weekStart, weekEnd) {
		let wStart = DateTransform.timeToMothAndDate(weekStart);
		let wEnd = DateTransform.timeToMothAndDate(weekEnd);
		return wStart + '至' + wEnd;
	}

	/**
	 * 获取时间戳对应的这天的00:00的时间戳
	 * @param {Number} time 时间戳
	 * @return {Number} 获取时间戳对应的这天的00:00的时间戳
	 */ 
	static getZeroTime(time) {
		let date = new Date(time).getDate();
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth();
		return new Date(year, month, date).getTime();
	}
	/**
	 * 获取时间戳对应的这天的23:59的时间戳
	 * @param {Number} time 时间戳
	 * @return {Number} 获取时间戳对应的这天的23:59的时间戳
	 */ 
	static getDayEndTime(time) {
		let date = new Date(time).getDate();
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth();
		return new Date(year, month, date).getTime() + 24 * 60 * 60 * 1000 - 1;
	}

	/**
	 * 获取时间戳n天以前的的时间戳
	 * @param {Number} time 时间戳
	 * @param {Number} n 天数差
	 * @return {Number} n天以前的的时间戳
	 */ 
	static nDayBeforeTime(time, n) {
		let dayDuration = 24 * 60 * 60 * 1000; //毫秒数
		return time - n * dayDuration;
	}

	/**
	 * 获取时间戳n周以前的的时间戳
	 * @param {Number} time 时间戳
	 * @param {Number} n 周数差
	 * @return {Number} n周以前的的时间戳
	 */ 
	static nWeekBeforeTime(time, n) {
		let dayDuration = 7 * 24 * 60 * 60 * 1000; //毫秒数
		return time - n * dayDuration;
	}

	/**
	 * 获取时间戳n月以前的当月起始时间时间戳
	 * @param {Number} time 时间戳
	 * @param {Number} n 月数差
	 * @return {Number} n月以前的当月一号00:00时间戳
	 */ 
	static nMonthBeforeTime(time, n) {
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth();
		let mStart = new Date(year, month).getTime();
		if (month - n < 0) {
			year = year - Math.ceil((n - month) / 12);
			month = (12 - (n - month) % 12) % 12;
		} else {
			month = month - n + 1;
		}
		return new Date(year, month, 1).getTime();
	}

	/**
	 * 获取两端时间差之间每一天的时间戳数组(注意：start要大于end)
	 * @param {Number} start 起始时间戳
	 * @param {Number} end 结束时间戳
	 * @return {Array<number>} 间隔一天的时间戳数组
	 */ 
	static generateDTDTime(start, end) {
		let dayDuration = 24 * 60 * 60 * 1000; //毫秒数
		let time = start;
		let times = [];
		while (time > end) {
			times.push(time);
			time -= dayDuration;
		}
		return times;
	}

	/**
	 * 获取时间段上一周的时间段
	 * @param {Number} startTime 起始时间戳
	 * @param {Number} endTime 结束时间戳
	 * @return {Object<string,number>} 时间段上一周的时间段对象
	 */ 
	static prevWeek(startTime, endTime) {
		let prevWeekStart = startTime - 7 * 24 * 60 * 60 * 1000;
		let prevWeekEnd = endTime - 7 * 24 * 60 * 60 * 1000;
		return {
			weekStart: prevWeekStart,
			weekEnd: prevWeekEnd
		};
	}
	/**
	 * 获取时间段下一周的时间段
	 * @param {Number} startTime 起始时间戳
	 * @param {Number} endTime 结束时间戳
	 * @return {Object<string,number>} 时间段下一周的时间段对象
	 */ 
	static nextWeek(startTime, endTime) {
		let nextWeekStart = startTime + 7 * 24 * 60 * 60 * 1000;
		let nextWeekEnd = endTime + 7 * 24 * 60 * 60 * 1000;
		return {
			weekStart: nextWeekStart,
			weekEnd: nextWeekEnd
		};
	}
	/**
	 * 获取startTime对应时间的上个月的第一天和最后一天
	 * @param {Number} startTime 起始时间戳
	 * @param {Number} endTime 结束时间戳
	 * @return {Object<string,number>} startTime对应时间的上个月的第一天和最后一天对象
	 */ 
	static prevMonth(startTime, endTime) {
		let year = new Date(startTime).getFullYear();
		let month = new Date(startTime).getMonth();
		if (month === 0) {
			year = year - 1;
			month = 11;
		} else {
			month = month - 1;
		}
		let monthStart = new Date(year, month).getTime();
		let monthEnd = new Date(year, month + 1).getTime() - 1;
		return {
			monthStart: monthStart,
			monthEnd: monthEnd
		};
	}

	/**
	 * 获取startTime对应时间的下个月的第一天和最后一天
	 * @param {Number} startTime 起始时间戳
	 * @param {Number} endTime 结束时间戳
	 * @return {Object<string,number>} startTime对应时间的下个月的第一天和最后一天对象
	 */ 
	static nextMonth(startTime, endTime) {
		let year = new Date(startTime).getFullYear();
		let month = new Date(startTime).getMonth();
		if (month === 11) {
			year = year + 1;
			month = 0;
		} else {
			month = month + 1;
		}
		let monthStart = new Date(year, month).getTime();
		let monthEnd = new Date(year, month + 1).getTime() - 1;
		return {
			monthStart: monthStart,
			monthEnd: monthEnd
		};
	}
	/**
	 * 获取时间段前一天的时间段
	 * @param {Number} startTime 起始时间戳
	 * @param {Number} endTime 结束时间戳
	 * @return {Object<string,number>} 时间段对应前一天的时间段
	 */ 
	static prevDay(startTime, endTime) {
		let prevDayStart = startTime - 24 * 60 * 60 * 1000;
		let prevDayEnd = endTime - 24 * 60 * 60 * 1000;
		return {
			start: prevDayStart,
			end: prevDayEnd
		}
	}
	/**
	 * 获取时间段后一天的时间段
	 * @param {Number} startTime 起始时间戳
	 * @param {Number} endTime 结束时间戳
	 * @return {Object<string,number>} 时间段对应后一天的时间段
	 */ 
	static nextDay(startTime, endTime) {
		let nextDayStart = startTime + 24 * 60 * 60 * 1000;
		let nextDayEnd = endTime + 24 * 60 * 60 * 1000;
		return {
			start: nextDayStart,
			end: nextDayEnd
		}
	}

	/**
	 *时间戳格式转换(转成'2017-1-2 09:25:32'形式)
	 * @param {Number} time 时间戳
	 * @return {String} 转换后的时间
	 */ 
	static timeToString(time) {
		let dt = new Date(time);
		let year = dt.getFullYear();
		let month = dt.getMonth();
		let date = dt.getDate();
		let hour = DateTransform.getNNumString(dt.getHours(), 2);
		let minute = DateTransform.getNNumString(dt.getMinutes(), 2);
		let second = DateTransform.getNNumString(dt.getSeconds(), 2);
		let dtStr = [year, month + 1, date].join('-');
		let tmStr = [hour, minute, second].join(':');
		return [dtStr, tmStr].join(' ');
	}

	/**
	 * 对时、分、秒进行补零
	 * @param {Number} 时、分、秒
	 * @param {Number} n 位数
	 * @return {String} 补零后的时、分、秒
	 */ 
	static getNNumString(num, n) {
		let str = '';
		for (let i = n - 1; i >= 0; i--) {
			let cur;
			if (i > 0) {
				cur = Math.floor(num / (i * 10));
			} else {
				cur = num % 10;
			}
			str += cur;
			console.log(str);
		}
		return str;
	}


}

export default DateTransform;
