var loop = require('./loop');
var rand = require('./rand');
var key = require('./key');
var collider = require('./collider');
var elements = require('./elements');
var config = require('./config');
var render = require('./render');
var alerts = require('./alerts');
var utils = require('./utils');
let heroImage = loadResource('hero');
let bulletImage = loadResource('bullet');
let wallImage = loadResource('wall');
let wallEnemyImage = loadResource('wallenemy');
var beamSound = new Audio("assets/beam.mp3");

var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundColor = '#000';
document.body.appendChild(canvas);

let shoot = false;
let isShooting = false;
let wallCounter = 0;
let wallEnemyCounter = 0;
let gameOver = false;
var ctx = canvas.getContext('2d');
let tempCounter = 0;
let shootY = 0;

var audioContext = null;
var oscillator = null;
const length = 2;
const eps = 0.01;

// Elements
var hero = elements.hero(canvas);
var enemy = elements.enemy(canvas, 'wasp');
let bullet =  elements.bullet(hero, 'linear');
let bulletEnemy = elements.bullet(enemy);

let wall = [];
let wallEnemy = [];
buildWalls();
//playMusic('')
// game loop
loop.start(function (dt) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameOver) {
    alerts.gameover(ctx, canvas);
  } else {
    collider.boundsCollision(hero, canvas);
    collider.boundsCollision(enemy, canvas);
    renderWalls(bullet, wallEnemy, 'enemy');
    renderWalls(bullet, wall, 'player');
    // update player movements
    /*
    if (key.isDown(key.LEFT)) {
      if (hero.x > 0) {
        hero.x = hero.x - (hero.speed * dt);
      }
    }
    if (key.isDown(key.RIGHT)) {
      if (hero.x+hero.width <= canvas.width) {
        hero.x = hero.x + (hero.speed * dt);
      }
    }
    */
    if (key.isDown(key.UP)) {
      if (hero.y != 0) {
        hero.y = hero.y - (hero.speed * dt);
      }
    }
    if (key.isDown(key.DOWN)) {
      if ((hero.y+hero.height) != canvas.height) {
        hero.y = hero.y + (hero.speed * dt);
      }
    }
    if (key.isDown(key.SPACE)) {
      shoot = true;
      if (shootY === 0) {
        shootY = hero.y + (hero.height/4);
      }
      if (!isShooting) {
        beam();
        shootY = hero.y + (hero.height/4);
        centerToElement(bullet, hero);
        
        if ((bullet.x > canvas.width)) {
          centerToElement(bullet, hero);
        }
      }
    
    }
    
    // Player bullet
    if (shoot) {
      if (bullet.name === 'linear') {
        bullet.x += bullet.speed * dt;      
        bullet.y = shootY;
      }
      if (bullet.name === 'wave') {
        bullet.x += bullet.speed * dt;
        bullet.y = Math.sin(bullet.x) * 20 + shootY;

        if (bullet.x > (canvas.width)) {
          bullet.x = canvas.width+10;
        }
      }
    }

    if (bullet.x > 0 && bullet.x <= canvas.width) {
      isShooting = true;
      
    } else {
      isShooting = false;
    }
    
    if (!hero.collision) {
      if (collider.collision(hero, enemy)) {
        enemy.collision = true;
        hero.collision = true;
        hero.collisioned();
        config.game.lostLife();
      }
    }
    
    if (collider.collision(bullet, enemy)) {
      enemy.collision = true;
    }
    
    if (enemy.collision) {
      utils.destroy(enemy);
    } else {
      enemy.x -= (enemy.speed / 60);
    }

    if (wallEnemyCounter <= 1) {
      // Todo: next level
      buildWalls();
      console.log('LEVEL UP')
    }
  
    
    // Renders
    //render.renderRect(ctx, hero);
    render.renderSprite(ctx, {x:0, y:0, width:59, height:29}, hero, heroImage);
    // render.renderRect(ctx, enemy);

    if (shoot && isShooting) { 
      render.renderSprite(ctx, {x:0, y:0, width:20, height:20}, bullet, bulletImage);
    }

    if (config.game.lifes === 0) {
      gameOver = true;
    }
  }
  
});

function centerToElement(el1, el2) {
  el1.x = el2.x + el2.width - el1.width;
  el1.y = el2.y + (el2.height/2) - (el1.height/2);
  return el1;
}

function loadResource(item) {
  var path = 'assets/';
  image = new Image();
  image.src = path + item + ".png"; 
  return image;
}

function buildWalls() {
  for (let i=0; i <= parseInt(canvas.height/20); i++) {
    posy = (i === 0 ? 0: i * 20);
    let block = elements.wall(0, posy, 'yellow');
    let blockEnemy = elements.wall(canvas.width-16, posy, 'red');
    wall.push(block);
    wallEnemy.push(blockEnemy);
    wallCounter +=1;
    wallEnemyCounter +=1;
  }
}

function renderWalls(bullet, wall, type) {

  for (let i=0; i <= wall.length -1; i++) {
    image = (type === 'enemy' ? wallEnemyImage : wallImage);
    render.renderSprite(ctx, {x:0, y:0, width:16, height:16},  wall[i], image);
    if (collider.collision(bullet, wall[i])) {    
      wall[i].collision = true;
      utils.destroy(wall[i]);
      if (type === 'enemy') {
        wallEnemyCounter -=1;
      } else {
        wallCounter -=1;
      }
      console.log('WALL COUNTER', wallEnemyCounter);
    }
  }
}

function playMusic(state) {
  var music = [
    [20, 4], [16, 4], [10, 8], [5, 4], [20, 8], [0, 16], [40, 4], [45, 8], [20, 8], [40, 4], [20, 8], [40, 8], [50, 4], [5, 2], [20, 8], [40, 4], [40, 8], [0, 4], [0, 4], [20, 4], [2,  4], [20, 8], [40, 4], [40, 8], [2, 4], [0, 4], [20, 4], [0,  4], [20, 8], [40, 4], [40, 8], [2, 4], [0, 4], [20, 4], [0,  4],[20, 8], [40, 4], [40, 8], [2, 4], [0, 4], [20, 4], [0,  4],
  ];

  getOrCreateContext();
  oscillator.start(0);
  var time = audioContext.currentTime + eps;
  music.forEach(note => {
    const freq = Math.pow(2, (note[0]-69)/12)*440;
    oscillator.frequency.setTargetAtTime(0, time - eps, 0.001);
    oscillator.frequency.setTargetAtTime(freq, time, 0.001);
    time += length / note[1];
  });
}

function getOrCreateContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
    oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
  }
  return audioContext;
}

function beam() {
  
  if (beamSound.duration > 0 &&  beamSound.readyState > 2) {
    beamSound.play();
  }
}