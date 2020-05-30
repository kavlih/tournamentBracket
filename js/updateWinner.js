(function(){
  const allNextBtns = document.querySelectorAll('#bracket i')

  for (let i = 0; i < allNextBtns.length; i++) {
    allNextBtns[i].addEventListener('click', (e) => {
      if (i >= 16) {i = i - 16
        if (i >= 8) {i = i - 8
          if (i >= 4) {i = i - 4}
        }
      }
      updateWinner(i, e.target.parentNode)
    })
  }

  function updateWinner(index, target) {
    // Get winner and loser
    winner = target.querySelector('input')

    if (target == target.parentNode.children[0]) loser = target.parentNode.children[1].querySelector('input')
    else loser = target.parentNode.children[0].querySelector('input')

    if (!loser.value == '' && !winner.value == '') {
      console.group()
      console.log('Winner: ' + winner.value);
      console.log('Loser: ' + loser.value);

      // Get played round and set new round
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

      // Set new Index
      newIndex = newRound[Math.floor(index/2)]
      // Add winner to new round
      newIndex.value = winner.value

      // Add css classes to winner and loser
      if (!winner.parentNode.classList.contains('won')) {

        let activeTeam = winner.parentNode.parentNode.children

        for (let i = 0; i < activeTeam.length; i++) {
          activeTeam[i].classList.remove('won')
          activeTeam[i].classList.remove('lost')
        }

        winner.parentNode.classList.add('won')
        loser.parentNode.classList.add('lost')

        // GSAP Animation ------------------------------------------
        const tlUpdateWinner = new gsap.timeline({
          defaults: {
            delay: 0.2,
          },
          onStart: function () {
            gsap.set(loser, {clearProps: 'opacity'});
            gsap.set(winner, {clearProps: 'opacity'});
          }
        })

        tlUpdateWinner
        .to(loser, {opacity: 0.4}, 0.3)
        .from(newIndex, {opacity: 0}, 0)

        if (newIndex.parentNode.parentNode.parentNode.classList.contains('left')) tlUpdateWinner.from(newIndex, {x: -40}, 0)
        if (newIndex.parentNode.parentNode.parentNode.classList.contains('right')) tlUpdateWinner.from(newIndex, {x: 40}, 0)
      }

      // Check font size
      scaleFontSize(newIndex)
      showArrows(newIndex)
    } else {
      console.log('please add a player');
    }
  }
})()

// Add 'please add a player' message
// Add losers of semi finals to small final
// Add Animation for final
// Add Animation for 3rd