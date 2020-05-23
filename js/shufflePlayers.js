const shuffleButton = document.querySelector('#btn-shuffle')

shuffleButton.addEventListener('click', () => {
  shufflePlayers()
})

function shufflePlayers() {
  // check how many players are playing (defined in players.js)
  if (activePlayers == 0) allPlayers = document.querySelectorAll('.rows.quarter input')
  if (activePlayers == 1) allPlayers = document.querySelectorAll('.rows.eight input')
  // create array from inputs
  var allPlayersArr = [];

  for (let i = 0; i < allPlayers.length; i++) {
    allPlayersArr.push(allPlayers[i].value);
  }
  // shuffle array
  shuffleArr(allPlayersArr)
  // append shuffled players
  let index = 0
  for (let i = 0; i < allPlayers.length; i++) {
    allPlayers[i].value = allPlayersArr[index]
    index++
  }
}

function shuffleArr(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // while there remain elements to shuffle
  while (0 !== currentIndex) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}