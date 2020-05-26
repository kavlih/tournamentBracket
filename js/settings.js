(function(){
  // GSAP Timeline ------------------------------------------
  const tlSettings = gsap.timeline({
    paused:true, 
    defaults: {
      duration:0.5,
    }
  })

  tlSettings
  .add('step1')

  .set('#inner-settings', {
    opacity: '1',
    ease: Power1.easeInOut 
  }, 'step1')

  .to('#inner-settings', {
    padding: '0 30', 
    width: '315',
    ease: Power1.easeInOut
  }, 'step1')

  .add('step2')

  .to('#inner-settings', {
    border: '2px solid white', 
    padding: '25 30', 
    height: '125', 
    borderRadius: '20',
    ease: 'back'
    }, 'step2')

  .to('#inner-settings div', {
    opacity: '1',
  }, 'step2')

  .to('#bracket', {
    y: -30,
    ease: 'back'
  }, 'step2')

  // Change opacity from small final
  .to('#side-bracket', {
    opacity: 0.3,
    duration: 0.2
  }, 'step2')

  // Event listener ------------------------------------------
  document.querySelector('#settings-icon').addEventListener('click', () => {
    const settings = document.querySelector('#settings')

    // Toggle gear rotation
    settings.classList.toggle('active')

    // Run GSAP timeline
    if (settings.classList.contains('active')) {
    tlSettings.play()

    // Hide warning if settings got closed while warning was visible
    const clearWarning = document.querySelector('#inner-settings #reset')

    if (!clearWarning.classList.contains('hidden')) clearWarning.classList.add('hidden')
    } else tlSettings.reverse()
  })
})()