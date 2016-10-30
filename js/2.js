$(function(){
	var imgs=$('.among-img');
	var lis=$('.circle-lis');
	var box=$("#among");
	var left=$(".left")[0];
	var right=$(".right")[0];
	// 下标
	var n=0;
	var t=setInterval(move,3000);

	function move(){
		n++;
		if(n>=imgs.length){
			n=0;
		}
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.display='none';
			lis[i].style.background='#D2D1CF';
		}
		imgs[n].style.display='block';
		lis[n].style.background='#E70098';	
	}
	box.onmouseover=function(){
		clearInterval(t);
	}
	box.onmouseout=function(){
		t=setInterval(move,3000);
	}
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			for(var i=0;i<lis.length;i++){
			lis[i].style.background='#D2D1CF';
			imgs[i].style.display='none';
			}
			this.style.background='#E70098';
			imgs[this.index].style.display='block';
			n=this.index;
		}
	}

	right.onclick=function(){
		move();
	}
	left.onclick=function(){
		n--;
		if(n<0){
			n=imgs.length-1;
		}
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.display='none';
			lis[i].style.background='#D2D1CF';
		}
		imgs[n].style.display='block';
		lis[n].style.background='#E70098';
	}
	

	//节点轮播
	var box=$(".carousel")[0];
	var _leftnav=$(".lun")[0];
	var _rightnav=$(".lun-o")[0];
	var pbox=$(".carousel-nav")[0];
	var t1=setInterval(move1,2000);
	function move1(){
		animate(pbox,{left:-295},800,function(){
			var imgFir=getFirst(pbox);
			pbox.appendChild(imgFir);
			pbox.style.left="-20px";
		})
	}
	box.onmouseover=function(){
		clearInterval(t1);
	}
	box.onmouseout=function(){
		t1=setInterval(move1,2000);
	}
	_leftnav.onclick=function(){
		var Last=getLast(pbox);
		var First=getFirst(pbox);
		insertBefore(Last,First);
		pbox.style.left=-295+"px";
		animate(pbox,{left:-20},800);
	}
	_rightnav.onclick=function(){
		move1();
	}

	// 导航hover
	var _shouye=$(".first");
	for(var i=0;i<_shouye.length;i++){
		if(i==0){
			continue;
		}
		hover(_shouye[i],function(){
			var ul=$(".xiala",this)[0];
			this.style.background="#E4E4E4";
			ul.style.display="block";
		},function(){
			this.style.background="#E4E4E4";
			var ul=$(".xiala",this)[0];
			ul.style.display="none";
		})
	}

	// 头部hover
	var denglu=$(".denglu")[0];
	var _denglu=$(".denglu-o")[0];
	var load=$(".load")[0];
	var _load=$(".load-o")[0];
	hover(denglu,function(){
		this.style.background="#fff";
		load.style.display="block";
	},function(){
		hover(load,function(){
			denglu.style.background="#fff";
			this.style.display="block";
		},function(){
			denglu.style.background="#fff";
			this.style.display="none";
		})
		this.style.background="#F6F6F6";
		load.style.display="none";
	})

	hover(_denglu,function(){
		this.style.background="#fff";
		_load.style.display="block";
	},function(){
		hover(_load,function(){
			_denglu.style.background="#fff";
			this.style.display="block";
		},function(){
			_denglu.style.background="#fff";
			this.style.display="none";
		})
		this.style.background="#F6F6F6";
		_load.style.display="none";
	})

	// 固定hover
	var _zai=$(".nav-zaixian")[0];
	var _chang=$(".nav-chang")[0];
	var _tousu=$(".nav-tousu")[0];
	hover(_zai,function(){
		animate(this,{right:38},500);
	},function(){
		animate(this,{right:-24},500);
	})

	hover(_chang,function(){
		animate(this,{right:38},500);
	},function(){
		animate(this,{right:-24},500);
	})

	hover(_tousu,function(){
		animate(this,{right:38},500);
	},function(){
		animate(this,{right:-24},500);
	})

})
