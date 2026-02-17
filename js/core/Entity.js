import {BALANCE} from "../shared/balance.js";

export class Entity{

  constructor(position){

    this.position = position;

    /* ===== STATS ===== */
    this.maxHP = BALANCE.maxHP;
    this.hp = this.maxHP;

    this.maxCE = BALANCE.maxCE;
    this.ce = 0;

    this.maxStamina = BALANCE.maxStamina;
    this.stamina = this.maxStamina;

    /* ===== STATE ===== */
    this.state = "idle";
    this.hitstunTimer = 0;
    this.ignoreHitStun = false;

    /* ===== COMBAT FLAGS ===== */
    this.isInDomain = false;
    this.domainOwner = false;

  }

  /* ============================= */
  /* ===== UPDATE LOOP =========== */
  /* ============================= */

  update(){

    this.regen();

    if(this.hitstunTimer > 0){
      this.hitstunTimer--;

      if(this.hitstunTimer <= 0){
        this.state = "idle";
      }
    }

  }

  /* ============================= */
  /* ===== DAMAGE LOGIC ========== */
  /* ============================= */

  takeDamage(amount){

    this.hp -= amount;

    if(this.hp < 0){
      this.hp = 0;
      this.state = "dead";
    }

  }

  applyHitstun(frames){

    if(this.ignoreHitStun) return;

    this.state = "hitstun";
    this.hitstunTimer = frames;

  }

  /* ============================= */
  /* ===== RESOURCE SYSTEM ====== */
  /* ============================= */

  useStamina(cost){

    if(this.stamina >= cost){
      this.stamina -= cost;
      return true;
    }

    return false;
  }

  useCE(cost){

    if(this.ce >= cost){
      this.ce -= cost;
      return true;
    }

    return false;
  }

  gainCE(amount){

    this.ce += amount;

    if(this.ce > this.maxCE){
      this.ce = this.maxCE;
    }
  }

  regen(){

    // Stamina regen
    if(this.state === "idle"){
      this.stamina += BALANCE.staminaRegen;
    }

    if(this.stamina > this.maxStamina){
      this.stamina = this.maxStamina;
    }

    // Passive CE regen
    this.ce += BALANCE.ceRegen;

    if(this.ce > this.maxCE){
      this.ce = this.maxCE;
    }

  }

  /* ============================= */
  /* ===== MOVEMENT ============== */
  /* ============================= */

  move(direction, speed=3){

    if(this.state === "hitstun") return;

    this.position += direction * speed;

  }

  /* ============================= */
  /* ===== PUSHBACK ============== */
  /* ============================= */

  applyPushback(amount, direction){

    this.position += amount * direction;

  }

  /* ============================= */
  /* ===== RESET ================= */
  /* ============================= */

  reset(){

    this.hp = this.maxHP;
    this.ce = 0;
    this.stamina = this.maxStamina;
    this.state = "idle";
    this.hitstunTimer = 0;
    this.ignoreHitStun = false;

  }

}
