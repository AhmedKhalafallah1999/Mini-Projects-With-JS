const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const swap = document.getElementById("swap");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rate2 = document.getElementById("rate");

const calculate = () => {
  const currency1 = currencyOne.value;
  const currency2 = currencyTwo.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency2];
      rate2.innerText = `1 ${currency1} = ${rate} ${currency2}`;
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
};
const swapHandler = ()=>{
  const currency1 = currencyOne.value;
  const currency2 = currencyTwo.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = currency1;
  calculate();
}
currencyOne.addEventListener("click", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("click", calculate);
amountTwo.addEventListener("input", calculate);
swap.addEventListener('click',swapHandler);

calculate();
