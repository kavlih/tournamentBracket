// background animation
let tlBracketStrings = new gsap.timeline({
  paused:true, 
  defaults: {
    duration:0.5,
    ease: Power2.easeInOut
  }
})

tlBracketStrings
// hide rows
.to('#rows-container .rows.eight .textbox', {maxWidth: 0, minWidth: 0}, 0)
.fromTo('#rows-container .rows.eight', {width: '100%', margin: '0 1%'}, {width: '0%', margin: '0 0%'}, 0)
// animate svg background
.to('#_1_erlines', {attr:{x1:"744.2",y1:"283.2",x2:"587.8",y2:"283.2"}}, 0)
.to('#_1_erlines_1_', {attr:{x1:"744.2",y1:"475.7",x2:"894.4",y2:"475.7"}}, 0)
.to('#_1_erlines_2_', {attr:{x1:"749.2",y1:"288.2",x2:"592.8",y2:"288.2"}}, 0)
.to('#_1_erlines_3_', {attr:{x1:"739.2",y1:"480.7",x2:"889.4",y2:"480.7"}}, 0)
.to('#_2_erlines', {attr:{points:"271.1,187.1 587.8,190.2 582.7,567.9 271.1,567.9"}}, 0)
.to('#_2_erlines_1_', {attr:{points:"1205.6,188.4 891.5,193 895.3,560.4 1205.6,568.6"}}, 0)
.to('#_2_erlines_2_', {attr:{points:"276.1,192.1 592.8,195.2 587.7,572.9 276.1,572.9"}}, 0)
.to('#_2_erlines_3_', {attr:{points:"1200.6,193.4 886.5,198 890.3,565.4 1200.6,573.6"}}, 0)
.to('#_4_erlines', {attr:{points:"121,94.3 271.1,96.7 271.1,279.9 121,286.1"}}, 0)
.to('#_4_erlines_1_', {attr:{points:"121,468.3 271.1,474 275.2,660.1 120.4,667.6"}}, 0)
.to('#_4_erlines_2_', {attr:{points:"1360.8,93.2 1207.5,93.2 1203.8,279 1360.8,283.6"}}, 0)
.to('#_4_erlines_3_', {attr:{points:"1358.4,475.7 1203.8,468.6 1207.5,668.6 1358.4,668.6"}}, 0)
.to('#_4_erlines_4_', {attr:{points:"126,473.3 276.1,479 280.2,665.1 125.4,672.6"}}, 0)
.to('#_4_erlines_5_', {attr:{points:"126,99.3 276.1,101.7 276.1,284.9 126,291.1"}}, 0)
.to('#_4_erlines_6_', {attr:{points:"1353.4,480.7 1198.8,473.6 1202.5,673.6 1353.4,673.6"}}, 0)
.to('#_4_erlines_7_', {attr:{points:"1355.8,98.2 1202.5,98.2 1198.8,284 1355.8,288.6"}}, 0)
.to('#_8_erlines', {attr:{points:"1360.8,93.2 1360.8,93.2 1360.8,93.2 1360.8,93.2"}}, 0)
.to('#_8_erlines_1_', {attr:{points:"1360.8,283.6 1360.8,283.6 1360.8,283.6 1360.8,283.6"}}, 0)
.to('#_8_erlines_2_', {attr:{points:"121,94.3 121,94.3 121,94.3 121,94.3"}}, 0)
.to('#_8_erlines_3_', {attr:{points:"121,286.1 121,286.1 121,286.1 121,286.1"}}, 0)
.to('#_8_erlines_4_', {attr:{points:"120.4,468.2 120.4,468.2 120.4,468.2 121,468.3"}}, 0)
.to('#_8_erlines_5_', {attr:{points:"118.8,667.6 120.4,667.6 120.4,667.6 120.4,667.6"}}, 0)
.to('#_8_erlines_6_', {attr:{points:"1358.4,475.7 1358.4,475.7 1358.4,475.7 1358.4,475.7"}}, 0)
.to('#_8_erlines_7_', {attr:{points:"1358.4,668.6 1358.4,668.6 1358.4,668.6 1358.4,668.6"}}, 0)
.to('#_8_erlines_8_', {attr:{points:"123.8,672.6 125.4,672.6 125.4,672.6 125.4,672.6"}}, 0)
.to('#_8_erlines_9_', {attr:{points:"125.4,473.2 125.4,473.2 125.4,473.2 126,473.3"}}, 0)
.to('#_8_erlines_10_', {attr:{points:"126,291.1 126,291.1 126,291.1 126,291.1"}}, 0)
.to('#_8_erlines_11_', {attr:{points:"126,99.3 126,99.3 126,99.3 126,99.3"}}, 0)
.to('#_8_erlines_12_', {attr:{points:"1353.4,673.6 1353.4,673.6 1353.4,673.6 1353.4,673.6"}}, 0)
.to('#_8_erlines_13_', {attr:{points:"1353.4,480.7 1353.4,480.7 1353.4,480.7 1353.4,480.7"}}, 0)
.to('#_8_erlines_14_', {attr:{points:"1355.8,288.6 1355.8,288.6 1355.8,288.6 1355.8,288.6"}}, 0)
.to('#_8_erlines_15_', {attr:{points:"1355.8,98.2 1355.8,98.2 1355.8,98.2 1355.8,98.2"}}, 0)

// translate textfields animation
let tlTranslate = new gsap.timeline({
  paused:true, 
  defaults: {
    duration:0.5,
    ease: Power2.easeInOut
  }
})

tlTranslate
.to('.rows.quarter.left', {x:-40}, 0)
.to('.rows.quarter.right', {x:40,}, 0)
.to('.rows.semi.left', {x:-20}, 0)
.to('.rows.semi.right', {x:20,}, 0)

//---------------------------------------------------------------------------

const players = document.querySelectorAll('#players button')
// set default players
let activePlayers = 1

function setPlayers(index) {
  // toggle button styles
  players[activePlayers].classList.remove('active')
  activePlayers = index
  players[activePlayers].classList.add('active')
  // play animation
  if (activePlayers == 0) {
    tlBracketStrings.play()
    if (window.matchMedia( "(min-width: 1400px)" ).matches) {
      tlTranslate.play()
    }
  }
  if (activePlayers == 1) {
    tlBracketStrings.reverse()
    tlTranslate.reverse()
  }
}
// run on load
setPlayers(activePlayers)
// check window resize for translate animation
window.onresize = function() {
  if (activePlayers == 0) {
    if (window.matchMedia( "(min-width: 1400px)" ).matches) {
      tlTranslate.play()
    } else {
      tlTranslate.reverse()
    }
  }
  if (activePlayers == 1) {
    tlTranslate.reverse()
  }
}
// eventlistener on buttons
for (let i = 0; i < players.length; i++) {
  players[i].addEventListener('click', (evt) => {
    setPlayers(evt.target.getAttribute('data-index'))
  })
}