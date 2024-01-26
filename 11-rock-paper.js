let userChoice;
let computerChoice;
let result;
let gameElem=['rock','paper','scissors'];

let score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
};
// !score is equivalent to sore === null

// if(!score){
//     score={
//         wins:0,
//         losses:0,
//         ties:0
//     };
// }

updateScore();

function computerTurn(){
    computerChoice=Math.floor(Math.random()*3);
}
function userTurn(){
    userChoice=Math.floor(Math.random()*3);
}
function check(){
    result = (computerChoice === (userChoice+1)%3)?'You Lose':((computerChoice===userChoice)?'Tie':'You Win');
    
    if(result==='Tie')score.ties++;
    else if(result==='You Win')score.wins++;
    else score.losses++;

    document.querySelector('.js-result').innerHTML=result;
    document.querySelector('.js-moves')
        .innerHTML=`You
            <img class="icon" src="Move/${gameElem[userChoice]}.png">
            <img class="icon" src="Move/${gameElem[computerChoice]}.png">
            Computer`;

    updateScore();

    localStorage.setItem('score',JSON.stringify(score));
}
function updateScore(){
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
let isautoPlaying=false;
let intervalId;
function auto(){
    if(!isautoPlaying){
        intervalId=setInterval(function(){
            userTurn();
            computerTurn();
            check();
        },500);
        isautoPlaying=true;
        document.querySelector('.auto-button').innerHTML='Stop Auto Play';
    }
    else{
        clearInterval(intervalId);
        document.querySelector('.auto-button').innerHTML='Auto Play';
        isautoPlaying=false;
    }
}
