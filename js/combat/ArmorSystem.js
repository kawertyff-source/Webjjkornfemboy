export function applySuperArmor(entity, moveData){
  if(moveData.superArmor){
    entity.ignoreHitStun = true;
  } else {
    entity.ignoreHitStun = false;
  }
}
