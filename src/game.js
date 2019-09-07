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
    this.levelsObj = new Levels();
    this.levels = this.levelsObj.levels();
    this.currentLevelIndex = 0;
    this.currentLevel = this.levels[this.currentLevelIndex];
    this.gamePoints = this.currentLevel.gamePoints;
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

    this.isShooting = false;
    this.balls = [];
    
    

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

    this.canonBalls = [
      this.canonUp1,
      this.canonUp2,
      this.canonRight1,
      this.canonRight2,
      this.canonDown1,
      this.canonDown2,
      this.canonLeft1,
      this.canonLeft2
    ];
    
    
    setInterval(()=> {
      let activeCanon = this.canonBalls[Math.floor(Math.random() * this.canonBalls.length)];
      let ballSpeed = Math.floor(Math.random() * 5) + 1 ;
      let activeBall =  new CanonBall(this, activeCanon, ballSpeed);
      
      console.log(activeBall.baseSpeed);
      if (!this.isShooting) {
        this.balls = [
          activeBall
        ]
        this.isShooting = true;
      }
    }, 700)
   
    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.gamePoints === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.gamePoints === this.currentLevel.gamePoints * 2) {
      if (this.currentLevelIndex < this.levels.length) {
        this.currentLevelIndex++;
        this.gamestate = GAMESTATE.NEWLEVEL;
        this.start();
      } else {
        this.gamestate = GAMESTATE.MENU;
      }
    }

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
    console.log('POINTS', this.gamePoints);
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
