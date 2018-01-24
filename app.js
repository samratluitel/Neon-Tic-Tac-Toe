let origBoard;
let huPlayer;
let aiPlayer;
const cells = document.querySelectorAll("td");
const selectPlayer = document.querySelectorAll(".select-P");
const winCombos =[
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];

document.querySelector("#replay-button").addEventListener('click',()=>{
    document.querySelector(".header").innerHTML=`<span>Tic Tac Toe</span>`;
    document.querySelector(".select-player").style.display="flex";
    document.querySelector("table").style.display="none";
},false);
//selecting player functionality
    for(let player of selectPlayer){
        player.addEventListener("click",()=>{
            if(player.getAttribute('id')=="X"){
                huPlayer="X";
                aiPlayer="O";
            }else{
                huPlayer="O";
                aiPlayer="X";
            }
            StartGame();
        });
    }

function StartGame(){
    document.querySelector(".select-player").style.display="none";
    document.querySelector("table").style.display="block";
    origBoard=Array.from(Array(9).keys());
    document.querySelector(".header").innerHTML=`<span>Tic Tac Toe</span>`;
    for(let cell of cells){
        cell.innerText="";
        cell.classList.remove("O");
        cell.classList.remove("X");
        cell.classList.remove("blinking");
        cell.addEventListener('click',turnClick,false);
    }
}
function turnClick(square){
    if(typeof origBoard[square.target.id] =='number'){
        //check win yet to made
        turn(square.target.id,huPlayer);
        if(!CheckWin(origBoard,huPlayer) && !CheckTie()) turn(bestSpot(),aiPlayer);
    }
}

function turn(squareID,player){
    cells[squareID].innerText=player;
    cells[squareID].classList.add((player=="X")?"X":"O");
    origBoard[squareID]=player;
    let gameWon = CheckWin(origBoard,player);
    if(gameWon) gameOver(gameWon);
}

function CheckWin(board,player){
    let plays= board.reduce((a,e,i)=>(e==player)?a.concat(i):a,[]);
    let gameWon=null;
    for(let [index,win] of winCombos.entries()){
        if(win.every((elem)=>plays.indexOf(elem)>-1)){
            gameWon={index,player};
        }
    }
    return gameWon;
}
function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        cells[index].classList.add("blinking");
    }
    DisplayWinner(gameWon.player);
    for(let cell of cells){
        cell.removeEventListener('click',turnClick,false);
    }
}
function DisplayWinner(player){
    if(player!="O"&&player!="X"){
        document.querySelector(".header").innerHTML=`<span class="tie">Tie Game</span>`
    }else{
        document.querySelector(".header").innerHTML =`<span id="${player}">${player}</span><span class="won">won</span>`
    }
}
function emptySquares(){
    return origBoard.filter(s =>typeof s=="number");
}
function CheckTie(){
    if(emptySquares().length==0){
        DisplayWinner("Tie Game");
        return true;
    }
    return false;
}
function bestSpot(){
    return minimax(origBoard,aiPlayer).index;
}
function minimax(newboard,player){
    let availSpots= emptySquares();
    if(CheckWin(newboard,huPlayer)){
        return{score:-10};
    }else if(CheckWin(newboard,aiPlayer)){
        return{score:10};
    }else if(availSpots.length==0){
        return {score:0};
    }
    var moves=[];
    for(var i=0;i<availSpots.length;i++){
        var move={};
        move.index = newboard[availSpots[i]];
        newboard[availSpots[i]]=player;

        if(player==aiPlayer){
            var result = minimax(newboard,huPlayer);
            move.score=result.score;
        }else{
            var result = minimax(newboard,aiPlayer);
            move.score=result.score;
        }
        moves.push(move);
        newboard[availSpots[i]]=move.index;
    }
    var bestmove;
    if(player==aiPlayer){
        var bestScore = -10000;
        for(var i=0;i<moves.length;i++){
            if(moves[i].score>bestScore){
                bestScore = moves[i].score;
                bestmove=i;
            }
        }
    }else{
        var bestScore =10000;
        for(var i=0;i<moves.length;i++){
            if(moves[i].score<bestScore){
                bestScore=moves[i].score;
                bestmove =i;
            }
        }
    }
    return moves[bestmove];
}