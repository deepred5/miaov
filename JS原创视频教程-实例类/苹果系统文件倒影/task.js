var box = document.getElementById('box');
var imgList = document.getElementById('img-list');
var images = imgList.getElementsByTagName('img');
var interval = 100;
var left = -interval;
var height = 0;
var listLeft = 0;
var now = 0;

for (var i = 0; i < images.length; i++) {
	left += interval;
	if (i < Math.floor(images.length / 2)) {
		images[i].style.left = left + 'px';
		images[i].style.transform = 'rotateY(45deg) translateZ(-100px)';
	} else if (i > Math.floor(images.length / 2)) {
		images[i].style.left = left + 'px';
		images[i].style.transform = 'rotateY(-45deg) translateZ(-100px)';
	} else { // 中间图片距离两边要大一点
		left += interval;
		images[i].style.left = left + 'px';
		imgList.style.left = (document.documentElement.clientWidth / 2 - (left + images[i].offsetWidth / 2)) + 'px'; // 水平居中
		images[i].style.transform = 'translateZ(200px)';
		left += interval;
		now = i;
	}
	height = Math.max(height, images[i].offsetHeight); // 找到图片最大高度
	images[i].index = i;

	images[i].onclick = function() {
		var left = -(this.index - now) * interval;
		tab(images, interval, left, this.index);
	}
}

imgList.style.height = height + 'px';
imgList.style.top = (document.documentElement.clientHeight - height) / 2 + 'px'; // 垂直居中

function tab(images, interval, left, now) {
	left -= interval;
	for (var i = 0; i < images.length; i++) {
		left += interval;
		if (i < now) {
			images[i].style.left = left + 'px';
			images[i].style.transform = 'rotateY(45deg) translateZ(-100px)';
		} else if (i > now) {
			images[i].style.left = left + 'px';
			images[i].style.transform = 'rotateY(-45deg) translateZ(-100px)';
		} else {
			left += interval;
			images[i].style.left = left + 'px';
			images[i].style.transform = 'translateZ(200px)';
			left += interval;
		}
	}
}