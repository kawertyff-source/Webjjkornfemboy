export class Entity{
  constructor(){
    this.hp=100;
    this.ce=0;
    this.stamina=100;
  }

  takeDamage(d){
    this.hp=Math.max(0,this.hp-d);
  }

  useStamina(s){
    if(this.stamina>=s){
      this.stamina-=s;
      return true;
    }
    return false;
  }

  gainCE(amount){
    this.ce=Math.min(100,this.ce+amount);
  }
}
