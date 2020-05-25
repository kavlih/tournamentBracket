const clearButton = document.querySelector('#btn-clear')
const clearWarning = document.querySelector('#inner-settings #reset')

// clear all inputs function
clearButton.addEventListener('click', () => { 
  // show warning
  clearWarning.classList.remove('hidden')
  // hide warning by clicking on cancel
  document.querySelector('#reset button.cancel').addEventListener('click', () => {
    clearWarning.classList.add('hidden')
  })
  // clear all
  document.querySelector('#reset button.confirm').addEventListener('click', () => {
    for (let i = 0; i < document.querySelectorAll('#rounds-container input').length; i++) {
      document.querySelectorAll('#rounds-container input')[i].value = ''
      document.querySelectorAll('.textbox')[i].classList.remove('won')
      document.querySelectorAll('.textbox')[i].classList.remove('lost')
    }
    // hide warning again
    clearWarning.classList.add('hidden')
  })
})