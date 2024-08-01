const game=document.querySelector(".game");
const ctx=game.getContext("2d");
//PLAYER SIZE
const playerHeight=150;
const playerWidth=150;
//POSITION PARAMS
let x=150,y=0;
let yVelocity=0;
//JUMPSTATE
let currentlyJumping=false;

//CANVAS HEIGHT/WIDTH
game.height=game.getBoundingClientRect().height;
game.width=game.getBoundingClientRect().width;

//GAME UPDATES
setInterval(()=>{
    console.log(currentlyJumping);
    const playerGroundPosition=y+playerHeight;
    const groundPosition=game.height;
    //GRAVITY
    if(playerGroundPosition<groundPosition){
        yVelocity+=2;
    }
    else if(playerGroundPosition>groundPosition){
        y=groundPosition-playerHeight;
        yVelocity=0;
        currentlyJumping=false;
    }
    y+=yVelocity;
    
    ctx.reset();
    ctx.fillRect(x,y,playerWidth,playerHeight);
},1000/60)

window.addEventListener("keydown",(e)=>{
    if(e.code=="Space"&&currentlyJumping==false){
        yVelocity-=30;
        currentlyJumping=true;
    }
})