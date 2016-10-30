	// 调兼容用的。



	// 功能  要实现IE低版本里面适配getClass
	// 集合  类数组  数组形式访问和操作

function getClass(classname,obj){
	// 没有传值的时候用  或
	// 参数初始化
	var obj=obj||document;
	// IE  里面
	// w3c规范里面   FF   chrome
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}else{
		var arr=[];
		// 拿到的是一个结果集
		var objs=obj.getElementsByTagName('*');
		for(var i=0;i<objs.length;i++){
			if(objs[i].className==classname){
				arr.push(objs[i])				
			}
		}
		return arr;
	}
}


	// 获取和设置内容兼容性函数
function operateText(obj,val){
	if(val!=undefined){
		if(obj.innerText){
			return obj.innerText=val;
		}else{
			return obj.textContent=val;
		}	
	}else{
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}	
}


	// 获取样式
function getStyle(obj,style){
	if(obj.currentStyle){
		return obj.currentStyle[style];
	}else{
		return getComputedStyle(obj,null)[style];
	}
}


	// $函数  帮助我们获取元素
function $(val,obj){
	if(typeof val=='string'){
		var obj=obj||document;
		// val=".one";
		val=val.replace(/^\s*|\s*$/g,"");
		if(val.charAt(0)=="#"){
			return document.getElementById(val.slice(1));
		}else if(val.charAt(0)=="."){
			return getClass(val.slice(1),obj);
		// 测试符不符合标签
		}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}/.test(val)){
			return obj.getElementsByTagName(val);
		}
	}else if(typeof val=='function'){
		window.onload=function(){
			val();
		}
			
	}
	
}
