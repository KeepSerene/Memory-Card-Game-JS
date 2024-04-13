let playerLives = 6;
const playerLivesCountEl = document.querySelector(".player-lives-count");
const sectionEl = document.querySelector("section");

playerLivesCountEl.innerText = playerLives;

const getData = () => [
  { imgSrc: "./images/beatles.jpeg", name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", name: "blink182" },
  { imgSrc: "./images/fkatwigs.jpeg", name: "fkatwigs" },
  { imgSrc: "./images/fleetwood.jpeg", name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", name: "joy-wood" },
  { imgSrc: "./images/ledzep.jpeg", name: "ledzep" },
  { imgSrc: "./images/metallica.jpeg", name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", name: "pinkfloyd" },
  { imgSrc: "./images/beatles.jpeg", name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", name: "blink182" },
  { imgSrc: "./images/fkatwigs.jpeg", name: "fkatwigs" },
  { imgSrc: "./images/fleetwood.jpeg", name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", name: "joy-wood" },
  { imgSrc: "./images/ledzep.jpeg", name: "ledzep" },
  { imgSrc: "./images/metallica.jpeg", name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", name: "pinkfloyd" },
];

const randomizeData = () => getData().sort(() => Math.random() - 0.5);

const generateCards = () => {
  const shuffledCards = randomizeData();

  shuffledCards.forEach((card) => {
    const cardEl = document.createElement("div");
    const cardFrontEl = document.createElement("img");
    const cardBackEl = document.createElement("div");

    cardEl.classList.add("card");
    cardFrontEl.classList.add("card-front");
    cardBackEl.classList.add("card-back");

    cardFrontEl.src = card.imgSrc;
    cardFrontEl.alt = `Image of ${card.name}`;

    cardEl.setAttribute("name", card.name);

    sectionEl.appendChild(cardEl);
    cardEl.appendChild(cardFrontEl);
    cardEl.appendChild(cardBackEl);

    cardEl.addEventListener("click", (event) => {
      cardEl.classList.toggle("toggled-card");

      handleClicks(event);
    });
  });
};

// Handles the game logic
const handleClicks = (event) => {
  event.target.classList.add("flipped");
  const flippedCards = sectionEl.querySelectorAll(".flipped");

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");

        setTimeout(() => card.classList.remove("toggled-card"), 1000);
      });

      playerLives--;
      playerLivesCountEl.innerText = playerLives;

      if (playerLives === 0) restart("You lost💩! Try again...");
    }
  }

  // Check for win
  const toggledCards = sectionEl.querySelectorAll(".toggled-card");

  if (toggledCards.length === 16) restart("You nailed it, Champ🏆!");
};

// Reset the game
const restart = (msg) => {
  const shuffledCards = randomizeData();
  const cardFrontEls = sectionEl.querySelectorAll(".card-front");
  const cardEls = sectionEl.querySelectorAll(".card");

  // Disable pointer-events on the section element when the game is resetting
  sectionEl.style.pointerEvents = "none";

  shuffledCards.forEach((card, index) => {
    cardEls[index].classList.remove("toggled-card");

    setTimeout(() => {
      // Reset the pointer-events on the matched cards (if any)
      cardEls[index].style.pointerEvents = "all";

      // Shuffle the card fronts by updating their img src and alt tags
      cardFrontEls[index].src = card.imgSrc;
      cardFrontEls[index].alt = `Image of ${card.name}`;

      // Update the name attribute
      cardEls[index].setAttribute("name", card.name);

      // Enable pointer-events on the section element once the game resumes
      sectionEl.style.pointerEvents = "all";
    }, 1000);
  });

  playerLives = 6;
  playerLivesCountEl.innerText = playerLives;

  setTimeout(() => alert(msg), 100);
};

generateCards();
