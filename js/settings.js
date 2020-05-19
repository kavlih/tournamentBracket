const settingsButton = document.querySelector('#settings-icon')
const settings = document.querySelector('#settings')

// show settings
settingsButton.addEventListener('click', () => {
  settings.classList.toggle('open')
  settings.classList.toggle('closed')

  if (settings.classList.contains('open')) {
    console.log('open');
    // run animation    
    tl.play()
  }

  if (settings.classList.contains('closed')) {
    console.log('closed');
    // run backwards
    tl.reverse()
  }
})

// open settings animation
let tl = gsap.timeline({
  paused:true, 
  defaults: {
    duration:0.5,
  }
})

tl.add('step1')

tl.set('#inner-settings', {
  opacity: '1',
  ease: Power1.easeInOut 
}, 'step1')

tl.to('#inner-settings', {
  padding: '0 30', 
  width: '315',
  ease: Power1.easeInOut
}, 'step1')

tl.add('step2')

tl.to('#inner-settings', {
  border: '2px solid white', 
  padding: '25 30', 
  height: '125', 
  borderRadius: '20',
  ease: 'back'
  }, 'step2')

tl.to('#inner-settings div', {
  opacity: '1',
}, 'step2')

tl.to('#bracket', {
  transform: 'translate(0, -30px)',
  ease: 'back'
}, 'step2')