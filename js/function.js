//获取类名的兼容性函数
//功能 要实现IE低版本里面适配getClass
//集合 类数组 数组形式访问和操作
function getClass(classname,obj){
	//参数初始化
	var obj=obj||document;
	// IE里面
	// w3c规范里面 FF chrome
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}else{
		var arr=[];
		var doms=obj.getElementsByTagName("*")
		for(var i=0;i<doms.length;i++){
			if(checkclass[i].className==classname){
				arr.push(doms[i])
			}
		}
		return arr;
	}
}
//相当于 var aa=arr

// function checkclass(obj,classname){     //(obj,val)
// 	var classStr=obj;
// 	// box one two
// 	var classArr=classStr.split(" ")
// 	for(var i=0;i<classArr.length;i++){
// 		if(classname==classArr[i]){
// 			return true;
// 		}

// 	}
// 	return false;
// }


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
	function getChilds(obj,type){
	var type=type||"no";
	var kids=obj.childNodes;
	var arr=[];
	for(var i=0;i<kids.length;i++){
		if(type=="no"){
			if(kids[i].nodeType=="1"){
				arr.push(kids[i]);
			}
		}else if(type=="yes"){
			if(kids[i].nodeType=="1"||kids[i].nodeType==3&&kids[i].nodeValue.replace(/^\S*|\S*$/g,"")){
				arr.push(kids[i]);		//与与或同时出现时与的优先级较高一点
			}
		}
	}
	return arr;
}


// 拿到第一个
function getFirst(obj,type){
	var type=type||"no";
	return getChilds(obj,type)[0];
}

// 拿到最后一个
function getLast(obj,type){
	var type=type||"no";
	var childs=getChilds(obj,type);
	return childs[childs.length-1];
}

// // 拿到第n个
// function getN(obj,n,type){
// 	var type=type||"no";
// 	var childs=getChilds(obj,type);
// 	if(n>childs.length||n<1){
// 		return false;
// 	}
// 	return childs[n-1];
// }


// // 取兄弟节点
// // obj.nextSibling
// // obj.previousSibling

// // 取上一个兄弟节点
// function getOpen(obj,type){
// 	var type=type||"no";
// 	var open.previousSibling;
// 	if(open===null){
// 		return false;
// 	}
// 	if(type=="no"){
// 		while(open.nodeType=="3"||open.nodeType==8){
// 			open=open.nextSibling;
// 			if(open==null){
// 				return false;
// 			}
// 		}
// 		return open;
// 	}else if(type=="yes"){
// 		while(open.nodeType=="3"&&!open.nodeValue.replace(/^\s*|\s*$/g,"")||open.nodeType==8){
// 			open=open.previousSibling;;
// 			if(open==null){
// 				return false;
// 			}
// 		}
// 		return open;
// 	}
// }


function insertBefore(obj,beforeObj){
	var parent=beforeObj.parentNode;
	parent.insertBefore(obj,beforeObj);
}


// function inserAfter(obj,afterObj){
// 	var parent=afterObj.parentNode;
// 	var next=getNext(afterObj,"yes");
// 	if(!next){
// 		parent.appendChild(obj);
// 	}else{
// 		parent.insertBefore(obj,next);
// 	}
// }


// 9.8
// 添加事件	火狐、谷歌、IE都可用
function addEvent(obj,event,fun){
	if(obj.attachEvent){
		obj.attachEvent("on"+event,fun);
	}else{
		obj.addEventListener(event,fun,false);
	}
}

function removeEvent(obj,event,fun){
	if(obj.attachEvent){
		obj.datachEvent("on"+event,fun);
	}else{
		obj.removeEventListener(event,fun,false);
	}
}

// 滚轮函数，都可用
function mouseWheel(obj,down,up){
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",scrollFun)
	}else{
		obj.addEventListener("mousewheel",scrollFun,false)
		obj.addEventListener("DOMMousewheel",scrollFun,false)
	}

	function scrollFun(e){
		var e=e||window.event;
		var nub=e.wheelDelta||e.detail;
		if(nub==120||nub==-3){
			up.call(obj);	//this对象是document
			// up();	//this对象没换，是window
		}else if(nub==-120||nub==3){
			down.call(obj);
			// down();
		}
	}
}