var demo = {
	'red': 50,
	'green': 50,
	'blue': 50,
	'doSetup': true,
	'frames': 0
};

demo.setup = function() {
	lazy.config.width = window.innerWidth;
	document.querySelector('#canvas').width = window.innerWidth;
	lazy.config.height = window.innerHeight;
	document.querySelector('#canvas').height = window.innerHeight;
};

lazy.render = function() {
	if (demo.doSetup) {
		demo.doSetup = false;
		demo.setup();
	}
	
	lazy.prerender();
	
	_.each(['red', 'green', 'blue'], function(color) {
		demo[color] += _.random(-2, 2);
		
		if (demo[color] > 255) {
			demo[color] = 255;
		}
		if (demo[color] < 0) {
			demo[color] = 0;
		}
	});
	
	demo.image = lazy.canvas.createImageData(lazy.config.width, lazy.config.height);
	
	var x, y;
	for (y = 0; y < lazy.config.height; y++) {
		for (x = 0; x < lazy.config.width; x++) {
			var index = (x + (y * lazy.config.width)) * 4;
			demo.image.data[index] = demo.red + _.random(-20, 20);
			demo.image.data[index + 1] = demo.green + _.random(-20, 20);
			demo.image.data[index + 2] = demo.blue + _.random(-20, 20);
			demo.image.data[index + 3] = 255;
		}
	}
	
	lazy.canvas.putImageData(demo.image, 0, 0);
};