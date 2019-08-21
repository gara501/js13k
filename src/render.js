let ren = {};

ren.renderRect = (ctx, element) => {
  if (!element.destroyed) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
  }
};

ren.renderHero = (ctx, hero, image) => {
  if (!hero.destroyed) {
    ctx.drawImage(image,  
	    0, 0, 64, 64, //src coords 
	    hero.x, hero.y, hero.width, hero.height //dst coords 
	  );
  }
}

ren.renderBullet = (ctx, bullet, image) => {
  ctx.drawImage(image,  
    0, 0, 64, 64, //src coords 
    hero.x, hero.y, hero.width, hero.height //dst coords 
  );
}

module.exports = ren;