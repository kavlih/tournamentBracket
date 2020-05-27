const nextBtn8 = document.querySelectorAll('.rounds.eighth .textbox i')
const nextBtn4 = document.querySelectorAll('.rounds.quarter .textbox i')
const nextBtn2 = document.querySelectorAll('.rounds.semi .textbox i')
const nextBtn1 = document.querySelectorAll('.rounds.final .textbox i')

function updateWinner(i, j) {
  console.group()
  console.log('PlayerNo: ' + (i+1));

  let round = j.parentNode.parentNode
  if (round.classList.contains('textbox-container')) round = j.parentNode.parentNode.parentNode

  let winner = j.parentNode.querySelector('input').value
  console.log('Playername: ' + winner);

  if (round.classList.contains('eighth')) {
    newRound = document.querySelectorAll('.rounds.quarter input')
    newRound[Math.floor(i/2)].value = winner
  }
  if (round.classList.contains('quarter')) {
    newRound = document.querySelectorAll('.rounds.semi input')
    newRound[Math.floor(i/2)].value = winner
  }
  if (round.classList.contains('semi')) {
    newRound = document.querySelectorAll('.rounds.final input')
    newRound[Math.floor(i/2)].value = winner
  }
  if (round.classList.contains('final')) {
  }

  console.groupEnd()
}

for (let i = 0; i < nextBtn8.length; i++) {
  nextBtn8[i].addEventListener('click', (e) => {
    updateWinner(i, e.target)
  })  
}
for (let i = 0; i < nextBtn4.length; i++) {
  nextBtn4[i].addEventListener('click', (e) => {
    updateWinner(i, e.target)
  })  
}
for (let i = 0; i < nextBtn2.length; i++) {
  nextBtn2[i].addEventListener('click', (e) => {
    updateWinner(i, e.target)
  })  
}
for (let i = 0; i < nextBtn1.length; i++) {
  nextBtn1[i].addEventListener('click', (e) => {
    updateWinner(i, e.target)
  })  
}