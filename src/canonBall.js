import { detectCollision } from "./collisionDetection";

export default class CanonBall {
  constructor(game, canon) {
    this.image = document.getElementById("img_ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.baseSpeed = 1;
    this.game = game;
    this.size = 16;
    this.canon = canon;
    this.name = canon.name;
    this.speed = {x: 0, y: 0};
    this.position = {
      x: this.canon.position.x,
      y: this.canon.position.y
    };
    this.reset();
  }

  reset() {
    
    this.position = {
      x: this.canon.position.x,
      y: this.canon.position.y
    };
    console.log('INTERN CANON', this.position)
    switch (this.canon.name) {
      case 'up1':
        this.speed = { x: 0, y: 1 * this.baseSpeed };
        break;
      case 'up2':
        this.speed = { x: 0, y: 1 * this.baseSpeed };
        break;
      case 'right1':
        this.speed = { x: -1 * this.baseSpeed, y: 0 };
        break;
      case 'right2':
        this.speed = { x: -1 * this.baseSpeed, y: 0 };
        break;
      case 'down1':
        this.speed = { x: 0, y: -1 * this.baseSpeed };
        break;
      case 'down2':
        this.speed = { x: 0, y: -1 * this.baseSpeed };
        break;
      case 'left1':
        this.speed = { x: 1 * this.baseSpeed, y: 0 };
        break;
      case 'left2':
        this.speed = { x: 1 * this.baseSpeed, y: 0 };
        break;
      default:
        break;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    
    if (this.name === 'up1' || this.name === 'up2') {
      if (detectCollision(this, this.game.paddle.sides.upperLeft)) {
        this.position.y = 0;
      }
      
      if (detectCollision(this, this.game.paddle.sides.upperRight)) {
        this.position.y = 0;
      }
    }
    
    if (this.name === 'down1' || this.name === 'down2') {
      if (detectCollision(this, this.game.paddle.sides.lowerLeft)) {
        this.position.y = this.gameHeight;
      }
      
      if (detectCollision(this, this.game.paddle.sides.lowerRight)) {
        this.position.y = this.gameHeight;
      }
    }

    if (this.name === 'left1' || this.name === 'left2') {
      if (detectCollision(this, this.game.paddle.sides.upperLeft)) {
        this.position.x = 0;
      }
      
      if (detectCollision(this, this.game.paddle.sides.lowerLeft)) {
        this.position.x = 0;
      }
    }


    if (this.name === 'right1' || this.name === 'right2') {
      if (detectCollision(this, this.game.paddle.sides.upperRight)) {
        this.position.x = this.gameWidth;
      }
      
      if (detectCollision(this, this.game.paddle.sides.lowerRight)) {
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
}
