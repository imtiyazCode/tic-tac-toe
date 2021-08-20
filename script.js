
// HTML Elements
const resetDiv = document.querySelector(".reset");
const statusDiv = document.querySelector(".status");
const cellDivs = document.querySelectorAll(".game-cell");


// game variable
let gameIsLive = true;
let xIsNext = true;
let winner = null;

//constant variable
const xSymbol = "×";
const oSymbol = "○";


// function

const letterToSymbol = (letter) => {
    return (letter === 'x' ? xSymbol : oSymbol);
}

const isWinner = (content) =>{
    gameIsLive = false;
    winner = content;

    if(winner === 'x'){
        statusDiv.innerHTML = `${letterToSymbol(winner)} is Won!`;
    }
    else{
        statusDiv.innerHTML = `<span> ${letterToSymbol(winner)} is Won! </span>`;
    }
}

const checkGameStatus = () =>{
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    // console.log(topLeft, topMiddle, topRight, middleLeft, middleMiddle, middleRight, bottomLeft, bottomMiddle, bottomRight);

    if(topLeft && topLeft === topMiddle && topLeft === topRight){
       isWinner(topLeft);
       cellDivs[0].classList.add('won');
       cellDivs[1].classList.add('won');
       cellDivs[2].classList.add('won');
    }
    else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
        isWinner(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    }
    else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
        isWinner(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }

    else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){
        isWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
        isWinner(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    }
    else if(topRight && topRight === middleRight && topRight === bottomRight){
        isWinner(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    }

    else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight){
        isWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topRight && topRight === middleMiddle && topRight === bottomLeft){
        isWinner(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }

    else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
        gameIsLive = false;
        statusDiv.innerHTML = `Game Is Tied!`;
    } 
    
    else{
        if(xIsNext){
            xIsNext = ! xIsNext;
            statusDiv.innerHTML = `${oSymbol} is next!`;
        }
        else{
            xIsNext = !xIsNext;
            statusDiv.innerHTML = `${xSymbol} is next!`;
        }
    }
};


// event handler

const handleReset = () =>{
    xIsNext = true;
    gameIsLive = true;
    winner = null;
    statusDiv.innerHTML = `${xSymbol} is next!`;

    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
};

const handleCellClick = (e) =>{
    const classList = e.target.classList;

    if(classList[1]==='x' || classList==='o' || gameIsLive==false){
        return;
    }

    if(xIsNext){
        classList.add('x');
        checkGameStatus();
    }
    else{
        classList.add('o');
        checkGameStatus();
    }
};

// event listner
resetDiv.addEventListener('click',handleReset);

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click',handleCellClick);
}