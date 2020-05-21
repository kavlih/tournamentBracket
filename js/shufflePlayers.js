const shuffleButton = document.querySelector('#btn-shuffle')

shuffleButton.addEventListener('click', () => {
  shuffle()
})

function shuffle() {
  if (activePlayers == 0) index = document.querySelectorAll('.rows.quarter input')
  if (activePlayers == 1) index = document.querySelectorAll('.rows.eight input')

  const allPlayers = index

  /*let namesArray = Array.from(allPlayers)  

  for (let i = namesArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [namesArray[i], namesArray[j]] = [namesArray[j], namesArray[i]];
  }

  for (let i = 0; i < allPlayers.length; i++) {
    allPlayers[i].value = namesArray[i].value
    console.log(namesArray[i].value);
  }*/
}