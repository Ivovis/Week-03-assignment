// the game state object
let gameState = {
  totalClicks: "0",
  clickRate: "",
};

// update game state function, called every one second by interval timer
function updateGameState() {
  console.log("updateGameState called");
}

// called by the cookie image being clicked by user
function userMouseClick() {
  console.log("userMouseClick() called");
}

//  sets up and starts the interval timer called when page loadState
function initInterval() {
  console.log("initInterval() called");
}

//  calls the upgrades API to get all the upgrades, called when page loads
function getUpgrades() {
  console.log("getUpgrades() called");
}

// will move this to a proper location later (honest!)
getUpgrades();
initInterval();
