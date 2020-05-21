const clearButton = document.querySelector('#btn-clear')

// clear all inputs
clearButton.addEventListener('click', () => { 
  
  const clearWarning = document.querySelector('#inner-settings #reset')

  clearWarning.classList.remove('hidden')
    
  document.querySelector('#reset button.cancel').addEventListener('click', () => {
    clearWarning.classList.add('hidden')
  })
  document.querySelector('#reset button.confirm').addEventListener('click', () => {
    for (let i = 0; i < document.querySelectorAll('#rows-container input').length; i++) {
      document.querySelectorAll('#rows-container input')[i].value = ''
    }
    clearWarning.classList.add('hidden')
  })
})