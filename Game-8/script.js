const finalMessage = document.getElementById("final-message");
const playAgain = document.getElementById("playAgain");
const notificationMessage = document.getElementById("notification-message");
const popupContainer = document.getElementById("popup-container");
const wrongLetters = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const figureParts = document.querySelectorAll(".figure-part");
const words = ["khalaf", "ali", "elwan", "kareem", "mohey"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);
let correctedLetters = [];
let wrongLetter = [];
let body = 0;
function displayWord() {
  word.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
      <span class="letter">${
        correctedLetters.includes(letter) ? letter : ""
      }</span>
    `
    )
    .join("")}`;
  const innerWord = word.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "You have Won";
    popupContainer.style.display = "flex";
  }
}

const playAgainHandler = () => {
  popupContainer.style.display = "none";
  wrongLetters.innerHTML = "";
  word.innerHTML = "";
  figureParts.forEach((item) => {
    item.style.display = "none";
  });
  correctedLetters = [];
  wrongLetter = [];
  selectedWord = words[Math.floor(Math.random() * words.length)];
  body = 0;
};
const displayWrong = () => {
  figureParts[body].style.display = "flex";
  body++;
  if (body === 6) {
    finalMessage.innerText = "I'm sorry";
    popupContainer.style.display = "flex";
    body = 0;
  }
  // console.log(figureParts);
  wrongLetter.join(",");
  wrongLetters.innerHTML = `
      <p>Wrong</p>
      <span>${wrongLetter}</span>
      `;
};
window.addEventListener("keypress", (e) => {
  // console.log(selectedWord.includes(e.key));
  // console.log(correctedLetters)
  // console.log(e.key.toLowerCase);
  if (e.keyCode >= 97 && e.keyCode <= 122) {
    notificationMessage.classList.remove("show");

    if (selectedWord.includes(e.key)) {
      correctedLetters.push(e.key);
      displayWord();
    } else {
      if (!wrongLetter.includes(e.key)) {
        wrongLetter.push(e.key);
        displayWrong();
      } else {
        notificationMessage.classList.add("show");
      }
    }
  }
});
playAgain.addEventListener("click", playAgainHandler);
