let player='x';
let game= true;
let squares = document.querySelectorAll('.game-square');
let button= document.getElementById('button-play-again');
let turn= document.getElementById('turn');

turn.textContent=player;

squares.forEach(function(square){
    square.addEventListener('click',function(){
        if(!square.textContent & game){
            square.textContent=player;
            if(checkwin()){
                game=false;

                turn.textContent=`${player}Wins!`
            }

        }
    })

})

function checkwin(){
    const wincombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8],
    ];
    return wincombos.some(function(combo){
        return combo.every(function(index){
            return squares [index].textContent == player;
        });
    });
}