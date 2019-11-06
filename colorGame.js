let numberOfSquares = 6;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const winMessage = document.querySelector("#winMessage");
const headerBgColor = document.querySelector("h1");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function() {
  reset();
});

function init() {
  setUpModeButtons();
  setUpSquares();
  reset()
}

function changeColors(color) {
  for(let i = 0; i < numberOfSquares; i++) {
    squares[i].style.backgroundColor = color;
    squares[i].style.visibility = "visible";
  }
}

function generateRandomColors(num) {
  //make an array
  let colorsArray = [];
  //add random colors to array
  for (let i = 0; i < num; i++) {
    // get random color and push into array
    colorsArray.push(randomColor());
  }
  //return that array
  return colorsArray;
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numberOfSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  // change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  //set start-mode styles
  resetButton.textContent = "NEW COLORS";
  winMessage.textContent = "";
  headerBgColor.style.backgroundColor = "steelBlue";
  //change and add initial colors of squares
  for(let i = 0; i < squares.length; i++) {
    if(colors[i]) {
      squares[i].style.visibility = "visible";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.visibility = "hidden";
    }
  }
}

function setUpModeButtons() {
  for(let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "EASY" ? numberOfSquares = 3 : numberOfSquares = 6;
      reset();
    });
  }
}

function setUpSquares() {
  for(let i = 0; i < squares.length; i++) {
    // add click listeners to squares
    squares[i].addEventListener("click", function() {
      // grab color of clicked square
      let clickedColor = this.style.backgroundColor;
      // compare color to pickedColor
      if (clickedColor === pickedColor) {
        winMessage.textContent = "YOU WIN!!!";
        resetButton.textContent = "PLAY AGAIN?";
        winMessage.style.color = "#232323";
        headerBgColor.style.backgroundColor = pickedColor;
        changeColors(clickedColor);
      } else {
        this.style.visibility = "hidden";
        winMessage.textContent = "TRY AGAIN";
        winMessage.style.color = clickedColor;
      }
    });
  }
}
