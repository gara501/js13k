// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/world.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var World =
/*#__PURE__*/
function () {
  function World(game) {
    _classCallCheck(this, World);

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 100;
    this.height = 100;
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height
    };
    this.core = {
      radius: 50,
      position: {
        x: game.gameWidth / 2,
        y: game.gameHeight / 2
      }
    };
    this.sides = {
      upperLeft: {
        width: 100,
        height: 100,
        position: {
          x: game.gameWidth / 2 - this.width,
          y: game.gameHeight / 2 - this.height
        },
        backgroundColor: '#FF0000'
      },
      upperRight: {
        width: 100,
        height: 100,
        position: {
          x: game.gameWidth / 2,
          y: game.gameHeight / 2 - this.height
        },
        backgroundColor: '#FFD700'
      },
      lowerLeft: {
        width: 100,
        height: 100,
        position: {
          x: game.gameWidth / 2 - this.width,
          y: game.gameHeight / 2
        },
        backgroundColor: '#008000'
      },
      lowerRight: {
        width: 100,
        height: 100,
        position: {
          x: game.gameWidth / 2,
          y: game.gameHeight / 2
        },
        backgroundColor: '#1E90FF'
      }
    };
  }

  _createClass(World, [{
    key: "hitUpperLeft",
    value: function hitUpperLeft() {
      console.log('left');
      this.sides.upperLeft.backgroundColor = '#222';
    }
  }, {
    key: "hitUpperRight",
    value: function hitUpperRight() {
      console.log('up');
      this.sides.upperRight.backgroundColor = '#222';
    }
  }, {
    key: "hitLowerLeft",
    value: function hitLowerLeft() {
      console.log('down');
      this.sides.lowerLeft.backgroundColor = '#222';
    }
  }, {
    key: "hitLowerRight",
    value: function hitLowerRight() {
      console.log('right');
      this.sides.lowerRight.backgroundColor = '#222';
    }
  }, {
    key: "releasePaddle",
    value: function releasePaddle(key) {
      if (key === 'upperLeft') {
        this.sides.upperLeft.backgroundColor = '#FF0000';
      }

      if (key === 'upperRight') {
        this.sides.upperRight.backgroundColor = '#FFD700';
      }

      if (key === 'lowerLeft') {
        this.sides.lowerLeft.backgroundColor = '#008000';
      }

      if (key === 'lowerRight') {
        this.sides.lowerRight.backgroundColor = '#1E90FF';
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      for (var item in this.sides) {
        ctx.fillStyle = this.sides[item].backgroundColor;
        ctx.fillRect(this.sides[item].position.x, this.sides[item].position.y, this.sides[item].width, this.sides[item].height);
      }

      ctx.beginPath();
      ctx.arc(this.core.position.x, this.core.position.y, this.core.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update(deltaTime) {}
  }]);

  return World;
}();

exports.default = World;
},{}],"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputHandler = function InputHandler(paddle, game) {
  _classCallCheck(this, InputHandler);

  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 81:
        paddle.hitUpperLeft();
        break;

      case 65:
        paddle.hitLowerLeft();
        break;

      case 87:
        paddle.hitUpperRight();
        break;

      case 83:
        paddle.hitLowerRight();
        break;

      case 13:
        game.start();
        break;

      case 90:
        game.pause();
        break;
    }
  });
  document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
      case 81:
        paddle.releasePaddle('upperLeft');
        break;

      case 65:
        paddle.releasePaddle('lowerLeft');
        break;

      case 87:
        paddle.releasePaddle('upperRight');
        break;

      case 83:
        paddle.releasePaddle('lowerRight');
        break;
    }
  });
};

exports.default = InputHandler;
},{}],"src/collisionDetection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectCollision = detectCollision;

function detectCollision(ball, gameObject) {
  console.log(ball);
  var bottomOfBall = ball.position.y + ball.size;
  var topOfBall = ball.position.y;
  var topOfObject = gameObject.position.y;
  var leftSideOfObject = gameObject.position.x;
  var rightSideOfObject = gameObject.position.x + gameObject.width;
  var bottomOfObject = gameObject.position.y + gameObject.height;

  if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && ball.position.x >= leftSideOfObject && ball.position.x + ball.size <= rightSideOfObject) {
    return true;
  } else {
    return false;
  }
}
},{}],"src/ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collisionDetection = require("./collisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball =
/*#__PURE__*/
function () {
  function Ball(game) {
    _classCallCheck(this, Ball);

    this.image = document.getElementById("img_ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.size = 16;
    this.reset();
  }

  _createClass(Ball, [{
    key: "reset",
    value: function reset() {
      this.position = {
        x: 10,
        y: 400
      };
      this.speed = {
        x: 4,
        y: -2
      };
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speed.x;
      this.position.y += this.speed.y; // wall on left or right

      if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
        this.speed.x = -this.speed.x;
      } // wall on top


      if (this.position.y < 0) {
        this.speed.y = -this.speed.y;
      } // bottom of game


      if (this.position.y + this.size > this.gameHeight) {
        this.game.lives--;
        this.reset();
      }

      if ((0, _collisionDetection.detectCollision)(this, this.game.paddle)) {
        this.speed.y = -this.speed.y;
        this.position.y = this.game.paddle.position.y - this.size;
      }
    }
  }]);

  return Ball;
}();

