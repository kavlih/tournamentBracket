(function(){
  const themeButtons = document.querySelectorAll('#themes button')

  // set default theme
  let activeTheme = 0

  function setTheme(index) {
    // toggle button styles
    themeButtons[activeTheme].classList.remove('active')
    activeTheme = index
    themeButtons[activeTheme].classList.add('active')
    
    // call theme functions
    // if (activeTheme == 0) {theme(taddl)}
    // if (activeTheme == 1) {theme(toni)} 
  }

  setTheme(activeTheme)
})()