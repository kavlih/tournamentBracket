const allNextBtns = document.querySelectorAll('#bracket i')

for (let i = 0; i < allNextBtns.length; i++) {
  allNextBtns[i].addEventListener('click', (e) => {
    // If not final or smallfinal ------------------------------------------
    if(!allNextBtns[i].parentNode.parentNode.parentNode.classList.contains('final') && !allNextBtns[i].parentNode.parentNode.classList.contains('smallfinal')){
      // Function ------------------------------------------
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
          tlUpdateWinner.from('#bracket .smallfinal.left .player', {delay: 0.2, x: -40, opacity: 0}, 0)
        }
        if (loser.parentNode.parentNode.parentNode.classList.contains('right')){
          tlUpdateWinner.from('#bracket .smallfinal.right .player', {delay: 0.2, x: 40, opacity: 0}, 0)
        }
      }
    }

    // If final ------------------------------------------
    if(allNextBtns[i].parentNode.parentNode.parentNode.classList.contains('final')){
      // Function ------------------------------------------
      finalWinner(e.target)
      
      // GSAP Animation - final winner ------------------------------------------
      const tlfinalWinner = new gsap.timeline({
        defaults: {
          duration: 1.5,
          ease: Elastic.easeOut,
        },
        onStart: function () {
          gsap.set(loser, {clearProps: 'opacity'});
          gsap.set(winner, {clearProps: 'opacity'});
        }
      })

      tlfinalWinner
      .to(loser, {opacity: 0.4, ease: Power1.easeInOut}, 0)
      .to('#rounds-container, #side-bracket', {opacity: 0.05, ease: Power1.easeInOut}, 0)

      .add('1st')

      .set('#end-screen', {height: '100%', width: '100%', y: 0}, '1st')
      .to('#trophy-container', {height: '60vh', width: '60vh'}, '1st')
      .to('#winnerbox', {display: 'flex', maxWidth: 'unset', height: '16%', }, '1st')
      .to('#trophy', {marginBottom: '-2.5vh'}, '1st')
      .to('#logo img', {height: '24vh'}, '1st')

      .add(function() {confetti.toggle()}, '1st')
      .add(function(){scaleFontSize(document.querySelector('#winner'))}, '1st+=1')
      .fromTo('#winner', {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '1st')

      .set('#second-container, #third-container', {display: 'flex'})
      .fromTo('#second-container', {scale: 0, x: '21.5vw'}, {scale: 1, x: '5vw'})
      .fromTo('#third-container', {scale: 0, x: '-21.5vw'}, {scale: 1, x: '-5vw'})
    }

    // If smallfinal ------------------------------------------
    if(allNextBtns[i].parentNode.parentNode.classList.contains('smallfinal')){
      // Function ------------------------------------------
      smallfinalWinner(e.target)
    }
  })
}

// ------------------------------------------------------------------------------------
function updateWinner(index, arrow){
  let textbox = arrow.parentNode
  let teams = textbox.parentNode

  // Get played round & set next round
  playedRound = 'Round of 16'
  nextRound = document.querySelectorAll('.rounds.quarter .player')
  if (index >= 16) {
    index = index - 16
    playedRound = 'Quarter final'
    nextRound = document.querySelectorAll('.rounds.semi .player')
    if (index >= 8) {
      index = index - 8
      playedRound = 'Semi final'
      nextRound = document.querySelectorAll('.rounds.final .player')
      if (index >= 4) {
        index = index - 4
        playedRound = 'Final'
      }
    }
  } 
  
  console.group('Player & game infos')
  console.log('Round: ' + playedRound);
  console.log('Playerindex: ' + (index+1))

  // Get winner and loser
  winner = textbox.querySelector('.player')

  if (textbox == teams.children[0]) loser = teams.children[1].querySelector('.player')
  else loser = teams.children[0].querySelector('.player')

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
      document.querySelector('#bracket .smallfinal.left .player').value = loser.value
    }
    if (loser.parentNode.parentNode.parentNode.classList.contains('right')){
      document.querySelector('#bracket .smallfinal.right .player').value = loser.value
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

// ------------------------------------------------------------------------------------
function finalWinner(arrow) {
  let textbox = arrow.parentNode
  let teams = textbox.parentNode

  // Get winner and loser
  winner = textbox.querySelector('.player')

  if (textbox == teams.children[0]) loser = teams.children[1].querySelector('.player')
  else loser = teams.children[0].querySelector('.player')

  console.log('Winner: ' + winner.value);
  console.log('Loser: ' + loser.value);
  console.groupEnd()

  // Add winner and loser to end screen
  document.querySelector('#winner').value = winner.value
  document.querySelector('#second').value = loser.value
  
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

// ------------------------------------------------------------------------------------
function smallfinalWinner(arrow) {
  let textbox = arrow.parentNode
  const smallfinalInputs = document.querySelectorAll('#side-bracket .player')

  // Get winner and loser
  winner = textbox.querySelector('.player')

  if (winner == smallfinalInputs[0]) loser = smallfinalInputs[1]
  else loser = smallfinalInputs[0]

  console.log('Winner: ' + winner.value);
  console.log('Loser: ' + loser.value);
  console.groupEnd()

  // Add winner to end screen
  document.querySelector('#third').value = winner.value

  // Add css classes to winner and loser
  const smllFnlTxtbxs = document.querySelectorAll('#side-bracket .textbox')
  if (!textbox.classList.contains('won')) {
    for (let i = 0; i < smllFnlTxtbxs.length; i++) {
      smllFnlTxtbxs[i].classList.remove('won')
      smllFnlTxtbxs[i].classList.remove('lost')
    }

    winner.parentNode.classList.add('won')
    loser.parentNode.classList.add('lost')
  }
}