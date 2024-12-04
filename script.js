let player='x';///x is to player
let game= true; ///boolean to see if game is still going
let squares = document.querySelectorAll('.game-square');///gets element with class game square
let button= document.getElementById('button-play-again');///gets button play again
let turn= document.getElementById('turn');//gets the turn element 
let scoreboardX =document.getElementById('scoreboard-x');//gets x board and shows count
let  scoreboardO =document.getElementById('scoreboard-o');//gets 0 board element and shows count

let scoreX= parseInt(localStorage.getItem('scoreX')) || 0;//stores score for x when play again is hit
let scoreO= parseInt(localStorage.getItem('scoreO')) || 0;//stores score for o when paly again is hit



turn.textContent=player;//sets turn
scoreboardX.textContent=scoreX;//sets score
scoreboardO.textContent=scoreO;//sets the score



squares.forEach(function(square){//for each checks all squares /adds event listener
    square.addEventListener('click',function(){// when clicked on an empty box function runs
        if(!square.textContent && game){//if nothing in square x or o is added
            square.textContent=player;//x or o
            if(checkWin()){//runs to see if game is won
                game=false;//if game has been won
                newScore(player);//updates score 
                turn.textContent=`${player} Wins!`;//text when game has been won
            } else if (draw()){//checks for draws
                game=false;//checks if game is still active  
                turn.textContent= "draw!";//if no one wins draw is shown
            } else{ switchPlayer(); }//if no win or draw changes players 

        }
    });

});

button.addEventListener ('click',function(){//event listener added to button when clicked 
    squares.forEach(function(square){//reset to default 
        square.textContent='';//open for content to be determined when player selects square 
    });
 game=true;//game is active 
 player= 'x';//game set back to x
 turn.textContent=player;// game player set back to x
});

function checkWin(){//function to show combination for a win
    const winCombos = [//combinations for a win  
        [0,1,2], //top row
        [3,4,5],//middle  row
        [6,7,8],//bottom row
        [0,3,6],//first col
        [1,4,7],//middle col
        [2,5,8],//3rd  col
        [2,4,6],//across
        [0,4,8],//across
    ];
    return winCombos.some(function(combo){//checks if somme part of the wins combos has been met
        return combo.every(function(index){//checks if combo is met with all the same x or o for win
            return squares [index].textContent == player;//returns id true or not if true shows who won
        });
    });
}

function draw(){//function to check for draws 
    return Array.from(squares).every(function(square) {//checks for empty squares 
        return square.textContent;//returns result after checking opening if draw or not
    });
}

function switchPlayer() {//function to change players
    player = player === 'x' ? 'o' : 'x';//changes player from x to o after every turn
    turn.textContent = player;//displays correct x or o
}

function newScore(players){//function to update score board
    if (players==='x'){//if player x win
        scoreX++;//add wins 
        localStorage.setItem('scoreX',scoreX);//saves score 
        scoreboardX.textContent=scoreX;//displays score
    }
    else{//if not x but o wins 
        scoreO++;//add wins 
        localStorage.setItem('scoreO',scoreO);//saves scor
        scoreboardO.textContent=scoreO;//displays score
    }
}