const currency1Element = document.querySelector("#currency-1");
const currency2Element = document.querySelector("#currency-2");
const amount1Element = document.querySelector("#amount-1");
const amount2Element = document.querySelector("#amount-2");
const rateElement = document.querySelector("#rate");
const swap = document.querySelector("#swap");

/* Fetch exchange rates, update DOM */

const apiKey = config.exchangeRateKey;

async function fetchRates(currency, key) {
	const response = await fetch(
		`https://v6.exchangerate-api.com/v6/${key}/latest/${currency}`
	);
	const rates = await response.json();
	return rates;
}

function calculate() {
	const currency1 = currency1Element.value;
	const currency2 = currency2Element.value;

	const rates = fetchRates(currency1, apiKey).then((data) => {
		// console.log(data);
		const rate = data.conversion_rates[currency2];
		rateElement.innerHTML = `1 <span class="rate-1">${currency1}</span> = ${rate} <span class="rate-2">${currency2}</span>`;

		amount2Element.value = (amount1Element.value * rate).toFixed(2);
	});
}

function reverse() {
	const temp = currency1Element.value;
	currency1Element.value = currency2Element.value;
	currency2Element.value = temp;
	calculate();
}

// Event listeners
currency1Element.addEventListener("input", calculate);
currency2Element.addEventListener("input", calculate);
amount1Element.addEventListener("input", calculate);
amount2Element.addEventListener("input", calculate);
swap.addEventListener("click", reverse);
