export default class InputHandler {
  constructor(paddle, game) {
    this.upperLeft = false;
    this.upperRight = false;
    this.lowerLeft = false;
    this.lowerRight = false;
    this.time = 250;

    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 65:
          if (!this.upperLeft) {
            paddle.hitUpperLeft();
            this.upperLeft = true;
          }
          
          setTimeout(() => { 
            this.upperLeft = false;
            paddle.releasePaddle('upperLeft');
          }, this.time);
          
          break;

        case 74:
          if (!this.upperLeft) {
            paddle.hitLowerLeft();
            this.upperLeft = true;
          }
          
          setTimeout(() => { 
            this.upperLeft = false;
            paddle.releasePaddle('lowerLeft');
          }, this.time);
          
          break;

        case 83:
          if (!this.upperLeft) {
            paddle.hitUpperRight();
            this.upperLeft = true;
          }
          
          setTimeout(() => { 
            this.upperLeft = false;
            paddle.releasePaddle('upperRight');
          }, this.time);
          
          break;
        
        case 75:
          if (!this.upperLeft) {
            paddle.hitLowerRight();
            this.upperLeft = true;
          }
          
          setTimeout(() => { 
            this.upperLeft = false;
            paddle.releasePaddle('lowerRight');
          }, this.time);
          
          break;

        case 13:
          game.start();
          break;
        
        case 90:
          game.pause();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 65:
          paddle.releasePaddle('upperLeft');
          break;

        case 74:
          paddle.releasePaddle('lowerLeft');
          break;
        
        case 83:
          paddle.releasePaddle('upperRight');
          break;

        case 75:
          paddle.releasePaddle('lowerRight');
          break;
      }
    });
  }
}
