const allInputs = document.querySelectorAll('#rows-container input')
const clearButton = document.querySelector('#btn-clear')

// clear all inputs
clearButton.addEventListener('click', () => {  
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].value = ''
  }
})