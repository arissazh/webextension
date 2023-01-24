const checkbox = document.getElementById("enable");
const addMoominButton = document.getElementById("add-moomin");

// Add event listeners to checkbox and button
checkbox.addEventListener("change", (e) => updateContentScript(false));
addMoominButton.addEventListener("click", (e) => updateContentScript(true));

async function updateContentScript(addMoomin) {
  // Sends a message to the content script with an object that has the
  // current value of the checkbox and whether Moomin is added or not
  const message = { enable: checkbox.checked, addMoomin: addMoomin };
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  console.log(response);
}
