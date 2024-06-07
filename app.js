let start= false; //to track game is ongoing or not
let level= 0; //to track current level
let body= document.querySelector('body');
let h3= document.querySelector('h3');
let btns= document.querySelectorAll('.btn'); //it will contain all btn as a collection of objects
let gameFlashBtn= []; //it will store the sequence in which game genrate random btn, by storing its color
let userFlashBtn= []; //it will store the sequence in which user click btns, by storing its color
let highestLevel= level;
let h4= document.querySelector('h4');


function randomBtn(event){
    let randomNum= Math.floor(Math.random()*4); //genarating a random number between 0 and 3
    let btn= btns[randomNum]; // btn will contain a random btn as obj
    return btn; // a random button will return as object
}

function gameFlash(btn){
    //now btn conatin a random btn
    btn.classList.add('gameFlash'); //now background of a random btn will become white
    gameFlashBtn.push(btn.classList[0]); //adding flashed btn by game in perticular array
    setTimeout(function(){
        btn.classList.remove('gameFlash');
    }, 250); // after this 0.25s white backgroud color will remove
    // ovarall it will look link flashing of a random btn
}

function userFlash(btn){
    //now btn conatin a btn which is clicked by user
    btn.classList.add('userFlash');
    userFlashBtn.push(btn.classList[0]); //adding flashed btn by user in perticular array
    setTimeout(function(){
        btn.classList.remove('userFlash');
    }, 200);
    // ovarall it will look link flashing of user clicked btn
}

function gameStart(event){
    if(start===false){ //because if game is initialy off, then only it will start
        start= true;
        level++;
        h3.innerText= `Current Level : ${level}`;
        h4.innerText= `highest level : ${highestLevel}`;
        btn= randomBtn(); // btn will conatin a random btn
        gameFlash(btn);
    }
}

function gameOverEffect(){
    body.classList.add('gameOver');
    setTimeout(function(){
        body.classList.remove('gameOver');
    }, 150);
    //ovarall its looks like game is over
}

function highestLevelPrint(){
    if(level > highestLevel){
        highestLevel= level;
    }
    h4.innerText= `highest level : ${highestLevel}`;
}

function gameOver(){
    gameOverEffect();
    highestLevelPrint();
    start= false;
    level= 0;
    gameFlashBtn= [];
    userFlashBtn= [];
    h3.innerText= "Game is Over, press any key to start again";
}

function levelUp(){
    level++;
    h3.innerText= `Current Level : ${level}`;
    userFlashBtn= []; //because, in a new level user have to click full sequence from start to win
    btn= randomBtn(); // again, btn will conatin a random btn
    gameFlash(btn);
}

function checkArr(){
    let same= true; //same will track both array are same of not
    for(let i=0; i<userFlashBtn.length; i++){
        if(gameFlashBtn[i]!=userFlashBtn[i]){
            same= false;
            gameOver();
        }
    }
    if(same===true && userFlashBtn.length===gameFlashBtn.length)
    //now below code of this function will execute if both array are exactly same
    levelUp();
}

function matchSeq(event){
    if(start===true){ // because, if game is off then user click will not work
        userFlash(event.target); // user clicked btn will flash
        checkArr();
    }
}


body.addEventListener('keydown', gameStart); //initially after pressing any key game will begin

for(btn of btns){
    btn.addEventListener('click',matchSeq);
}