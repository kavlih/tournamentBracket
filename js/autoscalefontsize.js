const allTextFields = document.querySelectorAll('#rows-container input')

for (let i = 0; i < allTextFields.length; i++) {
  //set max lenght
  allTextFields[i].maxLength = 12
  //set default size
  allTextFields[i].style.fontSize = '12pt'
  //scaleFontSize(allTextFields[i])
  //trigger function on input change
  allTextFields[i].addEventListener("input", (e) => scaleFontSize(e.target))
}

function scaleFontSize(input) {
  console.log(input.style.fontSize);
  
  //if overflow
  if (input.scrollHeight > input.clientHeight || input.scrollWidth > input.clientWidth){
    //font-size -1
    input.style.fontSize = parseInt(input.style.fontSize) - 1 + 'pt'  
    //repeat
    scaleFontSize(input)
  } else {
    //font-size +1
    input.style.fontSize = parseInt(input.style.fontSize) + 1 + 'pt'
    //if overflow or if max font-size
    if (input.scrollHeight > input.clientHeight || input.scrollWidth > input.clientWidth || input.style.fontSize == '13pt') {
      //font-size -1
      input.style.fontSize = parseInt(input.style.fontSize) - 1 + 'pt'
    } else {scaleFontSize(input)}
  }
}

window.addEventListener('resize', function(){
  for (let i = 0; i < allTextFields.length; i++) {
    scaleFontSize(allTextFields[i])
  }
});