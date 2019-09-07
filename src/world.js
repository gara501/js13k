export default class World {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.width = 100;
    this.height = 100;
    this.isUpperLeftPressed = false;
    this.isUpperRightPressed = false;
    this.isLowerLeftPressed = false;
    this.isLowerRightPressed = false;

    this.position = {
      x: game.gameWidth / 2 - this.width/2,
      y: game.gameHeight - this.height
    };
    
    this.radiusVal = 80/game.currentLevel.gamePoints * (game.gamePoints/2);
    console.log('LOSPUYNTO', game.gamePoints);
    this.core = {
        radius: this.radiusVal,
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
    this.isUpperLeftPressed = true;
  }

  hitUpperRight() {
    this.sides.upperRight.backgroundColor = '#222';
    this.isUpperRightPressed = true;
  }

  hitLowerLeft() {
    this.sides.lowerLeft.backgroundColor = '#222';
    this.isLowerLeftPressed = true;
  }

  hitLowerRight() {
    this.sides.lowerRight.backgroundColor = '#222';
    this.isLowerRightPressed = true;
  }

  releasePaddle(key) {
    if (key === 'upperLeft') {
      this.sides.upperLeft.backgroundColor = '#FF0000';
      this.isUpperLeftPressed = false;
    }
    if (key === 'upperRight') {
      this.sides.upperRight.backgroundColor = '#FFD700';
      this.isUpperRightPressed = false;
    }
    if (key === 'lowerLeft') {
      this.sides.lowerLeft.backgroundColor = '#008000';
      this.isLowerLeftPressed = false;
    }
    if (key === 'lowerRight') {
      this.sides.lowerRight.backgroundColor = '#1E90FF';
      this.isLowerRightPressed = false;
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
    this.radiusVal = 80/this.game.currentLevel.gamePoints * (this.game.gamePoints/2);
    this.core.radius = this.radiusVal;
  }
}
