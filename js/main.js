// ====== STATE ======
let state={
hp:100,enemyHp:100,energy:100,combo:0,
x:40,enemyX:300,dodge:false,domain:false
};

let rank=JSON.parse(localStorage.getItem("rank"))||{
elo:1000,wins:0,losses:0
};

const ui=id=>document.getElementById(id);

// ====== INIT ======
ui("sCrowd").volume=.3;
document.body.addEventListener("click",()=>ui("sCrowd").play(),{once:true});
bindButtons();
setInterval(regenEnergy,1000);
setInterval(enemyAI,1000);
render();

// ====== GAME START ======
function startGame(){
ui("intro").style.display="none";
}

// ====== MOVEMENT ======
function move(dir){
if(dir==="left") state.x-=20;
if(dir==="right") state.x+=20;
state.x=Math.max(0,Math.min(350,state.x));
render();
}

// ====== ATTACK ======
function attack(){
if(state.energy<5) return;
if(Math.abs(state.x-state.enemyX)>80) return;

state.energy-=5;
let dmg=10+state.combo;
let crit=Math.random()<0.2;
if(crit){dmg*=2;ui("sCrit").play();document.body.classList.add("shake","slow")}
state.enemyHp-=dmg;
state.combo++;

ui("player").classList.add("punch");
ui("sPunch").play();

setTimeout(()=>document.body.classList.remove("shake","slow"),500);
enemyTurn();checkEnd();render();
}

// ====== SKILL ======
function skill(){
if(state.energy<25) return;
state.energy-=25;
state.enemyHp-=30;
state.combo+=2;
enemyTurn();checkEnd();render();
}

// ====== DODGE ======
function dodge(){
if(state.energy<10) return;
state.energy-=10;
state.dodge=true;
setTimeout(()=>state.dodge=false,800);
render();
}

// ====== GOD MODE ======
function ult(){
if(state.energy<100||state.combo<5) return;

state.energy=0;
state.domain=true;
ui("arena").classList.add("domain","shake");
ui("godText").innerText="👑 DOMAIN EXPANSION 👑";
ui("sUlt").play();

setTimeout(()=>{
state.domain=false;
ui("arena").classList.remove("domain","shake");
ui("godText").innerText="";
},4000);

render();
}

// ====== AI SYSTEM (SMART) ======
function enemyAI(){
if(state.enemyHp<=0) return;

// เดินเข้าหาผู้เล่น
if(Math.abs(state.enemyX-state.x)>80){
state.enemyX+= state.enemyX>state.x?-20:20;
}

// ใช้สกิลสุ่ม
if(Math.random()<0.3){
state.hp-=15;
}

// โจมตีถ้าใกล้
if(Math.abs(state.enemyX-state.x)<=80){
state.hp-=Math.floor(Math.random()*12)+5;
}

render();
}

// ====== ENEMY TURN ======
function enemyTurn(){
if(state.enemyHp<=0) return;
if(!state.dodge){
state.hp-=Math.floor(Math.random()*10)+5;
}
}

// ====== ENERGY ======
function regenEnergy(){
if(state.energy<100) state.energy+=2;
render();
}

// ====== END GAME ======
function checkEnd(){
if(state.enemyHp<=0){
alert("YOU WIN!");
rank.wins++;rank.elo+=25;
saveRank();reset();
}
if(state.hp<=0){
alert("YOU LOSE");
rank.losses++;rank.elo-=20;
saveRank();reset();
}
}

function saveRank(){
localStorage.setItem("rank",JSON.stringify(rank));
}

function reset(){
state.hp=100;
state.enemyHp=100;
state.energy=100;
state.combo=0;
}

// ====== UI ======
function render(){
ui("hp").innerText=state.hp;
ui("enemyHp").innerText=state.enemyHp;
ui("energy").innerText=state.energy;
ui("combo").innerText=state.combo;
ui("elo").innerText=rank.elo;
ui("player").style.left=state.x+"px";
ui("enemy").style.left=state.enemyX+"px";
}

// ====== BUTTONS ======
function bindButtons(){
document.querySelectorAll("[data-act]").forEach(b=>{
b.onclick=()=>{
let a=b.dataset.act;
if(a==="left"||a==="right") move(a);
else if(a==="attack") attack();
else if(a==="skill") skill();
else if(a==="dodge") dodge();
else if(a==="ult") ult();
};
});
}
