(function(){
  // Event listener - Click on shuffle button ------------------------------------------
  document.querySelector('#btn-shuffle').addEventListener('click', () => {
    // Check how many players are playing (defined in players.js)
    if (amountOfPlayers == 0) allPlayers = document.querySelectorAll('.rounds.quarter .player')
    if (amountOfPlayers == 1) allPlayers = document.querySelectorAll('.rounds.eighth .player')    

    // GSAP Timeline - Shuffle ------------------------------------------
    const tlShuffle = new gsap.timeline({paused: true, defaults: {ease: Power1.easeInOut}})

    tlShuffle
    .fromTo(allPlayers, {opacity: 1}, {opacity: 0})
    
    .add(function () {
      let index = 0

      for (let i = 0; i < allPlayers.length; i++) {
        // Append shuffled players
        allPlayers[i].value = allPlayersArr[index]
        // Check font size
        scaleFontSize(allPlayers[i])
        index++
      }
    })

    .set(allPlayers, {opacity: 0, scale: 2,})

    .to(allPlayers, {
      opacity: 1,
      stagger: 0.5,
      scale: 1,
    })

    if (!tlShuffle.isActive()) {
      // Create array from inputs
      allPlayersArr = [];
      for (let i = 0; i < allPlayers.length; i++) {
        allPlayersArr.push(allPlayers[i].value)
      }
      // Shuffle array
      shuffleArr(allPlayersArr)
      console.log(allPlayersArr)
      // Run GSAP timeline
      tlShuffle.play(0)
    }
  })

  // Shuffle function ------------------------------------------
  function shuffleArr(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // Swap it with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
})()