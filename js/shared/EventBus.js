export class EventBus{
  constructor(){
    this.events={};
  }

  on(name,cb){
    (this.events[name] ||= []).push(cb);
  }

  emit(name,data){
    if(this.events[name]){
      this.events[name].forEach(cb=>cb(data));
    }
  }
}
