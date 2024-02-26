let moveTile;
let blankTile;
let turns = 0;
function dragStart() {
  moveTile = this; // this is img tile being dragged
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter() {
  e.preventDefault();
}
function dragLeave() {
  e.preventDefault();
}
function dragDrop() {
  blankTile = this;
}
function dragEnd() {
  //to move it only to the sides
  let moveCoord = moveTile.id.split("-"); //["0","1"]
  let r = parseInt(moveCoord[0]);
  let c = parseInt(moveCoord[1]);

  let blankCoord = blankTile.id.split("-"); //["0","1"]
  let r2 = parseInt(blankCoord[0]);
  let c2 = parseInt(blankCoord[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;
  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isCorrect = moveLeft || moveRight || moveUp || moveDown;

  if (isCorrect) {
    let moveImg = moveTile.src;
    let blankImg = blankTile.src;

    moveTile.src = blankImg;
    blankTile.src = moveImg;

    turns += 1;
    document.getElementById("turns").innerHTML = turns;
  }
}

let first = document.querySelector(".first");
let second = document.querySelector(".second");
let third = document.querySelector(".third");
let last = document.querySelector(".last");
let body = document.querySelector("body");
let btnBox = document.querySelectorAll(".btnBox button");
let resetBtn= document.querySelector(".reset")
let rows = 3;
let columns = 3;
let imgIndex = ["3", "6", "2", "1", "9", "4", "8", "5", "7"];
// let correctIndex = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

for (let i = 0; i < btnBox.length; i++) {
  let button = btnBox[i];
  button.addEventListener("click", function () {
    resetGame();
    placeImg(button, i);
  });
}

function drags(tile) {
  tile.addEventListener("dragstart", dragStart); //starts drag on the image clicked
  tile.addEventListener("dragover", dragOver); //moves img with mouse
  tile.addEventListener("dragenter", dragEnter); // dragging on another one
  tile.addEventListener("dragleave", dragLeave); //gets the image its dragged on
  tile.addEventListener("drop", dragDrop); //over another image and drop
  tile.addEventListener("dragend", dragEnd); // swap
  document.getElementById("board").append(tile);
  tile.style.zIndex = "9999";
}
function resetGame() {
  turns = 0;
  document.getElementById("turns").innerHTML = turns;
  imgIndex = ["3", "6", "2", "1", "9", "4", "8", "5", "7"];

  let board = document.getElementById("board");
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
}
function placeImg(button, index) {
  body.style.backgroundColor = button.style.backgroundColor;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      if (imgIndex.length > 0) {
        tile.src = `./${button.className}/splits${
          index + 1
        }/${imgIndex.shift()}.jpg`;
        drags(tile);
      }
    }
  }
}

resetBtn.addEventListener("click",function(){
  resetGame()
  // let count=document.getElementById("turnCount").innerHTML; to check scores
}) 

// result=getElementById("result")
// if(imgIndex===correctIndex)[
//     result.innerHTML="SOLVED"
// ]

