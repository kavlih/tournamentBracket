const shuffleButton = document.querySelector('#btn-shuffle')

shuffleButton.addEventListener('click', () => {shuffle()})

function shuffle() {
  // check how many players are playing (defined in players.js)
  if (activePlayers == 0) allPlayers = document.querySelectorAll('.rows.quarter input')
  if (activePlayers == 1) allPlayers = document.querySelectorAll('.rows.eight input')  
  // create array from inputs
  allPlayersArr = [];
  for (let i = 0; i < allPlayers.length; i++) {
    allPlayersArr.push(allPlayers[i].value);
  }
  // shuffle array
  shuffleArr(allPlayersArr)

  // gsap timeline ------------------------------------------
  let tlShuffle = new gsap.timeline({defaults: {ease: Power1.easeInOut}})

  tlShuffle
  .fromTo(allPlayers, {opacity: 1}, {opacity: 0})
  
  // append shuffled players
  .add(function () {
    let index = 0

    for (let i = 0; i < allPlayers.length; i++) {
      allPlayers[i].value = allPlayersArr[index]
      index++
    }
  })

  .set(allPlayers, {opacity: 0, scale: 2,})

  .to(allPlayers, {
    opacity: 1,
    stagger: 0.5,
    scale: 1,
  })

  console.log(allPlayersArr);
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