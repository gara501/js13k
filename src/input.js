export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          paddle.hitUpperLeft();
          break;

        case 39:
          paddle.hitLowerLeft();
          break;

        case 38:
          paddle.hitUpperRight();
          break;
        
        case 40:
          paddle.hitLowerRight();
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
        case 37:
          paddle.releasePaddle('upperLeft');
          break;

        case 39:
          paddle.releasePaddle('lowerLeft');
          break;
        
        case 38:
          paddle.releasePaddle('upperRight');
          break;

        case 40:
          paddle.releasePaddle('lowerRight');
          break;
      }
    });
  }
}
