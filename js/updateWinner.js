const nextBtn = document.querySelectorAll('#bracket i')

for (let i = 0; i < nextBtn.length; i++) {
  nextBtn[i].addEventListener('click', (e) => {
    if (i >= 16) {i = i - 16
      if (i >= 8) {i = i - 8
        if (i >= 4) {i = i - 4}
      }
    }
    getPlayerInfos(i, e.target.parentNode)
  })
}

function getPlayerInfos(index, target) {
  // Get winner and loser
  winner = target.querySelector('input')

  if (target == target.parentNode.children[0]) loser = target.parentNode.children[1].querySelector('input')
  else loser = target.parentNode.children[0].querySelector('input')

  if (!loser.value == '' && !winner.value == '') {
    console.group()
    console.log('Winner: ' + winner.value);
    console.log('Loser: ' + loser.value);

    // Get played round and define next round
    let round = target.parentNode.parentNode

    if (round.classList.contains('eighth')) {
      playedRound = 'Round of 16'
      newRound = document.querySelectorAll('.rounds.quarter input')
    }
    if (round.classList.contains('quarter')) {
      playedRound = 'Quarter final'
      newRound = document.querySelectorAll('.rounds.semi input')
    }
    if (round.classList.contains('semi')) {
      playedRound = 'Semi final'
      newRound = document.querySelectorAll('.rounds.final input')
    }
    if (round.classList.contains('final')) {
      playedRound = 'Final'
    }

    console.log('Round: ' + playedRound);
    console.log('Index of player: ' + (index+1))
    console.groupEnd()

    // Place winner in next round
    newRound[Math.floor(index/2)].value = winner.value

    // Add css classes to winner and loser
    if (!winner.parentNode.classList.contains('won')) {

      let activeTeam = winner.parentNode.parentNode.children

      for (let i = 0; i < activeTeam.length; i++) {
        // activeTeam[i].classList.remove('won')
        // activeTeam[i].classList.remove('lost')
        gsap.to(activeTeam[i], {opacity: 1})
      }

      // winner.parentNode.classList.add('won')
      // loser.parentNode.classList.add('lost')
      gsap.to(loser.parentNode, {opacity: 0.6})
    }

    // Check for font size
    scaleFontSize(newRound[Math.floor(index/2)])
  }
}