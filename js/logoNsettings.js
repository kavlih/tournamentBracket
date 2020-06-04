(function(){
  // GSAP Timeline - logo spin ------------------------------------------
  const logo = document.querySelector('#logo')

  logo.addEventListener('click', () => {
    const tlSpin = new gsap.timeline()

    tlSpin
    .to(logo, 0.50, {y: '-1.5vh'})
    .to(logo, {duration: 1, rotationY: 360}, 0)
    .to(logo, 1.00, {y: '0vh', ease: Bounce.easeOut}, 0.80)
    .set(logo, {rotationY: 0})
  })

  // GSAP Timeline - settings ------------------------------------------
  const tlSettings = gsap.timeline({paused:true, defaults: {duration:0.5}})

  tlSettings
  .add('step1')

  .set('#inner-settings', {
    opacity: 1,
    ease: Power1.easeInOut 
  }, 'step1')

  .to('#inner-settings', {
    padding: '0 30', 
    width: 325,
    ease: Power1.easeInOut
  }, 'step1')

  .add('step2')

  .to('#inner-settings', {
    border: '2px solid white', 
    padding: '25 30', 
    height: 125, 
    borderRadius: 20,
    ease: 'back'
    }, 'step2')

  .fromTo('#inner-settings div', {opacity: 0}, {opacity: 1}, 'step2')

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

  // GSAP - show infos ------------------------------------------
  let activeInfos = false

  document.querySelector('#infoBtn').addEventListener('click', () => {
    if (!activeInfos) {
      gsap.fromTo('#infos img', {display: 'none', opacity: 0}, {stagger: 0.5, display: 'flex', opacity: 1})
      activeInfos = true
    }
    else {
      gsap.to('#infos img', {opacity: 0})
      gsap.set('#infos img', {delay: 0.5, display: 'none'})
      activeInfos = false
    }
  })
})()