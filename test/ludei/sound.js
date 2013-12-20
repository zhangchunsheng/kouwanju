var CocoonJS = {};

(function () {
	CocoonJS.Audio = function () {
		return this;
	};

	CocoonJS.Audio.prototype = {

		audio : null,

		setAudio : function (audio) {
			this.audio = audio;
			this.audio.load();
			return this;
		},

		loop : function (loop) {
			return this;
		},

		play : function () {
			this.audio.play();
			return this;
		},

		pause : function () {
			this.audio.pause();
			return this;
		}

	};

})();

(function () {
	CocoonJS.Music = function () {
		return this;
	};

	CocoonJS.Music.prototype = {
		audio : null,
		playing : false,

		setAudio : function (audio) {
			this.audio = audio;
			this.audio.load();
			this.audio.addEventListener(
				'ended',
				function (audioEvent) {
				audioEvent.target.playing = false;
				console.log("Audio ends playing.");
			},
				false);
			return this;
		},

		loop : function () {
			if (!this.audio) {
				console.log("audio not present.");
				return;
			}

			this.audio.loop = !this.audio.loop;
			return this;
		},

		play : function () {
			if (!this.audio) {
				console.log("audio not present.");
				return;
			}

			if (this.playing) {
				return;
			}
			this.playing = true;
			this.audio.play();
			return this;
		},

		pause : function () {
			if (!this.audio) {
				console.log("audio not present.");
				return;
			}
			this.audio.pause();
			this.playing = false;
			return this;
		}

	};

})();

(function () {
	CocoonJS.AudioButton = function () {
		return this;
	};

	CocoonJS.AudioButton.prototype = {

		audio : null,
		actions : null,

		/**
		 * Audio element.
		 * @param audio
		 */
		init : function (audio) {
			this.audio = audio;
			return this;
		},

		createUI : function (ctx, name, x, y, w, h, isMusic) {
			this.actions = [];

			var textW = 200;
			var Pad = 8;

			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "20px Arial";

			this.makeButton(ctx, name, x, y, textW, h, function () {});

			this.makeButton(
				ctx,
				"Play",
				x + textW + Pad,
				y,
				textW,
				h,
				this.audio.play.bind(this.audio));

			var bW = 100;
			x += textW;

			if (isMusic) {
				this.makeButton(
					ctx,
					"Loop",
					x + 2 * (bW + Pad),
					y,
					bW,
					h,
					(function (audio) {
						return function () {
							audio.loop();
						};
					})(this.audio));
				this.makeButton(
					ctx,
					"Pause",
					x + 3 * (bW + Pad),
					y,
					bW,
					h,
					(function (audio) {
						return function () {
							audio.pause();
						};
					})(this.audio));

			}

			return this;
		},

		makeButton : function (ctx, text, x, y, w, h, callback) {
			ctx.fillStyle = 'rgba(255,255,255,.5)';
			ctx.fillRect(x, y, w, h);
			ctx.fillStyle = '#000';
			ctx.fillText(text, x + w / 2, y + h / 2);

			if (callback) {
				this.actions.push({
					action : text,
					x : x,
					y : y,
					w : w,
					h : h,
					f : callback
				});
			}
		},

		handle : function (x, y) {
			for (var i = 0; i < this.actions.length; i++) {
				var o = this.actions[i];

				if (x >= o.x && x <= o.x + o.w && y >= o.y && y <= o.y + o.h) {
					o.f();
					console.log(o);
					if (o.action == "Play") {
						auth();
					}
					if (o.action == "Loop") {
						createMainPlayer();
					}
					if(o.action == "Pause") {
						index();
					}
					return true;
				}
			}
			return false;
		}
	}
})();

(function () {
	Function.prototype.bind = Function.prototype.bind || function () {
		var fn = this; // the function
		var args = Array.prototype.slice.call(arguments); // copy the arguments.
		var obj = args.shift(); // first parameter will be context 'this'
		return function () {
			return fn.apply(
				obj,
				args.concat(Array.prototype.slice.call(arguments)));
		}
	};

	function start() {
		var NB = 5; // num buttons

		if (window.ext) {
			ext.IDTK_APP.makeCall("addForceMusic", "music.mp3");
		}
		var music = document.createElement('audio'); // same as new Audio()
		music.src = "music.mp3";
		music.loop = true;

		var s01 = new Audio();
		s01.src = "01.mp3";

		var s10 = new Audio();
		s10.src = "10.mp3";

		var s11 = new Audio();
		s11.src = "11.mp3";

		var s12 = new Audio();
		s12.src = "12.mp3";

		var canvas = document.createElement("canvas");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		document.body.appendChild(canvas);
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		var W = canvas.width - 60;
		var H = (canvas.height - 40) / NB;
		var Pad = 4;
		var WW = canvas.width - 20 - 2 * Pad;
		var HH = H - 2 * Pad;

		var buttons = [];

		var data = [
			["Music", new CocoonJS.Music().setAudio(music)],
			["Sound1", new CocoonJS.Audio().setAudio(s01)],
			["Sound2", new CocoonJS.Audio().setAudio(s10)],
			["Sound3", new CocoonJS.Audio().setAudio(s11)],
			["Sound4", new CocoonJS.Audio().setAudio(s12)]
		];

		var i;

		for (i = 0; i < data.length; i++) {
			buttons.push(
				new CocoonJS.AudioButton().
				init(data[i][1]).
				createUI(ctx, data[i][0], 30 + Pad, 20 + Pad + i * H, WW, HH, i === 0));
		}

		canvas.addEventListener(
			"touchstart",
			function (touchEvent) {
			var e = touchEvent.targetTouches[0];

			var x = e.pageX;
			var y = e.pageY;

			var i;

			for (i = 0; i < buttons.length; i++) {
				if (buttons[i].handle(x, y)) {
					break;
				}
			}
		});

		canvas.addEventListener(
			"click",
			function (e) {
			var x = e.pageX;
			var y = e.pageY;

			var i;

			for (i = 0; i < buttons.length; i++) {
				if (buttons[i].handle(x, y)) {
					break;
				}
			}
		});
	}

	window.addEventListener("load", start, false);

})();

var loginInfo = {
	code : 200,
	loginName : "html5",
	registerType : "1",
	sessionId : "6ACEC8A00F404644330E05D0294885A5",
	token : "464363099bc522beb8aff5cf16bbcf019f8516f3bc58e4b2d585d9a40b8d2ac5",
	uid : "5"
};

function index() {
	console.log("index");
	var url = "http://192.168.1.99:6011/";

	console.log(url);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function auth() {
	console.log("auth");
	var url = "http://192.168.1.99:6011/auth";
	var data = {
		token : loginInfo.token
	};
	var params = "";
	for (var o in data) {
		params += o + "=" + data[o] + "&"
	}
	params = params.substr(0, params.length - 1);

	url = url + "?" + params;

	console.log(url);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function createMainPlayer() {
	console.log("auth");
	var url = "http://192.168.1.99:6011/role/createMainPlayer";
	var data = {
		token : loginInfo.token
	};
	var params = "";
	for (var o in data) {
		params += o + "=" + data[o] + "&"
	}
	params = params.substr(0, params.length - 1);

	url = url + "?" + params;
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
