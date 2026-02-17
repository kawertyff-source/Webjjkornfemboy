export class Hitbox {
  constructor(owner, x, width, damage){
    this.owner = owner;
    this.x = x;
    this.width = width;
    this.damage = damage;
    this.active = false;
  }

  checkCollision(target){
    const distance = Math.abs(this.owner.position - target.position);
    return distance < this.width;
  }
}

export class Hurtbox {
  constructor(owner, width){
    this.owner = owner;
    this.width = width;
  }
}
