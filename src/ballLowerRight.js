import { detectCollision } from "./collisionDetection";

export default class BallLowerRight {
  constructor(game, position) {
    this.image = document.getElementById("img_ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = position;
    this.game = game;
    this.size = 16;
    this.reset(position);
  }

  reset(position) {
    this.position = position;
    this.speed = { x: 10, y: -5 };
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

    // wall on left or right
    if (this.position.x + this.size > this.gameWidth/2 || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // wall on top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // bottom of game
    if (this.position.y + this.size > this.gameHeight/2) {
      this.game.lives--;
      this.reset();
    }

    if (detectCollision(this, this.game.paddle.sides.lowerRight)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.sides.lowerRight.position.y - this.size;
    }
  }
}
