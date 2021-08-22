const mainElement = document.querySelector('main');
const cards = document.querySelector("#cards");
const winningElement = document.querySelector("#winning");
const scoreElement = document.querySelector("#score");
const totalEmojiPairs = 6;
let score = 0;
const emojis = [
  "📸",
  "🎅",
  "🎃",
  "🍩",
  "🍒",
  "🍧",
  "🤡",
  "🎸",
  "👓",
  "💎",
  "⛳",
  "🏓",
  "🎯",
  "🥇",
  "🏆",
  "🩸",
  "🎄",
  "🎨",
  "👑",
];

const GetInitialEmojis = () => {
  const allEmojis = emojis.slice();
  const selectedEmojis = [];

  while (selectedEmojis.length < totalEmojiPairs) {
    const randIndex = Math.floor(Math.random() * allEmojis.length);
    selectedEmojis.push(allEmojis[randIndex]);
    allEmojis.splice(randIndex, 1);
  }
  return selectedEmojis;
};

const ShuffleArray = (array) => {
  const selectedEmojis = array.slice();
  const selectedEmojisLength = selectedEmojis.length;
  const shuffledArray = [];
  while (shuffledArray.length < selectedEmojisLength) {
    const randIndex = Math.floor(Math.random() * selectedEmojis.length);
    shuffledArray.push(selectedEmojis[randIndex]);
    selectedEmojis.splice(randIndex, 1);
  }
  return shuffledArray;
};

const StartGame = () => {
  const emojiState = {
    selectedElements: [],
    selectedVal: [],
    score: 0,
  };
  const selectedEmojis = GetInitialEmojis();
  const emojiPairs = ShuffleArray(selectedEmojis.concat(selectedEmojis));
  scoreElement.innerHTML = `Score: ${score}`;
  
  emojiPairs.map((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class='flip-card'>
        <div class='flip-card-inner'>
            <div class='flip-card-front'>
                <img src='peppa.png'>
            </div>
            <div class='flip-card-back'>
                <h1 class='emoji'>${emoji}</h1>
            </div>
        </div>
      </div>
    `;
    card.addEventListener("click", (el) => {
      if (
        card.classList.contains("flip-card-flipped") ||
        card.classList.contains("card-correct")
      )
        return;
      card.classList.add("flip-card-flipped");
      emojiState.selectedVal.push(emoji);
      emojiState.selectedElements.push(card);

      setTimeout(() => {
        if (emojiState.selectedElements.length == 2) {
          if (emojiState.selectedVal[0] == emojiState.selectedVal[1]) {
            emojiState.selectedElements[0].classList.add("card-correct");
            emojiState.selectedElements[1].classList.add("card-correct");
            emojiState.score = emojiState.score + 1;
          } else {
            emojiState.selectedElements[0].classList.remove(
              "flip-card-flipped"
            );
            emojiState.selectedElements[1].classList.remove(
              "flip-card-flipped"
            );
          }
          emojiState.selectedElements = [];
          emojiState.selectedVal = [];
          score++;
          scoreElement.innerHTML = `Score: ${score}`;
        }
        if (emojiState.score === selectedEmojis.length) {
          const fireworks = new Fireworks(mainElement, {
            particles: 200,
            explosion: 20,
            sound: { enable: true }
          });
          fireworks.start();
          cards.style.opacity = '0.5';
          winningElement.style.display = 'block';
        }
      }, 700);
    });
    cards.appendChild(card);
  });
};

StartGame();
