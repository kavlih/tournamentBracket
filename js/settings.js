const settingsButton = document.querySelector('#settings-icon')
const settings = document.querySelector('#settings')

// show settings
settingsButton.addEventListener('click', () => {
  // toggle gear rotation animation
  settings.classList.toggle('open')
  settings.classList.toggle('closed')
  // runs timeline
  if (settings.classList.contains('open')) tl.play()
  if (settings.classList.contains('closed')) tl.reverse()
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
  y: -30,
  ease: 'back'
}, 'step2')