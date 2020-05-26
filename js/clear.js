(function(){
  const clearWarning = document.querySelector('#inner-settings #reset')

  // Clear all inputs
  document.querySelector('#btn-clear').addEventListener('click', () => { 
    // Show warning
    clearWarning.classList.remove('hidden')
    // Hide warning
    document.querySelector('#reset button.cancel').addEventListener('click', () => {
      clearWarning.classList.add('hidden')
    })
    // Clear all inputs
    document.querySelector('#reset button.confirm').addEventListener('click', () => {
      for (let i = 0; i < document.querySelectorAll('#rounds-container input').length; i++) {
        document.querySelectorAll('#rounds-container input')[i].value = ''
        document.querySelectorAll('.textbox')[i].classList.remove('won')
        document.querySelectorAll('.textbox')[i].classList.remove('lost')
      }
      // Hide warning
      clearWarning.classList.add('hidden')
    })
  })
})()