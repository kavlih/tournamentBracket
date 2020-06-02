function arrowsHover() {
  const allTextboxes = document.querySelectorAll('#bracket .textbox')
  const allNextBtns = document.querySelectorAll('#bracket i')

  for (let i = 0; i < allTextboxes.length; i++) {
    // Display arrows if all inputs of a team are not empty & if target is not a winner 
    allTextboxes[i].addEventListener('mouseover', () => {
      if(!allTextboxes[i].parentNode.classList.contains('smallfinal')){
        if(allTextboxes[i].parentNode.querySelectorAll('.textbox .player')[0].value !== '' && allTextboxes[i].parentNode.querySelectorAll('.textbox .player')[1].value !== '' && !allTextboxes[i].classList.contains('won')){
          gsap.set(allNextBtns[i], {opacity: 0.6, display: 'flex'})
        }
      } else if (allTextboxes[i].parentNode.querySelector('.textbox .player').value !== ''){
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
    
    tlArrowsHover.to(allNextBtns[i], {
      color: 'rgb(255, 255, 0)',
      opacity: 1,
      cursor: 'pointer',
      duration: 0.1,
      repeat: 0,
      yoyo: false,
      ease: Power0.easeNone,
    }, 0)

    // Different tweens for different positions
    if (allNextBtns[i].parentNode.parentNode.parentNode.classList.contains('right') || allNextBtns[i].parentNode.parentNode.classList.contains('right'))
    tlArrowsHover.to(allNextBtns[i], {x: -2,}, 0)

    if (allNextBtns[i].parentNode.parentNode.parentNode.classList.contains('left') || allNextBtns[i].parentNode.parentNode.classList.contains('left'))
    tlArrowsHover.to(allNextBtns[i], {x: 2,}, 0)

    if (allNextBtns[i].parentNode.classList.contains('top'))
    tlArrowsHover.to(allNextBtns[i], {y: 2,}, 0)

    if (allNextBtns[i].parentNode.classList.contains('bottom'))
    tlArrowsHover.to(allNextBtns[i], {y: -2,}, 0)

    // Event listeners
    allNextBtns[i].addEventListener('mouseover', () => {
      tlArrowsHover.play(0)
    })

    allNextBtns[i].addEventListener('mouseout', () => {
      tlArrowsHover.kill()
      gsap.set(allNextBtns[i], {clearProps: 'all'});
    })
  }
}

// Run function on start (use only if there are player placeholders)
arrowsHover()