let ren = {};

ren.renderRect = (ctx, element) => {
  if (!element.destroyed) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
  }
};

ren.renderHero = (ctx, hero, resources) => {
  if (!hero.destroyed) {
    ctx.drawImage(resources.shipImage(),  
	    50, 25, 20,20, //src coords 
	    hero.x, hero.y, hero.width, hero.height //dst coords 
	  );
  }
}

module.exports = ren;