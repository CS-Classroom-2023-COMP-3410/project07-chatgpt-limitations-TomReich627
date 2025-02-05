document.addEventListener("DOMContentLoaded", () => {
  const gameGrid = document.getElementById("game-grid");
  const moveCounter = document.getElementById("move-counter");
  const timer = document.getElementById("timer");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const gameContainer = document.querySelector(".game-container");

  const cards = [
    "🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓",
    "🍒", "🍒", "🍍", "🍍", "🥝", "🥝", "🍉", "🍉"
  ];

  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let gameTimer = null;
  let secondsElapsed = 0;
  let gameStarted = false;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function initializeGame() {
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    secondsElapsed = 0;
    moveCounter.textContent = moves;
    timer.textContent = "0:00";
    clearInterval(gameTimer);
    gameGrid.innerHTML = "";
    gameStarted = true;
    restartButton.disabled = false;
    startButton.disabled = true;

    shuffle(cards).forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      
      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner");

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");
      
      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");

      const fruitSpan = document.createElement("span");
      fruitSpan.textContent = card;
      cardBack.appendChild(fruitSpan);

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);
      
      cardElement.addEventListener("click", flipCard);
      gameGrid.appendChild(cardElement);
    });

    startTimer();
  }

  function startTimer() {
    clearInterval(gameTimer);
    secondsElapsed = 0;
    gameTimer = setInterval(() => {
      secondsElapsed++;
      const minutes = Math.floor(secondsElapsed / 60);
      const seconds = secondsElapsed % 60;
      timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }

  function flipCard() {
    if (!gameStarted || flippedCards.length === 2) return;
  
    const card = this.querySelector('.card-inner');
  
    if (!this.classList.contains("flip")) {
      this.classList.add("flip");
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        moves++;
        moveCounter.textContent = moves;
        checkForMatch();
      }
    }
  }

  function checkForMatch() {
    const [card1, card2] = flippedCards;
    const cardBack1 = card1.querySelector(".card-back");
    const cardBack2 = card2.querySelector(".card-back");

    if (cardBack1.textContent === cardBack2.textContent) {
      card1.classList.add("match");
      card2.classList.add("match");

      matchedPairs++;
      flippedCards = [];

      if (matchedPairs === cards.length / 2) {
        clearInterval(gameTimer);
        setTimeout(() => {
          alert(`🎉 Congratulations! You completed the game in ${moves} moves and ${timer.textContent}.`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        flippedCards = [];
      }, 1000);
    }
  }

  startButton.addEventListener("click", initializeGame);
  restartButton.addEventListener("click", initializeGame);

  /* 🏗 Adjust Game Size to Stay Inside the Fruit Border */
  function adjustGameSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const minMargin = 80; // Keeps game further from the edges

    const maxGameWidth = screenWidth * 0.65;
    const maxGameHeight = screenHeight * 0.55;

    gameContainer.style.width = `${Math.min(450, maxGameWidth)}px`;
    gameContainer.style.height = `${Math.min(550, maxGameHeight)}px`;

    gameContainer.style.top = `${minMargin}px`;
  }

  window.addEventListener("resize", adjustGameSize);
  adjustGameSize();
});

/* 🍉 Fixed Fruit Border */
document.addEventListener("DOMContentLoaded", () => {
  const fruitBorderContainer = document.createElement("div");
  fruitBorderContainer.classList.add("fruit-border");
  document.body.appendChild(fruitBorderContainer);

  const fruitOptions = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍", "🥝", "🍉"];

  function createFruit(x, y) {
    const fruitItem = document.createElement("div");
    fruitItem.classList.add("fruit-item");
    fruitItem.textContent = fruitOptions[Math.floor(Math.random() * fruitOptions.length)];
    fruitItem.style.position = "absolute";
    fruitItem.style.left = `${x}px`;
    fruitItem.style.top = `${y}px`;

    fruitBorderContainer.appendChild(fruitItem);
  }

  function generateFixedFruitBorder() {
    fruitBorderContainer.innerHTML = "";
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const borderOffset = 10; // Ensures fruits stay near the edge
    const fruitSize = Math.min(screenWidth, screenHeight) * 0.05;

    for (let x = borderOffset; x < screenWidth - borderOffset; x += fruitSize) {
      createFruit(x, borderOffset); // Top row
      createFruit(x, screenHeight - borderOffset - fruitSize); // Bottom row
    }

    for (let y = borderOffset; y < screenHeight - borderOffset; y += fruitSize) {
      createFruit(borderOffset, y); // Left column
      createFruit(screenWidth - borderOffset - fruitSize, y); // Right column
    }
  }

  generateFixedFruitBorder();
  window.addEventListener("resize", generateFixedFruitBorder);
});
