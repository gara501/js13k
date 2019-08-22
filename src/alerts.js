let alerts = {};

alerts.gameover = (ctx, canvas) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "32px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", canvas.width/2 - 10, canvas.height/2);
}

module.exports = alerts;