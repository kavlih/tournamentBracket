(function(){
  // GSAP Timeline - Show smallfinal ------------------------------------------
  const tlsideBracket = new gsap.timeline ({
    paused: true, 
    defaults: {
      duration: 0.5, 
      ease: Power1.easeInOut
    }
  })
    
  tlsideBracket
  .set('#side-bracket', {display: 'flex'}, 0)
  .fromTo('#side-bracket', {scale: 0, height: '10%'}, {scale: 1, height: '10%'}, 0)
  .fromTo('#rounds-container', {height: '100%'}, {height: '95%'}, 0)
  .to('#end-screen', {y: '-20%'}, 0)
  .to('#smallfinal-trophy', {opacity: 1}, 0)

  
  // Event listener - Click on '3rd' button ------------------------------------------
  const sideBracketBtn = document.querySelector('#btn-third')
  
  activeSmallfinal = false
  
  sideBracketBtn.addEventListener('click', () => {  
    // Hide if visible or show if hidden
    if (activeSmallfinal === true) {
      sideBracketBtn.classList.remove('active')
      tlsideBracket.reverse()
      activeSmallfinal = false
    } else {
      sideBracketBtn.classList.add('active')
      tlsideBracket.play()
      activeSmallfinal = true
    }
    console.log('Smallfinal: ' + activeSmallfinal);
  })
})()