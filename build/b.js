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
/***/ (function(module, exports, __webpack_require__) {

	eval("var loop = __webpack_require__(1);\nvar rand = __webpack_require__(3);\nvar key = __webpack_require__(4);\nvar collider = __webpack_require__(5);\nvar elements = __webpack_require__(6);\nvar config = __webpack_require__(7);\nvar render = __webpack_require__(8);\nvar alerts = __webpack_require__(9);\nvar utils = __webpack_require__(10);\nlet heroImage = loadResource('hero');\n\nvar canvas = document.createElement('canvas');\ncanvas.width = 800;\ncanvas.height = 600;\ncanvas.style.backgroundColor = '#000';\ndocument.body.appendChild(canvas);\n\nlet shoot = false;\nlet isShooting = false;\nlet wallCounter = 0;\nlet wallEnemyCounter = 0;\nlet gameOver = false;\nvar ctx = canvas.getContext('2d');\nlet tempCounter = 0;\nlet shootY = 0;\n\n// Elements\nvar hero = elements.hero(canvas);\nvar enemy = elements.enemy(canvas, 'wasp');\nlet bullet =  elements.bullet(hero, 'wave');\nlet bulletEnemy = elements.bullet(enemy);\n\nlet wall = [];\nlet wallEnemy = [];\nfor (let i=0; i <= parseInt(canvas.height/20); i++) {\n  posy = (i === 0 ? 0: i * 20);\n  let block = elements.wall(0, posy, 'yellow');\n  let blockEnemy = elements.wall(canvas.width-50, posy, 'red');\n  wall.push(block);\n  wallEnemy.push(blockEnemy);\n  wallCounter +=1;\n  wallEnemyCounter +=1;\n}\n\n// game loop\nloop.start(function (dt) {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  if (gameOver) {\n    alerts.gameover(ctx, canvas);\n  } else {\n    collider.boundsCollision(hero, canvas);\n    collider.boundsCollision(enemy, canvas);\n\n    // update player movements\n    /*\n    if (key.isDown(key.LEFT)) {\n      if (hero.x > 0) {\n        hero.x = hero.x - (hero.speed * dt);\n      }\n    }\n    if (key.isDown(key.RIGHT)) {\n      if (hero.x+hero.width <= canvas.width) {\n        hero.x = hero.x + (hero.speed * dt);\n      }\n    }\n    */\n    if (key.isDown(key.UP)) {\n      if (hero.y != 0) {\n        hero.y = hero.y - (hero.speed * dt);\n      }\n    }\n    if (key.isDown(key.DOWN)) {\n      if ((hero.y+hero.height) != canvas.height) {\n        hero.y = hero.y + (hero.speed * dt);\n      }\n    }\n    if (key.isDown(key.SPACE)) {\n      shoot = true;\n      if (shootY === 0) {\n        shootY = hero.y + (hero.height/2);\n      }\n      if (!isShooting) {\n        shootY = hero.y + (hero.height/2);\n        centerToElement(bullet, hero);\n        \n        if ((bullet.x > canvas.width)) {\n          centerToElement(bullet, hero);\n        }\n      }\n    \n    }\n    \n    // Player bullet\n    if (shoot) {\n      if (bullet.name === 'linear') {\n        bullet.x += bullet.speed * dt;\n        bullet.y = hero.y + (hero.height/2) - (bullet.height/2);\n      }\n      if (bullet.name === 'wave') {\n        bullet.x += bullet.speed * dt;\n        bullet.y = Math.sin(bullet.x) * 20 + shootY;\n\n        if (bullet.x > (canvas.width)) {\n          bullet.x = canvas.width+10;\n        }\n      }\n    }\n\n    if (bullet.x > 0 && bullet.x <= canvas.width) {\n      isShooting = true;\n    } else {\n      isShooting = false;\n    }\n    \n    if (!hero.collision) {\n      if (collider.collision(hero, enemy)) {\n        enemy.collision = true;\n        hero.collision = true;\n        hero.collisioned();\n        config.game.lostLife();\n      }\n    }\n    \n    if (collider.collision(bullet, enemy)) {\n      enemy.collision = true;\n    }\n    \n    if (enemy.collision) {\n      utils.destroy(enemy);\n    } else {\n      enemy.x -= (enemy.speed / 60);\n    }\n\n    // Wall\n    for(let block of wall) {\n      render.renderRect(ctx, block);\n      //if (collider.collision(bullet, bullet)) {\n      //  block.collision = true;\n     //   utils.destroy(block);\n      //}\n    }\n\n    for(let block of wallEnemy) {\n      render.renderRect(ctx, block);\n      if (collider.collision(bullet, block)) {      \n        block.collision = true;\n        utils.destroy(block);\n        wallEnemyCounter -=1;\n        console.log('WALL COUNTER', wallEnemyCounter);\n      }\n    }\n    \n    // Renders\n    //render.renderRect(ctx, hero);\n    render.renderHero(ctx, hero, heroImage);\n    // render.renderRect(ctx, enemy);\n\n    if (shoot && isShooting) { \n      render.renderRect(ctx, bullet);\n    }\n\n    if (config.game.lifes === 0) {\n      gameOver = true;\n    }\n  }\n  \n});\n\nfunction centerToElement(el1, el2) {\n  el1.x = el2.x + el2.width - el1.width;\n  el1.y = el2.y + (el2.height/2) - (el1.height/2);\n  return el1;\n}\n\nfunction loadResource(item) {\n  var path = 'assets/';\n  image = new Image();\n  image.src = path + item + \".png\"; \n  return image;\n}\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/main.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	eval("var lastTime = timestamp();\nvar stats;\n\nif (true) {\n  stats = __webpack_require__(2)(0);\n  document.body.appendChild(stats.dom);\n}\n\nfunction timestamp () {\n  return window.performance && window.performance.now ?\n    window.performance.now() :\n    Date.now();\n}\n\nfunction raf (fn) {\n  return window.requestAnimationFrame(function () {\n    stats && stats.begin();\n\n    var now = timestamp();\n    var dt = now - lastTime;\n\n    if (dt > 999) {\n      dt = 1 / 60;\n    } else {\n      dt /= 1000;\n    }\n\n    lastTime = now;\n\n    fn(dt);\n\n    stats && stats.end();\n  });\n}\n\nexports.start = function (fn) {\n  return raf(function tick (dt) {\n    fn(dt);\n    raf(tick);\n  });\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/loop.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./src/loop.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	eval("// stats.js - http://github.com/mrdoob/stats.js\nvar Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?\"block\":\"none\";l=a}var l=0,c=document.createElement(\"div\");c.style.cssText=\"position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000\";c.addEventListener(\"click\",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel(\"FPS\",\"#0ff\",\"#002\")),f=h(new Stats.Panel(\"MS\",\"#0f0\",\"#020\"));\nif(self.performance&&self.performance.memory)var t=h(new Stats.Panel(\"MB\",\"#f08\",\"#201\"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};\nStats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement(\"canvas\");q.width=r;q.height=f;q.style.cssText=\"width:80px;height:48px\";var b=q.getContext(\"2d\");b.font=\"bold \"+9*a+\"px Helvetica,Arial,sans-serif\";b.textBaseline=\"top\";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,\nv){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+\" \"+h+\" (\"+e(c)+\"-\"+e(g)+\")\",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};\"object\"===typeof module&&(module.exports=Stats);\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/stats.js/build/stats.min.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./~/stats.js/build/stats.min.js?");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	eval("var seed = 0;\n\nfunction random () {\n  var x = Math.sin(.8765111159592828 + seed++) * 10000;\n\n  return x - Math.floor(x);\n}\n\n/**\n * Return an integer within [0, max).\n *\n * @param  {int} [max]\n * @return {int}\n */\nexports.int = function (max) {\n  return random() * (max || 0xfffffff) | 0;\n};\n\n/**\n * Return a float within [0.0, 1.0).\n *\n * @return {float}\n */\nexports.float = function () {\n  return random();\n};\n\n/**\n * Return a boolean.\n *\n * @return {Boolean}\n */\nexports.bool = function () {\n  return random() > 0.5;\n};\n\n/**\n * Return an integer within [min, max).\n *\n * @param  {int} min\n * @param  {int} max\n * @return {int}\n */\nexports.range = function (min, max) {\n  return this.int(max - min) + min;\n};\n\n/**\n * Pick an element from the source.\n *\n * @param  {mixed[]} source\n * @return {mixed}\n */\nexports.pick = function (source) {\n  return source[this.range(0, source.length)];\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/rand.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./src/rand.js?");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	eval("var _pressed = {};\nvar key = {};\n\nkey.LEFT = 37;\nkey.UP = 38;\nkey.RIGHT = 39;\nkey.DOWN = 40;\nkey.SPACE = 32;\n\nkey.isDown = function (keyCode) {\n  return _pressed[keyCode];\n};\n\nkey.onKeydown = function (event) {\n  _pressed[event.keyCode] = true;\n};\n\nkey.onKeyup = function  (event) {\n  _pressed[event.keyCode] = null;\n};\n\nwindow.addEventListener('keyup', function (e) {\n  key.onKeyup(e);\n}, false);\nwindow.addEventListener('keydown', function (e) {\n  key.onKeydown(e);\n}, false);\n\nmodule.exports = key;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/key.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./src/key.js?");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	eval("let collider = {};\ncollider.collision = (el1, el2) => {\n  \n  let el1x1 = el1.x;\n  let el1x2 = el1.x + el1.width;\n  let el1y1 = el1.y;\n  let el1y2 = el1.y + el1.height;\n  \n\n  let el2x1 = el2.x;\n  let el2x2 = el2.x + el2.width;\n  let el2y1 = el2.y;\n  let el2y2 = el2.y + el2.height;\n    \n  let collisioned = false;\n\n  if (el1x1 >= el2x1 && el1x1 <= el2x2) {\n    if (el1y1 >= el2y1 && el1y1 <= el2y2) {\n      collisioned = true;\n    } else if (el1y2 >= el2y1 && el1y2 <= el2y2) {\n      collisioned = true;\n    }\n  }\n\n  if (el1x2 >= el2x1 && el1x2 <= el2x2) {\n    if (el1y1 >= el2y1 && el1y1 <= el2y2) {\n      collisioned = true;\n    } else if (el1y2 >= el2y1 && el1y2 <= el2y2) {\n      collisioned = true;\n    }\n  }\n\n  return collisioned;\n}\n\ncollider.boundsCollision = (el, canvas) => {\n  if (el.x <= 0) {\n    el.x = 0;\n  } else if ((el.x + el.width) >= canvas.width) {\n    el.x = canvas.width - el.width;\n  }\n  if (el.y <= 0) {\n    el.y = 0;\n  } else if ((el.y+el.height) >= canvas.height) {\n    el.y = canvas.height - el.height;\n  }\n}\n\n\nmodule.exports = collider;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/collider.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./src/collider.js?");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	eval("var rand = __webpack_require__(3);\n\nmodule.exports.hero = (canvas) => {\n  let el = {\n    x: 70,\n    y: canvas.height - 100,\n    width: 64,\n    height: 64,\n    speed: 500,\n    color: 'rgba(236, 94, 103, 1)',\n    collision: false,\n    destroyed: false,\n    collisioned: () => {\n      setTimeout(() => { \n        el.collision = false;\n      }, 2000);\n    }\n  }\n  return el;\n};\n\nmodule.exports.enemy = (canvas, type) => {\n  let el = {};\n  switch (type) {\n    case 'ant':\n      el = {\n        x: canvas.width - 50,\n        y: rand.int(canvas.height),\n        width: 20,\n        height: 20,\n        speed: 200,\n        color: 'green',\n        collision: false,\n        destroyed: false\n      }\n      break;\n    case 'bee':\n      el = {\n        x: canvas.width - 50,\n        y: rand.int(canvas.height),\n        width: 20,\n        height: 30,\n        speed: 400,\n        color: 'yellow',\n        collision: false,\n        destroyed: false\n      }\n      break;\n    case 'wasp':\n      el = {\n        x: canvas.width - 50,\n        y: rand.int(canvas.height),\n        width: 10,\n        height: 10,\n        speed: 700,\n        color: 'red',\n        collision: false,\n        destroyed: false\n      }\n      break;\n    default:\n      el = {\n        x: canvas.width - 50,\n        y: rand.int(canvas.height),\n        width: 20,\n        height: 20,\n        speed: 200,\n        color: 'rgba(111, 94, 103, 1)',\n        collision: false,\n        destroyed: false\n      }\n      break;\n  }\n  return el;\n};\n\nmodule.exports.bullet = (shooter, type) => {\n  let el = {};\n  switch (type) {\n    case 'linear':\n      el = {\n        x: shooter.x + shooter.width - 10,\n        y: shooter.y + (shooter.height/2) - (10/2),\n        width: 10,\n        height: 10,\n        speed: 1000,\n        color: 'rgba(111, 94, 103, 1)',\n        collision: false,\n        name: 'linear',\n        destroyed: false\n      }\n      break;\n    case 'wave':\n      el = {\n        x: shooter.x + shooter.width - 10,\n        y: shooter.y + (shooter.height/2) - (10/2),\n        width: 10,\n        height: 10,\n        speed: 1000,\n        name: 'wave',\n        color: 'rgba(111, 94, 103, 1)',\n        collision: false,\n        destroyed: false\n      }\n      break;\n    case 'mass':\n      el = {\n        x: shooter.x + shooter.width - 10,\n        y: shooter.y + (shooter.height/2) - (10/2),\n        width: 10,\n        height: 10,\n        speed: 3000,\n        name: 'mass',\n        color: 'rgba(111, 94, 103, 1)',\n        collision: false,\n        destroyed: false\n      }\n      break;\n    default:\n      el = {\n        x: shooter.x + shooter.width - 10,\n        y: shooter.y + (shooter.height/2) - (10/2),\n        width: 10,\n        height: 10,\n        speed: 3000,\n        name: 'linear',\n        color: 'rgba(111, 94, 103, 1)',\n        collision: false,\n        destroyed: false\n      }\n      break;\n    }\n  return el;\n};\n\nmodule.exports.wall = (x, y, color) => {\n  let el = {\n    x: x,\n    y: y,\n    width: 50,\n    height: 50,\n    speed: 0,\n    color: color,\n    collision: false,\n    destroyed: false\n  }\n  return el;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/elements.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/elements.js?");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	eval("let config = {};\nconfig.game = {\n  lifes: 3,\n  level: 1,\n  gameOver: false,\n  lostLife() {\n    if (this.lifes === 0) {\n      this.lifes = 0;\n      this.gameOver = true;\n    } else {\n      this.lifes-=1;\n    }\n  }\n}\n\nmodule.exports = config;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	eval("let ren = {};\n\nren.renderRect = (ctx, element) => {\n  if (!element.destroyed) {\n    ctx.fillStyle = element.color;\n    ctx.fillRect(element.x, element.y, element.width, element.height);\n  }\n};\n\nren.renderHero = (ctx, hero, image) => {\n  if (!hero.destroyed) {\n    ctx.drawImage(image,  \n\t    0, 0, 64, 64, //src coords \n\t    hero.x, hero.y, hero.width, hero.height //dst coords \n\t  );\n  }\n}\n\nren.renderBullet = (ctx, bullet, image) => {\n  ctx.drawImage(image,  \n    0, 0, 64, 64, //src coords \n    hero.x, hero.y, hero.width, hero.height //dst coords \n  );\n}\n\nmodule.exports = ren;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/render.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./src/render.js?");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	eval("let alerts = {};\n\nalerts.gameover = (ctx, canvas) => {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  ctx.font = \"32px Arial\";\n  ctx.fillStyle = \"white\";\n  ctx.fillText(\"GAME OVER\", canvas.width/2 - 10, canvas.height/2);\n}\n\nmodule.exports = alerts;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/alerts.js\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///./src/alerts.js?");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	eval("let utils = {};\n\nutils.destroy = (el) => {\n  el.x = -100;\n  el.y = -100;\n  el.destroyed = true;\n}\n\nmodule.exports = utils;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils.js\n// module id = 10\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })
/******/ ]);