const statusDisplay = document.querySelector(".game-status");

//We will use gameActive to pause the game in case of an end scenario
let gameActive = true;
let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

/* Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with 
current data every time we need it. */

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => 'Game ended in a draw!';

/*
We update our internal game state to reflect the played move, 
as well as update the user interface to reflect the played move
*/

function handelCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;


}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let noOfX=[];

function handelPlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O") {

        let emptyArray = [];
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === "") {
             
                emptyArray.push(i);
            }
        }
   
         if(gameState.includes("X")){
                noOfX.push("X");
               
            }
            if(noOfX.length===1){
                let randomCell = document.querySelectorAll(".cell");
                const randomCellIndex = Math.floor(Math.random() * emptyArray.length);
                let newindex = emptyArray[randomCellIndex];
                gameState[newindex] = currentPlayer;
              
                randomCell[newindex].innerHTML = currentPlayer;
            
            }
            
    
      
        for (let j = 0; j < winningConditions.length; j++) {
            let randomCell = document.querySelectorAll(".cell");
            const winningCondition = winningConditions[j];
           
            let m = gameState[winningCondition[0]];
            let n = gameState[winningCondition[1]];
            let o = gameState[winningCondition[2]];
            
        
        if (m ===n && n!=="" && m!=="" && o === "") {
            gameState[winningCondition[2]] = currentPlayer;
            randomCell[winningCondition[2]].innerHTML = currentPlayer;
           
            break;
        }
         if (m ===o && o!=="" && m!=="" && n === "") {
            gameState[winningCondition[1]] = currentPlayer;
            randomCell[winningCondition[1]].innerHTML = currentPlayer;
         
            break;
        }
        else if (n ===o&& o!=="" && n!=="" && m === "") {
            gameState[winningCondition[0]] = currentPlayer;
            randomCell[winningCondition[0]].innerHTML = currentPlayer;
           
            break;
        }
    }

    handelResultValidationAuto();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}
}
function handelResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    /* 
We will check weather there are any values in our game state array 
that are still not populated with a player sign
*/
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    /*
If we get to here we know that the no one won the game yet, 
and that there are still moves to be played, so we continue by changing the current player.
*/
    handelPlayerChange();       // call function 5


}
function handelCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    /*
Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid. 
Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
integer(number)
*/
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index")
    );
    /* 
Next up we need to check whether the call has already been played, 
or if the game is paused. If either of those is true we will simply ignore the click.
*/
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    /* 
If everything is in order we will proceed with the game flow
*/
    handelCellPlayed(clickedCell, clickedCellIndex);                              //call function 3
    handelResultValidation();                                                     //call function 4

}
function handelRestartGame() {

    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = "";
    noOfX=[];
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", handelCellClick);                               // call function 2
});
document.querySelector(".game-restart").addEventListener("click", handelRestartGame);    // call function 6


function handelResultValidationAuto() {

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    /* 
We will check weather there are any values in our game state array 
that are still not populated with a player sign
*/
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
}
