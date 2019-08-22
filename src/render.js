let ren = {};

ren.renderRect = (ctx, element) => {
  if (!element.destroyed) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
  }
};

ren.renderSprite = (ctx, size, element, image) => {
  ctx.drawImage(image,
    size.x, size.y, size.width, size.height,
    element.x, element.y, element.width, element.height
  );
}

module.exports = ren;