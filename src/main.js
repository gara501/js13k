var loop = require('./loop');
var rand = require('./rand');
var key = require('./key');
var collider = require('./collider');
var elements = require('./elements');
var config = require('./config');
var render = require('./render');
var alerts = require('./alerts');
var utils = require('./utils');
let resources = loadResources();

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

// Elements
var hero = elements.hero(canvas);
var enemy = elements.enemy(canvas, 'wasp');
let bullet =  elements.bullet(hero, 'wave');
let bulletEnemy = elements.bullet(enemy);

let wall = [];
let wallEnemy = [];
for (let i=0; i <= parseInt(canvas.height/20); i++) {
  posy = (i === 0 ? 0: i * 20);
  let block = elements.wall(0, posy, 'yellow');
  let blockEnemy = elements.wall(canvas.width-50, posy, 'red');
  wall.push(block);
  wallEnemy.push(blockEnemy);
  wallCounter +=1;
  wallEnemyCounter +=1;
}

// game loop
loop.start(function (dt) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameOver) {
    alerts.gameover(ctx, canvas);
  } else {
    collider.boundsCollision(hero, canvas);
    collider.boundsCollision(enemy, canvas);

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
        shootY = hero.y + (hero.height/2);
      }
      if (!isShooting) {
        shootY = hero.y + (hero.height/2);
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
        bullet.y = hero.y + (hero.height/2) - (bullet.height/2);
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

    // Wall
    for(let block of wall) {
      render.renderRect(ctx, block);
      //if (collider.collision(bullet, bullet)) {
      //  block.collision = true;
     //   utils.destroy(block);
      //}
    }

    for(let block of wallEnemy) {
      render.renderRect(ctx, block);
      if (collider.collision(bullet, block)) {      
        block.collision = true;
        utils.destroy(block);
        wallEnemyCounter -=1;
        console.log('WALL COUNTER', wallEnemyCounter);
      }
    }
    
    // Renders
    //render.renderRect(ctx, hero);
    render.renderHero(ctx, hero, resources);
    // render.renderRect(ctx, enemy);

    if (shoot && isShooting) { 
      render.renderRect(ctx, bullet);
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

function loadResources() {
  let resources = {
    shipImage: () => {
      ship_image = new Image(); 
      ship_image.src = "assets/hero.png"; 
      return ship_image;
    }
  }
  return resources;
}
