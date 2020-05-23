const nextBtn = document.querySelectorAll('.textbox i')

function updateWinner() {
console.log('test');

}

for (let i = 0; i < nextBtn.length; i++) {
  nextBtn[i].addEventListener('click', () => {
    updateWinner()
  })  
}