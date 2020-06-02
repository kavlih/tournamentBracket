(function(){
  // GSAP Timeline ------------------------------------------
  const tlsideBracket = new gsap.timeline ({
    paused: true, 
    defaults: {
      duration: 0.5, 
      ease: Power1.easeInOut
    }
  })
    
  tlsideBracket
  .set('#side-bracket', {display: 'flex'}, 0)
  .to('#side-bracket', {height: '10%'}, 0)
  .fromTo('#rounds-container', {height: '100%'}, {height: '95%'}, 0)
  .to('#end-screen', {y: '-20%'}, 0)
  .to('#smallfinal-trophy', {opacity: 1}, 0)
  
  // Event listener ------------------------------------------
  const sideBracketBtn = document.querySelector('#btn-third')
  
  activeSB = false
  
  sideBracketBtn.addEventListener('click', () => {  
    if (activeSB === true) {
      sideBracketBtn.classList.remove('active')
      tlsideBracket.reverse()
      activeSB = false
    } else {
      sideBracketBtn.classList.add('active')
      tlsideBracket.play()
      activeSB = true
    }
    console.log('Smallfinal: ' + activeSB);
  })
})()