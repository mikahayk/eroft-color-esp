var colorCards;
var correctAnswers = 0;
const totalTries = 5;
var turn = 0;
var currentTone;
var playButton;
let gameIsOver = false;
var msg;
var synth = new Tone.Synth().toMaster();
var mouseX;
var mouseY;
var totalXY = 0;
var seed = 0;

/* An object representing which tone relates which color card */
colorPalette = [
  {
      'name': 'yellow',
      'color': '#FFD500',
      'position': 0,
      'tones': [0,1,2,3]
  },
  {
      'name': 'orange',
      'color': '#FBA31A',
      'position': 1,
      'tones': [4,5,6,7]
  },
  {
      'name': 'mid-orange',
      'color': '#F37220',
      'position': 2,
      'tones': [8,9,10,11]
  },
  {
      'name': 'red',
      'color': '#DF1E26',
      'position': 3,
      'tones': [12,13,14,15]
  },
  {
      'name': 'mid-red',
      'color': '#941A1C',
      'position': 4,
      'tones': [16,17,18,19]
  }
];
/* Array containing tones */
tones = [];
tones[0] = "E4";
tones[1] = "E5";
tones[2] = "E6";
tones[3] = "E7";
tones[4] = "G4";
tones[5] = "G5";
tones[6] = "G6";
tones[7] = "G7";
tones[8] = "B4";
tones[9] = "B5";
tones[10] = "B6";
tones[11] = "B7";
tones[12] = "C4";
tones[13] = "C5";
tones[14] = "C6";
tones[15] = "C7";
tones[16] = "A5";
tones[17] = "A4";
tones[18] = "A6";
tones[19] = "A7";

function init() {
  /* Init some variables */
  document.getElementById('correct-answers').innerHTML = correctAnswers;
  document.getElementsByClassName('total-tries')[0].innerHTML = totalTries;
  document.getElementsByClassName('total-tries')[1].innerHTML = totalTries;
  document.getElementById('turn').innerHTML = turn;
  colorCards = document.getElementsByClassName('color-card');
  playButton = document.querySelector('button');
  currentTone = selectRandomTone();
}

function setColors() {
  /* Sets initial color cards*/
  for(var key in colorPalette) {
    var value = colorPalette[key];
    let i = colorPalette[key]['position'];
    colorCards[i].style.background = colorPalette[key]['color'];
    colorCards[i].addEventListener('click', function(){
      if(!gameIsOver) {
        selectColorCard(i);
        nextTurn();
      }
    });
  }
}

function nextTurn(){
  /* Initiates next turn */
  if(turn !== totalTries) {
    turn++;
    document.getElementById('turn').innerHTML = turn;
    if(turn < totalTries) {

    } else {
      gameOver();
    }
  }

}

function play(){
  /* Play button is pressed */
  if(!gameIsOver) {
    synth.triggerAttackRelease(tones[currentTone], 0.5);
  }
}

function selectRandomTone() {
  /* Generate ramdom number between 0 and tones.length */

  // return Math.floor((Math.random() * tones.length) + 0);
  return randInRange(seed, 0, tones.length);
}

function checkAnswer(pos) {
  /* Check if the answer is correct */
  for(var i=0; i< colorPalette.length; i++) {
    if(colorPalette[i]['position'] === pos) {
      if(colorPalette[i]['tones'].indexOf(currentTone) != -1) {
        incrementCorrectAnswer();
      }
    }
  }
}

function incrementCorrectAnswer() {
  /* Correct answer counter */
  correctAnswers++;
  document.getElementById('correct-answers').innerHTML = correctAnswers;
}

function changeTone() {
  /* Change current tone */
  currentTone = selectRandomTone();
}

function selectColorCard(pos) {
  /* Select card */
  checkAnswer(pos);
  changeTone();
}

document.addEventListener('DOMContentLoaded', function() {
  /* Add event listener when DOM is loaded */
  playButton.addEventListener('click', function(){
    play();
  });
}, false);

function gameOver(){
  /* Experiment is over */
  gameIsOver = true;
  document.getElementById('score').style.display = 'inline-block';
  if(correctAnswers == 5) {
    msg = 'Are you from the Matrix?';
  } else if(correctAnswers == 3 || correctAnswers == 4) {
    msg = 'You are clairvoyant!';
  } else if(correctAnswers == 1 || correctAnswers == 2) {
    msg = 'You are average';
  } else if(correctAnswers == 0) {
    msg = 'You are cursed';
  }
  document.getElementById('message').innerHTML = msg;
}

function randInRange(seed, min, max) {
  return seed % (max + 1 - min) + min;
}
document.addEventListener("mousemove", function(event){
  /* Get mouse corrdinates as a source of random events and perform some math */
  mouseX = event.clientX;
  mouseY = event.clientY;

  totalXY += mouseX + mouseY;
  seed = parseInt(((totalXY * totalXY) / 100 ) % 10000) ;
});

/* Run the script */
init();
setColors();
