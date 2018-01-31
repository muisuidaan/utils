/*********************************************************************** 
 *                           验证类操作工具类                          * 
 *                     注：调用方式 Validate.方法名                   * 
 * ********************************************************************/  
class  Validate {
	constructor(){
		this.errormsg='';
		this.errormsg2='';
	}
	/**  
	 * 验证手机号码   
	 * @param {String|Number} mobile 输入的手机号码  
	 * @return {Boolean}  是否正确的手机格式
	 */  
	static validateMobile(mobile){  
		if(!mobile || mobile == ""){  
			return false;  
		}  
		var validate = false;  
		var reg =/^((\+?86)|(\+86))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|170[0125789][0-9]{7}|17[678][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;  
		if (reg.test(mobile)) {  
			validate = true;  
		}else{  
			validate = false;  
		};  
		return validate;  
	} 
	
	/**  
	 * 验证电话号码 
	 * @param {String|Number} telphone输入的电话号码    
	 * @return {Boolean}  是否正确的电话号码格式
	 */  
	static validateTel(telphone){  
		if(!telphone || telphone == ""){  
			return false;  
		}  
		var validate = false;  
		var reg =/^(0[0-9]{2,3})?(-)?[0-9]{7,8}$/;  
		if (reg.test(telphone)) {  
			validate = true;  
		}else{  
			validate = false;  
		};  
		return validate;  
	}  

	/**  
	 * 验证邮箱地址  
	 * @param {String} email email地址 
	 * @return {Boolean} 是否正确的邮箱格式 
	 */  
	static validateEmail(email){  
		if(!email || email == ""){  
			return false;  
		}  
		var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;   
		if (!pattern.test(email)) {    
			return false;    
		}else{  
			return true;  
		}  
	}  
	/**
	 *
	 *验证是否为邮编
	* 	@param  {String|Number} 邮编地址
	*	@return {Boolean} 是否正确的邮编格式 
	*/
	static isZip(source){
		var regex=/^[1-9]\d{5}$/;
		return regex.test(source);
	}

	/**  
	 * 验证15位或18位身份证号码  
	 * @param {String|Number} idCard 身份证号码  
	 * @return {Boolean}  是否正确的身份证号码格式 
	 */  
	static validateIdCard(idCard){  
		//15位和18位身份证号码的正则表达式  
		var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;  
		//如果通过该验证，说明身份证格式正确，但准确性还需计算  
		if (regIdCard.test(idCard)) {  
			if (idCard.length == 18) {  
				var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9,10, 5, 8, 4, 2); //将前17位加权因子保存在数组里  
				var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组  
				var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和  
				for (var i = 0; i < 17; i++) {  
					idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];  
				}  
				var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置  
				var idCardLast = idCard.substring(17);//得到最后一位身份证号码  
				//如果等于2，则说明校验码是10，身份证号码最后一位应该是X  
				if (idCardMod == 2) {  
					if (!(idCardLast == "X" || idCardLast == "x")) {  
						return false;  
					}  
				} else {  
					//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码  
					if (!(idCardLast == idCardY[idCardMod])) {  
						return false;  
					}  
				}  
			}  
		} else {  
			return false;  
		}  
		return true;  
	} 

	/**  
	 * 登录密码的校验:只能输入8个字母、数字、下划线 
	 * @param {String|Number} password 登录密码  
	 * @return {Boolean}  是否正确的登录密码格式 
	 */  
	static validatePassword(password){  
		if(password ==''||password==undefined){
			Validate.errormsg = "密码不能为空";
	        return false;
		}
		var patrn=/^(\w){8,16}$/;  
		if (!patrn.test(password)){
			Validate.errormsg ="密码输入不正确";
			return false
		}
		return true
	}

	/**  
	 * 确认两次输入的密码是否一致 
	 * @param  {String|Number} password2 密码二
	 * @param {String|Number} password1 密码一
	 * @return {Boolean}  确认两次输入的密码是否一致 
	 */ 
	static validateConfirmPassword(password2,password1){  
		if(password2 ==''||password2==undefined){
			Validate.errormsg = "确认密码";
			Validate.errormsg2 = "请再输入一次";
	        return false;
		}
		var patrn=/^(\w){8,16}$/;  
		if (!patrn.test(password2)){
			Validate.errormsg ="密码输入不正确";
			return false
		}
		if(password2!=password1){
			Validate.errormsg ="两次密码输入不一致";
			return false
		}
		return true
	}

	/**  
	 * 验证码是否输入
	 * @param {String|Number} code 验证码
	 * @return {Boolean}  验证码是否为空
	 */ 
	static validateCode(code){
		if(code ==''||code==undefined){
			Validate.errormsg = "验证码不能为空";
		    return false;
		}
		return true;
	}

	/**  
	 * 姓名是否输入
	 * @param {String} name 姓名
	 * @return {Boolean}  姓名是否为空
	 */ 
	static validateName(name){  
		if(name ==''||name==undefined){
			Validate.errormsg = "姓名不能为空";
	        return false;
		}
		return true;
	}

	/**  
	 * 银行卡号是否输入
	 * @param {String} cardnumber 银行卡号
	 * @return {Boolean}  银行卡号是否为空
	 */ 
	static validateCard(cardnumber){
		if(cardnumber==''||cardnumber==undefined){
			Validate.errormsg ="卡号不能为空";
	        return false;
		}
		var reg = /^\d{19}$/g; // 以19位数字开头，以19位数字结尾 
		if( !reg.test(cardnumber) ){ 
			Validate.errormsg ="卡号应为19位数字！";
			return false;
		} 
		return true;
	}

	/**  
	 * 现居地是否输入
	 * @param {String} areaSelection 现居地
	 * @return {Boolean}  现居地是否为空
	 */ 
	static validateArea(areaSelection){  
		if(areaSelection ==''||areaSelection==undefined){
			Validate.errormsg = "请选择现居地";
	        return false;
		}
		return true;
	}
	/**  
	 * 详细地址是否输入
	 * @param {String} detailedAddress 详细地址
	 * @return {Boolean}  详细地址是否为空
	 */ 
	static validateAddress(detailedAddress){  
		if(detailedAddress ==''||detailedAddress==undefined){
			Validate.errormsg = "请输入详细地址";
	        return false;
		}
		return true;
	}
	/**  
	 * 关系是否输入
	 * @param {String} relationship 关系
	 * @return {Boolean}  关系是否为空
	 */ 
	static validateRelationship(relationship){  
		if(relationship ==''||relationship==undefined){
			Validate.errormsg = "请选择关系";
	        return false;
		}
		return true;
	}
	/**  
	 * 学历是否输入
	 * @param {String} educational 学历
	 * @return {Boolean}  学历是否为空
	 */ 
	static validateEducational(educational){  
		if(educational ==''||educational==undefined){
			Validate.errormsg = "请选择学历";
	        return false;
		}
		return true;
	}
	/**  
	 * 婚姻状况是否输入
	 * @param {String} maritalStatus 婚姻状况
	 * @return {Boolean}  婚姻状况是否为空
	 */ 
	static validateMaritalStatus(maritalStatus){  
		if(maritalStatus ==''||maritalStatus==undefined){
			Validate.errormsg = "请选择婚姻状况";
	        return false;
		}
		return true;
	}

	/**  
	 * 借款金额是否输入
	 * @param {String} money 借款金额
	 * @return {Boolean}  借款金额是否为空
	 */
	static validateMoney(money){  
		if(money ==''||money==undefined){
			Validate.errormsg = "请输入借款金额";
	        return false;
		}
		var patrn=/^\d+(\.\d+)?$/;  
		if (!patrn.test(money)){
			Validate.errormsg ="金额输入不正确";
			return false
		}
		return true
	}

	

	/**  
	 * 职业类别是否输入
	 * @param {String} occupationalClass 职业类别
	 * @return {Boolean}  职业类别是否为空
	 */
	static validateOccupational(occupationalClass){  
		if(occupationalClass ==''||occupationalClass==undefined){
			Validate.errormsg = "请选择职业类别";
	        return false;
		}
		return true;
	}

	/**  
	 * 公司名称是否输入
	 * @param {String} companyName 公司名称
	 * @return {Boolean}  公司名称是否为空
	 */
	static validateCompanyName(companyName){  
		if(companyName ==''||companyName==undefined){
			Validate.errormsg = "公司名称不能为空";
	        return false;
		}
		return true;
	}
	/**  
	 * 公司地址是否输入
	 * @param {String} companyAddress 公司地址
	 * @return {Boolean}  公司地址是否为空
	 */
	static validateCompanyAddress(companyAddress){  
		if(companyAddress ==''||companyAddress==undefined){
			Validate.errormsg = "请选择公司地址";
	        return false;
		}
		return true;
	}

	
}

export default Validate;