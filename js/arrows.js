function showArrows(){
  const allNextBtns = document.querySelectorAll('#bracket i')
  const allInputs = document.querySelectorAll('#bracket input')
  const allTextboxes = document.querySelectorAll('#bracket .textbox')

  for (let i = 0; i < allTextboxes.length; i++) {
    if(!allInputs[i].value == '' && !allTextboxes[i].classList.contains('won')){
      
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
        opacity: 0,
        duration: 0.15,
      }, 0.4)

      // Event listeners ------------------------------------------  
      allNextBtns[i].addEventListener('click', (e) => {
        tlArrowsHover.kill()
        
        if (allNextBtns[i].parentNode.parentNode.parentNode.classList.contains('right'))
        tlArrowsClick.to(allNextBtns[i], {x: -25, ease: Power4.easeIn}, 0)

        if (allNextBtns[i].parentNode.parentNode.parentNode.classList.contains('left'))
        tlArrowsClick.to(allNextBtns[i], {x: 25, ease: Power4.easeIn}, 0)

        tlArrowsClick.play(0)

        if (i >= 16) {i = i - 16
          if (i >= 8) {i = i - 8
            if (i >= 4) {i = i - 4}
          }
        }
        updateWinner(i, e.target.parentNode)
      })
      
      allTextboxes[i].addEventListener('mouseover', () => {
        gsap.set(allNextBtns[i], {opacity: 0.6, display: 'flex'})
      })

      allTextboxes[i].addEventListener('mouseout', () => {
        gsap.set(allNextBtns[i], {clearProps: 'all'});
      })
      
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
}

showArrows()