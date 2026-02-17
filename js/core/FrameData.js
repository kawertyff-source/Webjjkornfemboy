export class FrameData{
  constructor(data){
    this.startup=data.startup;
    this.active=data.active;
    this.recovery=data.recovery;
    this.frame=0;
  }

  update(){
    this.frame++;
  }

  phase(){
    if(this.frame<=this.startup) return "startup";
    if(this.frame<=this.startup+this.active) return "active";
    if(this.frame<=this.startup+this.active+this.recovery) return "recovery";
    return "done";
  }
}
