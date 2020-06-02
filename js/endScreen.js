(function(){
  // GSAP Animation - end screen ------------------------------------------
  const endScreen = new gsap.timeline({
    paused: true,
    defaults: {
      duration: 1.5,
      ease: Elastic.easeOut,
    }
  })

  endScreen
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

  // If small final was played
  if(document.querySelector('#side-bracket .textbox').classList.contains('won') || document.querySelector('#side-bracket .textbox').classList.contains('lost')){
    endScreen
    .set('#second-container, #third-container', {display: 'flex'})
    .fromTo('#second-container', {scale: 0, x: '21.5vw'}, {scale: 1, x: '5vw'})
    .fromTo('#third-container', {scale: 0, x: '-21.5vw'}, {scale: 1, x: '-5vw'})
  }
  
  // Hover effect
  const trophyContainer = document.querySelector('#trophy-container')

  trophyContainer.addEventListener('mouseenter', () => {
    if(endScreen.progress() === 0){
      gsap.to('#trophy-container', {duration: 0.3, scale: 1.1, rotate: 3, background: 'radial-gradient(circle, rgba(255, 190, 0, 0.5), rgba(255, 190, 0, 0) 75%)'})    
    }
  })

  trophyContainer.addEventListener('mouseleave', () => {
    if(endScreen.progress() === 0){
      gsap.to('#trophy-container', {duration: 0.3, scale: 1, rotate: 0, background: 'none'})
      gsap.to('#trophy-container', {clearProps: 'all'})    
    }
  })
  

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
          endScreen.play(0)
        }
      }
    }) 
  }
})()