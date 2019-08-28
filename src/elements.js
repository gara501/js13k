var rand = require('./rand');

module.exports.hero = (canvas) => {
  let el = {
    x: 30,
    y: canvas.height - 50,
    width: 59,
    height: 29,
    speed: 500,
    color: 'rgba(236, 94, 103, 1)',
    collision: false,
    destroyed: false,
    collisioned: () => {
      setTimeout(() => { 
        el.collision = false;
      }, 2000);
    }
  }
  return el;
};

module.exports.enemy = (canvas, type) => {
  let el = {};
  switch (type) {
    case 'first':
      el = {
        x: canvas.width - 70,
        y: rand.int(canvas.height),
        width: 50,
        height: 34,
        speed: 300,
        life: 20,
        collision: false,
        destroyed: false, 
        update:(heroY) => {
          setTimeout(() => {
            el.y -= heroY;
          }, 500)
          
        },
        shoot: () => {
          var shootRand = rand.int(1000);
          setTimeout(() => {
            
          }, shootRand)
        }
      }
      break;
    case 'second':
      el = {
        x: canvas.width - 50,
        y: rand.int(canvas.height),
        width: 20,
        height: 30,
        speed: 400,
        life: 40,
        collision: false,
        destroyed: false
      }
      break;
    case 'third':
      el = {
        x: canvas.width - 50,
        y: rand.int(canvas.height),
        width: 10,
        height: 10,
        speed: 700,
        life: 100,
        collision: false,
        destroyed: false
      }
      break;
    default:
      el = {
        x: canvas.width - 50,
        y: rand.int(canvas.height),
        width: 20,
        height: 20,
        speed: 200,
        color: 'rgba(111, 94, 103, 1)',
        collision: false,
        destroyed: false
      }
      break;
  }
  return el;
};

module.exports.bullet = (shooter, type) => {
  let el = {};
  switch (type) {
    case 'linear':
      el = {
        x: shooter.x + shooter.width - 10,
        y: shooter.y + (shooter.height/2) - (10/2),
        width: 10,
        height: 10,
        speed: 1000,
        frames: 4,
        color: 'rgba(255, 255, 255, 1)',
        collision: false,
        name: 'linear',
        destroyed: false
      }
      break;
    case 'wave':
      el = {
        x: shooter.x + shooter.width - 10,
        y: shooter.y + (shooter.height/2) - (10/2),
        width: 20,
        height: 20,
        speed: 1000,
        name: 'wave',
        frames: 4,
        color: 'rgba(111, 94, 103, 1)',
        collision: false,
        destroyed: false
      }
      break;
    case 'mass':
      el = {
        x: shooter.x + shooter.width - 10,
        y: shooter.y + (shooter.height/2) - (10/2),
        width: 10,
        height: 10,
        speed: 3000,
        name: 'mass',
        color: 'rgba(111, 94, 103, 1)',
        collision: false,
        destroyed: false
      }
      break;
    default:
      el = {
        x: shooter.x + shooter.width - 10,
        y: shooter.y + (shooter.height/2) - (10/2),
        width: 10,
        height: 10,
        speed: 3000,
        name: 'linear',
        color: 'rgba(111, 94, 103, 1)',
        collision: false,
        destroyed: false
      }
      break;
    }
  return el;
};

module.exports.wall = (x, y, color) => {
  let el = {
    x: x,
    y: y,
    width: 16,
    height: 16,
    speed: 0,
    color: color,
    collision: false,
    destroyed: false
  }
  return el;
};