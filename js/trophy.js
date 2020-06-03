(function(){
  // GSAP Timeline - Trophy Shake ---------------------------------------------------------------
  const tlTrophyShake = new gsap.timeline({
    paused: true,
    repeat: 1,
    defaults: {
      repeat: 1,
      duration: 0.05,
      yoyo: true,
    },
    onComplete: function () {
      gsap.set('#trophy, #trophy #cover, #trophy #pot', {clearProps: 'scale, transform, transformOrigin, x, y'});
    }
  })
  
  tlTrophyShake
  .to('#trophy', {scale: 1.06}, 0)

  .add('rotateLeft', 0)
  
  .to('#trophy #pot', {
    transform: 'rotate(5deg)',
    transformOrigin: 'center',
  }, 'rotateLeft')
  
  .to('#trophy #cover', {
    x: 2,
    y: -2,
    transform: 'rotate(-5deg)',
    transformOrigin: 'top',
  }, 'rotateLeft')

  .add('rotateRight')

  .to('#trophy #pot', {
    transform: 'rotate(-5deg)',
    transformOrigin: 'center',
  }, 'rotateRight')
  
  .to('#trophy #cover', {
    x: -2,
    y: -2,
    transform: 'rotate(5deg)',
    transformOrigin: 'top',
  }, 'rotateRight')
  
  // GSAP Timeline - Tropy open ---------------------------------------------------------------
  const tlTrophyOpen = new gsap.timeline({
    paused: true,
    yoyo: true,
    repeat: 1,
    defaults: {
      ease: Power3.InOut
    },
    onComplete: function () {
      gsap.set('#trophy #cover, #trophy #head', {clearProps: 'repeat, yoyo, transform, transformOrigin, x, y'});
    }
  })

  tlTrophyOpen
  .to('#trophy #cover', {
    repeat: 5,
    yoyo: true,
    transform: 'rotate(-5deg)',
    transformOrigin: 'top',
  }, 0)
  
  .to('#trophy #cover', {y: -13,}, 0)
  .to('#trophy #pot', {y: 5,}, 0)
  .to('#winnerbox', {y: 5,}, 0)
  .to('#trophy #head', {x: 9, y: -9}, 0)

  // Event listener - Click on trophy ---------------------------------------------------------------
  let counter = 0
  
  document.querySelector('#trophy').addEventListener('click', () => {
    if (!tlTrophyOpen.isActive() && !tlTrophyShake.isActive()) {
      if (counter < 4) {
        tlTrophyShake.play(0)
        counter++
      } else {
        tlTrophyOpen.play(0)
        counter = 0
      }
      console.log(counter);
    } else console.log('slow down')
  })
})()