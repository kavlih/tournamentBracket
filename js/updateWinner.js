const allNextBtns = document.querySelectorAll('#bracket i')

for (let i = 0; i < allNextBtns.length; i++) {
  allNextBtns[i].addEventListener('click', (e) => {
    // Functions ------------------------------------------
    updateWinner(i, e.target)
    // Check font size
    scaleFontSize(newIndex)
    
    // GSAP Animation - arrow click ------------------------------------------
    const tlArrowsClick = new gsap.timeline()

    tlArrowsClick
    .to(allNextBtns[i], {scaleY:0.8, ease: Power1.easeInOut}, 0)
    .to(allNextBtns[i], {opacity: 0, duration: 0.15}, 0.4)
    
    if (allNextBtns[i].parentNode.parentNode.parentNode.classList.contains('right'))
    tlArrowsClick.to(allNextBtns[i], {x: -25, ease: Power4.easeIn}, 0)

    if (allNextBtns[i].parentNode.parentNode.parentNode.classList.contains('left'))
    tlArrowsClick.to(allNextBtns[i], {x: 25, ease: Power4.easeIn}, 0)

    // GSAP Animation - update winner ------------------------------------------
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
    .to(loser, {opacity: 0.4}, 0)
    .from(newIndex, {opacity: 0}, 0)

    if (newIndex.parentNode.parentNode.parentNode.classList.contains('left') || newIndex.parentNode.classList.contains('top')) tlUpdateWinner.from(newIndex, {x: -40}, 0)

    if (newIndex.parentNode.parentNode.parentNode.classList.contains('right') || newIndex.parentNode.classList.contains('bottom')) tlUpdateWinner.from(newIndex, {x: 40}, 0)

    if (loser.parentNode.parentNode.parentNode.classList.contains('semi')) {
      if (loser.parentNode.parentNode.parentNode.classList.contains('left')){
        tlUpdateWinner.from('#bracket .smallfinal.left input', {delay: 0.2, x: -40, opacity: 0}, 0)
      }
      if (loser.parentNode.parentNode.parentNode.classList.contains('right')){
        tlUpdateWinner.from('#bracket .smallfinal.right input', {delay: 0.2, x: 40, opacity: 0}, 0)
      }
    }
  })
}

function updateWinner(index, arrow){
  let textbox = arrow.parentNode
  let teams = textbox.parentNode

  // Get played round & set next round
  playedRound = 'Round of 16'
  nextRound = document.querySelectorAll('.rounds.quarter input')
  if (index >= 16) {
    index = index - 16
    playedRound = 'Quarter final'
    nextRound = document.querySelectorAll('.rounds.semi input')
    if (index >= 8) {
      index = index - 8
      playedRound = 'Semi final'
      nextRound = document.querySelectorAll('.rounds.final input')
      if (index >= 4) {
        index = index - 4}
        playedRound = 'Final'
    }
  } 
  
  console.group()
  console.log('Round: ' + playedRound);
  console.log('Playerindex: ' + (index+1))

  // Get winner and loser
  winner = textbox.querySelector('input')

  if (textbox == teams.children[0]) loser = teams.children[1].querySelector('input')
  else loser = teams.children[0].querySelector('input')

  console.log('Winner: ' + winner.value);
  console.log('Loser: ' + loser.value);
  console.groupEnd()

  // Set new Index
  newIndex = nextRound[Math.floor(index/2)]

  // Add winner to new round
  newIndex.value = winner.value

  // Add loser to smallfinal
  if (loser.parentNode.parentNode.parentNode.classList.contains('semi')) {
    if (loser.parentNode.parentNode.parentNode.classList.contains('left')){
      document.querySelector('#bracket .smallfinal.left input').value = loser.value
    }
    if (loser.parentNode.parentNode.parentNode.classList.contains('right')){
      document.querySelector('#bracket .smallfinal.right input').value = loser.value
    }
  }

  // Add css classes to winner and loser
  if (!textbox.classList.contains('won')) {
    for (let i = 0; i < teams.children.length; i++) {
      teams.children[i].classList.remove('won')
      teams.children[i].classList.remove('lost')
    }

    winner.parentNode.classList.add('won')
    loser.parentNode.classList.add('lost')
  }
}