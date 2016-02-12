/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var StarField = __webpack_require__(5);
	var BoldInvaders = __webpack_require__(6);
	var GAME_KEYS = [37, 39, 32];
	//Starfield 
	var SFOptions = {
	    fps: 30,
	    canvas: null,
	    width: 0,
	    height: 0,
	    minVelocity: 15,
	    maxVelocity: 30,
	    starList: null,
	    intervalId: 0
	};
	var starfield = new StarField(SFOptions);
	var container = document.getElementById('container');
	starfield.initialize(container);
	starfield.start();
	//Bold Invaders 
	var BIOptions = {
	    gameWidth: 400,
	    gameHeight: 400,
	    fps: 50,
	    shipSpeed: 120,
	    debugMode: false,
	    levelDifficultyMultiplier: 0.2
	};
	var BIStateOptions = {
	    lives: 3,
	    width: 0,
	    height: 0,
	    gameBounds: { left: 0, top: 0, right: 0, bottom: 0 },
	    intervalId: 0,
	    score: 0,
	    level: 1,
	    stateStack: [],
	    pressedKeys: [],
	    gameCanvas: null,
	    sounds: []
	};
	var BIPlayerOptions = {
	    rocketVelocity: 120,
	    rocketMaxFireRate: 2
	};
	var BIEnemyOptions = {
	    bombRate: 0.05,
	    bombMinVelocity: 50,
	    bombMaxVelocity: 60,
	    invaderInitialVelocity: 25,
	    invaderAcceleration: 0,
	    invaderDropDistance: 20,
	    invaderRanks: 5,
	    invaderFiles: 10,
	    pointsPerInvader: 5
	};
	var BIPlayStateOptions = {
	    ship: null,
	    invaders: null,
	    rockets: null,
	    bombs: null,
	    invaderCurrentVelocity: 0,
	    invaderCurrentDropDistance: 0,
	    invadersAreDropping: false,
	    lastRocketTime: 0
	};
	var canvas = document.getElementById("gameCanvas");
	var boldInvaders = new BoldInvaders(BIOptions, BIPlayerOptions, BIEnemyOptions, BIPlayStateOptions, BIStateOptions);
	boldInvaders.initialize(canvas);
	boldInvaders.start();
	window.addEventListener("keydown", function keydown(e) {
	    var keyCode = e.which || e.keyCode;
	    //  Supress further processing of left/right/space (37/29/32)
	    if (keyCode == 37 || keyCode == 39 || keyCode == 32) {
	        e.preventDefault();
	    }
	    boldInvaders.keyDown(keyCode);
	});
	window.addEventListener("keyup", function keydown(e) {
	    var keyCode = e.which || e.keyCode;
	    boldInvaders.keyUp(keyCode);
	});
	console.log(boldInvaders.boldOptions.fps);
	//# sourceMappingURL=index.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "*{\r\n    padding: 0px;\r\n    margin: 0px;\r\n}\r\n\r\nbody, html { \r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0;\r\n    padding: 0;\r\n    overflow: hidden;\r\n    }\r\n            \r\n#container {\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: -1;\r\n    position: absolute;\r\n    left: 0px;\r\n    top: 0px;\r\n}\r\n\r\n#gamecontainer{\r\n    width: 800px;\r\n    margin: auto;\r\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var STAR_LIMIT = 100;
	var StarField = (function () {
	    function StarField(options) {
	        this.options = options;
	    }
	    StarField.prototype.initialize = function (div) {
	        var _this = this;
	        var containerDiv = div;
	        this.options.starList = [];
	        this.options.width = window.innerWidth;
	        this.options.height = window.innerHeight;
	        window.addEventListener('resize', function (event) {
	            //resize
	            _this.options.width = window.innerWidth;
	            _this.options.height = window.innerHeight;
	            _this.options.canvas.width = _this.options.width;
	            _this.options.canvas.height = _this.options.height;
	            //redraw
	            _this.draw();
	        });
	        //create the canvas
	        var newCanvas = document.createElement('canvas');
	        div.appendChild(newCanvas);
	        this.options.canvas = newCanvas;
	        this.options.canvas.width = this.options.width;
	        this.options.canvas.height = this.options.height;
	    };
	    StarField.prototype.update = function () {
	        var dt = 1 / this.options.fps;
	        for (var i = 0; i < STAR_LIMIT; i++) {
	            var star = this.options.starList[i];
	            star.y += dt * star.velocity;
	            //  If the star has moved from the bottom of the screen, spawn it at the top.
	            if (star.y > this.options.height) {
	                var newStar = {
	                    x: Math.random() * this.options.width,
	                    y: 0,
	                    size: Math.random() * 3 + 1,
	                    velocity: (Math.random() * (this.options.maxVelocity - this.options.minVelocity)) + this.options.minVelocity
	                };
	                this.options.starList[i] = newStar;
	            }
	        }
	    };
	    StarField.prototype.start = function () {
	        var _this = this;
	        //	Create the stars.
	        for (var i = 0; i < STAR_LIMIT; i++) {
	            var newStar = {
	                x: Math.random() * this.options.width,
	                y: Math.random() * this.options.height,
	                size: Math.random() * 3 + 1,
	                velocity: (Math.random() * (this.options.maxVelocity - this.options.minVelocity)) + this.options.minVelocity
	            };
	            this.options.starList.push(newStar);
	        }
	        //	Start the timer.
	        this.options.intervalId = setInterval(function () {
	            _this.update();
	            _this.draw();
	        }, 1000 / this.options.fps);
	    };
	    StarField.prototype.draw = function () {
	        //  Get the drawing context.
	        var ctx = this.options.canvas.getContext("2d");
	        // Draw the background.
	        ctx.fillStyle = '#000000';
	        ctx.fillRect(0, 0, this.options.width, this.options.height);
	        //  Draw stars.
	        ctx.fillStyle = '#ffffff';
	        for (var i = 0; i < this.options.starList.length; i++) {
	            var star = this.options.starList[i];
	            ctx.fillRect(star.x, star.y, star.size, star.size);
	        }
	    };
	    return StarField;
	})();
	module.exports = StarField;
	//# sourceMappingURL=starfields.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var welcomeState = __webpack_require__(7);
	var BoldInvaders = (function () {
	    function BoldInvaders(boldOptions, playerOptions, enemyOptions, gameStateOptions, stateOptions) {
	        this.boldOptions = boldOptions;
	        this.playerOptions = playerOptions;
	        this.enemyOptions = enemyOptions;
	        this.gameStateOptions = gameStateOptions;
	        this.stateOptions = stateOptions;
	    }
	    BoldInvaders.prototype.initialize = function (gameCanvas) {
	        this.stateOptions.gameCanvas = gameCanvas;
	        console.log(window.innerHeight);
	        gameCanvas.height = window.innerHeight;
	        gameCanvas.width = window.innerWidth;
	        this.stateOptions.height = gameCanvas.height;
	        this.stateOptions.width = gameCanvas.width;
	        console.log(gameCanvas.height);
	    };
	    BoldInvaders.prototype.gameLoop = function (game) {
	        var currentState = game.currentState();
	        console.log(currentState);
	        if (currentState) {
	            //  Delta t is the time to update/draw.
	            var dt = 1 / game.boldOptions.fps;
	            //  Get the drawing context.
	            var ctx = game.stateOptions.gameCanvas.getContext("2d");
	            console.log(ctx);
	            //  Update if we have an update function. Also draw
	            //  if we have a draw function.
	            if (currentState.update) {
	                currentState.update(game, dt, ctx);
	            }
	            if (currentState.draw) {
	                currentState.draw(game, dt, ctx);
	            }
	        }
	    };
	    BoldInvaders.prototype.currentState = function () {
	        return this.stateOptions.stateStack.length > 0 ? this.stateOptions.stateStack[this.stateOptions.stateStack.length - 1] : null;
	    };
	    BoldInvaders.prototype.moveToState = function (state) {
	        if (this.currentState()) {
	            if (this.currentState().leave) {
	                this.currentState().leave(this);
	            }
	            this.stateOptions.stateStack.pop();
	        }
	        //  If there's an enter function for the new state, call it.
	        this.chooseStateFunction(state);
	        //  Set the current state.
	        this.stateOptions.stateStack.push(state);
	    };
	    BoldInvaders.prototype.pushState = function (state) {
	        //  If there's an enter function for the new state, call it.
	        this.chooseStateFunction(state);
	        //  Set the current state.
	        this.stateOptions.stateStack.push(state);
	    };
	    BoldInvaders.prototype.popState = function () {
	        if (this.currentState().leave) {
	            this.currentState().leave(this);
	        }
	        //  Set the current state.
	        this.stateOptions.stateStack.pop();
	    };
	    BoldInvaders.prototype.start = function () {
	        var canvas = this.stateOptions.gameCanvas;
	        var ctx = canvas.getContext("2d");
	        //  Move into the 'welcome' state.
	        this.moveToState(new welcomeState(this, 1 / (this.boldOptions.fps), ctx));
	        //  Set the game variables.
	        this.stateOptions.lives = 3;
	        this.boldOptions.debugMode = /debug=true/.test(window.location.href);
	        //  Start the game loop.
	        this.stateOptions.intervalId = setInterval(this.gameLoop(this), 1000 / this.boldOptions.fps);
	    };
	    BoldInvaders.prototype.keyDown = function (keyCode) {
	        this.stateOptions.pressedKeys[keyCode] = true;
	        //  Delegate to the current state too.
	        if (this.currentState() && this.currentState().keyDown) {
	            this.currentState().keyDown(this, keyCode);
	        }
	    };
	    BoldInvaders.prototype.keyUp = function (keyCode) {
	        delete this.stateOptions.pressedKeys[keyCode];
	        //  Delegate to the current state too.
	        if (this.currentState() && this.currentState().keyUp) {
	            this.currentState().keyUp(this, keyCode);
	        }
	    };
	    BoldInvaders.prototype.chooseStateFunction = function (state) {
	        if (this.isPlayState(state)) {
	            state.enter();
	        }
	        if (this.isOverState(state)) {
	            state.leave();
	        }
	        if (this.isIntroState(state)) {
	            state.update();
	        }
	    };
	    BoldInvaders.prototype.isPlayState = function (state) {
	        return typeof state.enter === 'function';
	    };
	    BoldInvaders.prototype.isOverState = function (state) {
	        return typeof state.leave === 'function';
	    };
	    BoldInvaders.prototype.isIntroState = function (state) {
	        return typeof state.update === 'function';
	    };
	    BoldInvaders.prototype.isWelcomeState = function (state) {
	        return typeof state.draw === 'function';
	    };
	    return BoldInvaders;
	})();
	module.exports = BoldInvaders;
	//# sourceMappingURL=bold-invaders.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var levelIntroState = __webpack_require__(8);
	var WelcomeState = (function () {
	    function WelcomeState(game, dt, ctx) {
	    }
	    WelcomeState.prototype.draw = function (game, dt, ctx) {
	        var boldLogo = new Image();
	        var invadersLogo = new Image();
	        boldLogo.src = "../front/images/welcomeLogo.png";
	        invadersLogo.src = "../front/images/invaders.png";
	        var invaders = document.getElementById("invadersLogo");
	        //  Clear the background.
	        ctx.clearRect(0, 0, game.stateOptions.width, game.stateOptions.height);
	        //Draw Text
	        ctx.fillStyle = '#ffffff';
	        ctx.textBaseline = "bottom";
	        ctx.textAlign = "center";
	        ctx.font = "16px Arial";
	        //Draw Logo
	        setTimeout(function () {
	            ctx.drawImage(boldLogo, ctx.canvas.width / 2 - boldLogo.width / 2, 25, 250, 125);
	        }, 300);
	        setTimeout(function () {
	            ctx.drawImage(invadersLogo, ctx.canvas.width / 2 - invadersLogo.width / 4, 125, 250, 75);
	        }, 1300);
	        setTimeout(function () {
	            ctx.fillText("Press 'Space' to start.", game.stateOptions.width / 2, game.stateOptions.height / 2);
	        }, 2000);
	    };
	    WelcomeState.prototype.keyDown = function (game, keyCode) {
	        if (keyCode == 32) {
	            //  Space starts the game.  
	            game.moveToState(new levelIntroState(game, 1 / (game.boldOptions.fps), game.stateOptions.gameCanvas.getContext("2d")));
	            var intervalId = setInterval(function () {
	                game.gameLoop(game);
	            }, 1000);
	        }
	    };
	    return WelcomeState;
	})();
	module.exports = WelcomeState;
	//# sourceMappingURL=welcome-state.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	var LevelIntroState = (function () {
	    function LevelIntroState(game, dt, ctx) {
	        this.game = game;
	        this.dt = dt;
	        this.ctx = ctx;
	    }
	    LevelIntroState.prototype.draw = function () {
	        if (this.countDownMessage == null) {
	            this.countDownMessage = 3;
	        }
	        console.log(this.ctx);
	        //  Clear the background.
	        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
	        this.ctx.font = "36px Arial";
	        this.ctx.fillStyle = '#ffffff';
	        this.ctx.textBaseline = "middle";
	        this.ctx.textAlign = "center";
	        this.ctx.fillText("Level " + this.game.stateOptions.level, this.game.stateOptions.width / 2, this.game.stateOptions.height / 2);
	        this.ctx.font = "24px Arial";
	        this.ctx.fillText("Ready in " + this.countDownMessage, this.game.stateOptions.width / 2, this.game.stateOptions.height / 2 + 36);
	    };
	    LevelIntroState.prototype.update = function () {
	        //  Update the countdown.
	        if (this.countdown == null) {
	            this.countdown = 3; // countdown from 3 secs
	        }
	        if (this.countdown === 2) {
	            this.countDownMessage = 2;
	        }
	        if (this.countdown === 1) {
	            this.countDownMessage = 1;
	        }
	        if (this.countdown <= 0) {
	            //  Move to the next level, popping this state.
	            //this.game.moveToState(new PlayState(this.game));
	            console.log("counted to zero");
	        }
	        console.log(this.countdown + " message: " + this.countDownMessage);
	        this.draw();
	        this.countdown -= 1;
	    };
	    return LevelIntroState;
	})();
	module.exports = LevelIntroState;
	//# sourceMappingURL=level-intro-state.js.map

/***/ }
/******/ ]);