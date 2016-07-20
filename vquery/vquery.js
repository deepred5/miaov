
function bindEvent(obj, events, handler) {
	if (obj.addEventListener) {
		obj.addEventListener(events, function(ev) {
			if (handler() === false) {
				ev.preventDefault();
				ev.stopPropagation();
			}
		}, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + events, function(ev) {
			if (handler() === false) {
				window.event.cancelBubble = true;
				return false;
			}
		});
	} else {
		obj['on' + events] = handler;
	}
}

function getByClass(parent, className) {
	var arr = [];
	var elements = parent.getElementsByTagName('*');

	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className === className) {
			arr.push(elements[i]);
		}
	}

	return arr;
}

function toArray(elems) {
	var arr = [];
	for (var i = 0; i < elems.length; i++) {
		arr.push(elems[i]);
	}
	return arr;
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function Vquery(arg) {
	this.elements = []; // 选择元素的集合
	switch (typeof arg) {
		case 'function': 
			bindEvent(window, 'load', arg);
			break;
		case 'string':
			switch (arg.charAt(0)) {
				case '#': // id选择器
					this.elements.push(document.getElementById(arg.substring(1)));
					break;
				case '.': // class选择器
					this.elements = getByClass(document, arg.substring(1))
					break;
				default: // 元素选择器
					this.elements = toArray(document.getElementsByTagName(arg));
					break;
			}
			break;
		case 'object':
			if (arg.constructor === Array) {
				this.elements = arg;
			} else {
				this.elements.push(arg);
			}
			break;
	}
}


Vquery.prototype.html = function(str) {
	if (str) { // 赋值
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].innerHTML = str;
		}
	} else { // 取值
		return this.elements[0].innerHTML;
	}

	return this;
};

Vquery.prototype.on = function(events, handler) {
	for (var i = 0; i < this.elements.length; i++) {
		bindEvent(this.elements[i], events, handler);
	}

	return this;
};

Vquery.prototype.click = function(handler) {
	this.on('click', handler);

	return this;
};

Vquery.prototype.mouseover = function(handler) {
	this.on('mouseover', hander);

	return this;
};

Vquery.prototype.show = function() {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'block';
	}

	return this;
};

Vquery.prototype.hide = function() {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'none';
	}

	return this;
};

Vquery.prototype.hover = function(fnOver, fnOut) {
	this.on('mouseover', fnOver);
	this.on('mouseout', fnOut);

	return this;
};

Vquery.prototype.css = function(attr, value) {
	if (arguments.length === 2) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style[attr] = value;
		}
	} else if (arguments.length === 1) {
		if (typeof attr === 'object') {
			for (var j in attr) {
				for (var i = 0; i < this.elements.length; i++) {
					this.elements[i].style[j] = attr[j];
				}
			}
		} else {
			return getStyle(this.elements[0], attr);
		}
	}

	return this;
};

Vquery.prototype.attr = function(attr, value) {
	if (arguments.length === 2) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].setAttribute(attr, value);
		}
	} else if (arguments.length === 1) {
		return this.elements[0].getAttribute(attr);
	}

	return this;
};

Vquery.prototype.eq = function(num) {
	return $(this.elements[num]);
};

Vquery.prototype.index = function() {
	var elems = this.elements[0].parentNode.children;

	for (var i = 0; i < elems.length; i++) {
		if (elems[i] === this.elements[0]) {
			return i;
		}
	}
};

Vquery.prototype.siblings = function() {
	var elems = this.elements[0].parentNode.children;
	var arr = [];

	for (var i = 0; i < elems.length; i++) {
		if (elems[i] !== this.elements[0]) {
			arr.push(elems[i]);
		}
	}
	return arr;
};

Vquery.prototype.find = function(sel) {
	var arr = [];
	if (sel.charAt(0) === '.') {
		for (var i = 0; i < this.elements.length; i++) {
			arr = arr.concat(getByClass(this.elements[i], sel.substring(1)));
		}
	} else {
		for (var i = 0; i < this.elements.length; i++) {
			arr = arr.concat(toArray(this.elements[i].getElementsByTagName(sel)));
		}
	}
	return $(arr);
};

function $(arg) {
	return new Vquery(arg);
}

$.trim = function(str){
	return str.replace(/^\s+|\s+$/g,'');
};

$.extend = function(json) {
	for (var attr in json) {
		$[attr] = json[attr];
	}
};

$.fn = {};

$.fn.extend = function(json) {
	for (var attr in json) {
		Vquery.prototype[attr] = json[attr];
	}
};