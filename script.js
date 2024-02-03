let gameSeq=[];
let userSeq=[];
let maxScore=0;

let btns=["yellow","red","purple","green"];
let p=document.querySelector('p');
p.innerText=`HighScore - ${maxScore}`;

let started= false;
let level=0;

let h2=document.querySelector('h2');

document.addEventListener('keypress',()=>{
    if(started===false){
        console.log("game started")
        started=true;
        levelup();
    }
})

const gameFlash=(btn)=>{
    btn.classList.add("flash");

    setTimeout(()=>{
        btn.classList.remove("flash");
    },250);
}

const userFlash=(btn)=>{
    btn.classList.add("userFlash");

    setTimeout(()=>{
        btn.classList.remove("userFlash");
    },250);
}

const levelup=()=>{
    userSeq=[];
     level++;
     h2.innerText=`level-${level}`;

     let randInd=Math.floor(Math.random()*3);
     let randColor=btns[randInd];
     let randBtn=document.querySelector(`.${randColor}`);

     gameSeq.push(randColor);
     gameFlash(randBtn);
} 


const checkAns=(idx)=>{
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup,800);
             if(maxScore<level){
                setTimeout(()=>{
                    maxScore=level-1;
                    p.innerText=`HighScore - ${maxScore}`;
                },1000)
                
            }
        }
    }
    else{
        h2.innerHTML=`Game Over! Your score was<b> ${level-1}</b> <br>Press any key to start.`;
        if(maxScore<level){
            maxScore=level-1;
            p.innerText=`HighScore - ${maxScore}`;
        }
        document.querySelector('body').style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector('body').style.backgroundColor="white";
        },150)
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

const reset=()=>{
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}