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
  //   console.log("userMouseClick() called");

  // add 1 to the current clicks
  gameState.totalClicks += 1;

  // update the display
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
  //API url: https://cookie-upgrade-api.vercel.app/api/upgrades
  console.log("getUpgrades() called");

  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );

  // should check here that response.status is 200
  // if not we should use a fall back list of upgrades

  upgradeList = await response.json();

  // overthinking this - if the request times out upgradeList will not be what we expect ?

  // loop through the upgradeList array and create a button for each entry
  // make the button id match the object.id
  // make the buttons text includes the object.name object.cost,object.increase
  // make the button disabled - the interval timer will enable

  // upgrade the upgradeContainer element
  upCon = document.getElementById("upgradesContainer");

  for (i = 0; i < upgradeList.length; i++) {
    console.log(`${i} ${upgradeList[i].name}`);
    const newBut = document.createElement("button");
    newBut.textContent = upgradeList[i].name;
    newBut.id = upgradeList[i].id;
    // newBut.disabled = true;
    newBut.addEventListener("click", function (event) {
      upgradeButtonClicked(event);
    });
    upCon.appendChild(newBut);
  }
}

function upgradeButtonClicked(event) {
  console.log("upgrade clicked the event is", event.target.id);
}

//===========================================================================
// will move this to a proper location later (honest!)
getUpgrades();
initInterval();
