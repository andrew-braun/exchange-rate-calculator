const currency1 = document.querySelector("#currency-1");
const currency2 = document.querySelector("#currency-2");
const amount1 = document.querySelector("#amount-1");
const amount2 = document.querySelector("#amount-2");
const rate = document.querySelector("#rate");
const swap = document.querySelector("#swap");

/* Fetch exchange rates, update DOM */

const apiKey = config.exchangeRateKey;

function calculate() {
	console.log("Calc");
}

// Event listeners
currency1.addEventListener("onChange", calculate);
currency2.addEventListener("onChange", calculate);
amount1.addEventListener("input", calculate);
amount2.addEventListener("input", calculate);
swap.addEventListener("click", swap);
