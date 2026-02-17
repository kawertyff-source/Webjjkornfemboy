export function resolveHit(attacker, defender, moveData){

  let damage = moveData.damage;

  // Counter Hit
  if(defender.state === "startup"){
    damage *= 1.5;
  }

  defender.takeDamage(damage);

  if(!defender.ignoreHitStun){
    defender.state = "hitstun";
    defender.hitstunTimer = 20;
  }

}
