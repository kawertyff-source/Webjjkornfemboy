export const BALANCE = {

  /* ========================= */
  /* ===== CORE ATTACKS ====== */
  /* ========================= */

  light:{
    name:"light",
    startup:5,
    active:3,
    recovery:10,
    damage:6,
    stamina:8,
    ceGain:5,
    superArmor:false,
    cancelWindow:6,
    hitstun:18,
    pushback:8,
    blackFlashable:true
  },

  heavy:{
    name:"heavy",
    startup:12,
    active:5,
    recovery:20,
    damage:14,
    stamina:25,
    ceGain:10,
    superArmor:true,
    cancelWindow:14,
    hitstun:28,
    pushback:15,
    blackFlashable:true
  },

  /* ========================= */
  /* ===== DOMAIN DATA ======= */
  /* ========================= */

  domain:{
    ceCost:100,
    duration:600,        // 10 sec @60fps
    damageMultiplier:1.3,
    sureHit:true
  },

  /* ========================= */
  /* ===== GLOBAL TUNING ===== */
  /* ========================= */

  blackFlash:{
    multiplier:2.5,
    window:2
  },

  counterHitMultiplier:1.5,

  maxHP:100,
  maxCE:100,
  maxStamina:100,

  staminaRegen:0.4,
  ceRegen:0.1

};
