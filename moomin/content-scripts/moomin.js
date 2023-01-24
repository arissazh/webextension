let showBlocks = true;

// Create a block container div and append it to the document
const blockContainer = document.createElement("div");
blockContainer.classList.add("blockContainer");
document.body.appendChild(blockContainer);

function addMoomin() {
  // Create a div for the block
  const block = document.createElement("div");
  block.classList.add("blocker-block");

  // Create the drag handle
  const dragButton = document.createElement("button");
  dragButton.innerText = "+";
  makeDraggable(dragButton);

  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "x";
  deleteButton.addEventListener("click", deleteParent);

  // Create the image element for Moomin character
  const moomin = document.createElement("img");
  moomin.setAttribute('src', moominSelect());

  // Add Moomin image to the block
  block.appendChild(moomin);

  // Add the delete button and drag handle to the block
  block.appendChild(deleteButton);
  block.appendChild(dragButton);

  // Add the block to the block container
  blockContainer.appendChild(block);
}

// Select a random Moomin image to display on the block
function moominSelect() {
  var moominArray = [
    'https://media.tenor.com/aar0EWqFAmYAAAAM/moomin.gif',
    "https://media.tenor.com/0iASEGkZGgoAAAAM/moomin-wave.gif",
    'https://media.tenor.com/mCDFjLrUPi8AAAAM/moomin-snorkmaiden.gif',
    "https://media.tenor.com/gCJFCv8z-i8AAAAM/moomin.gif",
    "https://64.medtheia.tumblr.com/caea11c292adb60567932dedde26edef/3106f79f1a9cba76-c9/s500x750/f51cfb8914ed1110d8c67c5374fc6b294ac984a8.gif",
    "https://66.media.tumblr.com/10777bbcaab8d1a57a25ff51d7fc3ef6/tumblr_pqq98tha7G1ynr1s9o2_400.gif",
    "https://i.gifer.com/86G0.gif",
    "https://i.pinimg.com/originals/73/64/84/7364849cb6b0154663b436caa8ba5676.gif",
    "https://thumbs.gfycat.com/FarUnlinedBrahmancow-size_restricted.gif",
    "https://data.whicdn.com/images/172461309/original.gif",
    "https://img.wattpad.com/91226f6bddbacf439fdd677a8e394e3c675de271/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6366527a79317a744463486d75413d3d2d3935353436383135352e313633363861623262323731373563313238363732393938373834332e676966",
    "https://postpostist.files.wordpress.com/2014/04/tumblr_momn7ommjy1r05k5no1_500.gif"
  ]
  var value = moominArray[Math.floor(Math.random() * moominArray.length)];
  // Print to the console (to debug)
  console.log(value);
  return value;
}

function deleteParent(e) {
  e.target.parentNode.remove();
}

function makeDraggable(el) {
  el.addEventListener("mousedown", function (e) {
    const parentBlock = el.parentNode;
    var offsetX =
      e.clientX - parseInt(window.getComputedStyle(parentBlock).left);
    var offsetY =
      e.clientY - parseInt(window.getComputedStyle(parentBlock).top);

    function mouseMoveHandler(e) {
      parentBlock.style.top = e.clientY - offsetY + "px";
      parentBlock.style.left = e.clientX - offsetX + "px";
    }

    function reset() {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", reset);
    }

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", reset);
  });
}

function renderBlocks() {
  if (showBlocks) {
    blockContainer.classList.remove("invisible");
  } else {
    blockContainer.classList.add("invisible");
  }
}

// Add a message listener that sets the value of "replace"
chrome.runtime.onMessage.addListener((request) => {
  showBlocks = request["enable"];
  if (request["addMoomin"]) addMoomin();
  renderBlocks();
});
