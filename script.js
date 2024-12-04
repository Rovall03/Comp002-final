let player='x';
let game= true;
let squares = document.querySelectorAll('.game-square');
let button= document.getElementById('button-play-again');
let turn= document.getElementById('turn');
let scoreboardX =document.getElementById('scoreboard-x');
let  scoreboardO =document.getElementById('scoreboard-o');

let scoreX= parseInt(localStorage.getItem('scoreX')) || 0;
let scoreO= parseInt(localStorage.getItem('scoreO')) || 0;



turn.textContent=player;
scoreboardX.textContent=scoreX;
scoreboardO.textContent=scoreO;



squares.forEach(function(square){
    square.addEventListener('click',function(){
        if(!square.textContent && game){
            square.textContent=player;
            if(checkWin()){
                game=false;
                newScore(player);
                turn.textContent=`${player} Wins!`;
            } else if (draw()){
                game=false;
                turn.textContent= "draw!";
            } else{
                switchPlayer();
            }

        }
    });

});

button.addEventListener ('click',function(){
    squares.forEach(function(square){
        square.textContent='';
    });
 game=true;
 player= 'x';
 turn.textContent=player;
});

function checkWin(){
    const winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8],
    ];
    return winCombos.some(function(combo){
        return combo.every(function(index){
            return squares [index].textContent == player;
        });
    });
}

function draw(){
    return Array.from(squares).every(function(square) {
        return square.textContent;
    });
}

function switchPlayer() {
    player = player === 'x' ? 'o' : 'x';
    turn.textContent = player;
}

function newScore(players){
    if (players==='x'){
        scoreX++;
        localStorage.setItem('scoreX',scoreX);
        scoreboardX.textContent=scoreX;
    }
    else{
        scoreO++;
        localStorage.setItem('scoreO',scoreO);
        scoreboardO.textContent=scoreO;
    }
}