exports.default = Ball;
},{"./collisionDetection":"src/collisionDetection.js"}],"src/ballUpperLeft.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collisionDetection = require("./collisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BallUpperLeft =
/*#__PURE__*/
function () {
  function BallUpperLeft(game, position) {
    _classCallCheck(this, BallUpperLeft);

    this.image = document.getElementById("img_ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = position;
    this.game = game;
    this.size = 16;
    this.reset(position);
  }

  _createClass(BallUpperLeft, [{
    key: "reset",
    value: function reset(position) {
      this.position = position;
      this.speed = {
        x: 10,
        y: -5
      };
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speed.x;
      this.position.y += this.speed.y; // wall on left or right

      if (this.position.x + this.size > this.gameWidth / 2 || this.position.x < 0) {
        this.speed.x = -this.speed.x;
      } // wall on top


      if (this.position.y < 0) {
        this.speed.y = -this.speed.y;
      } // bottom of game


      if (this.position.y + this.size > this.gameHeight / 2) {
        this.game.lives--;
        this.reset();
      }

      if ((0, _collisionDetection.detectCollision)(this, this.game.paddle.sides.upperLeft)) {
        this.speed.y = -this.speed.y;
        this.position.y = this.game.paddle.sides.upperLeft.position.y - this.size;
      }
    }
  }]);

  return BallUpperLeft;
}();

exports.default = BallUpperLeft;
},{"./collisionDetection":"src/collisionDetection.js"}],"src/ballUpperRight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collisionDetection = require("./collisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BallUpperRight =
/*#__PURE__*/
function () {
  function BallUpperRight(game) {
    _classCallCheck(this, BallUpperRight);

    this.image = document.getElementById("img_ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.size = 16;
    this.reset();
  }

  _createClass(BallUpperRight, [{
    key: "reset",
    value: function reset() {
      this.position = {
        x: this.gameWidth - 30,
        y: 2
      };
      this.speed = {
        x: 10,
        y: +5
      };
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x -= this.speed.x;
      this.position.y += this.speed.y; // wall on left or right

      if (this.position.x + this.size < this.gameWidth / 2 || this.position.x > this.gameWidth) {
        this.speed.x = -this.speed.x;
      } // wall on top


      if (this.position.y < 0) {
        this.speed.y = -this.speed.y;
      } // bottom of game


      if (this.position.y + this.size > this.gameHeight / 2) {
        this.game.lives--;
        this.reset();
      }

      if ((0, _collisionDetection.detectCollision)(this, this.game.paddle.sides.upperRight)) {
        this.speed.y = -this.speed.y;
        this.position.y = this.game.paddle.sides.upperRight.position.y - this.size;
      }
    }
  }]);

  return BallUpperRight;
}();

exports.default = BallUpperRight;
},{"./collisionDetection":"src/collisionDetection.js"}],"src/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _world = _interopRequireDefault(require("/src/world"));

var _input = _interopRequireDefault(require("/src/input"));

var _ball = _interopRequireDefault(require("/src/ball"));

var _ballUpperLeft = _interopRequireDefault(require("./ballUpperLeft"));

var _ballUpperRight = _interopRequireDefault(require("./ballUpperRight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import { buildLevel, level1, level2 } from "/src/levels";
var GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

var Game =
/*#__PURE__*/
function () {
  function Game(gameWidth, gameHeight) {
    _classCallCheck(this, Game);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new _ball.default(this);
    this.ballUpperLeft = new _ballUpperLeft.default(this, {
      x: 1,
      y: 2
    });
    this.ballUpperRight = new _ballUpperRight.default(this);
    this.paddle = new _world.default(this);
    this.gameObjects = [];
    this.lives = 20;
    this.currentLevel = 0;
    new _input.default(this.paddle, this);
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return; //this.bricks = buildLevel(this, this.levels[this.currentLevel]);

      this.ball.reset();
      this.gameObjects = [this.ball, this.paddle];
      this.gamestate = GAMESTATE.RUNNING;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
      if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;
      /*
          if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
          }
      */

      _toConsumableArray(this.gameObjects).forEach(function (object) {
        return object.update(deltaTime);
      }); //this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      _toConsumableArray(this.gameObjects).forEach(function (object) {
        return object.draw(ctx);
      });

      if (this.gamestate === GAMESTATE.PAUSED) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
      }

      if (this.gamestate === GAMESTATE.MENU) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Press ENTER To Start", this.gameWidth / 2, this.gameHeight / 2);
      }

      if (this.gamestate === GAMESTATE.GAMEOVER) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
      }
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.gamestate == GAMESTATE.PAUSED) {
        this.gamestate = GAMESTATE.RUNNING;
      } else {
        this.gamestate = GAMESTATE.PAUSED;
      }
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"/src/world":"src/world.js","/src/input":"src/input.js","/src/ball":"src/ball.js","./ballUpperLeft":"src/ballUpperLeft.js","./ballUpperRight":"src/ballUpperRight.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _game = _interopRequireDefault(require("/src/game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var game = new _game.default(GAME_WIDTH, GAME_HEIGHT);
console.log(game);
var lastTime = 0;

function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
},{"/src/game":"src/game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63312" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map