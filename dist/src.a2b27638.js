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
      this.sides.upperLeft.backgroundColor = '#222';
    }
  }, {
    key: "hitUpperRight",
    value: function hitUpperRight() {
      this.sides.upperRight.backgroundColor = '#222';
    }
  }, {
    key: "hitLowerLeft",
    value: function hitLowerLeft() {
      this.sides.lowerLeft.backgroundColor = '#222';
    }
  }, {
    key: "hitLowerRight",
    value: function hitLowerRight() {
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
      case 65:
        paddle.hitUpperLeft();
        break;

      case 74:
        paddle.hitLowerLeft();
        break;

      case 83:
        paddle.hitUpperRight();
        break;

      case 75:
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
      case 65:
        paddle.releasePaddle('upperLeft');
        break;

      case 74:
        paddle.releasePaddle('lowerLeft');
        break;

      case 83:
        paddle.releasePaddle('upperRight');
        break;

      case 75:
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
},{}],"src/canon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collisionDetection = require("./collisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canon =
/*#__PURE__*/
function () {
  function Canon(game, name) {
    _classCallCheck(this, Canon);

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.position = {
      x: 0,
      y: 0
    };
    this.name = name;
    this.backgroundColor = '#ccc';
    this.configureCanon(this.name);
  }

  _createClass(Canon, [{
    key: "configureCanon",
    value: function configureCanon(name) {
      switch (name) {
        case 'up1':
          this.backgroundColor = '#FF0000';
          this.position = {
            x: this.gameWidth / 2 - (50 + this.width / 2),
            y: 0
          };
          break;

        case 'up2':
          this.backgroundColor = '#FFD700';
          this.position = {
            x: this.gameWidth / 2 + (50 - this.width / 2),
            y: 0
          };
          break;

        case 'right1':
          this.backgroundColor = '#FFD700';
          this.position = {
            x: this.gameWidth - this.width,
            y: this.gameHeight / 2 - 50
          };
          break;

        case 'right2':
          this.backgroundColor = '#1E90FF';
          this.position = {
            x: this.gameWidth - this.width,
            y: this.gameHeight / 2 + 50
          };
          break;

        case 'down1':
          this.backgroundColor = '#008000';
          this.position = {
            x: this.gameWidth / 2 - (50 + this.width / 2),
            y: this.gameHeight - this.height
          };
          break;

        case 'down2':
          this.backgroundColor = '#1E90FF';
          this.position = {
            x: this.gameWidth / 2 + (50 - this.width / 2),
            y: this.gameHeight - this.height
          };
          break;

        case 'left1':
          this.backgroundColor = '#FF0000';
          this.position = {
            x: 0,
            y: this.gameHeight / 2 - 50
          };
          break;

        case 'left2':
          this.backgroundColor = '#008000';
          this.position = {
            x: 0,
            y: this.gameHeight / 2 + 50
          };
          break;

        default:
          break;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {}
  }]);

  return Canon;
}();

exports.default = Canon;
},{"./collisionDetection":"src/collisionDetection.js"}],"src/canonBall.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collisionDetection = require("./collisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CanonBall =
/*#__PURE__*/
function () {
  function CanonBall(game, canon) {
    _classCallCheck(this, CanonBall);

    this.image = document.getElementById("img_ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.baseSpeed = 1;
    this.game = game;
    this.size = 16;
    this.canon = canon;
    this.name = canon.name;
    this.speed = {
      x: 0,
      y: 0
    };
    this.position = {
      x: this.canon.position.x,
      y: this.canon.position.y
    };
    this.reset();
  }

  _createClass(CanonBall, [{
    key: "reset",
    value: function reset() {
      this.position = {
        x: this.canon.position.x,
        y: this.canon.position.y
      };
      console.log('INTERN CANON', this.position);

      switch (this.canon.name) {
        case 'up1':
          this.speed = {
            x: 0,
            y: 1 * this.baseSpeed
          };
          break;

        case 'up2':
          this.speed = {
            x: 0,
            y: 1 * this.baseSpeed
          };
          break;

        case 'right1':
          this.speed = {
            x: -1 * this.baseSpeed,
            y: 0
          };
          break;

        case 'right2':
          this.speed = {
            x: -1 * this.baseSpeed,
            y: 0
          };
          break;

        case 'down1':
          this.speed = {
            x: 0,
            y: -1 * this.baseSpeed
          };
          break;

        case 'down2':
          this.speed = {
            x: 0,
            y: -1 * this.baseSpeed
          };
          break;

        case 'left1':
          this.speed = {
            x: 1 * this.baseSpeed,
            y: 0
          };
          break;

        case 'left2':
          this.speed = {
            x: 1 * this.baseSpeed,
            y: 0
          };
          break;

        default:
          break;
      }
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
      this.position.y += this.speed.y;

      if (this.name === 'up1' || this.name === 'up2') {
        if ((0, _collisionDetection.detectCollision)(this, this.game.paddle.sides.upperLeft)) {
          this.position.y = 0;
        }

        if ((0, _collisionDetection.detectCollision)(this, this.game.paddle.sides.upperRight)) {
          this.position.y = 0;
        }
      }

      if (this.name === 'down1' || this.name === 'down2') {
        if ((0, _collisionDetection.detectCollision)(this, this.game.paddle.sides.lowerLeft)) {
          this.position.y = this.gameHeight;
        }

        if ((0, _collisionDetection.detectCollision)(this, this.game.paddle.sides.lowerRight)) {
          this.position.y = this.gameHeight;
        }
      }

      if (this.name === 'left1' || this.name === 'left2') {
        if ((0, _collisionDetection.detectCollision)(this, this.game.paddle.sides.upperLeft)) {
          this.position.x = 0;
        }

        if ((0, _collisionDetection.detectCollision)(this, this.game.paddle.sides.lowerLeft)) {
          this.position.x = 0;
        }
      }

      if (this.name === 'right1' || this.name === 'right2') {
        if ((0, _collisionDetection.detectCollision)(this, this.game.paddle.sides.upperRight)) {
          this.position.x = this.gameWidth;
        }

        if ((0, _collisionDetection.detectCollision)(this, this.game.paddle.sides.lowerRight)) {
          this.position.x = this.gameWidth;
        }
      }
      /*
      // wall on top
      if (this.position.y < 0) {
        this.speed.y = -this.speed.y;
      }
        // bottom of game
      if (this.position.y + this.size > this.gameHeight) {
        this.game.lives--;
        this.reset();
      }
      */

    }
  }]);

  return CanonBall;
}();

exports.default = CanonBall;
},{"./collisionDetection":"src/collisionDetection.js"}],"src/levels.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Levels =
/*#__PURE__*/
function () {
  function Levels() {
    _classCallCheck(this, Levels);
  }

  _createClass(Levels, [{
    key: "level1",
    value: function level1() {
      return [{
        canon: 1,
        speed: 1
      }, {
        canon: 2,
        speed: 2
      }, {
        canon: 3,
        speed: 2
      }, {
        canon: 6,
        speed: 1
      }, {
        canon: 6,
        speed: 3
      }, {
        canon: 7,
        speed: 1
      }, {
        canon: 1,
        speed: 5
      }, {
        canon: 1,
        speed: 5
      }, {
        canon: 2,
        speed: 6
      }, {
        canon: 1,
        speed: 1
      }, {
        canon: 5,
        speed: 6
      }, {
        canon: 1,
        speed: 1
      }, {
        canon: 3,
        speed: 4
      }, {
        canon: 1,
        speed: 1
      }, {
        canon: 6,
        speed: 3
      }, {
        canon: 1,
        speed: 6
      }, {
        canon: 8,
        speed: 1
      }, {
        canon: 1,
        speed: 1
      }, {
        canon: 8,
        speed: 7
      }, {
        canon: 1,
        speed: 1
      }, {
        canon: 8,
        speed: 8
      }, {
        canon: 1,
        speed: 3
      }, {
        canon: 7,
        speed: 8
      }, {
        canon: 5,
        speed: 8
      }, {
        canon: 3,
        speed: 8
      }, {
        canon: 1,
        speed: 3
      }, {
        canon: 4,
        speed: 2
      }, {
        canon: 2,
        speed: 4
      }, {
        canon: 1,
        speed: 1
      }, {
        canon: 6,
        speed: 2
      }, {
        canon: 7,
        speed: 4
      }];
    }
  }]);

  return Levels;
}();

