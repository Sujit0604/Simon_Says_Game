let gameSeq = [];
let userSeq = [];

let hScore = 0;
// let hScore = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("--------game started--------");
        started = true;

        levelUp();
    }
   
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    // random button choose
    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);

    gameSeq.push(randomColor);
    console.log(gameSeq);

    gameFlash(randomBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;

        // hScore.push(level); 
        let HS = document.getElementById("hs");
        let hsDiv = document.getElementById("score");
        // let maxNo = Math.max(...hScore); // this is second process when hScore will be a array
        let maxNo = getMax(hScore, level); // for print High Score
        hScore = maxNo;
        hsDiv.style.backgroundColor = "black";
        hsDiv.style.color = "white";
        HS.innerText = `High Score See Here: ${maxNo}`

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        reset();
    }
}

function getMax(HighScore, CurrentLevel) {
    if(HighScore>CurrentLevel) {
        return HighScore;
    }
    return CurrentLevel;
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

