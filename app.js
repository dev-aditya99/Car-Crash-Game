
let controlUp = document.querySelector("#up-id");
let controlDown = document.querySelector("#down-id");
let controlRight = document.querySelector("#right-id");
let controlLeft = document.querySelector("#left-id");


let gamePlayArea = document.querySelector(".play-game-area");
let playGameBtn = document.querySelector("#play");

let myScore = document.querySelector("#score-id");
let myHighScore = document.querySelector("#high-score-id");

let road = document.querySelector("#road");
let trees = document.querySelector(".trees");
let lakes = document.querySelector(".lakes");
let myCar = document.querySelector("#my-car-div");

let enemyAllCars = document.querySelector(".cars");
let enemyCar1 = document.querySelector("#e-car-1-div");
let enemyCar2 = document.querySelector("#e-car-2-div");
let enemyCar3 = document.querySelector("#e-car-3-div");
let enemyCar4 = document.querySelector("#e-car-4-div");
let enemyCar5 = document.querySelector("#e-car-5-div");
let enemyCar6 = document.querySelector("#e-car-6-div");

let posY = 80;
let posX = 39;

let score = 0;

const myCarSfx = new Audio("Sounds/car-acceleration-inside-car-7087.mp3");
const carHorn = new Audio("Sounds/car-horn-beep-beep-two-beeps-honk-honk-6188.mp3");
const carCrash = new Audio("Sounds/crash-7075.mp3");

let isGameStart = false;
let playInterval = "";

playGameBtn.addEventListener("click", () => {
    posY = 80;
    posX = 39;

    myCar.style.left = "39%";
    myCar.style.top = "80%";

    score = 0;
    randomPosOfEnemies();
    trees.style.animation = "treesAnime 4.5s infinite linear";
    lakes.style.animation = "treesAnime 4.5s infinite linear";
    road.style.animation = "roadAnime 1s infinite linear";
    for (let i = 1; i <= 6; i++) {
        // enemyAllCars.children[i].style.top = "initial";
        enemyAllCars.children[i].style.top = `-${i + i + 5}0%`;
        enemyAllCars.children[i].style.animationDuration = `${i + i + i + 5}s`;
        enemyAllCars.children[i].style.animationName = "enemyCarsAnime";
    }
    gamePlayArea.style.display = "none";
    playInterval = setInterval(() => {
        playingGame();
    }, 100)
})

controlUp.addEventListener("click", () => {
    posY -= 2;
    myCar.style.top = posY + "%";
})

controlDown.addEventListener("click", () => {
    posY += 2;
    myCar.style.top = posY + "%";
})

controlLeft.addEventListener("click", () => {
    posX -= 3;
    myCar.style.left = posX + "%";
})

controlRight.addEventListener("click", () => {
    posX += 3;
    myCar.style.left = posX + "%";
})



document.addEventListener("keydown", (e) => {
    changeMyCarPoss(e);
})

const changeMyCarPoss = (e) => {
    if (e.key === "ArrowUp") {
        posY -= 2;
    } else if (e.key === "ArrowDown") {
        posY += 2;
    } else if (e.key === "ArrowLeft") {
        posX -= 3;
    } else if (e.key === "ArrowRight") {
        posX += 3;
    }

    myCar.style.top = posY + "%";
    myCar.style.left = posX + "%";
}


let rNumber1 = 0;
let rNumber2 = 0;
let rNumber3 = 0;
let rNumber4 = 0;
let rNumber5 = 0;
let rNumber6 = 0;

let rNumbersArr = [rNumber1, rNumber2, rNumber3, rNumber4, rNumber5, rNumber6];

let myCarSfxInterval = "";
let myCarHornSfxInterval = "";

let rPossIntervalHolder1 = 0;
let rPossIntervalHolder2 = 0;
let rPossIntervalHolder3 = 0;
let rPossIntervalHolder4 = 0;
let rPossIntervalHolder5 = 0;
let rPossIntervalHolder6 = 0;

