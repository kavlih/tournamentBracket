(function(){
  const allTextboxes = document.querySelectorAll('#bracket .textbox')
  const allArrows = document.querySelectorAll('#bracket i')

  for (let i = 0; i < allTextboxes.length; i++) {
    // Hover over textboxes ------------------------------------------
    allTextboxes[i].addEventListener('mouseover', () => {

      // Define 'activePlayers'
      if(!allTextboxes[i].parentNode.classList.contains('smallfinal')) activePlayers = allTextboxes[i].parentNode.querySelectorAll('.player')
      else activePlayers = document.querySelectorAll('#side-bracket .player')

      // Display arrows only if both inputs of a team are not empty & if target is not a winner 
      if(activePlayers[0].value !== '' && activePlayers[1].value !== '' && !allTextboxes[i].classList.contains('won')){
        gsap.set(allArrows[i], {opacity: 0.6, display: 'flex'})
      }
    })

    // Reset
    allTextboxes[i].addEventListener('mouseout', () => {
      gsap.set(allArrows[i], {clearProps: 'all'});
    })
     
    // GSAP Animation - Hover over arrows ------------------------------------------
    const tlArrowsHover = new gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: Power3.easeIn,
        scale: 1.1,
      }
    })
    
    tlArrowsHover.to(allArrows[i], {
      color: 'rgb(255, 255, 0)',
      opacity: 1,
      cursor: 'pointer',
      duration: 0.1,
      repeat: 0,
      yoyo: false,
      ease: Power0.easeNone,
    }, 0)

    // Different tweens for different positions of the textboxes
    if (allTextboxes[i].parentNode.parentNode.classList.contains('right') || allTextboxes[i].parentNode.classList.contains('right'))
    tlArrowsHover.to(allArrows[i], {x: -2,}, 0)

    if (allTextboxes[i].parentNode.parentNode.classList.contains('left') || allTextboxes[i].parentNode.classList.contains('left'))
    tlArrowsHover.to(allArrows[i], {x: 2,}, 0)

    if (allTextboxes[i].classList.contains('top'))
    tlArrowsHover.to(allArrows[i], {y: 2,}, 0)

    if (allTextboxes[i].classList.contains('bottom'))
    tlArrowsHover.to(allArrows[i], {y: -2,}, 0)

    // Event listeners
    allArrows[i].addEventListener('mouseover', () => {
      tlArrowsHover.play(0)
    })

    allArrows[i].addEventListener('mouseout', () => {
      tlArrowsHover.kill()
      gsap.set(allArrows[i], {clearProps: 'all'});
    })

    // Click on arrows ------------------------------------------
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

      const allInputs = document.querySelectorAll('#bracket input')

      for (let i = 0; i < allInputs.length; i++) { 
        scaleFontSize(allInputs[i])
      }
    }
    
    // Event listener
    allArrows[i].addEventListener('click', (e) => {
      // If not final or smallfinal
      if(!allArrows[i].parentNode.parentNode.parentNode.classList.contains('final') && !allArrows[i].parentNode.parentNode.classList.contains('smallfinal')){
        // Function
        updateWinner(i, e.target)
        
        // GSAP Animation - arrow click
        const tlArrowsClick = new gsap.timeline()

        tlArrowsClick
        .to(allArrows[i], {scaleY:0.8, ease: Power1.easeInOut}, 0)
        .to(allArrows[i], {opacity: 0, duration: 0.15}, 0.4)
        
        if (allArrows[i].parentNode.parentNode.parentNode.classList.contains('right'))
        tlArrowsClick.to(allArrows[i], {x: -25, ease: Power4.easeIn}, 0)

        if (allArrows[i].parentNode.parentNode.parentNode.classList.contains('left'))
        tlArrowsClick.to(allArrows[i], {x: 25, ease: Power4.easeIn}, 0)

        // GSAP Animation - update winner
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
    })
  }
})()