export default class World {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 100;
    this.height = 100;

    this.position = {
      x: game.gameWidth / 2 - this.width/2,
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
      },
    };
    
  }

  hitUpperLeft() {
    this.sides.upperLeft.backgroundColor = '#222';
  }

  hitUpperRight() {
    this.sides.upperRight.backgroundColor = '#222';
  }

  hitLowerLeft() {
    this.sides.lowerLeft.backgroundColor = '#222';
  }

  hitLowerRight() {
    this.sides.lowerRight.backgroundColor = '#222';
  }

  releasePaddle(key) {
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

  draw(ctx) {
    for (let item in this.sides) {
      ctx.fillStyle = this.sides[item].backgroundColor;
      ctx.fillRect(this.sides[item].position.x, this.sides[item].position.y, this.sides[item].width, this.sides[item].height);
    }

    ctx.beginPath();
    ctx.arc(this.core.position.x, this.core.position.y, this.core.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  update(deltaTime) {
    
  }
}
