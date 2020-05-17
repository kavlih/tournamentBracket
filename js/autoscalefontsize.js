const allInputs = document.querySelectorAll('#rows-container input')

let fontSize = 12

function isOverflown() {
  
  for (let i = 0; i < allInputs.length; i++) {

    if (allInputs[i].scrollHeight > allInputs[i].clientHeight || allInputs[i].scrollWidth > allInputs[i].clientWidth){
      allInputs[i].style.fontSize = `${fontSize-1}pt`
      isOverflown()
    }
  }
}

isOverflown()