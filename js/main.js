import {GameLoop} from "./engine/GameLoop.js";
import {Time} from "./engine/Time.js";
import {StateMachine} from "./core/StateMachine.js";
import {FrameData} from "./core/FrameData.js";
import {Entity} from "./core/Entity.js";
import {BALANCE} from "./shared/balance.js";

const player=new Entity();
const enemy=new Entity();

const playerState=new StateMachine("idle");

let currentAttack=null;

function updateUI(){
  document.getElementById("pHp").style.width=(player.hp)+"%";
  document.getElementById("eHp").style.width=(enemy.hp)+"%";
  document.getElementById("pCE").style.width=(player.ce)+"%";
  document.getElementById("eCE").style.width=(enemy.ce)+"%";
}

function light(){
  if(player.useStamina(BALANCE.light.stamina)){
    playerState.change("light");
    currentAttack=new FrameData(BALANCE.light);
  }
}

function heavy(){
  if(player.useStamina(BALANCE.heavy.stamina)){
    playerState.change("heavy");
    currentAttack=new FrameData(BALANCE.heavy);
  }
}

function block(){
  playerState.change("block");
}

function focus(){
  player.gainCE(5);
}

window.light=light;
window.heavy=heavy;
window.block=block;
window.focus=focus;

const loop=new GameLoop((delta)=>{
  Time.update(delta);

  if(currentAttack){
    currentAttack.update();

    if(currentAttack.phase()==="active"){
      enemy.takeDamage(1);
      player.gainCE(1);
    }

    if(currentAttack.phase()==="done"){
      currentAttack=null;
      playerState.change("idle");
    }
  }

  updateUI();
});

loop.start();
