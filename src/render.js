let ren = {};

ren.renderRect = (ctx, element) => {
  if (!element.destroyed) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
  }
};

ren.renderSprite = (ctx, element) => {
  if (element.rotation) {
    ctx.save();
    ctx.translate(element.el.x+element.el.width/2,element.el.y+element.el.height/2);
    ctx.rotate(180 * Math.PI / 180);
    ctx.translate(-(element.el.x+element.el.width/2),-(element.el.y+element.el.height/2));
    ctx.drawImage(element.image,
      element.posx, element.posy, element.posWidth, element.posHeight,
      element.el.x, element.el.y, element.el.width, element.el.height
    );  
    ctx.stroke();
    ctx.restore();
  } else {
    ctx.drawImage(element.image,
      element.posx, element.posy, element.posWidth, element.posHeight,
      element.el.x, element.el.y, element.el.width, element.el.height
    );
  }
}

ren.renderSpriteSheet = (ctx, size, element, image, frameIndex) => {
  
  ctx.drawImage(image,
    frameIndex * size.width / element.frames, size.y, size.width, size.height,
    element.x, element.y, element.width, element.height
  );
  console.log(frameIndex);
}

module.exports = ren;