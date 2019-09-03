export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 81:
          paddle.hitUpperLeft();
          break;

        case 65:
          paddle.hitLowerLeft();
          break;

        case 87:
          paddle.hitUpperRight();
          break;
        
        case 83:
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
        case 81:
          paddle.releasePaddle('upperLeft');
          break;

        case 65:
          paddle.releasePaddle('lowerLeft');
          break;
        
        case 87:
          paddle.releasePaddle('upperRight');
          break;

        case 83:
          paddle.releasePaddle('lowerRight');
          break;
      }
    });
  }
}
