window.onload = function() {
	var header = document.getElementById('header');
	var listContent = document.getElementById('listContent');
	var listContentUl = listContent.getElementsByTagName('ul');
	var tips = document.getElementById('tips');
	var arrow = document.getElementById('arrow');
	var tipsContent = document.getElementById('tipsContent');

	function getPos(obj) {
		var pos = {left: 0, top: 0};
		while(obj) {
			pos.left += obj.offsetLeft;
			pos.top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return pos;
	}

	function renderNav() {
		// 生成一级导航栏
		for (var i = 0; i < data.length; i++) {
			var nodeLi = document.createElement('li');
			nodeLi.index = i;
			nodeLi.innerHTML = data[i].name;
			header.appendChild(nodeLi);
		}
		header.children[0].className = 'focus'; // 默认第一个高亮
	}

	function renderContent() {
		var str = '';
		// 生成对应内容
		for(var i = 0; i < data.length; i++) {
			var nodeUl = document.createElement('ul');
			nodeUl.index = i;
			nodeUl.className = 'list';
			for (var j = 0; j < data[i].list.length; j++) {
				str += '<li><a href="#">' + data[i].list[j].title + '</a></li>';
			}
			nodeUl.innerHTML = str;
			listContent.appendChild(nodeUl);
			str = '';
		}

		for (var i = 0; i < listContentUl.length; i++) {
			var li = listContentUl[i].getElementsByTagName('li');
			for (var j = 0; j < li.length; j++) {
				li[j].index = j;
			}
		}
		listContent.children[0].style.display = 'block';
	}

	function renderTipContent(i, j) {

		function getData(key) {
			return data[i].list[j][key];
		}

		tipsContent.innerHTML = '';
		var header = document.createElement('h3');
		header.innerHTML = getData('company');
		tipsContent.appendChild(header);
		var ul = document.createElement('ul');
		ul.innerHTML = '<li>职位：'+getData('position')+'</li><li>招聘人数：'+getData('recruitingNumbers')+'</li><li>工作地点：'+getData('workingLocation')+'</li><li>工作经历：'+getData('workExperience')+'</li><li>学历：'+getData('education')+'</li><li>薪资：'+getData('wage')+'</li>'
		tipsContent.appendChild(ul);

	}

	// 点击导航 更改内容
	header.onclick = function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		if (target && target.nodeName.toLowerCase() === 'li') {
			for (var i = 0; i < listContent.children.length; i++) {
				listContent.children[i].style.display = 'none';
				header.children[i].className = '';
			}
			listContent.children[target.index].style.display = 'block';
			header.children[target.index].className = 'focus';
		}
	};

	listContent.onmouseover = function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		if (target && target.nodeName.toLowerCase() === 'a') {
			renderTipContent(target.parentNode.parentNode.index, target.parentNode.index);
			var pos = getPos(target);
			tips.style.display = 'block';

			// document.body.scrollTop不要忘记判断
			if (pos.top - 100 + tips.offsetHeight < document.documentElement.clientHeight - 10 + document.body.scrollTop) {
				tips.style.top = pos.top - 100 + 'px';
			} else {
				tips.style.top = document.documentElement.clientHeight - 10 - tips.offsetHeight + document.body.scrollTop + 'px';
			}
			
			tips.style.left = pos.left + target.offsetWidth + 15 + 'px';

			if (pos.top - getPos(tips).top < tips.clientHeight - 15) {
				arrow.style.top = pos.top - getPos(tips).top +'px';
			} else {
				arrow.style.top = tips.clientHeight - 15 + 'px';
			}
		}
	};

	listContent.onmouseout = function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		if (target && target.nodeName.toLowerCase() === 'a') {
			tips.style.display = 'none';
		}
	};

	renderNav();
	renderContent();
};