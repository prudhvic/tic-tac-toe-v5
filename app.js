let player1 = document.querySelector(".player_1+button");
let player2 = document.querySelector(".player_2+button");
let cancelBtn = document.querySelector(".btn-cancel");
let confirmBtn = document.querySelector(".btn-confirm");
let form = document.querySelector("form");
let modal = document.querySelector(".modal");
let backdrop = document.querySelector(".backdrop");
let btnStart = document.querySelector("#btn-start");
// let playerName1 = document.querySelector(".player_1");
// let playerName2 = document.querySelector(".player_2");
let currentPlayer = 1;
let isgameover = false;
console.log(btnStart);
let players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];
let games = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let activePlayer = 0;
console.log(player1, player2);
let openModal = (e) => {
  currentPlayer = e.target.dataset.player;
  console.log(currentPlayer);
  modal.style.display = "block";
};
let closeModal = (e) => {
  modal.style.display = "none";
  backdrop.style.display = "none";

  form.playerName.value = "";
};
let handleSubmit = (e) => {
  e.preventDefault();
  let details = e.target;
  let formData = new FormData(details);

  let enteredName = formData.get("playerName").trim();
  if (!enteredName) {
    alert("please enter your name");
    return;
  }
  let playerActive = document.querySelector(`.player_${currentPlayer}`);
  console.log(playerActive);
  playerActive.innerText = enteredName;
  players[currentPlayer - 1].name = enteredName;
  closeModal();
};

player1.addEventListener("click", openModal);
player2.addEventListener("click", openModal);
cancelBtn.addEventListener("click", closeModal);
form.addEventListener("submit", handleSubmit);

let pads = document.querySelectorAll(".board li");
let switchPlayers = () => {
  if (activePlayer == 1) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }
};
let currentRound = 1;
let handlePad = (e) => {
  if (!(players[0].name && players[1].name)) {
    alert("please enter details");
    return;
  }
  let player = e.target;
  let row = player.dataset.row - 1;
  let col = player.dataset.col - 1;
  player.classList.add("disabled");

  if (games[row][col] > 0) {
    alert("plase click empty box");
    return;
  }
  player.textContent = players[activePlayer].symbol;
  games[row][col] = activePlayer + 1;

  console.log(games);
  let winnerId = gameOver();
  declareWinner(winnerId);

  currentRound++;
  switchPlayers();
};

pads.forEach((pad) => {
  pad.addEventListener("click", handlePad);
});

let startgame = (e) => {
  let board = document.querySelector(".board");
  console.log(board);
  board.style.display = "grid";
  // window.location.reload();
};
btnStart.addEventListener("click", startgame);
let gameOver = () => {
  for (let i = 0; i < 3; i++) {
    if (
      games[i][0] > 0 &&
      games[i][0] == games[i][1] &&
      games[i][1] == games[i][2]
    ) {
      return games[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      games[0][i] > 0 &&
      games[0][i] == games[1][i] &&
      games[1][i] == games[2][i]
    ) {
      return games[0][i];
    }
  }
  if (
    games[0][0] > 0 &&
    games[0][0] == games[1][1] &&
    games[1][1] == games[2][2]
  ) {
    return games[0][0];
  }
  if (
    games[2][0] > 0 &&
    games[2][0] == games[1][1] &&
    games[1][1] == games[0][2]
  ) {
    return games[2][0];
  }
  if (currentRound == 9) {
    return -1;
  }
  return 0;
};
let declareWinner = (winnerId) => {
  if (winnerId == 0) {
    return;
  }
  if (winnerId == -1) {
    isgameover = true;
    alert("Draw");
    return;
  }
  isgameover = true;
  let winner = players[winnerId - 1].name;
  backdrop.style.display = "block";
  modal.style.display = "block";
  modal.classList.add("winner-modal");
  modal.innerHTML = `<h2 class="winner">winner is : ${winner}</h2>
  `;
};
backdrop.addEventListener("click", closeModal);