let rPossIntervalHolderArr = [rPossIntervalHolder1, rPossIntervalHolder2, rPossIntervalHolder3, rPossIntervalHolder4, rPossIntervalHolder5, rPossIntervalHolder6];

const randomPosOfEnemies = () => {
    myCarSfx.play();
    carHorn.play();

    myCarSfxInterval = setInterval(() => {
        myCarSfx.play();
    }, 2000);

    myCarHornSfxInterval = setInterval(() => {
        carHorn.play();
    }, 28000);


    for (let i = 1; i <= 6; i++) {
        rNumbersArr[i] = 0;

        rPossIntervalHolderArr[i] = setInterval(() => {
            rNumbersArr[i] = Math.floor(Math.random() * 100);

            if (rNumbersArr[i] > 84) {
                rNumbersArr[i] = Math.floor(Math.random() * 100);
            }

            enemyAllCars.children[i].style.left = (rNumbersArr[i]) + "%";
            console.log(i);

        }, (i + i + i + 5) * 1000);
    }
}

let enemyCar1Poss = "";
let enemyCar2Poss = "";
let enemyCar3Poss = "";
let enemyCar4Poss = "";
let enemyCar5Poss = "";
let enemyCar6Poss = "";

let carChilds = enemyAllCars.children;
let enemyCarsPossArr = [enemyCar1Poss, enemyCar2Poss, enemyCar3Poss, enemyCar4Poss, enemyCar5Poss, enemyCar6Poss];

let isScoreSet = false;
localStorage.setItem("isScoreSet", isScoreSet);

const playingGame = () => {
    let myCarPoss = myCar.getBoundingClientRect();
    let roadPoss = road.getBoundingClientRect();
    let isAnimation = "";


    for (let i = 1; i < carChilds.length; i++) {
        enemyCarsPossArr[i] = carChilds[i].getBoundingClientRect();

        if (((myCarPoss.top < enemyCarsPossArr[i].bottom && myCarPoss.top > enemyCarsPossArr[i].top) || (myCarPoss.bottom < enemyCarsPossArr[i].bottom && myCarPoss.bottom > enemyCarsPossArr[i].top)) && ((myCarPoss.right > enemyCarsPossArr[i].left && myCarPoss.right < enemyCarsPossArr[i].right) || (myCarPoss.left < enemyCarsPossArr[i].right && myCarPoss.left > enemyCarsPossArr[i].left))) {
            isAnimation = "none";
        }

        if (roadPoss.left > myCarPoss.left || roadPoss.right < myCarPoss.right) {
            isAnimation = "none";
        }

        if (isAnimation === "none") {
            myCarSfx.pause();
            carCrash.play();
            clearInterval(playInterval);
            clearInterval(myCarSfxInterval);
            clearInterval(myCarHornSfxInterval);

            road.style.animation = isAnimation;
            trees.style.animation = isAnimation;
            lakes.style.animation = isAnimation;

            for (let i = 1; i <= 6; i++) {
                clearInterval(rPossIntervalHolderArr[i]);
                enemyCarsPossArr[i] = carChilds[i].getBoundingClientRect();
                carChilds[i].style.animation = "";
                carChilds[i].style.top = enemyCarsPossArr[i].top + "px";
            }

            trees.style.top = trees.getBoundingClientRect().top;
            gamePlayArea.style.display = "flex";
            playGameBtn.textContent = "Play Again";

            document.addEventListener("keydown", (e) => {
                if (e.key) {
                    return false;
                }
            })
        }
    }

    let newIsScoreSet = localStorage.getItem("isScoreSet");
    let getHighScore = "";
    let highScore = score;
    if (newIsScoreSet === "false") {
        localStorage.setItem("CarHighScore", highScore);
        isScoreSet = true;
        localStorage.setItem("isScoreSet", isScoreSet);
    } else {
        getHighScore = localStorage.getItem("CarHighScore");
        if (score >= getHighScore) {
            localStorage.setItem("CarHighScore", highScore + 1);
        }

    }


    score++;
    myScore.textContent = score + "Km";
    myHighScore.textContent = getHighScore + "Km";

}


