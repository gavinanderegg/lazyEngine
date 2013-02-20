// Lazy


var lazy = {
	'config': {
		'width': 640,
		'height': 480,
		'fps': true
	},
	'lastFrame': new Date().getTime(),
	'animate': true,
	'canvas': null,
	'dt': 0,
	
	'loop': function() {
		if (lazy.animate === true) {
			requestAnimFrame(lazy.loop);
			lazy.render();
		}
	},
	
	'render': function() {
		var now = new Date().getTime();
		lazy.dt = now - lazy.lastFrame;
		lazy.lastFrame = now;
		
		if (lazy.config.fps) {
			lazy.renderFPS();
		}
	},
	
	'renderFPS': function() {
		console.log(1000 / lazy.dt);
	},
	
	'randBetween': function(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	}
};


$(document).ready(function() {
	// from: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) { window.setTimeout(callback, 60); };
	})();
	
	$(document).keydown(function(event) {
		var ESC = 27;
		
		if ((event.which === ESC) || (event.keyPress === ESC)) {
			if (lazy.animate == true) {
				lazy.animate = false;
				console.log("animation stopped");
			} else {
				lazy.animate = true;
				requestAnimFrame(lazy.loop);
				console.log("animation re-started");
			}
		}
	});
	
	var c = document.getElementById('canvas');
	lazy.canvas = c.getContext('2d');
	
	console.log("animation starting");
	
	lazy.loop();
});