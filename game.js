const canvas = document.querySelector("#game");
const game = canvas.getContext('2d');
const cartel = document.querySelector(".cartel-container");
const gameContainer = document.querySelector('.game-container');
const title = document.querySelector("#title");
let cartelTitle = document.querySelector("#cartel-title");

const btnUp = document.querySelector("#up");
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');
const btnReset = document.querySelector('#reset-button');

const spanLives = document.querySelector('#vidas');
const spanTime = document.querySelector('#tiempo');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector("#result");

btnDown.addEventListener('click', goDown);
btnLeft.addEventListener('click', goLeft);
btnRight.addEventListener('click', goRight);
btnUp.addEventListener('click', goUp);
window.addEventListener('keydown', moverTeclas);
btnReset.addEventListener('click', recargar);

let canvasSize;
let elementSize;
const playerPosition = {
    x: undefined,
    y: undefined
};
const giftPosition = {
    x: undefined,
    y: undefined
};
let bombPositions = [];
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;
// let cantidadNiveles = maps.length;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function recargar () {
    location.reload();
}

function fixNumber (n){
    return Number(n.toFixed(2))
}

// esta función la puedo usar en todas las variables con números

function setCanvasSize () {

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / 10;

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
}

function startGame () {
    game.font = (elementSize - 8) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    showLives();

    bombPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);

            if(col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if (col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                bombPositions.push({
                    x: posX,
                    y: posY,
                });
            }
            game.fillText(emoji, posX, posY);
        })
    });

    movePlayer();
}

function movePlayer () {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision){
        levelWin();
    }

    const bombCollision = bombPositions.find(bomb => {
        const bombCollisionX = bomb.x.toFixed(3) == playerPosition.x.toFixed(3);
        const bombCollisionY = bomb.y.toFixed(3) == playerPosition.y.toFixed(3);
        return bombCollisionX && bombCollisionY;
    });

    if (bombCollision) {
        game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);
        setTimeout(()=>{repeatLevel();},300);
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    level++;
    startGame();
}

function gameWin() {
    clearInterval(timeInterval);

    let recordTime = localStorage.getItem('record_time');
    let playerTime = Date.now() - timeStart;
    // let niveles = localStorage.setItem('cantidad_niveles', cantidadNiveles);

    if (recordTime) {
        // if (niveles != cantidadNiveles) {
        //     localStorage.setItem('record_time', playerTime);
        //     pResult.innerHTML = 'Primer record! Supéralo!';
        // }
        if (recordTime >= playerTime){
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'Felicitaciones! Superaste el record!';
        } else {
            pResult.innerHTML = 'Pero... no superaste el record :(';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Primer record! Supéralo!';
    }
    cartel.classList.remove('inactive');
    gameContainer.classList.add('inactive');
    title.classList.add('inactive');
    cartelTitle.textContent = "Gantaste el juego! 🐰";
}

function repeatLevel(){
    lives--;
    if (lives <= 0) {
        cartel.classList.remove('inactive');
        gameContainer.classList.add('inactive');
        title.classList.add('inactive');
        cartelTitle.innerText = "Perdiste tus vidas :(";
        level = 0;
        lives = 3;
        timeStart = undefined;
    }
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame();
}

function showLives(){
    spanLives.innerHTML = emojis['HEART'].repeat(lives);
}

function showTime () {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord () {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

function goDown () {
    if ((playerPosition.y + elementSize) > canvasSize){
        console.log('out');
    } else {
        playerPosition.y += elementSize;
        startGame();
    }
}

function goUp () {
    if ((playerPosition.y.toFixed(2) - elementSize) < elementSize) {
        console.log('out')
    } else {
        playerPosition.y -= elementSize;
        startGame();
    }
}

function goRight () {
    if ((playerPosition.x + elementSize) > canvasSize) {
        console.log('out')
    } else {
        playerPosition.x += elementSize;
        startGame();
    }
}

function goLeft () {
    if ((playerPosition.x.toFixed(2) - elementSize) < elementSize) {
        console.log('out')
    } else {
        playerPosition.x -= elementSize;
        startGame();
    }
}

function moverTeclas (evento){
    switch(evento.key){
        case'ArrowDown': goDown();
        break;
        case'ArrowUp': goUp();
        break;
        case'ArrowRight': goRight();
        break;
        case'ArrowLeft': goLeft();
        break;
        default: console.log("no funciona");
        break;
    }
}

