import World from "/src/world";
import InputHandler from "/src/input";
import Canon from "./canon";
import CanonBall from "./canonBall";
import Levels from "./levels";

// import { buildLevel, level1, level2 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;    
    this.paddle = new World(this);
    this.canonUp1 = new Canon(this, 'up1');
    this.canonUp2 = new Canon(this, 'up2');
    this.canonRight1 = new Canon(this, 'right1');
    this.canonRight2 = new Canon(this, 'right2');
    this.canonDown1 = new Canon(this, 'down1');
    this.canonDown2 = new Canon(this, 'down2');
    this.canonLeft1 = new Canon(this, 'left1');
    this.canonLeft2 = new Canon(this, 'left2');
    this.canonBall1 = new CanonBall(this, this.canonUp1);
    this.canonBall2 = new CanonBall(this, this.canonUp2);
    this.canonBall3 = new CanonBall(this, this.canonRight1);
    this.canonBall4 = new CanonBall(this, this.canonRight2);
    this.canonBall5 = new CanonBall(this, this.canonDown1);
    this.canonBall6 = new CanonBall(this, this.canonDown2);
    this.canonBall7 = new CanonBall(this, this.canonLeft1);
    this.canonBall8 = new CanonBall(this, this.canonLeft2);
    this.gameObjects = [];
    this.balls = [];
    this.lives = 20;
    this.levels = new Levels();
    this.level1 = this.levels.level1();

    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;
    
    this.gameObjects = [
      this.paddle,
      this.canonUp1,
      this.canonUp2,
      this.canonRight1,
      this.canonRight2,
      this.canonDown1,
      this.canonDown2,
      this.canonLeft1,
      this.canonLeft2
    ];

   // Balls Logic
    var total = this.level1.length;
    var that = this;
    var ballsCounter = 0;
    var intervalId = setInterval(function(){
      if (ballsCounter === total) {
        clearInterval(intervalId);
      }
      that.balls = [];
      var ballSelected = that.level1[ballsCounter];
      if (ballSelected.canon === 1) {
        that.canonBall1.speed = ballSelected.speed;
        that.balls.push(that.canonBall1);
      } else if (ballSelected.canon === 2) {
        that.canonBall2.speed = ballSelected.speed;
        that.balls.push(that.canonBall2);
      } else if (ballSelected.canon === 3) {
        that.canonBall3.speed = ballSelected.speed;
        that.balls.push(that.canonBall3);
      } else if (ballSelected.canon === 4) {
        that.canonBall4.speed = ballSelected.speed;
        that.balls.push(that.canonBall4);
      } else if (ballSelected.canon === 5) {
        that.canonBall5.speed = ballSelected.speed;
        that.balls.push(that.canonBall5);
      } else if (ballSelected.canon === 6) {
        that.canonBall6.speed = ballSelected.speed;
        that.balls.push(that.canonBall6);
      } else if (ballSelected.canon === 7) {
        that.canonBall7.speed = ballSelected.speed;
        that.balls.push(that.canonBall7);
      } else {
        that.canonBall8.speed = ballSelected.speed;
        that.balls.push(that.canonBall8);
      }
      console.log('intern', that.balls)
      ballsCounter++;
    }, 1000)
    console.log(this.balls)

   
    
    

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;
/*
    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }
*/
    [...this.gameObjects].forEach(object =>
      object.update(deltaTime)
    );
    
    [...this.balls].forEach(object =>
      object.update(deltaTime)
    );

    //this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects].forEach(object => object.draw(ctx));
    [...this.balls].forEach(object => object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press ENTER To Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }

  ballsLogic() {
    const base = [
      {
        canon: 1,
        speed: 1
      }
    ];
    const randomBall = Math.floor(Math.random() * 8) + 1;
    console.log('RANDOM', randomBall);
  }
}
