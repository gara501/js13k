import { detectCollision } from "./collisionDetection";

export default class Canon {
  constructor(game, name) {

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;
    this.width = 20;
    this.height = 20;
    this.position = {x: 0, y: 0};
    this.name = name;
    this.backgroundColor = '#ccc';
    this.configureCanon(this.name);
  }

  configureCanon(name) {
    switch (name) {
      case 'up1':
        this.backgroundColor = '#FF0000';
        this.position = {
          x: this.gameWidth/2 - (50 + this.width/2),
          y: 0
        };
        break;
      case 'up2':
        this.backgroundColor = '#FFD700';
        this.position = {
          x: this.gameWidth/2 + (50 - this.width/2),
          y: 0
        };
        break;
      case 'right1':
        this.backgroundColor = '#FFD700';
        this.position = {
          x: this.gameWidth - this.width,
          y: this.gameHeight/2 - 50
        };
        break;
      case 'right2':
        this.backgroundColor = '#1E90FF';
        this.position = {
          x: this.gameWidth - this.width,
          y: this.gameHeight/2 + 50
        };
        break;
      case 'down1':      
        this.backgroundColor = '#008000';
        this.position = {
          x: this.gameWidth/2 - (50 + this.width/2),
          y: this.gameHeight - this.height
        };
        break;
      case 'down2':
        this.backgroundColor = '#1E90FF';
        this.position = {
          x: this.gameWidth/2 + (50 - this.width/2),
          y: this.gameHeight - this.height
        };
        break;
      case 'left1':
        this.backgroundColor = '#FF0000';
        this.position = {
          x: 0,
          y: this.gameHeight/2 - 50
        };
        break;
      case 'left2':
        this.backgroundColor = '#008000';
        this.position = {
          x: 0,
          y: this.gameHeight/2 + 50
        };
        break;
      default:
        break;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
   
  }
}
