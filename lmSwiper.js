//css选择器，图片地址的数组
function lmSwiper(selector,imgArr){
	//创建样式
	var styleDom = document.createElement('style');
	var selectorDiv = document.querySelector(selector);
	selectorDiv.className =selectorDiv.className + " swiper"
	selectorDiv.innerHTML = `
		<div class="imgList">
			</div>
			<div class="swiperBtn">
				<div class="leftBtn"></div>
				<div class="rightBtn"></div>
			</div>
			<div class="circleList">
			</div>
	`;
	//通过数组循环生成div列表
	var imgListDiv = document.querySelector(selector+" .imgList")
	var cricleListDiv = document.querySelector(selector+" .circleList")
	
	imgArr.forEach(function(item,index){
		var imgItem = document.createElement('div');
		
		if(index==0){
			imgListDiv.innerHTML += `<div class="imgItem active" data-index="0" style="background-image: url(${item});"></div>`
			cricleListDiv.innerHTML += `<div data-index="0" class="circle active"></div>`
			console.log(item)
		}else{
			imgListDiv.innerHTML += `<div class="imgItem" data-index="${index}" style="background-image: url(${item});"></div>`
			cricleListDiv.innerHTML += `<div data-index="${index}" class="circle"></div>`
		}
		
	});

	styleDom.innerHTML = `
		*{
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}
			.swiper{
				width: 1004px;
				height: 462px;
				margin: 0 auto;
				position: relative;
				overflow: hidden;
			}
			.imgList{
				width: 100%;
				height: 100%;
				position: relative;
			}
			
			.imgList .imgItem{
				width: 100%;
				height: 100%;
				background-size: auto 100%;
				background-position: center;
				position: absolute;
				left: 0;
				top: 0;
				opacity: 1;
				transition: all 0.5s;
			}
			/*透明度，opacity:0；完全透明，opacity:1完全不透明*/
			.imgList .imgItem.active{
				opacity: 1;
				z-index:80;
			}
			.leftBtn,.rightBtn{
				width: 50px;
				height: 50px;
				background-image: url(img/left.png);
				background-size: 100% 100%;
				z-index: 100;
			}
			
			.leftBtn{
				position: absolute;
				left: 50px;
				top: calc(50% - 25px);
			}
			.rightBtn{
				position: absolute;
				right: 50px;
				top: calc(50% - 25px);
				transform: rotateY(180deg);
			}
			.circleList{
				position: absolute;
				z-index: 100;
				width: 200px;
				height:50px ;
				right: -22px;
				bottom: 0px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.circleList .circle{
				width: 10px;
				height: 10px;
				border: 2px solid #999;
				border-radius: 5px;
				margin: 0 5px;
			}
			.circleList .circle.active{
				border:none;
				width: 10px;
				height: 15.5px;
				background-image: url(img/sy_douhao.png);
				background-size: 100% 100%;
				position: relative;
    			bottom: -2px;
			}
			
			.imgList .imgItem.leftActive{
				animation: leftActive .5s linear forwards;
				z-index: 10;
			}
			@keyframes leftActive{
				from{
					transform: translateX(-100%);
				}
				to{
					transform: translateX(0%);
				}
			}
			
			.imgList .imgItem.leftBefore{
				animation: leftBefore .5s linear forwards;
				z-index: 10;
			}
			@keyframes leftBefore{
				from{
					transform: translateX(0%);
				}
				to{
					transform: translateX(100%);
				}
			}
			
			
			.imgList .imgItem.rightActive{
				animation: rightActive .5s linear forwards;
				z-index: 10;
			}
			@keyframes rightActive{
				from{
					transform: translateX(100%);
				}
				to{
					transform: translateX(0%);
				}
			}
			
			.imgList .imgItem.rightBefore{
				animation: rightBefore .5s linear forwards;
				z-index: 10;
			}
			@keyframes rightBefore{
				from{
					transform: translateX(0%);
				}
				to{
					transform: translateX(-100%);
				}
			}
	`
	selectorDiv.appendChild(styleDom)

	var currentPage = 0;
	var beforePage = null;
	var afterPage = null;
	var imgList = document.querySelectorAll(selector + " .imgItem");
	var circleList = document.querySelectorAll(selector + " .circle")
	console.log(imgList)
	var leftBtn = document.querySelector(selector + " .leftBtn");
	var rightBtn = document.querySelector(selector + " .rightBtn")
	
	function slide(){
		rightPage = currentPage;
		currentPage++;
		if(currentPage==imgList.length){
			currentPage = 0;
		}
		
		imgList.forEach(function(item,index){
			if(item.dataset.index == currentPage){
				item.className = "imgItem rightActive";
				circleList[index].className = "circle active"
			}else if(rightPage==item.dataset.index){
				imgList[rightPage].className = "imgItem rightBefore"
				circleList[index].className = "circle"
			}else{
				item.className = "imgItem"
				circleList[index].className = "circle"
			}
		})
	}
	
	var time = setInterval(function(){
				slide()
			},2000);
	
	leftBtn.onclick = function(){
		//console.log(beforePage)
		//console.log(currentPage)
		beforePage = currentPage;
		currentPage--;
		if(currentPage<0){
			currentPage = imgList.length - 1;
		}
		
		imgList.forEach(function(item,index){
			if(item.dataset.index == currentPage){
				item.className = "imgItem leftActive";
				//console.log([imgList[beforePage]])
				circleList[index].className = "circle active"
			}else if(item.dataset.index == beforePage){
				imgList[beforePage].className = "imgItem leftBefore"
				circleList[index].className = "circle"
			}else{
				item.className = "imgItem"
				circleList[index].className = "circle"
			}
			
			clearInterval(time);
			var out = setTimeout(function(){
				 time = setInterval(function(){
					slide()
				},2000)	
			},5000)
			console.log(imgList[beforePage].className)
		})
		//console.log(imgList[beforePage].className)
	}
	
	rightBtn.onclick = function(){
		slide();
		clearInterval(time);
		var out = setTimeout(function(){
			 time = setInterval(function(){
				slide()
			},2000)	
		},5000)
	}
	
	var circleListDiv = document.querySelector(".circleList")
		circleListDiv.onclick = function(event){
			if(event.target.className != "circleList"){
				console.log(event)
				currentPage = event.target.dataset.index;
				imgList.forEach(function(item,index){
					if(item.dataset.index == currentPage){
						item.className = "imgItem active";
						circleList[index].className = "circle active"
					}else{
						item.className = "imgItem"
						circleList[index].className = "circle"
					}
				})
			}
		}
		clearInterval(time);
		var out = setTimeout(function(){
			 time = setInterval(function(){
				slide()
			},2000)	
		},5000)
	}
