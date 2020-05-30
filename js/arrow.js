// Arrows function ------------------------------------------
function showArrows(index) {
  if (!index.value == '') index.parentNode.classList.add('hover')
  else index.parentNode.classList.remove('hover')
}

const allNextBtns = document.querySelectorAll('#bracket i')
const allInputs = document.querySelectorAll('#rounds-container input')
const allTextboxes = document.querySelectorAll('#bracket .textbox')

for (let i = 0; i < allInputs.length; i++) {
  // Trigger function on input change
  allInputs[i].addEventListener("input", (e) => showArrows(e.target))
  // Run function on start (use only if there are player placeholders)
  showArrows(allInputs[i])
}

for (let i = 0; i < allTextboxes.length; i++) {
  // GSAP Animation 1 ------------------------------------------
  const tlArrowsHover = new gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: Power3.easeIn,
      scale: 1.1,
    }
  })

  tlArrowsHover.set(allNextBtns[i], {
    color: 'rgb(255, 255, 0)',
    opacity: 1,
    cursor: 'pointer',
  })

  // GSAP Animation 2 ------------------------------------------
  const tlArrowsClick = new gsap.timeline({paused: true})

  tlArrowsClick
  .to(allNextBtns[i], {
    scaleY:0.8,
    ease: Power1.easeInOut,
  }, 0)

  .to(allNextBtns[i], {
    x: 25,
    ease: Power4.easeIn,
  }, 0)

  .to(allNextBtns[i], {
    opacity: 0,
    duration: 0.15,
  }, 0.4)

  // Event listeners ------------------------------------------
  allNextBtns[i].addEventListener('mouseover', () => {
    if (allNextBtns[i].parentNode.parentNode.parentNode.classList.contains('right'))
    tlArrowsHover.to(allNextBtns[i], {x: -2,}, 0)

    if (allNextBtns[i].parentNode.parentNode.parentNode.classList.contains('left'))
    tlArrowsHover.to(allNextBtns[i], {x: 2,}, 0)

    tlArrowsHover.play(0)
  })

  allNextBtns[i].addEventListener('mouseout', () => {
    tlArrowsHover.kill()
    gsap.set(allNextBtns[i], {clearProps: 'all'});
  })

  allNextBtns[i].addEventListener('click', () => {
    tlArrowsHover.kill()
    tlArrowsClick.play(0)
  })
}