export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 65:
          paddle.hitUpperLeft();
          break;

        case 74:
          paddle.hitLowerLeft();
          break;

        case 83:
          paddle.hitUpperRight();
          break;
        
        case 75:
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
