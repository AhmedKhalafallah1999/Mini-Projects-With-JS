const price = document.getElementById("movie");
const Seats = document.querySelector(".seats-container");
const avialableSeats = Seats.querySelectorAll(".seat");
const counter = document.getElementById("count");
const totalPrice = document.getElementById("total");
const updateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
  const PriceFromStorage = JSON.parse(localStorage.getItem("totalPrice"));
  if (selectedSeats !== null) {
    selectedSeats.forEach((seat) => {
      avialableSeats[seat].classList.add("selected");
    });
  }
  if (PriceFromStorage !== null) {
    counter.innerText = PriceFromStorage[0];
    totalPrice.innerText = PriceFromStorage[1];
  }
  const movieOption = JSON.parse(localStorage.getItem("movieType"));
  price.value = price[movieOption].value;
};

Seats.addEventListener("click", (e) => {
  if (
    e.target.className !== "seat occupied" &&
    e.target.className !== "seat selected"
  ) {
    e.target.classList.add("selected");
    counter.innerText = parseInt(++counter.innerText);
    totalPrice.innerText = parseInt(counter.innerText * price.value);
  } else if (e.target.className === "seat selected") {
    e.target.classList.remove("selected");
    counter.innerText = parseInt(--counter.innerText);
    totalPrice.innerText = parseInt(counter.innerText * price.value);
  }
  updateLocalStorage();
});

price.addEventListener("change", (e) => {
  totalPrice.innerText = parseInt(counter.innerText * price.value);
  localStorage.setItem("movieType", JSON.stringify(e.target.selectedIndex));
  updateLocalStorage();
});

const updateLocalStorage = () => {
  const optionSeats = Seats.querySelectorAll(".seat.selected");
  const selectedSeats = [...optionSeats].map((seat) => {
    return [...avialableSeats].indexOf(seat);
  });
  localStorage.setItem("seatsIndex", JSON.stringify(selectedSeats));
  localStorage.setItem(
    "totalPrice",
    JSON.stringify([counter.innerText, totalPrice.innerText])
  );
};

// UpdateThe UI
updateUI();
