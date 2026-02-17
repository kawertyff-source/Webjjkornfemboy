export class GameLoop{
  constructor(update){
    this.update=update;
    this.last=0;
  }

  start(){
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(t){
    const delta=t-this.last;
    this.last=t;
    this.update(delta/1000);
    requestAnimationFrame(this.loop.bind(this));
  }
}
