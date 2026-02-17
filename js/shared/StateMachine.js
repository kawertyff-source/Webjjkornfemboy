export class StateMachine{
  constructor(initial){
    this.state=initial;
    this.locked=false;
  }

  change(newState){
    if(!this.locked){
      this.state=newState;
    }
  }

  lock(){this.locked=true;}
  unlock(){this.locked=false;}
}
