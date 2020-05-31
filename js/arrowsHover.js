function arrowsHover() {
  const allTextboxes = document.querySelectorAll('#bracket .textbox')
  const allNextBtns = document.querySelectorAll('#bracket i')

  for (let i = 0; i < allTextboxes.length; i++) {
    // Display hover on textboxes
    allTextboxes[i].addEventListener('mouseover', () => {
      if(allTextboxes[i].parentNode.querySelectorAll('.textbox input')[0].value !== '' && allTextboxes[i].parentNode.querySelectorAll('.textbox input')[1].value !== '' && !allTextboxes[i].classList.contains('won')){
        gsap.set(allNextBtns[i], {opacity: 0.6, display: 'flex'})
      }
    })

    allTextboxes[i].addEventListener('mouseout', () => {
      gsap.set(allNextBtns[i], {clearProps: 'all'});
    })
     
    // GSAP Animation - textbox hover ------------------------------------------
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

    // Event listeners
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
  }
}

arrowsHover()