exports.default = Levels;
},{}],"src/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _world = _interopRequireDefault(require("/src/world"));

var _input = _interopRequireDefault(require("/src/input"));

var _canon = _interopRequireDefault(require("./canon"));

var _canonBall = _interopRequireDefault(require("./canonBall"));

var _levels = _interopRequireDefault(require("./levels"));

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
    this.paddle = new _world.default(this);
    this.canonUp1 = new _canon.default(this, 'up1');
    this.canonUp2 = new _canon.default(this, 'up2');
    this.canonRight1 = new _canon.default(this, 'right1');
    this.canonRight2 = new _canon.default(this, 'right2');
    this.canonDown1 = new _canon.default(this, 'down1');
    this.canonDown2 = new _canon.default(this, 'down2');
    this.canonLeft1 = new _canon.default(this, 'left1');
    this.canonLeft2 = new _canon.default(this, 'left2');
    this.canonBall1 = new _canonBall.default(this, this.canonUp1);
    this.canonBall2 = new _canonBall.default(this, this.canonUp2);
    this.canonBall3 = new _canonBall.default(this, this.canonRight1);
    this.canonBall4 = new _canonBall.default(this, this.canonRight2);
    this.canonBall5 = new _canonBall.default(this, this.canonDown1);
    this.canonBall6 = new _canonBall.default(this, this.canonDown2);
    this.canonBall7 = new _canonBall.default(this, this.canonLeft1);
    this.canonBall8 = new _canonBall.default(this, this.canonLeft2);
    this.gameObjects = [];
    this.balls = [];
    this.lives = 20;
    this.levels = new _levels.default();
    this.level1 = this.levels.level1();
    this.currentLevel = 0;
    new _input.default(this.paddle, this);
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;
      this.gameObjects = [this.paddle, this.canonUp1, this.canonUp2, this.canonRight1, this.canonRight2, this.canonDown1, this.canonDown2, this.canonLeft1, this.canonLeft2]; // Balls Logic

      var total = this.level1.length;
      var that = this;
      var ballsCounter = 0;
      var intervalId = setInterval(function () {
        if (ballsCounter === total) {
          clearInterval(intervalId);
        }

        that.balls = [];
        var ballSelected = that.level1[ballsCounter];

        if (ballSelected.canon === 1) {
          that.canonBall1.speed = ballSelected.speed;
          that.balls.push(that.canonBall1);
        } else if (ballSelected.canon === 2) {
          that.canonBall2.speed = ballSelected.speed;
          that.balls.push(that.canonBall2);
        } else if (ballSelected.canon === 3) {
          that.canonBall3.speed = ballSelected.speed;
          that.balls.push(that.canonBall3);
        } else if (ballSelected.canon === 4) {
          that.canonBall4.speed = ballSelected.speed;
          that.balls.push(that.canonBall4);
        } else if (ballSelected.canon === 5) {
          that.canonBall5.speed = ballSelected.speed;
          that.balls.push(that.canonBall5);
        } else if (ballSelected.canon === 6) {
          that.canonBall6.speed = ballSelected.speed;
          that.balls.push(that.canonBall6);
        } else if (ballSelected.canon === 7) {
          that.canonBall7.speed = ballSelected.speed;
          that.balls.push(that.canonBall7);
        } else {
          that.canonBall8.speed = ballSelected.speed;
          that.balls.push(that.canonBall8);
        }

        console.log('intern', that.balls);
        ballsCounter++;
      }, 1000);
      console.log(this.balls);
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
      });

      _toConsumableArray(this.balls).forEach(function (object) {
        return object.update(deltaTime);
      }); //this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      _toConsumableArray(this.gameObjects).forEach(function (object) {
        return object.draw(ctx);
      });

      _toConsumableArray(this.balls).forEach(function (object) {
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
  }, {
    key: "ballsLogic",
    value: function ballsLogic() {
      var base = [{
        canon: 1,
        speed: 1
      }];
      var randomBall = Math.floor(Math.random() * 8) + 1;
      console.log('RANDOM', randomBall);
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"/src/world":"src/world.js","/src/input":"src/input.js","./canon":"src/canon.js","./canonBall":"src/canonBall.js","./levels":"src/levels.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _game = _interopRequireDefault(require("/src/game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 800;
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50058" + '/');

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