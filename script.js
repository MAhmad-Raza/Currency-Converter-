// Get DOM Elem
const currencyOne = document.getElementById("currencyOne");
const currencyOneAmount = document.getElementById("amountOne");
const currencyTwo = document.getElementById("currencyTwo");
const currencyTwoAmount = document.getElementById("amountTwo");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch Exchange Rates & Update The DOM
function calculate() {
  // Get The Currency Code For Currency One & Two
  const currencyOneCode = currencyOne.value;
  const currencyTwoCode = currencyTwo.value;

  // Send Request To Exchange Rate API For Conversion Rates For Currency One
  fetch(
    `https://v6.exchangerate-api.com/v6/1131160ecd4f74ef31058b48/pair/${currencyOneCode}/${currencyTwoCode}`
  )
    .then((res) => res.json())
    .then((data) => {
      // Get Conversion Rate From Currency One To Currency Two

      const conversionRate = data.conversion_rate;
      // Update The DOM To Display Conversion Rate

      rate.innerText = `${currencyOneCode} = ${conversionRate} ${currencyTwoCode}`;

      // Update The Currency Two Amount

      currencyTwoAmount.value = (
        currencyOneAmount.value * conversionRate
      ).toFixed(2);
    });
}

// Events Listeners
// Recalculate Exhange Rates When Currency 1 Change
currencyOne.addEventListener("change", calculate);
// Recalculate Exhange Amount Whwn Currency 1 Amount Change
currencyOneAmount.addEventListener("input", calculate);
// Recalculate Exhange Rates When Currency 2 Change
currencyTwo.addEventListener("change", calculate);
// Recalculate Exhange Amount Whwn Currency 2 Amount Change
currencyTwoAmount.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  //  Save Value Currency One Code To Temp Variable
  const temp = currencyOne.value;
  // Copy Currency Two Code To Currency One
  currencyOne.value = currencyTwo.value;
  // Copy Currency  One Code From Temp Variable To Currency Two
  currencyTwo.value = temp;
  // Recalculate Exchange Rate After Swap
  calculate();
});

// Execute The calculate() Function on Page Load
calculate();
