(function(){
  // Event listeners & defaults ------------------------------------------
  const allInputs = document.querySelectorAll('#rounds-container input')

  for (let i = 0; i < allInputs.length; i++) {
    // Run function on start (use only if there player placeholders)
    // Set max lenght
    allInputs[i].maxLength = 12
    // Set default font-size
    allInputs[i].style.fontSize = '11pt'
    // Trigger function on input change
    allInputs[i].addEventListener("input", (e) => scaleFontSize(e.target))
    scaleFontSize(allInputs[i])
  }

  // Trigger function on windows change
  window.addEventListener('resize', function(){
    for (let i = 0; i < allInputs.length; i++) {
      scaleFontSize(allInputs[i])
    }
  })
})()

// Function ------------------------------------------
function scaleFontSize(input) {    
  // If text is overflowing
  if (input.scrollHeight > input.clientHeight || input.scrollWidth > input.clientWidth){
    // Font-size -1
    input.style.fontSize = parseInt(input.style.fontSize) - 1 + 'pt'  
    // Repeat
    scaleFontSize(input)
  } else {
    // Font-size +1
    input.style.fontSize = parseInt(input.style.fontSize) + 1 + 'pt'
    // If text is overflowing or max font-size
    if (input.scrollHeight > input.clientHeight || input.scrollWidth > input.clientWidth || input.style.fontSize == '13pt') {
      // Font-size -2
      input.style.fontSize = parseInt(input.style.fontSize) - 2 + 'pt'
    } else {scaleFontSize(input)}
  }
  console.log(input.style.fontSize);
}