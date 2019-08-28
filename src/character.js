class character {
  init() {
    this.x = 30;
    this.y = canvas.height - 50;
    this.width = 59;
    this.height = 29;
    this.speed = 500;
    this.color = 'rgba(236, 94, 103, 1)';
    this.collision = false;
    this.destroyed = false;
    
  }

  render() {

  }
  
  collisioned = () => {
    setTimeout(() => { 
      el.collision = false;
    }, 2000);
  }

  update() {
    this.collisioned();
  }
}