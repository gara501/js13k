let config = {};
config.game = {
  lifes: 3,
  level: 1,
  gameOver: false,
  lostLife() {
    if (this.lifes === 0) {
      this.lifes = 0;
      this.gameOver = true;
    } else {
      this.lifes-=1;
    }
  }
}

module.exports = config;