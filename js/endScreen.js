(function(){
  // GSAP Animation - end screen ------------------------------------------
  const tlEndScreen = new gsap.timeline({
    paused: true,
    defaults: {
      duration: 1.5,
      ease: Back.easeInOut,
    },
    onComplete: function(){
      gsap.set('#end-back-btn', {display: 'flex'}, 0)
      gsap.fromTo('#end-back-btn', {opacity: 0, scale: 0}, {opacity: 1, scale: 1, ease: Back.easeInOut, duration: 1.5}, 0)
      if (activeSB === false) {
        gsap.set('#message', {display: 'flex'})
        gsap.fromTo('#message', {opacity: 0}, {delay: 3, opacity: 0.5, scale: 1, duration: 3.})
      }
    }
  })

  tlEndScreen
  .to('#rounds-container, #side-bracket', {opacity: 0.05, ease: Power1.easeInOut}, 0)
  .to('#settings', {opacity: 0, ease: Power1.easeInOut}, 0)
  .set('#settings', {display: 'none'})

  .add('1st')

  .set('#end-screen', {height: '100%', width: '100%', y: 0}, '1st')
  .to('#trophy-container', {height: '60vh', width: '60vh'}, '1st')
  .add(function(){scaleFontSize(document.querySelector('#winner'))}, '1st')
  .to('#winnerbox', {display: 'flex', maxWidth: 'unset', height: '16%', }, '1st')
  .to('#trophy', {marginBottom: '-2.5vh'}, '1st')
  .to('#logo img', {ease: Power2.easeInOut, height: '24vh'}, '1st')

  .add(function() {confetti.toggle()}, '1st')
  .fromTo('#winner', {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '1st')
  
  // Hover on trophy (disable hover if 'tlEndScreen' is active or playing) ------------------------------------------
  const trophyContainer = document.querySelector('#trophy-container')

  trophyContainer.addEventListener('mouseenter', () => {
    if(tlEndScreen.progress() === 0){
      gsap.to('#trophy-container', {duration: 0.3, scale: 1.1, rotate: 3, background: 'radial-gradient(circle, rgba(255, 190, 0, 0.5), rgba(255, 190, 0, 0) 75%)'})    
    }
  })

  trophyContainer.addEventListener('mouseleave', () => {
    if(tlEndScreen.progress() === 0){
      gsap.to('#trophy-container', {duration: 0.3, scale: 1, rotate: 0, background: 'none'})
      gsap.to('#trophy-container', {clearProps: 'all'})    
    }
  })

  // GSAP Animation - back button ------------------------------------------
  document.querySelector('#end-back-btn button').addEventListener('click', () => {
    const tlBack = new gsap.timeline({defaults: {duration: 0.7, ease: Power2.easeIn}})
    
    tlBack
    .add('scale1')

    .add(function() {confetti.toggle()}, 'scale1')
    .set('#settings', {display: 'flex'}, 'scale1')
    .set('#end-back-btn', {zIndex: 0})
    .to('#end-back-btn', {duration: 0.4, opacity: 0}, 'scale1')
    .fromTo('#end-screen', {scale: 1}, {scale: 20, opacity: 0}, 'scale1')
    .to('#logo img', {height: '30vh'}, 'scale1')
    
    .add('reset')

    .set('#second-container, #third-container, #trophy-container, #winnerbox', {clearProps: 'all'}, 'reset')
    .set('#trophy', {clearProps: 'margin-bottom'}, 'reset')
    .set('#winner', {clearProps: 'opacity, scale'}, 'reset')
    .set('#end-screen', {clearProps: 'height, width'}, 'reset')
    .set('#end-back-btn', {display: 'none', clearProps: 'z-index'}, 'reset')
    
    .add('scale2')

    .to('#rounds-container, #side-bracket', {opacity: 1}, 'scale2')
    .to('#settings', {opacity: 1}, 'scale2')
    .set('#logo img, settings', {clearProps: 'all'}, 'scale2')

    if(activeSB === true) tlBack.fromTo('#end-screen', {scale: 0}, {opacity: 1, scale: 1, y: '-20%'}, 'scale2')
    if(activeSB === false) tlBack.fromTo('#end-screen', {scale: 0}, {opacity: 1, scale: 1}, 'scale2')
    .set('#end-screen', {clearProps: 'opacity, scale'}, 'scale2')
  })

  
  // Event listener ------------------------------------------
  const endArrows = document.querySelectorAll('.final i, .smallfinal i')

  for (let i = 0; i < endArrows.length; i++) {
    endArrows[i].addEventListener('click', (e) => {
      let textbox = e.target.parentNode  

      if(endArrows[i].parentNode.parentNode.parentNode.classList.contains('final')){
        activePlayers = textbox.parentNode.parentNode.querySelectorAll('.player')
        activeTextboxes = textbox.parentNode.children
      }
      if(endArrows[i].parentNode.parentNode.classList.contains('smallfinal')){
        activePlayers = document.querySelectorAll('#side-bracket .player')
        activeTextboxes = document.querySelectorAll('#side-bracket .textbox')
      }

      // Get winner and loser
      winner = textbox.querySelector('.player')

      if (winner == activePlayers[0]) loser = activePlayers[1]
      else loser = activePlayers[0]
      
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

      const tlsetLoser = new gsap.timeline({
        onStart: function () {
          gsap.set(loser, {clearProps: 'opacity'});
          gsap.set(winner, {clearProps: 'opacity'});
        }
      })
    
      tlsetLoser.to(loser, {duration: 0.5, opacity: 0.4, ease: Power1.easeInOut}, 0)

      // If final was played
      if(document.querySelector('.final .textbox').classList.contains('won') || document.querySelector('.final .textbox').classList.contains('lost')){
        // If smallfinal is hidden OR if small final is visible and was played
        // 'activeSB' defined in smallFinal.js
        if(activeSB === false || activeSB === true && document.querySelector('#side-bracket .textbox').classList.contains('won') || document.querySelector('#side-bracket .textbox').classList.contains('lost')){
          // If small final was played
          if(document.querySelector('#side-bracket .textbox').classList.contains('won') || document.querySelector('#side-bracket .textbox').classList.contains('lost')){
            tlEndScreen
            .set('#second-container, #third-container', {display: 'flex'})

            .add('2nd')
            .add(function(){scaleFontSize(document.querySelector('#second'))}, '2rd')
            .fromTo('#second-container', {scale: 0, x: '21.5vw'}, {scale: 1, x: '5vw'}, '2rd')

            .add('3rd')
            .add(function(){scaleFontSize(document.querySelector('#third'))}, '3rd')
            .fromTo('#third-container', {scale: 0, x: '-21.5vw'}, {scale: 1, x: '-5vw'}, '3rd')
          }
          tlEndScreen.play(0)
        }
      }
    }) 
  }
})()