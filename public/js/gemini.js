// Gemini Javascript Libary
//
// Created by Michael Thomas

window.$g = new Gemini();

function Gemini() {

	this.init = function() {

		this.setDialogBoxes();
		this.devTools.init();

		console.log('Gemini Initalized');

	}

	//localStorage
	this.ls = {};

	this.ls.set = function(name, val) {
		localStorage.setItem(name, val);
	}

	this.ls.get = function(item) {
		localStorage.getItem(item);
	}

	this.ls.remove = function(item) {
		localStorage.removeItem(item);
	}

	this.ls.clear = function() {
		localStorage.clear();
	}

	//sessionStorage

	this.ss = {};

	this.ss.set = function(name, val) {
		sessionStorage.setItem(name, val);
	}

	this.ss.get = function(item) {
		sessionStorage.getItem(item);
	}

	this.ss.remove = function(item) {
		sessionStorage.removeItem(item);
	}

	this.ss.clear = function() {
		sessionStorage.clear();
	}

	//indexedDB - WIP
	this.idb = {};
	this.idb.open = function() {

	}



	// Get Elements
	this.Id = function(id) {
		return document.getElementById(id);
	}
	this.Class = function(classnames) {
		return document.getElementsByClassName(classnames);
	}
	this.Tag = function(tag) {
		return document.getElementsByTagName(tag);
	}

	this.Attr = function(attr) {
		  var matchingElements = [];
		  var allElements = document.getElementsByTagName('*');
		  for (var i = 0, n = allElements.length; i < n; i++)
		  {
		    if (allElements[i].getAttribute(attr) !== null)
		    {
		      matchingElements.push(allElements[i]);
		    }
		  }
		  return matchingElements;
	}

	//set
	this.sStyle = function(ele,att,val) {
		ele.style[att] = val;
	}

	//get
	this.gStyle = function(ele,att) {
		return ele.style[att];
	}
	//set content
	this.html = function(ele,val) {
		ele.innerHTML = val;
	}


	//Canvis
	this.canvas = {};
	this.canvas.area = null
	this.canvas.ctx = null;

	this.canvas.resize  = function() {
		var di = {w: this.area.parentNode.clientWidth, h: this.area.parentNode.clientHeight };

		this.area.width = di.w - 2;

		console.log(this.area.parentNode.clientWidth);
	}

	this.canvas.getMousePos = function(evt) {
        var rect = this.area.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

	this.canvas.setarea = function(id) {
		this.area = document.getElementById(id);
		this.ctx = document.getElementById(id).getContext('2d');
	}
	this.canvas.draw = {}
	this.canvas.draw.CANVAS = this.canvas;

	this.canvas.draw.fRec = function(color,x,y,w,h) {
		this.CANVAS.ctx.beginPath();
		this.CANVAS.ctx.fillStyle = color;
		this.CANVAS.ctx.shadowBlur = 0;
	    this.CANVAS.ctx.shadowOffsetX = 0;
	    this.CANVAS.ctx.shadowOffsetY = 0;
		this.CANVAS.ctx.fillRect(x,y,w,h);
		this.CANVAS.ctx.restore();
	}

	this.canvas.draw.lineTo = function(sx,sy,ex,ey) {
		this.CANVAS.ctx.beginPath();
		this.CANVAS.ctx.moveTo(sx,sy);
		this.CANVAS.ctx.lineTo(ex,ey);
		this.CANVAS.ctx.stroke();
	}


	this.canvas.draw.sRec = function(color,x,y,w,h) {
		this.CANVAS.ctx.strokeStyle = color;
		this.CANVAS.ctx.strokeRect(x, y, w, h);
		ctx.restore();
	}

	this.canvas.draw.clearRec = function(x,y,w,h) {
		this.CANVAS.ctx.clearRect(x, y, w, h);
		this.CANVAS.ctx.restore();
	}

	this.canvas.draw.arc = function(x,y,r,sa,ea) {
		this.CANVAS.ctx.arc(x, y, r, sa, ea);
		this.CANVAS.ctx.restore();
	}
	this.canvas.draw.circlef = function(color,x,y,r) {
		this.CANVAS.ctx.beginPath();
		this.CANVAS.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.CANVAS.ctx.fillStyle = color;
		      this.CANVAS.ctx.shadowColor = '#181818';
		      this.CANVAS.ctx.shadowBlur = 0;
		      this.CANVAS.ctx.shadowOffsetX = 0;
		      this.CANVAS.ctx.shadowOffsetY = 0;
      	this.CANVAS.ctx.fill();

      	this.CANVAS.ctx.restore();
	}

	this.canvas.draw.blur = function(color,x,y,r) {
		this.CANVAS.ctx.beginPath();
		this.CANVAS.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.CANVAS.ctx.fillStyle = color;
		      this.CANVAS.ctx.shadowColor = color;
		      this.CANVAS.ctx.shadowBlur = r;
		      this.CANVAS.ctx.shadowOffsetX = 0;
		      this.CANVAS.ctx.shadowOffsetY = 0;
      	this.CANVAS.ctx.fill();

      	this.CANVAS.ctx.restore();
	}

	this.canvas.draw.clouds = function(color,x,y,r) {
		r = 50
		this.CANVAS.ctx.beginPath();
		this.CANVAS.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.CANVAS.ctx.arc(x+(Math.random() * (5 - 1) + 1), y+(Math.random() * (5 - 1) + 1), r, 0, 2 * Math.PI);
		this.CANVAS.ctx.arc(x-(Math.random() * (10 - 5) + 5), y-(Math.random() * (10 - 5) + 5), r, 0, 2 * Math.PI);
		this.CANVAS.ctx.arc(x+(Math.random() * (30 - 1) + 1), y, r, 0, 2 * Math.PI);
		this.CANVAS.ctx.arc(x+(Math.random() * (30 - 1) + 1), y, r, 0, 2 * Math.PI);
		this.CANVAS.ctx.arc(x-(Math.random() * (30 - 1) + 1), y, r, 0, 2 * Math.PI);
		this.CANVAS.ctx.arc(x, y-(Math.random() * (30 - 1) + 1), r, 0, 2 * Math.PI);
			  this.CANVAS.ctx.shadowColor = color;
		      this.CANVAS.ctx.shadowBlur = r;
		      this.CANVAS.ctx.shadowOffsetX = 0;
		      this.CANVAS.ctx.shadowOffsetY = 0;
		this.CANVAS.ctx.fillStyle = 'rgba(255,255,255,0.01)';
		this.CANVAS.ctx.fill();
		this.CANVAS.ctx.restore();

	}

	this.canvas.clr = function() {
		var CANVAS_WIDTH = this.area.width;
		var CANVAS_HEIGHT = this.area.height;
		this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	}


	// Dialog Box
	this.setDialogBoxes = function() {
		var allDialogs = this.Attr('data-gemini-dialog');
		for (var i = 0, n = allDialogs.length; i < n; i++){
			var ele = allDialogs[i];
			var state = ele.getAttribute('data-gemini-dialog');

			this.sStyle(ele,'width','70%');
			this.sStyle(ele,'height','500px');
			this.sStyle(ele,'background','red');

			eleHeight = ele.offsetHeight;
			eleWidth = ele.offsetWidth;
			var top;
			if (state == 'open') {
				top = 100 + "px";
				ele.setAttribute('data-gemini-dialog', 'open');
			} else {
				top = (0 - eleHeight) + "px";
				ele.setAttribute('data-gemini-dialog', 'closed');
			}
			var left = (parseInt(window.innerWidth - eleWidth) / 2) + "px";

			this.sStyle(ele,'position','absolute');
			this.sStyle(ele,'top', top);
			this.sStyle(ele,'left',left);
			this.sStyle(ele,'transition','0.2s');
		}

		var allDialogsActivates = this.Attr('data-gemini-dialog-activate');
		for (var i = 0, n = allDialogsActivates.length; i < n; i++){
			var ele = allDialogsActivates[i];
			targetEle = ele.getAttribute('data-gemini-dialog-activate');
			var that = this;
			ele.tt = ele.getAttribute('data-gemini-dialog-activate');
			ele.gem = this;
			ele.addEventListener("click", this.activateDialog);
		}

	}

	this.activateDialog = function(e) {
		var id = e.target.tt;
		var allDialogs = e.target.gem.Attr('data-gemini-dialog');
		for (var i = 0, n = allDialogs.length; i < n; i++){
			var ele = allDialogs[i];
			if (ele.id != id){
				eleHeight = ele.offsetHeight;
				ele.style.top = (0 - eleHeight) + "px";
				ele.setAttribute('data-gemini-dialog', 'closed');
			}
		}


		var dialog = e.target.gem.Id(id);
		var state = dialog.getAttribute('data-gemini-dialog');
		var eleHeight = dialog.offsetHeight;
		var newTop;
		if (state == 'closed') {
				newTop = 100 + "px";
				dialog.setAttribute('data-gemini-dialog', 'open');
			} else {
				newTop = (0 - eleHeight) + "px";
				dialog.setAttribute('data-gemini-dialog', 'closed');
			}
			dialog.style.top = newTop;
	}


	//Dev Tools
	this.devTools = {}
	this.devTools.gem = this;
	this.devTools.init = function() {
		this.createElements();
		this.varNodes();
	}
	this.devTools.createElements = function() {
		document.createElement('var');
	}

	this.devTools.varNodes = function() {
		var allvars = this.gem.Tag('var');
		for (var i = 0; i <= allvars.length - 1; i++) {
			var cur = allvars[i];
			var variable = cur.getAttribute('data-js');
			switch (typeof(window[variable])) {
				case 'String':
					cur.innerHTML = "String: " + window[variable];
					break;
				case 'object':
					cur.innerHTML = "Object: " + JSON.stringify(window[variable]);
					break;
				case 'undefined':
					cur.innerHTML = 'undefined';
					break;
				default:
					//console.log(typeof(window[variable]));
					break;
			}
		};
	}

}
