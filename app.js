// the game state object
let gameState = {
  totalClicks: 0,
  clickRate: 0.0,
};

let upgradeList = [];

//===========================================================================
// update game state function, called every one second by interval timer
function updateGameState() {
  //console.log("updateGameState called");
}

//===========================================================================
// called by the cookie image being clicked by user
function userMouseClick() {
  gameState.totalClicks += 1;
  document.getElementById("clicksTotalText").textContent =
    gameState.totalClicks + " clicks";
}

//===========================================================================
//  sets up and starts the interval timer called when page loadState
function initInterval() {
  console.log("initInterval() called");
  setInterval(updateGameState, 1000);

  // adding call back to the cookie image here
  // this could be moved to the proper location later
  document
    .getElementById("theCookieButton")
    .addEventListener("click", function (event) {
      userMouseClick();
    });
}

//===========================================================================
//  calls the upgrades API to get all the upgrades, called when page loads
// adds in the upgrade buttons and configures them
async function getUpgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );

  upgradeList = await response.json();

  // loop through the upgradeList array and create a button for each entry
  // make the button id match the object.id
  // make the buttons text up from the name,cost and increase
  // make the button disabled - the interval timer will enable when the player has enough clicks

  // get the upgradeContainer element
  upCon = document.getElementById("upgradesContainer");

  for (i = 0; i < upgradeList.length; i++) {
    const newBut = document.createElement("button");

    newBut.textContent =
      upgradeList[i].name +
      " cost:" +
      upgradeList[i].cost +
      " rate:+" +
      upgradeList[i].increase;
    newBut.id = upgradeList[i].id;

    // newBut.disabled = true;

    newBut.style.maxWidth = "150px";
    newBut.addEventListener("click", function (event) {
      upgradeButtonClicked(event);
    });
    upCon.appendChild(newBut);
  }
}

function upgradeButtonClicked(event) {
  console.log("upgrade clicked the event is", event.target.id);
  // we now have the button id that we can use to grab
}

//===========================================================================
// will move this to a proper location later (honest!)

//Todo: load local storage if it exists
getUpgrades();
initInterval();

todo: workout how to set the autoclicker value and apply it