import { detectCollision } from "./collisionDetection";

export default class CanonBall {
  constructor(game, canon, baseSpeed) {
    this.image = document.getElementById("img_ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.baseSpeed = baseSpeed;
    this.game = game;
    this.size = 16;
    this.canon = canon;
    this.name = canon.name;
    this.speed = {x: 0, y: 0};  
    this.position = {
      x: canon.position.x,
      y: canon.position.y
    };
    this.reset();
  }

  reset() {
    /*
    this.position = {
      x: this.canon.position.x,
      y: this.canon.position.y
    };
    */
  
    switch (this.canon.name) {
      case 'up1':
        this.speed = { x: 0, y: 2 * this.baseSpeed };
        break;
      case 'up2':
        this.speed = { x: 0, y: 2 * this.baseSpeed };
        break;
      case 'right1':
        this.speed = { x: -2 * this.baseSpeed, y: 0 };
        break;
      case 'right2':
        this.speed = { x: -2 * this.baseSpeed, y: 0 };
        break;
      case 'down1':
        this.speed = { x: 0, y: -2 * this.baseSpeed };
        break;
      case 'down2':
        this.speed = { x: 0, y: -2 * this.baseSpeed };
        break;
      case 'left1':
        this.speed = { x: 2 * this.baseSpeed, y: 0 };
        break;
      case 'left2':
        this.speed = { x: 2 * this.baseSpeed, y: 0 };
        break;
      default:
        break;
    }
  }

  draw(ctx) {
    if (this.game.isShooting) {
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.size,
        this.size
      );
    }
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    
    switch (this.name) {
      case 'up1':
        if (detectCollision(this, this.game.paddle.sides.upperLeft)) {
          this.position.y *=-1;
          this.game.isShooting = false;
          if (this.game.paddle.isUpperLeftPressed) {
            this.game.gamePoints +=1;
          } else {
            this.game.gamePoints -=1;
          }
        }
        break;
      case 'up2':
        if (detectCollision(this, this.game.paddle.sides.upperRight)) {
          this.position.y *=-1;
          this.game.isShooting = false;
          if (this.game.paddle.isUpperRightPressed) {
            this.game.gamePoints +=1;
           } else {
            this.game.gamePoints -=1;
           }
        } 
        break;
      case 'down1':
        if (detectCollision(this, this.game.paddle.sides.lowerLeft)) {
          this.position.y *=-1;
          this.game.isShooting = false;
          if (this.game.paddle.isLowerLeftPressed) {
            this.game.gamePoints +=1;
           } else {
            this.game.gamePoints -=1;
           }
        }
        break;
      case 'down2':
        if (detectCollision(this, this.game.paddle.sides.lowerRight)) {
          this.position.y *=-1;
          this.game.isShooting = false;
          if (this.game.paddle.isLowerRightPressed) {
            this.game.gamePoints +=1;
           } else {
             console.log('ELSE', this.game.gamePoints)
            this.game.gamePoints -=1;
           }
        }
        break;
      case 'left1':
        if (detectCollision(this, this.game.paddle.sides.upperLeft)) {
          this.position.x *=-1;
          this.game.isShooting = false;
          if (this.game.paddle.isUpperLeftPressed) {
            this.game.gamePoints +=1;
           } else {
            this.game.gamePoints -=1;
           }
        } 
        break;
      case 'left2':
        if (detectCollision(this, this.game.paddle.sides.lowerLeft)) {
          this.position.x *=-1;
          this.game.isShooting = false;
          if (this.game.paddle.isLowerLeftPressed) {
            this.game.gamePoints +=1;
           } else {
            this.game.gamePoints -=1;
           }
        } 
        break;
      case 'right1':
        if (detectCollision(this, this.game.paddle.sides.upperRight)) {
          this.position.x *=-1;
          this.game.isShooting = false;
          if (this.game.paddle.isUpperRightPressed) {
            this.game.gamePoints +=1;
          } else {
          this.game.gamePoints -=1;
          }
        } 
        break;
      case 'right2':
        if (detectCollision(this, this.game.paddle.sides.lowerRight)) {
          this.position.x *=-1;
          this.game.isShooting = false;
          console.log('Lower Right Pressed', this.game.paddle.isLowerRightPressed)
          if (this.game.paddle.isLowerRightPressed) {
            this.game.gamePoints +=1;
          } else {
            this.game.gamePoints -=1;
          }
        } 
        break;
    
      default:
        break;
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
