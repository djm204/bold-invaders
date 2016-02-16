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
	    fps: 50,
	    canvas: null,
	    width: 0,
	    height: 0,
	    minVelocity: 15,
	    maxVelocity: 30,
	    starList: [],
	    intervalId: 0
	};
	var starfield = new StarField(SFOptions);
	var container = document.getElementById('container');
	starfield.initialize(container);
	starfield.start();
	//Bold Invaders 
	var BIOptions = {
	    gameWidth: 400,
	    gameHeight: 300,
	    fps: 50,
	    shipSpeed: 120,
	    debugMode: false,
	    levelDifficultyMultiplier: .5
	};
	var BIStateOptions = {
	    lives: 3,
	    width: 0,
	    height: 0,
	    gameBounds: { left: 0, top: 0, right: 0, bottom: 0 },
	    intervalId: 0,
	    level: 1,
	    stateStack: [],
	    pressedKeys: [],
	    gameCanvas: null,
	    sounds: [],
	    lastPauseTime: null,
	    countDown: 3,
	    countDownMessage: 3
	};
	var BIPlayerOptions = {
	    rocketVelocity: 120,
	    rocketMaxFireRate: 2,
	    score: 0,
	    timesPlayed: 0,
	    win: false
	};
	var BIEnemyOptions = {
	    bombRate: 0.05,
	    bombMinVelocity: 50,
	    bombMaxVelocity: 50,
	    invaderInitialVelocity: 25,
	    invaderAcceleration: 0,
	    invaderDropDistance: 20,
	    invaderRanks: 5,
	    invaderFiles: 10,
	    pointsPerInvader: 5
	};
	var BIPlayStateOptions = {
	    ship: null,
	    invaders: [],
	    rockets: [],
	    bombs: [],
	    invaderCurrentVelocity: 1,
	    invaderCurrentDropDistance: 0,
	    invadersAreDropping: false,
	    lastRocketTime: 0,
	    firstEntry: true,
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
	exports.push([module.id, "*{\r\n    padding: 0px;\r\n    margin: 0px;\r\n}\r\n\r\nbody, html { \r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0;\r\n    padding: 0;\r\n    overflow: hidden;\r\n    }\r\n            \r\n#container {\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: -1;\r\n    position: absolute;\r\n    left: 0px;\r\n    top: 0px;\r\n}\r\n\r\n#gamecontainer{\r\n    width: 800px;\r\n    margin: auto;\r\n}\r\n\r\n#gameCanvas {\r\n    display: block;\r\n    margin: 20px auto;\r\n\r\n}\r\n\r\n#info {\r\n    width: 800px;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    margin-top: 50px;\r\n    color: white;\r\n    font-family: monospace;\r\n    \r\n}\r\n\r\n#info a{\r\n    color: #5ea2e3;\r\n}", ""]);

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
	var GAME_CANVAS_HEIGHT = 600;
	var GAME_CANVAS_WIDTH = 700;
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
	        gameCanvas.width = GAME_CANVAS_WIDTH;
	        gameCanvas.height = GAME_CANVAS_HEIGHT;
	        this.stateOptions.height = gameCanvas.height;
	        this.stateOptions.width = gameCanvas.width;
	        this.stateOptions.gameBounds = {
	            left: gameCanvas.width / 2 - this.boldOptions.gameWidth / 2,
	            right: gameCanvas.width / 2 + this.boldOptions.gameWidth / 2,
	            top: gameCanvas.height / 2 - this.boldOptions.gameHeight / 1.5,
	            bottom: gameCanvas.height - 100,
	        };
	    };
	    BoldInvaders.prototype.moveToState = function (state) {
	        if (this.currentState()) {
	            this.stateOptions.stateStack.pop();
	        }
	        this.chooseStateFunction(state);
	        //  Set the current state.
	        this.stateOptions.stateStack.pop();
	        this.stateOptions.stateStack.push(state);
	    };
	    BoldInvaders.prototype.start = function () {
	        var _this = this;
	        var canvas = this.stateOptions.gameCanvas;
	        var ctx = canvas.getContext("2d");
	        //  Move into the 'welcome' state.
	        this.moveToState(new welcomeState(this, ctx));
	        //  Set the game variables.
	        this.stateOptions.lives = 3;
	        //  Start the game loop.
	        this.stateOptions.intervalId = setInterval(function () { _this.gameLoop(_this); }, 1000 / this.boldOptions.fps);
	    };
	    BoldInvaders.prototype.resetGameVariables = function (resetAllVariables) {
	        if (!resetAllVariables) {
	            //reset for level advancement
	            this.boldOptions = {
	                gameWidth: 400,
	                gameHeight: 300,
	                fps: 50,
	                shipSpeed: 120,
	                debugMode: this.boldOptions.debugMode,
	                levelDifficultyMultiplier: .2
	            };
	            this.stateOptions = {
	                lives: 3,
	                width: this.stateOptions.width,
	                height: this.stateOptions.height,
	                gameBounds: {
	                    left: this.stateOptions.gameBounds.left,
	                    top: this.stateOptions.gameBounds.top,
	                    right: this.stateOptions.gameBounds.right,
	                    bottom: this.stateOptions.gameBounds.bottom
	                },
	                intervalId: 0,
	                level: this.stateOptions.level,
	                stateStack: [],
	                pressedKeys: [],
	                gameCanvas: this.stateOptions.gameCanvas,
	                sounds: [],
	                lastPauseTime: null,
	                countDown: 3,
	                countDownMessage: 3
	            };
	            this.playerOptions = {
	                rocketVelocity: 120,
	                rocketMaxFireRate: 2,
	                score: this.playerOptions.score,
	                timesPlayed: this.playerOptions.timesPlayed,
	                win: this.playerOptions.win
	            };
	            this.enemyOptions = {
	                bombRate: 0.05,
	                bombMinVelocity: 50,
	                bombMaxVelocity: 50,
	                invaderInitialVelocity: 25,
	                invaderAcceleration: 0,
	                invaderDropDistance: 20,
	                invaderRanks: 5,
	                invaderFiles: 10,
	                pointsPerInvader: 5
	            };
	            this.gameStateOptions = {
	                ship: this.gameStateOptions.ship,
	                invaders: [],
	                rockets: [],
	                bombs: [],
	                invaderCurrentVelocity: 1,
	                invaderCurrentDropDistance: 0,
	                invadersAreDropping: false,
	                lastRocketTime: 0,
	                firstEntry: true
	            };
	        }
	        else {
	            // reset all variables to new game
	            this.boldOptions = {
	                gameWidth: 400,
	                gameHeight: 300,
	                fps: 50,
	                shipSpeed: 120,
	                debugMode: this.boldOptions.debugMode,
	                levelDifficultyMultiplier: .2
	            };
	            this.stateOptions = {
	                lives: 3,
	                width: this.stateOptions.width,
	                height: this.stateOptions.height,
	                gameBounds: {
	                    left: this.stateOptions.gameBounds.left,
	                    top: this.stateOptions.gameBounds.top,
	                    right: this.stateOptions.gameBounds.right,
	                    bottom: this.stateOptions.gameBounds.bottom
	                },
	                intervalId: 0,
	                level: 1,
	                stateStack: [],
	                pressedKeys: [],
	                gameCanvas: this.stateOptions.gameCanvas,
	                sounds: [],
	                lastPauseTime: null,
	                countDown: 3,
	                countDownMessage: 3
	            };
	            this.playerOptions = {
	                rocketVelocity: 120,
	                rocketMaxFireRate: 2,
	                score: 0,
	                timesPlayed: 0,
	                win: false
	            };
	            this.enemyOptions = {
	                bombRate: 0.05,
	                bombMinVelocity: 50,
	                bombMaxVelocity: 50,
	                invaderInitialVelocity: 25,
	                invaderAcceleration: 0,
	                invaderDropDistance: 20,
	                invaderRanks: 5,
	                invaderFiles: 10,
	                pointsPerInvader: 5
	            };
	            this.gameStateOptions = {
	                ship: null,
	                invaders: [],
	                rockets: [],
	                bombs: [],
	                invaderCurrentVelocity: 1,
	                invaderCurrentDropDistance: 0,
	                invadersAreDropping: false,
	                lastRocketTime: 0,
	                firstEntry: true
	            };
	        }
	    };
	    BoldInvaders.prototype.currentState = function () {
	        return this.stateOptions.stateStack.length > 0 ? this.stateOptions.stateStack[this.stateOptions.stateStack.length - 1] : null;
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
	    };
	    BoldInvaders.prototype.gameLoop = function (game) {
	        var currentState = game.currentState();
	        if (currentState) {
	            if (currentState.draw) {
	                currentState.draw();
	            }
	            if (currentState.update) {
	                currentState.update();
	            }
	        }
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
	            if (this.gameStateOptions.firstEntry) {
	                state.enter();
	            }
	            else {
	                state.update();
	            }
	        }
	        if (this.isOverState(state)) {
	            state.leave();
	        }
	        if (this.isIntroState(state)) {
	            state.update();
	        }
	        if (this.isWelcomeState(state)) {
	            state.draw();
	        }
	    };
	    BoldInvaders.prototype.isPlayState = function (state) {
	        if (this.gameStateOptions.firstEntry) {
	            return typeof state.enter === 'function';
	        }
	        else {
	            return typeof state.update === 'function';
	        }
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
	    function WelcomeState(game, ctx) {
	        this.game = game;
	        this.ctx = ctx;
	        this.introMusic = new Audio("sounds/introMusic.mp3"); // buffers automatically when created
	    }
	    WelcomeState.prototype.draw = function () {
	        var boldLogo = new Image();
	        var invadersLogo = new Image();
	        boldLogo.src = "images/welcomeLogo.png";
	        invadersLogo.src = "images/invaders.png";
	        //  Clear the background.
	        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
	        //Draw Text
	        this.ctx.fillStyle = '#ffffff';
	        this.ctx.textBaseline = "bottom";
	        this.ctx.textAlign = "center";
	        this.ctx.font = "16px Arial";
	        this.ctx.fillText("A BOLD interpretation of a cult classic.", this.game.stateOptions.width / 2, this.game.stateOptions.height * .40);
	        this.ctx.fillText("Help the Bold team destroy blocks of buggy code before production!", this.game.stateOptions.width / 2, this.game.stateOptions.height * .50);
	        this.ctx.fillText("Move: <left> and <right> keys", this.game.stateOptions.width / 2, this.game.stateOptions.height * .72);
	        this.ctx.fillText("Shoot: SpaceBar", this.game.stateOptions.width / 2, this.game.stateOptions.height * .76);
	        this.ctx.fillText("Pause: <Esc> key", this.game.stateOptions.width / 2, this.game.stateOptions.height * .80);
	        this.ctx.fillText("Press 'Space' to start.", this.game.stateOptions.width / 2, this.game.stateOptions.height);
	        //Draw Logo        
	        this.ctx.drawImage(boldLogo, this.ctx.canvas.width / 2 - boldLogo.width / 2, 25, 250, 125);
	        this.ctx.drawImage(invadersLogo, this.ctx.canvas.width / 2 - invadersLogo.width / 4, 125, 250, 75);
	        this.introMusic.volume = .05;
	        this.introMusic.play();
	    };
	    WelcomeState.prototype.keyDown = function (game, keyCode) {
	        if (keyCode == 32) {
	            //  Space starts the game.             
	            var options = { level: 1, countDown: 3, countDownMessage: 3, ctx: this.ctx };
	            this.introMusic.pause();
	            game.moveToState(new levelIntroState(game));
	        }
	    };
	    return WelcomeState;
	})();
	module.exports = WelcomeState;
	//# sourceMappingURL=welcome-state.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var GameState = __webpack_require__(9);
	var LevelIntroState = (function () {
	    function LevelIntroState(game, gameState) {
	        this.game = game;
	        this.gameState = gameState;
	    }
	    LevelIntroState.prototype.draw = function () {
	        var ctx = this.game.stateOptions.gameCanvas.getContext("2d");
	        if (this.game.stateOptions.countDownMessage == null) {
	            this.game.stateOptions.countDownMessage = 3;
	        }
	        //  Clear the background. set config for text.        
	        ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
	        ctx.font = "36px Arial";
	        ctx.fillStyle = '#ffffff';
	        ctx.textAlign = "center";
	        ctx.textBaseline = "middle";
	        if (this.game.playerOptions.win) {
	            var chuckNorris = new Image();
	            chuckNorris.src = "images/chuckNorris.png";
	            ctx.drawImage(chuckNorris, this.game.stateOptions.height * .47, this.game.stateOptions.width * .42 - chuckNorris.width, 150, 160);
	            ctx.fillText("You Win!", this.game.stateOptions.width * .5, this.game.stateOptions.height * .1);
	            ctx.fillText("Chuck is Proud.", this.game.stateOptions.width * .5, this.game.stateOptions.height * .17);
	        }
	        ctx.fillText("Level " + this.game.stateOptions.level, this.game.stateOptions.width * .5, this.game.stateOptions.height * .55);
	        ctx.font = "24px Arial";
	        ctx.fillText("Ready in " + this.game.stateOptions.countDownMessage, this.game.stateOptions.width * .5, this.game.stateOptions.height * .6);
	    };
	    LevelIntroState.prototype.update = function () {
	        //  Update the countDown.
	        if (this.game.stateOptions.countDown == null) {
	            this.game.stateOptions.countDown = 3; // countDown from 3 secs
	        }
	        if (this.game.stateOptions.countDown <= 2) {
	            this.game.stateOptions.countDownMessage = 2;
	        }
	        if (this.game.stateOptions.countDown <= 1) {
	            this.game.stateOptions.countDownMessage = 1;
	        }
	        if (this.game.stateOptions.countDown <= 0) {
	            //  Move to the next level, popping this state.
	            this.game.playerOptions.win = false;
	            this.game.moveToState(new GameState(this.game, this));
	        }
	        this.draw();
	        this.game.stateOptions.countDown -= .03;
	    };
	    return LevelIntroState;
	})();
	module.exports = LevelIntroState;
	//# sourceMappingURL=level-intro-state.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var pauseState = __webpack_require__(10);
	var GameOverState = __webpack_require__(11);
	var PAUSE_PREVENTER = 1;
	var GameState = (function () {
	    //private gameMusic = new Audio("sounds/gameMusic.mp3");
	    function GameState(game, levelIntroState) {
	        this.game = game;
	        this.levelIntroState = levelIntroState;
	        this.dt = 1000 / this.game.boldOptions.fps;
	        this.ctx = this.game.stateOptions.gameCanvas.getContext("2d");
	    }
	    GameState.prototype.enter = function () {
	        /*this.game.gameStateOptions.firstEntry = false;
	         //play game music
	        this.gameMusic.volume = .025;
	        this.gameMusic.play();*/
	        //instantiate le ship
	        this.game.gameStateOptions.ship = { x: this.game.stateOptions.width / 2, y: this.game.stateOptions.height - 100, width: 20, height: 16 };
	        //create level multipliers
	        var levelMultiplier = this.game.stateOptions.level * this.game.boldOptions.levelDifficultyMultiplier;
	        this.game.boldOptions.shipSpeed *= levelMultiplier;
	        console.log(this.game.boldOptions.shipSpeed);
	        this.game.enemyOptions.invaderInitialVelocity += (levelMultiplier * this.game.enemyOptions.invaderInitialVelocity);
	        this.game.enemyOptions.bombRate += (levelMultiplier * this.game.enemyOptions.bombRate);
	        this.game.enemyOptions.bombMinVelocity += (levelMultiplier * this.game.enemyOptions.bombMinVelocity);
	        this.game.enemyOptions.bombMaxVelocity += (levelMultiplier * this.game.enemyOptions.bombMinVelocity);
	        //invader creation
	        this.game.enemyOptions.invaderRanks = 5;
	        this.game.enemyOptions.invaderFiles = 10;
	        var invaders = [];
	        for (var rank = 0; rank < this.game.enemyOptions.invaderRanks; rank++) {
	            for (var file = 0; file < this.game.enemyOptions.invaderFiles; file++) {
	                var invader = {
	                    x: (this.game.stateOptions.width / 2) + ((this.game.enemyOptions.invaderFiles / 2 - file) * 200 / this.game.enemyOptions.invaderFiles),
	                    y: (this.game.stateOptions.gameBounds.top + rank * 20),
	                    rank: rank,
	                    file: file,
	                    type: 'Invader',
	                    width: 18,
	                    height: 14
	                };
	                invaders.push(invader);
	            }
	        }
	        this.game.gameStateOptions.invaders = invaders;
	        this.game.gameStateOptions.invaderCurrentVelocity = this.game.enemyOptions.invaderInitialVelocity;
	        this.invaderVelocity = { x: this.game.enemyOptions.invaderInitialVelocity, y: 0 };
	        var invaderNextVelocity = null;
	    };
	    GameState.prototype.update = function () {
	        /*var ctx = this.game.stateOptions.gameCanvas.getContext("2d");*/
	        if (this.game.stateOptions.pressedKeys[37]) {
	            this.game.gameStateOptions.ship.x -= this.game.boldOptions.shipSpeed / 100;
	        }
	        if (this.game.stateOptions.pressedKeys[39]) {
	            this.game.gameStateOptions.ship.x += this.game.boldOptions.shipSpeed / 100;
	        }
	        if (this.game.stateOptions.pressedKeys[32]) {
	            this.fireRocket();
	        }
	        //  Keep the ship in bounds.        
	        if (this.game.gameStateOptions.ship.x < this.game.stateOptions.gameBounds.left) {
	            this.game.gameStateOptions.ship.x = this.game.stateOptions.gameBounds.left;
	        }
	        if (this.game.gameStateOptions.ship.x > this.game.stateOptions.gameBounds.right) {
	            this.game.gameStateOptions.ship.x = this.game.stateOptions.gameBounds.right;
	        }
	        this.moveInvaders();
	        this.checkForInvaderKills();
	        this.dropBombsOnEm();
	        this.hitShipCheck();
	        //  Check for victory
	        if (this.game.gameStateOptions.invaders.length === 0) {
	            this.game.playerOptions.timesPlayed++;
	            this.game.playerOptions.score += this.game.stateOptions.level * 50;
	            this.game.stateOptions.level += 1;
	            this.game.stateOptions.countDown = 3;
	            this.game.stateOptions.countDownMessage = 3;
	            this.game.resetGameVariables(false);
	            this.game.playerOptions.win = true;
	            // this.gameMusic.pause();
	            var win = new Audio("sounds/chuckNorris.wav"); // buffers automatically when created
	            win.play();
	            this.game.moveToState(this.levelIntroState);
	        }
	        //  Check for failure
	        if (this.game.stateOptions.lives <= 0) {
	            //this.gameMusic.pause();            
	            var death = new Audio("sounds/game_over_sound.wav");
	            death.volume = .1;
	            death.play();
	            this.game.moveToState(new GameOverState(this.levelIntroState, this.game, this.dt, this.ctx));
	        }
	        this.draw();
	    };
	    GameState.prototype.draw = function () {
	        //  Clear the background.
	        var ctx = this.game.stateOptions.gameCanvas.getContext("2d");
	        ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
	        ctx.strokeStyle = "#FFFFFF";
	        ctx.strokeRect(this.game.stateOptions.gameBounds.left - 13, this.game.stateOptions.gameBounds.top - 20, this.game.stateOptions.gameBounds.right - 120, this.game.stateOptions.gameBounds.bottom - 30);
	        //  Draw ship.
	        ctx.fillStyle = '#ff0000';
	        ctx.fillRect(this.game.gameStateOptions.ship.x - (this.game.gameStateOptions.ship.width / 2), this.game.gameStateOptions.ship.y - (this.game.gameStateOptions.ship.height / 2), this.game.gameStateOptions.ship.width, this.game.gameStateOptions.ship.height);
	        //  Draw invaders.
	        ctx.fillStyle = '#006600';
	        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
	            var invader = this.game.gameStateOptions.invaders[i];
	            ctx.fillRect(invader.x - invader.width / 2, invader.y - invader.height / 2, invader.width, invader.height);
	        }
	        //  Draw bombs.
	        ctx.fillStyle = '#ff5555';
	        for (var i = 0; i < this.game.gameStateOptions.bombs.length; i++) {
	            var bomb = this.game.gameStateOptions.bombs[i];
	            bomb.y += .5;
	            ctx.fillRect(bomb.x, bomb.y, 4, 4);
	        }
	        //  Draw rockets.
	        ctx.fillStyle = '#ff0000';
	        for (var i = 0; i < this.game.gameStateOptions.rockets.length; i++) {
	            var rocket = this.game.gameStateOptions.rockets[i];
	            rocket.y -= 2;
	            ctx.fillRect(rocket.x, rocket.y, 3, 4);
	        }
	        //check if we are in debug mode
	        if (this.game.boldOptions.debugMode) {
	            ctx.strokeStyle = '#ff0000';
	            ctx.strokeRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
	            ctx.strokeRect(this.game.stateOptions.gameBounds.left, this.game.stateOptions.gameBounds.top, this.game.stateOptions.gameBounds.right - this.game.stateOptions.gameBounds.left, this.game.stateOptions.gameBounds.bottom - this.game.stateOptions.gameBounds.top);
	        }
	        //draw score and lives and level
	        var textYpos = this.game.stateOptions.gameBounds.bottom + ((this.game.stateOptions.height - this.game.stateOptions.gameBounds.bottom) / 2 + 20);
	        ctx.font = "14px Arial";
	        ctx.fillStyle = '#ffffff';
	        var info = "Lives: " + this.game.stateOptions.lives;
	        ctx.textAlign = "left";
	        ctx.fillText(info, this.game.stateOptions.gameBounds.left, textYpos);
	        info = "Score: " + this.game.playerOptions.score + ", Level: " + this.game.stateOptions.level;
	        ctx.textAlign = "right";
	        ctx.fillText(info, this.game.stateOptions.gameBounds.right, textYpos);
	        //Draw the pirates
	        var pirates = Array(8);
	        var imageAttributes = { offSetX: 50, offSetY: 50, width: 45, height: 57, };
	        for (var k = 0; k < pirates.length; k++) {
	            pirates[k] = new Image();
	            pirates[k].src = "images/pirate" + (k + 1) + ".png";
	            if (k % 2 === 0) {
	                imageAttributes.offSetX = 600;
	                imageAttributes.offSetY += 100;
	            }
	            else {
	                imageAttributes.offSetX = 50;
	            }
	            ctx.drawImage(pirates[k], imageAttributes.offSetX, imageAttributes.offSetY, imageAttributes.width, imageAttributes.height);
	        }
	    };
	    GameState.prototype.keyDown = function (game, keyCode) {
	        if (this.game.stateOptions.pressedKeys[27]) {
	            //  Push the pause state.            
	            this.pauseGame();
	        }
	        if (this.game.boldOptions.debugMode) {
	            if (this.game.stateOptions.pressedKeys[90]) {
	                //  Push the pause state.            
	                this.game.stateOptions.lives = 0;
	            }
	            if (this.game.stateOptions.pressedKeys[81]) {
	                //  Push the pause state.            
	                this.game.gameStateOptions.invaders = [];
	            }
	        }
	    };
	    GameState.prototype.moveInvaders = function () {
	        //Move the invaders
	        var hitLeft = false, hitRight = false, hitBottom = false;
	        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
	            var invader = this.game.gameStateOptions.invaders[i];
	            var newx = invader.x + this.invaderVelocity.x * .025;
	            var newy = invader.y + this.invaderVelocity.y * .025;
	            if (hitLeft === false && newx < this.game.stateOptions.gameBounds.left) {
	                hitLeft = true;
	            }
	            else if (hitRight === false && newx > this.game.stateOptions.gameBounds.right) {
	                hitRight = true;
	            }
	            else if (hitBottom === false && newy > this.game.stateOptions.gameBounds.bottom) {
	                hitBottom = true;
	            }
	            if (!hitLeft && !hitRight && !hitBottom) {
	                invader.x = newx;
	                invader.y = newy;
	            }
	        }
	        //  Update invader velocities.
	        if (this.game.gameStateOptions.invadersAreDropping) {
	            this.game.gameStateOptions.invaderCurrentDropDistance += this.invaderVelocity.y * .025;
	            if (this.game.gameStateOptions.invaderCurrentDropDistance >= this.game.enemyOptions.invaderDropDistance) {
	                this.game.gameStateOptions.invadersAreDropping = false;
	                this.invaderVelocity = this.invaderNextVelocity;
	                this.game.gameStateOptions.invaderCurrentDropDistance = 0;
	            }
	        }
	        //  If we've hit the left, move down then right.
	        if (hitLeft) {
	            this.game.gameStateOptions.invaderCurrentVelocity += this.game.enemyOptions.invaderAcceleration;
	            this.invaderVelocity = { x: 0, y: this.game.gameStateOptions.invaderCurrentVelocity };
	            this.game.gameStateOptions.invadersAreDropping = true;
	            this.invaderNextVelocity = { x: this.game.gameStateOptions.invaderCurrentVelocity, y: 0 };
	        }
	        //  If we've hit the right, move down then left.
	        if (hitRight) {
	            this.game.gameStateOptions.invaderCurrentVelocity += this.game.enemyOptions.invaderAcceleration;
	            this.invaderVelocity = { x: 0, y: this.game.gameStateOptions.invaderCurrentVelocity };
	            this.game.gameStateOptions.invadersAreDropping = true;
	            this.invaderNextVelocity = { x: -this.game.gameStateOptions.invaderCurrentVelocity, y: 0 };
	        }
	        //  If we've hit the bottom, it's game over.
	        if (hitBottom) {
	            this.game.stateOptions.lives = 0;
	        }
	    };
	    GameState.prototype.checkForInvaderKills = function () {
	        //  Check for rocket/invader collisions.
	        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
	            var invader = this.game.gameStateOptions.invaders[i];
	            var bang = false;
	            for (var j = 0; j < this.game.gameStateOptions.rockets.length; j++) {
	                var rocket = this.game.gameStateOptions.rockets[j];
	                if (rocket.x >= (invader.x - invader.width / 2) && rocket.x <= (invader.x + invader.width / 2) &&
	                    rocket.y >= (invader.y - invader.height / 2) && rocket.y <= (invader.y + invader.height / 2)) {
	                    var invaderKill = new Audio("sounds/invaderKill.wav");
	                    invaderKill.volume = .1;
	                    invaderKill.play();
	                    //  Remove the rocket, set 'bang' so we don't process
	                    //  this rocket again.
	                    this.game.gameStateOptions.rockets.splice(j--, 1);
	                    bang = true;
	                    this.game.playerOptions.score += this.game.enemyOptions.pointsPerInvader;
	                    break;
	                }
	            }
	            if (bang) {
	                this.game.gameStateOptions.invaders.splice(i--, 1);
	            }
	        }
	    };
	    GameState.prototype.dropBombsOnEm = function () {
	        //  Find all of the front rank invaders.
	        var frontRankInvaders = [];
	        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
	            var invader = this.game.gameStateOptions.invaders[i];
	            //  If we have no invader for game file, or the invader
	            //  for game file is futher behind, set the front
	            //  rank invader to game one.
	            if (!frontRankInvaders[invader.file] || frontRankInvaders[invader.file].rank < invader.rank) {
	                frontRankInvaders[invader.file] = invader;
	            }
	        }
	        //  Give each front rank invader a chance to drop a bomb.
	        for (var i = 0; i < this.game.enemyOptions.invaderFiles; i++) {
	            var invader = frontRankInvaders[i];
	            if (!invader)
	                continue;
	            var chance = this.game.enemyOptions.bombRate * .015;
	            if (chance > Math.random()) {
	                //  Fire!
	                this.game.gameStateOptions.bombs.push(this.currentBomb = {
	                    x: invader.x,
	                    y: invader.y + invader.height / 2,
	                    velocity: this.game.enemyOptions.bombMinVelocity + Math.random() * (this.game.enemyOptions.bombMaxVelocity - this.game.enemyOptions.bombMinVelocity)
	                });
	            }
	        }
	    };
	    GameState.prototype.hitShipCheck = function () {
	        //  Check for bomb/ship collisions.
	        for (var i = 0; i < this.game.gameStateOptions.bombs.length; i++) {
	            var bomb = this.game.gameStateOptions.bombs[i];
	            if (this.hitShip(bomb)) {
	                this.game.gameStateOptions.bombs.splice(i--, 1);
	                this.game.stateOptions.lives--;
	                var explosion = new Audio("sounds/explosion.wav"); // buffers automatically when created
	                explosion.volume = .05;
	                explosion.play();
	            }
	        }
	        //  Check for invader/ship collisions.
	        for (var i = 0; i < this.game.gameStateOptions.invaders.length; i++) {
	            var invader = this.game.gameStateOptions.invaders[i];
	            if ((invader.x + invader.width / 2) > (this.game.gameStateOptions.ship.x - this.game.gameStateOptions.ship.width / 2) &&
	                (invader.x - invader.width / 2) < (this.game.gameStateOptions.ship.x + this.game.gameStateOptions.ship.width / 2) &&
	                (invader.y + invader.height / 2) > (this.game.gameStateOptions.ship.y - this.game.gameStateOptions.ship.height / 2) &&
	                (invader.y - invader.height / 2) < (this.game.gameStateOptions.ship.y + this.game.gameStateOptions.ship.height / 2)) {
	                //  Dead by collision!
	                this.game.stateOptions.lives = 0;
	            }
	        }
	    };
	    GameState.prototype.hitShip = function (bomb) {
	        if (bomb.x >= (this.game.gameStateOptions.ship.x - this.game.gameStateOptions.ship.width / 2) &&
	            bomb.x <= (this.game.gameStateOptions.ship.x + this.game.gameStateOptions.ship.width / 2) &&
	            bomb.y >= (this.game.gameStateOptions.ship.y - this.game.gameStateOptions.ship.height / 2) &&
	            bomb.y <= (this.game.gameStateOptions.ship.y + this.game.gameStateOptions.ship.height / 2)) {
	            return true;
	        }
	        return false;
	    };
	    GameState.prototype.fireRocket = function () {
	        //  If we have no last rocket time, or the last rocket time 
	        //  is older than the max rocket rate, we can fire.
	        if (this.game.gameStateOptions.lastRocketTime === null || ((new Date()).valueOf() - this.game.gameStateOptions.lastRocketTime) > (1000 / this.game.playerOptions.rocketMaxFireRate)) {
	            //  Add a rocket.
	            this.game.gameStateOptions.rockets.push(this.currentRocket = {
	                x: this.game.gameStateOptions.ship.x,
	                y: this.game.gameStateOptions.ship.y - 12,
	                velocity: this.game.playerOptions.rocketVelocity
	            });
	            this.game.gameStateOptions.lastRocketTime = (new Date()).valueOf();
	            var fire = new Audio("sounds/lazer_shot.wav"); // buffers automatically when created
	            fire.volume - .05;
	            fire.play();
	        }
	    };
	    GameState.prototype.pauseGame = function () {
	        var ctx = this.game.stateOptions.gameCanvas.getContext("2d");
	        if (this.game.stateOptions.lastPauseTime === null || ((new Date()).valueOf() - this.game.gameStateOptions.lastRocketTime) > (1000 / PAUSE_PREVENTER)) {
	            this.game.stateOptions.lastPauseTime = (new Date()).valueOf();
	            this.game.pushState(new pauseState(this, this.game, 1000 / this.game.boldOptions.fps, ctx));
	        }
	    };
	    return GameState;
	})();
	module.exports = GameState;
	//# sourceMappingURL=game-state.js.map

