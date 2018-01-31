/*********************************************************************** 
 *                           字符串操作工具类                          * 
 *                     注：调用方式 StrUtil.方法名                   * 
 * ********************************************************************/  
class  StrUtil {
	/* 
     * 判断字符串是否为空 
     * @param {String} str 传入的字符串 
     * @return {Boolean} 非空返回true
     */  
    static isEmpty(str){  
        if(str != null && str.length > 0){  
            return true;  
        }else{  
            return false;  
        }  
    }
    /* 
     * 判断两个字符串是否相同 
     * @param {String} str1 字符串一
     * @param {String} str2 字符串二
     * @return {Boolean} 字符串是否相同 
     */  
    static isEquals(str1,str2){  
        if(str1==str2){  
            return true;  
        }else{  
            return false;  
        }  
    } 
    /* 
     * 忽略大小写判断字符串是否相同 
     * @param {String} str1 字符串一
     * @param {String} str2 字符串二
     * @return {Boolean} 字符串是否相同 
     */  
    static isEqualsIgnorecase(str1,str2){  
        if(str1.toUpperCase() == str2.toUpperCase()){  
            return true;  
        }else{  
            return false;  
        }  
    } 
    /** 
     * 判断是否是数字 
     * @param {String|Number|Boolean} value 检测值
     * @return {Boolean} 是否是数字 
     */  
    static isNum (value){  
        if( value != null && value.length>0 && isNaN(value) == false){  
            return true;  
        }else{  
            return false;  
        }  
    } 
    /** 
     * 判断是否是中文 
     * @param {String} str 传入待检测的字符串
     * @return {Boolean} 是否是中文 
     */  
    static isChine(str){  
        var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;  
        if(reg.test(str)){  
            return false;  
        }  
        return true;  
	}
	/**
	 * 验证是否有空格
	 *
	 * @param {String} source 待检测的字符串
	 * @return {Boolean} true表示有空格
	 */
	static checkSpace(source) {
		var regex = /\s/g;
		return regex.test(source);
	}

	/**
	 * 字符串编码
	 *
	 * @param {String} source 字符串
	 * @return {String} 编码后的字符串
	 */
	//
	static strEncode(source){
		return encodeURIComponent(source);
	}
	/**
	 * 字符串解码
	 *
	 * @param {String} source 字符串
	 * @return {Boolean} 解码后的字符串
	 */
	//
	static strDencode(source){
		return decodeURIComponent(source);
	}
	
	
}; 

export default StrUtil;