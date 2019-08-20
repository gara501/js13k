let collider = {};
collider.collision = (el1, el2) => {
  
  let el1x1 = el1.x;
  let el1x2 = el1.x + el1.width;
  let el1y1 = el1.y;
  let el1y2 = el1.y + el1.height;
  

  let el2x1 = el2.x;
  let el2x2 = el2.x + el2.width;
  let el2y1 = el2.y;
  let el2y2 = el2.y + el2.height;
    
  let collisioned = false;

  if (el1x1 >= el2x1 && el1x1 <= el2x2) {
    if (el1y1 >= el2y1 && el1y1 <= el2y2) {
      collisioned = true;
    } else if (el1y2 >= el2y1 && el1y2 <= el2y2) {
      collisioned = true;
    }
  }

  if (el1x2 >= el2x1 && el1x2 <= el2x2) {
    if (el1y1 >= el2y1 && el1y1 <= el2y2) {
      collisioned = true;
    } else if (el1y2 >= el2y1 && el1y2 <= el2y2) {
      collisioned = true;
    }
  }

  return collisioned;
}

collider.boundsCollision = (el, canvas) => {
  if (el.x <= 0) {
    el.x = 0;
  } else if ((el.x + el.width) >= canvas.width) {
    el.x = canvas.width - el.width;
  }
  if (el.y <= 0) {
    el.y = 0;
  } else if ((el.y+el.height) >= canvas.height) {
    el.y = canvas.height - el.height;
  }
}


module.exports = collider;