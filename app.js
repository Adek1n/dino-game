const game=document.querySelector(".game");
const ctx=game.getContext("2d");
//JUMPSTATE
let currentlyJumping=false;
//CANVAS HEIGHT/WIDTH
game.height=600
game.width=1200
//PLAYER SIZE
const playerHeight=150;
const playerWidth=150;
//POSITION PARAMS
let x=150,y=game.height-playerHeight;
let yVelocity=0;
//CACTUS TYPES
const cactusTypes=[
    {
        height:100,
        width:50
    },
    {
        height:100,
        width:100
    },
    {
        height:120,
        width:110
    }
]
//CACTUS ARRAY
let cactus=[]
//CACTUS SPAWN PROBABILITY
let cactusProb=0;
//SCORE
let score=0
//DRAW ENTITIES
function draw(){
    ctx.reset();
    ctx.font="75px Arial"
    ctx.fillText(score,50,100)
    cactus.forEach((cacti)=>{
        ctx.fillStyle="red";
        ctx.fillRect(cacti.x,cacti.y,cacti.type.width,cacti.type.height);
    })
    ctx.fillStyle="black";
    ctx.drawImage(document.querySelector("img"),x,y,playerWidth,playerHeight)
}
//GRAVITY
function gravity(){
    const playerGroundPosition=y+playerHeight;
    const groundPosition=game.height;
    if(playerGroundPosition<groundPosition){
        yVelocity+=2;
    }
    else if(playerGroundPosition>groundPosition){
        y=groundPosition-playerHeight;
        yVelocity=0;
        currentlyJumping=false;
    }
    y+=yVelocity;
    
}
//
function spawnCactus(){
    const randNum=Math.floor(Math.random()*1000);
   
    if(randNum<cactusProb){
        cactusProb=0;
        const type=cactusTypes[Math.floor(randNum/2)];
        cactus.push({
            x:game.width,
            y:game.height-type.height,
            type:type
        });
    }
    else{
        cactusProb++;
    }
}

//COLLISION
function checkCollision(onPlayer,onBound,cactus){
    cactus.forEach((cacti)=>{
        if(cacti.x+cacti.type.width<0){
            onBound(cacti);
        }
        if((cacti.x<x+playerWidth&&cacti.x-cacti.type.width>x&&cacti.y<y+playerHeight)||(cacti.y<y+playerHeight&&x>cacti.x&&cacti.x+cacti.type.width>x)){
            onPlayer();
        }
    })
}
//CACTUS MOVEMENT
function cactusMovement(){
    cactus.forEach((cacti)=>{
        cacti.x-=(15+(Math.floor(score/1000)));
    })
}

//UPDATE FUNCTION
function update(){
    score++;
    cactusMovement();
    checkCollision(()=>{
        location.reload()
    },(collidingCacti)=>{
        cactus=cactus.filter((cacti=>{
            if(cacti==collidingCacti){
                return false;
            }
            return true;
        }))
        
    },cactus);
    gravity();
    draw();
}
let fps=0;
//GAME UPDATES
setInterval(()=>{
    spawnCactus();
    update();
    fps++;
},1000/60)
setInterval(()=>{
    console.log(fps);
    fps=0;
},1000)

//KEY CONTROLS
window.addEventListener("keydown",(e)=>{
    if(e.code=="Space"&&currentlyJumping==false){
        yVelocity-=30;
        currentlyJumping=true;
    }
})