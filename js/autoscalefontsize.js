(function(){
  // Triggers & input defaults ------------------------------------------
  const allInputs = document.querySelectorAll('#bracket input')

  for (let i = 0; i < allInputs.length; i++) {
    // Set max lenght
    allInputs[i].maxLength = 12
    // Set default font-size
    allInputs[i].style.fontSize = '11pt'
    // Trigger function on input change
    allInputs[i].addEventListener("input", (e) => scaleFontSize(e.target))
    // Run function on start (use only if there are player placeholders)
    // scaleFontSize(allInputs[i])
  }

  // Trigger function on window resize
  window.addEventListener('resize', function(){
    for (let i = 0; i < allInputs.length; i++) {
      scaleFontSize(allInputs[i])
    }
  })
})()

// Function ------------------------------------------
function scaleFontSize(input) {    
  // If text is overflowing
  if (input.height > input.clientHeight || input.scrollWidth > input.clientWidth){
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
  //console.log(input.style.fontSize);
}