/***/ },
/* 10 */
/***/ function(module, exports) {

	var PauseState = (function () {
	    function PauseState(gameState, game, dt, ctx) {
	        this.gameState = gameState;
	        this.game = game;
	        this.dt = dt;
	        this.ctx = ctx;
	    }
	    PauseState.prototype.keyDown = function (game, keyCode) {
	        if (keyCode == 27) {
	            //  Pop the pause state.
	            this.game.popState();
	        }
	    };
	    ;
	    PauseState.prototype.draw = function () {
	        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
	        this.ctx.font = "35px Arial";
	        this.ctx.fillStyle = '#ffffff';
	        this.ctx.textBaseline = "middle";
	        this.ctx.textAlign = "center";
	        this.ctx.fillText("Paused", this.game.stateOptions.width / 2, this.game.stateOptions.height / 2);
	    };
	    PauseState.prototype.leave = function () {
	        //move back to the last game state
	        this.game.pushState(this.gameState);
	    };
	    return PauseState;
	})();
	module.exports = PauseState;
	//# sourceMappingURL=pause-state.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	var GameOverState = (function () {
	    function GameOverState(gameState, game, dt, ctx) {
	        this.gameState = gameState;
	        this.game = game;
	        this.dt = dt;
	        this.ctx = ctx;
	    }
	    GameOverState.prototype.draw = function () {
	        //Draw the gameover logos
	        var gameOverLogo = new Image();
	        gameOverLogo.src = "images/1gameOverLogo.png";
	        //  Clear the background.
	        this.ctx.clearRect(0, 0, this.game.stateOptions.width, this.game.stateOptions.height);
	        this.ctx.drawImage(gameOverLogo, this.ctx.canvas.width / 2 - gameOverLogo.width / 2, 0, 325, 325);
	        this.ctx.font = "26px Arial";
	        this.ctx.fillStyle = '#ffffff';
	        this.ctx.textBaseline = "center";
	        this.ctx.textAlign = "center";
	        this.ctx.fillText("You scored: " + this.game.playerOptions.score, this.game.stateOptions.width / 2, this.game.stateOptions.height * .54);
	        this.ctx.fillText("Highest level: " + this.game.stateOptions.level, this.game.stateOptions.width / 2, this.game.stateOptions.height * .6);
	        this.ctx.fillText("Press 'Space' to play again.", this.game.stateOptions.width / 2, this.game.stateOptions.height * .7);
	    };
	    GameOverState.prototype.keyDown = function (game, keyCode) {
	        if (keyCode == 32) {
	            game.playerOptions.timesPlayed++;
	            game.resetGameVariables(true);
	            game.pushState(this.gameState);
	        }
	    };
	    return GameOverState;
	})();
	module.exports = GameOverState;
	//# sourceMappingURL=game-over.js.map

/***/ }
/******/ ]);