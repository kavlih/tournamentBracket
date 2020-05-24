let tlSmallFinal = new gsap.timeline ({
  paused: true, 
  defaults: {
    duration: 0.5, 
    ease: Power1.easeInOut
  }
})
  
tlSmallFinal
.set('#smallfinal', {display: 'flex'}, 0)
.to('#smallfinal', {height: '10%'}, 0)
.to('#smallfinal-trophy', {opacity: 1}, 0)

const smallFinalBtn = document.querySelector('#btn-3rd')

let activeSF = false

smallFinalBtn.addEventListener('click', () => {
  console.log(activeSF);
  
  if (activeSF === true) {
    smallFinalBtn.classList.remove('active')
    tlSmallFinal.reverse()
    activeSF = false
  } else {
    smallFinalBtn.classList.add('active')
    tlSmallFinal.play()
    activeSF = true
  }
})