(function(){
  // GSAP Animation - Hover on trophy (disable hover if 'tlEndScreen' is active or playing) ------------------------------------------
  const trophyContainer = document.querySelector('#trophy-container')

  trophyContainer.addEventListener('mouseenter', () => {
    if(tlEndScreen.progress() === 0){      
      gsap.to('#trophy-container', {duration: 0.3, scale: 1.1, rotate: 3, background: 'radial-gradient(circle, rgba(255, 190, 0, 0.5), rgba(255, 190, 0, 0) 65%)'})    
    }
  })

  trophyContainer.addEventListener('mouseleave', () => {
    if(tlEndScreen.progress() === 0){
      gsap.to('#trophy-container', {duration: 0.3, scale: 1, rotate: 0, background: 'none'})
      gsap.to('#trophy-container', {clearProps: 'all'})    
    }
  })

  // GSAP Animation - Show end screen ------------------------------------------
  const tlEndScreen = new gsap.timeline({
    paused: true,
    defaults: {
      duration: 1.5,
      ease: Back.easeInOut,
    },
    onComplete: function(){
      tlEndScreen
      .add('complete')

      .set('#end-back-btn', {display: 'flex'}, 'complete')
      .fromTo('#end-back-btn', {opacity: 0, scale: 0}, {opacity: 1, scale: 1, ease: Back.easeInOut, duration: 1.5}, 'complete')

      if (activeSmallfinal === false) tlEndScreen.fromTo('#message', {display: 'flex', opacity: 0}, {delay: 3, opacity: 0.5, scale: 1, duration: 3.}, 'complete')

      tlEndScreen.to('#trophy-container, #second-container, #third-container', {
        background: 'radial-gradient(circle, rgba(255, 190, 0, 0.5), rgba(255, 190, 0, 0) 70%)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: Power1.easeInOut,
      }, 'complete')
    }
  })

  tlEndScreen
  .to('#rounds-container, #side-bracket', {opacity: 0.05, ease: Power1.easeInOut}, 0)
  .to('#settings', {scale: 0, opacity: 0, ease: Power1.easeInOut}, 0)

  .add('1st')

  tlEndScreen
  .fromTo('#end-screen', {height: '8vh', width: '8vh'}, {height: '100%', width: '100%'}, '1st')
  .to('#trophy-container', {height: '60vh', width: '60vh'}, '1st')
  .add(function(){scaleFontSize(document.querySelector('#winner'))}, '1st')
  .to('#winnerbox', {display: 'flex', maxWidth: 'unset', height: '16%'}, '1st')
  .to('#trophy', {marginBottom: '-2.5vh'}, '1st')
  .to('#logo img', {ease: Power2.easeInOut, height: '21vh'}, '1st')

  .add(function() {confetti.toggle()}, '1st')
  .fromTo('#winner', {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '1st')

  .to('#trophy-container, #second-container, #third-container', {background: 'radial-gradient(circle, rgba(255, 190, 0, 0.5), rgba(255, 190, 0, 0) 50%)'}, '1st')

  // GSAP Animation - Back button ------------------------------------------
  document.querySelector('#end-back-btn button').addEventListener('click', () => {
    const tlBack = new gsap.timeline({defaults: {duration: 0.7, ease: Power2.easeIn}})
    
    tlBack
    .add('scale1')

    .add(function() {confetti.toggle()}, 'scale1')
    .set('#end-back-btn', {zIndex: 0})
    .to('#end-back-btn', {duration: 0.4, opacity: 0}, 'scale1')
    .fromTo('#end-screen', {scale: 1}, {scale: 20, opacity: 0}, 'scale1')
    .to('#logo img', {height: '27vh'}, 'scale1')
    
    .add('reset')

    .set('#trophy-container, #second-container, #third-container, #winnerbox, #message', {clearProps: 'all'}, 'reset')
    .set('#trophy', {clearProps: 'margin-bottom'}, 'reset')
    .set('#winner', {clearProps: 'opacity, scale'}, 'reset')
    .set('#end-screen', {clearProps: 'width,height'}, 'reset')
    .set('#end-back-btn', {display: 'none', clearProps: 'z-index'}, 'reset')

    tlBack
    .add('scale2')

    .to('#rounds-container, #side-bracket', {opacity: 1}, 'scale2')
    .to('#settings', {scale: 1, opacity: 1}, 'scale2')

    if(activeSmallfinal === true) tlBack.to('#end-screen', {y: '-20%'}, 'scale2')

    tlBack
    .fromTo('#end-screen', {scale: 0}, {opacity: 1, scale: 1}, 'scale2')
    .set('#end-screen', {clearProps: 'opacity, scale'}, 'scale2')

    .add(function(){tlEndScreen.pause(0)})
    .set('#logo img', {clearProps: 'height'})
  })
  
  // Event listener - Click on final/smallfinal arrows ------------------------------------------
  const endArrows = document.querySelectorAll('.final i, .smallfinal i')

  for (let i = 0; i < endArrows.length; i++) {
    endArrows[i].addEventListener('click', (e) => {
      let textbox = e.target.parentNode  

      // Get played game
      if(endArrows[i].parentNode.parentNode.parentNode.classList.contains('final')){
        activeGame = textbox.parentNode.parentNode.querySelectorAll('.player')
        activeTextboxes = textbox.parentNode.children
      }
      if(endArrows[i].parentNode.parentNode.classList.contains('smallfinal')){
        activeGame = document.querySelectorAll('#side-bracket .player')
        activeTextboxes = document.querySelectorAll('#side-bracket .textbox')
      }

      // Get winner and loser
      winner = textbox.querySelector('.player')

      if (winner == activeGame[0]) loser = activeGame[1]
      else loser = activeGame[0]
      
      console.log('Winner: ' + winner.value);
      console.log('Loser: ' + loser.value);  
      
      // If final
      if(endArrows[i].parentNode.parentNode.parentNode.classList.contains('final')){
        // Add 1st and 2nd to end screen
        document.querySelector('#winner').value = winner.value
        document.querySelector('#second').value = loser.value
      }

      // If smallfinal
      if(endArrows[i].parentNode.parentNode.classList.contains('smallfinal')){      
        // Add 3rd to end screen
        document.querySelector('#third').value = winner.value
      }

      // Add css classes to winner and loser
      if (!textbox.classList.contains('won')) {
        for (let i = 0; i < activeTextboxes.length; i++) {
          activeTextboxes[i].classList.remove('won')
          activeTextboxes[i].classList.remove('lost')
        }
        winner.parentNode.classList.add('won')
        loser.parentNode.classList.add('lost')
      }

      // GSAP - reduce visibility of loser
      gsap.set(loser, {clearProps: 'opacity'});
      gsap.set(winner, {clearProps: 'opacity'});
      gsap.to(loser, {duration: 0.5, opacity: 0.4, ease: Power1.easeInOut})

      // If final was played
      if(document.querySelector('.final .textbox').classList.contains('won') || document.querySelector('.final .textbox').classList.contains('lost')){
        // If smallfinal is hidden OR if small final is visible and was played ('activeSmallfinal' defined in smallFinal.js)
        if(activeSmallfinal === false || activeSmallfinal === true && document.querySelector('#side-bracket .textbox').classList.contains('won') || document.querySelector('#side-bracket .textbox').classList.contains('lost')){
          // Add 2nd and 3rd to end screen if small final was played
          if(document.querySelector('#side-bracket .textbox').classList.contains('won') || document.querySelector('#side-bracket .textbox').classList.contains('lost')){
            tlEndScreen
            .set('#second-container, #third-container', {display: 'flex'})
            .to('#end-screen', {y: '0%'}, '1st')
            
            .add('2nd')
            .add(function(){scaleFontSize(document.querySelector('#second'))}, '2rd')
            .fromTo('#second-container', {
              opacity: 0, 
              scale: 0, 
              x: '21.5vw'
            }, {
              scale: 1,
              opacity: 1,   
              x: '5vw'
            }, '2rd')

            .add('3rd')
            .add(function(){scaleFontSize(document.querySelector('#third'))}, '3rd')
            .fromTo('#third-container', {
              scale: 0,
              opacity: 0,  
              x: '-21.5vw'
            }, {
              scale: 1,
              opacity: 1,  
              x: '-5vw'
            }, '3rd')
          }
          // Play end screen animation
          tlEndScreen.play(0)
        }
      }
    }) 
  }
})()