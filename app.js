const totalClicksText = " Cookies";
const totalRateText = "Cookies per second: ";

// the game state object
let gameState = {
  totalClicks: 95, // Numbers go up!
  clickRate: 0, // added to totalClicks every second
  save: function () {
    localStorage.setItem("cookieGameSave", JSON.stringify(this));
  },
  load: function () {
    const saveState = localStorage.getItem("cookieGameSave");

    if (saveState) {
      console.log("found save - restoring:", saveState);
      data = JSON.parse(saveState);
      this.totalClicks = data.totalClicks;
      this.clickRate = data.clickRate;
    } else {
      console.log("no save found - using defaults", saveState);
    }
  },
};

// I am remember

let upgradeList = [];

//===========================================================================
// update game state function, called every second by interval timer
function updateGameState() {
  gameState.totalClicks += gameState.clickRate;
  updateDisplay();
  checkUpgradeAvailability();
}

//===========================================================================
// called by the cookie image being clicked by user
function userMouseClick() {
  gameState.totalClicks += 1;
  updateDisplay();
  checkUpgradeAvailability();
}

//===========================================================================
//  sets up and starts the interval timer called when page loadState
function initInterval() {
  setInterval(updateGameState, 1000);

  // adding call back to the cookie image here
  // this should be moved to the proper location later
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
    // this is ugly programmer art, will replace (honest!)
    newBut.textContent =
      upgradeList[i].name +
      " cost:" +
      upgradeList[i].cost +
      " rate:+" +
      upgradeList[i].increase;
    newBut.id = upgradeList[i].id;
    newBut.disabled = true;
    newBut.style.maxWidth = "150px"; //TODO: remove before tackling CSS
    // newBut.addEventListener("click", function (event) {
    //   upgradeButtonClicked(event);
    // });
    // this is neater!
    newBut.addEventListener("click", upgradeButtonClicked);
    upCon.appendChild(newBut);
  }
  // add button to the upgradeContainer to reset the game
  // no warning or alerts, this is a brutal learn the hard way reset
  const newBut = document.createElement("button");
  newBut.textContent = "Reset Game";
  newBut.id = "resetGame";
  newBut.style.maxWidth = "150px";
  newBut.addEventListener("click", function (event) {
    gameState.totalClicks = 0;
    gameState.clickRate = 0;
    updateDisplay();
  });
  upCon.appendChild(newBut);
}

//===========================================================================
// called by any upgrade button
function upgradeButtonClicked(event) {
  // Use the button's ID to create the index for the correct upgrade values
  const idx = event.target.id - 1;

  // grab the correct upgrade values from the upgrades array
  // I know I can skip this and just upgrade the values as I do below ..
  const additionalRate = upgradeList[idx].increase;
  const newRateCost = upgradeList[idx].cost;

  // but I wanted to checked them like this first
  // console.log(
  //   "the rate to be added to our update",
  //   additionalRate,
  //   "costing",
  //   newRateCost
  // );

  /*
  Thoughts:
    This rate increase is going to be added to the cookie count every second  
    the total per second is 3886 (if we only allow a single purchase of each upgrade)
    JS 'Number' has room for Number.MAX_SAFE_INTEGER/3886/60/60/24/365.25 years that will be 73448.51285195282 years exceeding the life expectancy of nearly all users. I will not need to limit the number of upgrade purchases.
*/

  gameState.totalClicks -= newRateCost;
  gameState.clickRate += additionalRate;
  updateDisplay();
  checkUpgradeAvailability();
}

//===========================================================================
// update the upgrade enabled status
function checkUpgradeAvailability() {
  // loop through the upgradeList and enable/disable buttons as needed

  for (i = 0; i < upgradeList.length; i++) {
    const butElement = document.getElementById(i + 1);
    if (gameState.totalClicks < upgradeList[i].cost) {
      butElement.disabled = true;
    } else {
      butElement.disabled = false;
    }
  }
}

//===========================================================================
// update display (its called from more than one place in code so extracted it here)
function updateDisplay() {
  document.getElementById("clicksTotalText").textContent =
    gameState.totalClicks + totalClicksText;
  document.getElementById("clickRateText").textContent =
    totalRateText + gameState.clickRate;
  gameState.save(); // saving here seems most logical
}

//===========================================================================
// This just feels more tidy now!
document.addEventListener("DOMContentLoaded", () => {
  gameState.load();
  getUpgrades();
  initInterval();
  updateDisplay();
  console.log("setup run and complete");
});
