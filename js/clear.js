(function(){
  const clearWarning = document.querySelector('#inner-settings #reset')

  document.querySelector('#btn-clear').addEventListener('click', () => { 
    // Show warning
    clearWarning.classList.remove('hidden')
    // Hide warning - cancel
    document.querySelector('#reset button.cancel').addEventListener('click', () => {
      clearWarning.classList.add('hidden')
    })
    // Reset - confirm
    const allInputs = document.querySelectorAll('#rounds-container .player')

    document.querySelector('#reset button.confirm').addEventListener('click', () => {
      for (let i = 0; i < allInputs.length; i++) {
        // Clear all inputs
        document.querySelectorAll('#rounds-container .player')[i].value = ''
        // Remove classes
        document.querySelectorAll('.textbox')[i].classList.remove('won')
        document.querySelectorAll('.textbox')[i].classList.remove('lost')
        // Clear props
        gsap.set(allInputs[i], {clearProps: 'opacity'})
      }
      // Hide warning again
      clearWarning.classList.add('hidden')
    })
  })
})()