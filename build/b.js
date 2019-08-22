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

	eval("var loop = __webpack_require__(1);\r\nvar rand = __webpack_require__(3);\r\nvar key = __webpack_require__(4);\r\nvar collider = __webpack_require__(5);\r\nvar elements = __webpack_require__(6);\r\nvar config = __webpack_require__(7);\r\nvar render = __webpack_require__(8);\r\nvar alerts = __webpack_require__(9);\r\nvar utils = __webpack_require__(10);\r\nlet heroImage = loadResource('hero');\r\nlet bulletImage = loadResource('bullet');\r\nlet wallImage = loadResource('wall');\r\nlet wallEnemyImage = loadResource('wallenemy');\r\nvar beamSound = new Audio(\"assets/beam.mp3\");\r\n\r\nvar canvas = document.createElement('canvas');\r\ncanvas.width = 800;\r\ncanvas.height = 600;\r\ncanvas.style.backgroundColor = '#000';\r\ndocument.body.appendChild(canvas);\r\n\r\nlet shoot = false;\r\nlet isShooting = false;\r\nlet wallCounter = 0;\r\nlet wallEnemyCounter = 0;\r\nlet gameOver = false;\r\nvar ctx = canvas.getContext('2d');\r\nlet tempCounter = 0;\r\nlet shootY = 0;\r\n\r\nvar audioContext = null;\r\nvar oscillator = null;\r\nconst length = 2;\r\nconst eps = 0.01;\r\n\r\n// Elements\r\nvar hero = elements.hero(canvas);\r\nvar enemy = elements.enemy(canvas, 'wasp');\r\nlet bullet =  elements.bullet(hero, 'linear');\r\nlet bulletEnemy = elements.bullet(enemy);\r\n\r\nlet wall = [];\r\nlet wallEnemy = [];\r\nbuildWalls();\r\n//playMusic('')\r\n// game loop\r\nloop.start(function (dt) {\r\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n  if (gameOver) {\r\n    alerts.gameover(ctx, canvas);\r\n  } else {\r\n    collider.boundsCollision(hero, canvas);\r\n    collider.boundsCollision(enemy, canvas);\r\n    renderWalls(bullet, wallEnemy, 'enemy');\r\n    renderWalls(bullet, wall, 'player');\r\n    // update player movements\r\n    /*\r\n    if (key.isDown(key.LEFT)) {\r\n      if (hero.x > 0) {\r\n        hero.x = hero.x - (hero.speed * dt);\r\n      }\r\n    }\r\n    if (key.isDown(key.RIGHT)) {\r\n      if (hero.x+hero.width <= canvas.width) {\r\n        hero.x = hero.x + (hero.speed * dt);\r\n      }\r\n    }\r\n    */\r\n    if (key.isDown(key.UP)) {\r\n      if (hero.y != 0) {\r\n        hero.y = hero.y - (hero.speed * dt);\r\n      }\r\n    }\r\n    if (key.isDown(key.DOWN)) {\r\n      if ((hero.y+hero.height) != canvas.height) {\r\n        hero.y = hero.y + (hero.speed * dt);\r\n      }\r\n    }\r\n    if (key.isDown(key.SPACE)) {\r\n      shoot = true;\r\n      if (shootY === 0) {\r\n        shootY = hero.y + (hero.height/4);\r\n      }\r\n      if (!isShooting) {\r\n        beam();\r\n        shootY = hero.y + (hero.height/4);\r\n        centerToElement(bullet, hero);\r\n        \r\n        if ((bullet.x > canvas.width)) {\r\n          centerToElement(bullet, hero);\r\n        }\r\n      }\r\n    \r\n    }\r\n    \r\n    // Player bullet\r\n    if (shoot) {\r\n      if (bullet.name === 'linear') {\r\n        bullet.x += bullet.speed * dt;      \r\n        bullet.y = shootY;\r\n      }\r\n      if (bullet.name === 'wave') {\r\n        bullet.x += bullet.speed * dt;\r\n        bullet.y = Math.sin(bullet.x) * 20 + shootY;\r\n\r\n        if (bullet.x > (canvas.width)) {\r\n          bullet.x = canvas.width+10;\r\n        }\r\n      }\r\n    }\r\n\r\n    if (bullet.x > 0 && bullet.x <= canvas.width) {\r\n      isShooting = true;\r\n      \r\n    } else {\r\n      isShooting = false;\r\n    }\r\n    \r\n    if (!hero.collision) {\r\n      if (collider.collision(hero, enemy)) {\r\n        enemy.collision = true;\r\n        hero.collision = true;\r\n        hero.collisioned();\r\n        config.game.lostLife();\r\n      }\r\n    }\r\n    \r\n    if (collider.collision(bullet, enemy)) {\r\n      enemy.collision = true;\r\n    }\r\n    \r\n    if (enemy.collision) {\r\n      utils.destroy(enemy);\r\n    } else {\r\n      enemy.x -= (enemy.speed / 60);\r\n    }\r\n\r\n    if (wallEnemyCounter <= 1) {\r\n      // Todo: next level\r\n      buildWalls();\r\n      console.log('LEVEL UP')\r\n    }\r\n  \r\n    \r\n    // Renders\r\n    //render.renderRect(ctx, hero);\r\n    render.renderSprite(ctx, {x:0, y:0, width:59, height:29}, hero, heroImage);\r\n    // render.renderRect(ctx, enemy);\r\n\r\n    if (shoot && isShooting) { \r\n      render.renderSprite(ctx, {x:0, y:0, width:20, height:20}, bullet, bulletImage);\r\n    }\r\n\r\n    if (config.game.lifes === 0) {\r\n      gameOver = true;\r\n    }\r\n  }\r\n  \r\n});\r\n\r\nfunction centerToElement(el1, el2) {\r\n  el1.x = el2.x + el2.width - el1.width;\r\n  el1.y = el2.y + (el2.height/2) - (el1.height/2);\r\n  return el1;\r\n}\r\n\r\nfunction loadResource(item) {\r\n  var path = 'assets/';\r\n  image = new Image();\r\n  image.src = path + item + \".png\"; \r\n  return image;\r\n}\r\n\r\nfunction buildWalls() {\r\n  for (let i=0; i <= parseInt(canvas.height/20); i++) {\r\n    posy = (i === 0 ? 0: i * 20);\r\n    let block = elements.wall(0, posy, 'yellow');\r\n    let blockEnemy = elements.wall(canvas.width-16, posy, 'red');\r\n    wall.push(block);\r\n    wallEnemy.push(blockEnemy);\r\n    wallCounter +=1;\r\n    wallEnemyCounter +=1;\r\n  }\r\n}\r\n\r\nfunction renderWalls(bullet, wall, type) {\r\n\r\n  for (let i=0; i <= wall.length -1; i++) {\r\n    image = (type === 'enemy' ? wallEnemyImage : wallImage);\r\n    render.renderSprite(ctx, {x:0, y:0, width:16, height:16},  wall[i], image);\r\n    if (collider.collision(bullet, wall[i])) {    \r\n      wall[i].collision = true;\r\n      utils.destroy(wall[i]);\r\n      if (type === 'enemy') {\r\n        wallEnemyCounter -=1;\r\n      } else {\r\n        wallCounter -=1;\r\n      }\r\n      console.log('WALL COUNTER', wallEnemyCounter);\r\n    }\r\n  }\r\n}\r\n\r\nfunction playMusic(state) {\r\n  var music = [\r\n    [20, 4], [16, 4], [10, 8], [5, 4], [20, 8], [0, 16], [40, 4], [45, 8], [20, 8], [40, 4], [20, 8], [40, 8], [50, 4], [5, 2], [20, 8], [40, 4], [40, 8], [0, 4], [0, 4], [20, 4], [2,  4], [20, 8], [40, 4], [40, 8], [2, 4], [0, 4], [20, 4], [0,  4], [20, 8], [40, 4], [40, 8], [2, 4], [0, 4], [20, 4], [0,  4],[20, 8], [40, 4], [40, 8], [2, 4], [0, 4], [20, 4], [0,  4],\r\n  ];\r\n\r\n  getOrCreateContext();\r\n  oscillator.start(0);\r\n  var time = audioContext.currentTime + eps;\r\n  music.forEach(note => {\r\n    const freq = Math.pow(2, (note[0]-69)/12)*440;\r\n    oscillator.frequency.setTargetAtTime(0, time - eps, 0.001);\r\n    oscillator.frequency.setTargetAtTime(freq, time, 0.001);\r\n    time += length / note[1];\r\n  });\r\n}\r\n\r\nfunction getOrCreateContext() {\r\n  if (!audioContext) {\r\n    audioContext = new AudioContext();\r\n    oscillator = audioContext.createOscillator();\r\n    oscillator.connect(audioContext.destination);\r\n  }\r\n  return audioContext;\r\n}\r\n\r\nfunction beam() {\r\n  \r\n  if (beamSound.duration > 0 &&  beamSound.readyState > 2) {\r\n    beamSound.play();\r\n  }\r\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/main.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	eval("var lastTime = timestamp();\r\nvar stats;\r\n\r\nif (true) {\r\n  stats = __webpack_require__(2)(0);\r\n  document.body.appendChild(stats.dom);\r\n}\r\n\r\nfunction timestamp () {\r\n  return window.performance && window.performance.now ?\r\n    window.performance.now() :\r\n    Date.now();\r\n}\r\n\r\nfunction raf (fn) {\r\n  return window.requestAnimationFrame(function () {\r\n    stats && stats.begin();\r\n\r\n    var now = timestamp();\r\n    var dt = now - lastTime;\r\n\r\n    if (dt > 999) {\r\n      dt = 1 / 60;\r\n    } else {\r\n      dt /= 1000;\r\n    }\r\n\r\n    lastTime = now;\r\n\r\n    fn(dt);\r\n\r\n    stats && stats.end();\r\n  });\r\n}\r\n\r\nexports.start = function (fn) {\r\n  return raf(function tick (dt) {\r\n    fn(dt);\r\n    raf(tick);\r\n  });\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/loop.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./src/loop.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	eval("// stats.js - http://github.com/mrdoob/stats.js\nvar Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?\"block\":\"none\";l=a}var l=0,c=document.createElement(\"div\");c.style.cssText=\"position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000\";c.addEventListener(\"click\",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel(\"FPS\",\"#0ff\",\"#002\")),f=h(new Stats.Panel(\"MS\",\"#0f0\",\"#020\"));\nif(self.performance&&self.performance.memory)var t=h(new Stats.Panel(\"MB\",\"#f08\",\"#201\"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};\nStats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement(\"canvas\");q.width=r;q.height=f;q.style.cssText=\"width:80px;height:48px\";var b=q.getContext(\"2d\");b.font=\"bold \"+9*a+\"px Helvetica,Arial,sans-serif\";b.textBaseline=\"top\";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,\nv){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+\" \"+h+\" (\"+e(c)+\"-\"+e(g)+\")\",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};\"object\"===typeof module&&(module.exports=Stats);\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/stats.js/build/stats.min.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./~/stats.js/build/stats.min.js?");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	eval("var seed = 0;\r\n\r\nfunction random () {\r\n  var x = Math.sin(.8765111159592828 + seed++) * 10000;\r\n\r\n  return x - Math.floor(x);\r\n}\r\n\r\n/**\r\n * Return an integer within [0, max).\r\n *\r\n * @param  {int} [max]\r\n * @return {int}\r\n */\r\nexports.int = function (max) {\r\n  return random() * (max || 0xfffffff) | 0;\r\n};\r\n\r\n/**\r\n * Return a float within [0.0, 1.0).\r\n *\r\n * @return {float}\r\n */\r\nexports.float = function () {\r\n  return random();\r\n};\r\n\r\n/**\r\n * Return a boolean.\r\n *\r\n * @return {Boolean}\r\n */\r\nexports.bool = function () {\r\n  return random() > 0.5;\r\n};\r\n\r\n/**\r\n * Return an integer within [min, max).\r\n *\r\n * @param  {int} min\r\n * @param  {int} max\r\n * @return {int}\r\n */\r\nexports.range = function (min, max) {\r\n  return this.int(max - min) + min;\r\n};\r\n\r\n/**\r\n * Pick an element from the source.\r\n *\r\n * @param  {mixed[]} source\r\n * @return {mixed}\r\n */\r\nexports.pick = function (source) {\r\n  return source[this.range(0, source.length)];\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/rand.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./src/rand.js?");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	eval("var _pressed = {};\r\nvar key = {};\r\n\r\nkey.LEFT = 37;\r\nkey.UP = 38;\r\nkey.RIGHT = 39;\r\nkey.DOWN = 40;\r\nkey.SPACE = 32;\r\n\r\nkey.isDown = function (keyCode) {\r\n  return _pressed[keyCode];\r\n};\r\n\r\nkey.onKeydown = function (event) {\r\n  _pressed[event.keyCode] = true;\r\n};\r\n\r\nkey.onKeyup = function  (event) {\r\n  _pressed[event.keyCode] = null;\r\n};\r\n\r\nwindow.addEventListener('keyup', function (e) {\r\n  key.onKeyup(e);\r\n}, false);\r\nwindow.addEventListener('keydown', function (e) {\r\n  key.onKeydown(e);\r\n}, false);\r\n\r\nmodule.exports = key;\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/key.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./src/key.js?");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	eval("let collider = {};\r\ncollider.collision = (el1, el2) => {\r\n  \r\n  let el1x1 = el1.x;\r\n  let el1x2 = el1.x + el1.width;\r\n  let el1y1 = el1.y;\r\n  let el1y2 = el1.y + el1.height;\r\n  \r\n\r\n  let el2x1 = el2.x;\r\n  let el2x2 = el2.x + el2.width;\r\n  let el2y1 = el2.y;\r\n  let el2y2 = el2.y + el2.height;\r\n    \r\n  let collisioned = false;\r\n\r\n  if (el1x1 >= el2x1 && el1x1 <= el2x2) {\r\n    if (el1y1 >= el2y1 && el1y1 <= el2y2) {\r\n      collisioned = true;\r\n    } else if (el1y2 >= el2y1 && el1y2 <= el2y2) {\r\n      collisioned = true;\r\n    }\r\n  }\r\n\r\n  if (el1x2 >= el2x1 && el1x2 <= el2x2) {\r\n    if (el1y1 >= el2y1 && el1y1 <= el2y2) {\r\n      collisioned = true;\r\n    } else if (el1y2 >= el2y1 && el1y2 <= el2y2) {\r\n      collisioned = true;\r\n    }\r\n  }\r\n\r\n  return collisioned;\r\n}\r\n\r\ncollider.boundsCollision = (el, canvas) => {\r\n  if (el.x <= 0) {\r\n    el.x = 0;\r\n  } else if ((el.x + el.width) >= canvas.width) {\r\n    el.x = canvas.width - el.width;\r\n  }\r\n  if (el.y <= 0) {\r\n    el.y = 0;\r\n  } else if ((el.y + el.height) >= canvas.height) {\r\n    el.y = canvas.height - el.height;\r\n  }\r\n}\r\n\r\n\r\nmodule.exports = collider;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/collider.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./src/collider.js?");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	eval("var rand = __webpack_require__(3);\r\n\r\nmodule.exports.hero = (canvas) => {\r\n  let el = {\r\n    x: 70,\r\n    y: canvas.height - 100,\r\n    width: 59,\r\n    height: 29,\r\n    speed: 500,\r\n    color: 'rgba(236, 94, 103, 1)',\r\n    collision: false,\r\n    destroyed: false,\r\n    collisioned: () => {\r\n      setTimeout(() => { \r\n        el.collision = false;\r\n      }, 2000);\r\n    }\r\n  }\r\n  return el;\r\n};\r\n\r\nmodule.exports.enemy = (canvas, type) => {\r\n  let el = {};\r\n  switch (type) {\r\n    case 'ant':\r\n      el = {\r\n        x: canvas.width - 50,\r\n        y: rand.int(canvas.height),\r\n        width: 20,\r\n        height: 20,\r\n        speed: 200,\r\n        color: 'green',\r\n        collision: false,\r\n        destroyed: false\r\n      }\r\n      break;\r\n    case 'bee':\r\n      el = {\r\n        x: canvas.width - 50,\r\n        y: rand.int(canvas.height),\r\n        width: 20,\r\n        height: 30,\r\n        speed: 400,\r\n        color: 'yellow',\r\n        collision: false,\r\n        destroyed: false\r\n      }\r\n      break;\r\n    case 'wasp':\r\n      el = {\r\n        x: canvas.width - 50,\r\n        y: rand.int(canvas.height),\r\n        width: 10,\r\n        height: 10,\r\n        speed: 700,\r\n        color: 'red',\r\n        collision: false,\r\n        destroyed: false\r\n      }\r\n      break;\r\n    default:\r\n      el = {\r\n        x: canvas.width - 50,\r\n        y: rand.int(canvas.height),\r\n        width: 20,\r\n        height: 20,\r\n        speed: 200,\r\n        color: 'rgba(111, 94, 103, 1)',\r\n        collision: false,\r\n        destroyed: false\r\n      }\r\n      break;\r\n  }\r\n  return el;\r\n};\r\n\r\nmodule.exports.bullet = (shooter, type) => {\r\n  let el = {};\r\n  switch (type) {\r\n    case 'linear':\r\n      el = {\r\n        x: shooter.x + shooter.width - 10,\r\n        y: shooter.y + (shooter.height/2) - (10/2),\r\n        width: 10,\r\n        height: 10,\r\n        speed: 1000,\r\n        color: 'rgba(255, 255, 255, 1)',\r\n        collision: false,\r\n        name: 'linear',\r\n        destroyed: false\r\n      }\r\n      break;\r\n    case 'wave':\r\n      el = {\r\n        x: shooter.x + shooter.width - 10,\r\n        y: shooter.y + (shooter.height/2) - (10/2),\r\n        width: 20,\r\n        height: 20,\r\n        speed: 1000,\r\n        name: 'wave',\r\n        color: 'rgba(111, 94, 103, 1)',\r\n        collision: false,\r\n        destroyed: false\r\n      }\r\n      break;\r\n    case 'mass':\r\n      el = {\r\n        x: shooter.x + shooter.width - 10,\r\n        y: shooter.y + (shooter.height/2) - (10/2),\r\n        width: 10,\r\n        height: 10,\r\n        speed: 3000,\r\n        name: 'mass',\r\n        color: 'rgba(111, 94, 103, 1)',\r\n        collision: false,\r\n        destroyed: false\r\n      }\r\n      break;\r\n    default:\r\n      el = {\r\n        x: shooter.x + shooter.width - 10,\r\n        y: shooter.y + (shooter.height/2) - (10/2),\r\n        width: 10,\r\n        height: 10,\r\n        speed: 3000,\r\n        name: 'linear',\r\n        color: 'rgba(111, 94, 103, 1)',\r\n        collision: false,\r\n        destroyed: false\r\n      }\r\n      break;\r\n    }\r\n  return el;\r\n};\r\n\r\nmodule.exports.wall = (x, y, color) => {\r\n  let el = {\r\n    x: x,\r\n    y: y,\r\n    width: 16,\r\n    height: 16,\r\n    speed: 0,\r\n    color: color,\r\n    collision: false,\r\n    destroyed: false\r\n  }\r\n  return el;\r\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/elements.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/elements.js?");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	eval("let config = {};\r\nconfig.game = {\r\n  lifes: 3,\r\n  level: 1,\r\n  gameOver: false,\r\n  lostLife() {\r\n    if (this.lifes === 0) {\r\n      this.lifes = 0;\r\n      this.gameOver = true;\r\n    } else {\r\n      this.lifes-=1;\r\n    }\r\n  }\r\n}\r\n\r\nmodule.exports = config;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	eval("let ren = {};\r\n\r\nren.renderRect = (ctx, element) => {\r\n  if (!element.destroyed) {\r\n    ctx.fillStyle = element.color;\r\n    ctx.fillRect(element.x, element.y, element.width, element.height);\r\n  }\r\n};\r\n\r\nren.renderSprite = (ctx, size, element, image) => {\r\n  ctx.drawImage(image,\r\n    size.x, size.y, size.width, size.height,\r\n    element.x, element.y, element.width, element.height\r\n  );\r\n}\r\n\r\nmodule.exports = ren;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/render.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./src/render.js?");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	eval("let alerts = {};\r\n\r\nalerts.gameover = (ctx, canvas) => {\r\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n  ctx.font = \"32px Arial\";\r\n  ctx.fillStyle = \"white\";\r\n  ctx.fillText(\"GAME OVER\", canvas.width/2 - 10, canvas.height/2);\r\n}\r\n\r\nmodule.exports = alerts;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/alerts.js\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///./src/alerts.js?");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	eval("let utils = {};\r\n\r\nutils.destroy = (el) => {\r\n  el.x = -100;\r\n  el.y = -100;\r\n  el.destroyed = true;\r\n}\r\n\r\nmodule.exports = utils;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils.js\n// module id = 10\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })
/******/ ]);