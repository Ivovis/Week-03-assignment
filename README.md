# Week-03-assignment

Create a cookie clicker game

Building the project, spent a time figuring out 'thePlan.txt' placed in the misc folder, this is my starting point to reference as I proceed, and as I get a little lost in details.

First up the wireframe:<br>
<img src="./misc/CookieClickerWireframe.png" width="400">

my plan is to use the same layout for desktop and center it on the screen, I need the CSS practice!
I will start with no styling and just get the game working, then add the styling.

---

Basic framework completed, Not used branches for the task, forgot, will play with branches outside the assignment later

---

checkpoint 2: I have managed to add buttons matching the returned upgrades from the API, I have configured the buttons ID to match the upgrades ID and use the same callback function passing the event, then logging to console within that function the ID of the calling button.
all happy at the moment, not sure I'm doing the buttons call back correctly, I am calling an anon function that just calls my function passing the event, this seems a bit ungainly, I have a feeling that I should just be calling 'my' callback function and skipping the anon part altogether.

I'll push my assignment now with the message checkpoint2

---

Checkpoint 3: 2025 05 0943
I now have a functioning app with no styling and no local save feature.
all going well nearly started researching favicon just to remove the warning kicked out by firefox dev tools, but keeping on track...

---

Checkpoint 4: 2025 05 10:57
I now have the local storage working and learned that using two different browsers (brave and firefox) will behave the same as using two different devices.
I have experience of object oriented programming so wondered if I could just give my gameState object methods for loading and saving - turns out I can but I know this is outside the scope of the boot camp, keeping this (oh the irony) in mind would I have been correct to have had normal (like all the rest) functions for save and load that would update the gameState values? I don't remember if we covered creating methods on objects.

I added a game reset button to my upgrades and its working fine, I wanted to check that my system of updating the enabled state of the buttons behaved fine and its seems ok, looking closer ID's are unique to the page and the upgrade update function will never access it - all good.

I'm now off to slay my CSS demons wish me luck!

---

Checkpoint 5: 2025 05 16 1719
Made progress and killed a couple of CSS demons, still work to do but I am happy with the small screen styling so far, I see so many options I could add looking forward to pushing the design in different directions.

---

Checkpoint 6: Final submission

Requirements check:

- Fetch upgrade data from the provided API and at least one upgrade from the API update the cookie count.
  <br> Confident I managed this.
- Ensure functions are used effectively.
  <br> The comments make it look ugly, would normally remove, else happy with the resulting functionality.
- Implement event listeners to handle user interactions.
  <br> Three implemented one for interval time, one for (any) upgrade button press and one for the cookie click.
- Use local storage to save and restore the cookie count and relevant game information.
  <br> I seem to have got this working ok, noticed that local saves are browser dependent, ie two browsers firefox and brave store localdata as if it were two different devices.
- Use setInterval to increment the cookie count and manage the game state each second.
  <br> Every second Sir like clockwork!

The only stretch goal I may have met was managing all upgrades using a single function, namely upgradeButtonClicked() it uses the button id to calculate the index of the upgradeList array, This is weak because if the API changes, everything could fall apart.

and thats all the best parts, because I still need to spend much more time learning CSS, I wanted to have a fixed space between the two container elements and any spare space taken up on both margins, I know this will likely come to me at 10:01pm tonight!

---

Checkpoint 7: I couldn't leave it alone, I added another container and gave it a minimum width, this give me exactly the behavior I was aiming for. feeling a little more content now

**important note**

- app.js has a constant named gradingPersonsLittleHelper it is set to 50, this was added so the application could be tested by yourself without using up so much more skin clicking all them cookies, cats, ram sticks and whatever else got added over the weekend! if you set it to 0 you will get the 'production' version needing the full amount of clicks to unlock the upgrades.

---

Sources:
The audio file downloaded from https://pixabay.com/sound-effects/crunchy-foot-96992/
This was shortened using Audacity and exported as in the ogg format with a new name.

The cookie image is from https://commons.wikimedia.org/wiki/File:Cookie.svg
