const themeButtons = document.querySelectorAll('#themes button')

// set default theme
let activeTheme = 0

function setTheme(index) {
  // toggle button styles
  themeButtons[activeTheme].classList.remove('active')
  activeTheme = index
  themeButtons[activeTheme].classList.add('active')
  
  // call theme functions
  if (activeTheme == 0) {ToniTheme()}
  if (activeTheme == 1) {taddltheme()} 
}

// default theme
function ToniTheme(){
  
}

// taddl theme
function taddltheme(){

}

// run theme
setTheme(activeTheme)
/*
for (let i = 0; i < themeButtons.length; i++) {
  themeButtons[i].addEventListener('click', (evt) => {
    setTheme(evt.target.getAttribute('data-index'))
  })
}
*/