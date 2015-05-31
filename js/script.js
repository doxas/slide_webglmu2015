var pages = [];
var pagesCount = 0;
var activePage = 0;

window.onload = function(){
	var a, e;
	a = document.getElementById('content').childNodes;
	for(var i = 0, len = a.length; i < len; i++){
		if(a[i].nodeName !== '#text' && a[i].nodeName !== '#comment'){
			pages.push(a[i]);
		}
	}
	pagesCount = pages.length;
	window.addEventListener('keydown', keyDown, true);
	e = document.getElementById('prev');
	e.addEventListener('click', function(){pageChange(true);}, true);
	e = document.getElementById('next');
	e.addEventListener('click', function(){pageChange(false);}, true);
	pageChange(true, 0);
	e = document.getElementById('total');
	e.textContent = pagesCount;
};

function keyDown(eve){
	switch(eve.keyCode){
		case 37:
		case 38:
		case 72:
		case 75:
			pageChange(true);
			break;
		case 39:
		case 40:
		case 74:
		case 76:
			pageChange(false);
			break;
	}
}

function pageChange(prev, num){
	var e;
	pages[activePage].className = 'page';
	if(num != null){
		activePage = num;
	}else{
		if(prev){
			if(activePage > 0){
				activePage--;
			}else{
				activePage = pagesCount - 1;
			}
		}else{
			if(activePage < pagesCount - 1){
				activePage++;
			}else{
				activePage = 0;
			}
		}
	}
	pages[activePage].className = 'active';
	e = document.getElementById('progress');
	e.style.width = parseInt((activePage + 1) / pagesCount * 100) + '%';
	e = document.getElementById('count');
	e.innerText = activePage + 1;
}
