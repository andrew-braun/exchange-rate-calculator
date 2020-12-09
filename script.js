const currency1Element = document.querySelector("#currency-1");
const currency2Element = document.querySelector("#currency-2");
const amount1Element = document.querySelector("#amount-1");
const amount2Element = document.querySelector("#amount-2");
const currency1Symbol = document.querySelector("#currency-1-symbol");
const currency2Symbol = document.querySelector("#currency-2-symbol");
const rateElement = document.querySelector("#rate");
const swap = document.querySelector("#swap");

/* Fetch exchange rates, update DOM */

let primaryCurrencyRate;

async function fetchRates(currency) {
	// Using a Heroku proxy server to store API key and make requests
	const apiProxy = "https://shadow-rain-api-proxy.herokuapp.com/exchange";
	// const apiSource = `https://v6.exchangerate-api.com/v6/${key}/latest/${currency}`;
	const response = await fetch(`${apiProxy}/latest/${currency}`);
	const rates = await response.json();
	primaryCurrencyRate = await rates;
	return rates;
}

function handleCurrencyChange(event) {
	// Set currency variables to the values set in the DOM
	const currency1 = currency1Element.value;
	const currency2 = currency2Element.value;

	// If called by event handler, find id of target
	const target = event ? event.target.id : null;

	currency1Symbol.innerHTML = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency1,
		currencyDisplay: "narrowSymbol",
	}).format(0)[0];

	currency2Symbol.innerHTML = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency2,
		currencyDisplay: "narrowSymbol",
	}).format(0)[0];
	// If primary currency is changed, initiate fetch and render
	// Else, find stored data and use that to calculate
	if (target === "currency-1" || target === null) {
		fetchRates(currency1).then((data) => {
			const rate = data.conversion_rates[currency2];
			generateRatesHTML(currency1, currency2, rate, target);
		});
	} else {
		const rate = primaryCurrencyRate.conversion_rates[currency2];
		generateRatesHTML(currency1, currency2, rate, target);
	}
}

/* Change the values in the input fields based on the currencies selected 
as well as which field was changed */
function generateRatesHTML(currency1, currency2, rate, target) {
	rateElement.innerHTML = `1 <span class="rate-1">${currency1}</span> = ${rate} <span class="rate-2">${currency2}</span>`;

	// Functions to change input values in DOM
	const changeAmount1 = () => {
		amount1Element.value = (amount2Element.value * (1 / rate)).toFixed(2);
	};
	const changeAmount2 = () => {
		amount2Element.value = (amount1Element.value * rate).toFixed(2);
	};

	// Change the second amount field unless it is the one being targeted
	if (target === "amount-2") {
		changeAmount1();
	} else {
		changeAmount2();
	}
}

// Switch the currency values to see the converse conversion
function reverse() {
	const temp = currency1Element.value;
	currency1Element.value = currency2Element.value;
	currency2Element.value = temp;
	handleCurrencyChange();
}

// Initial API call and render with default currencies
handleCurrencyChange();

// Event listeners
currency1Element.addEventListener("input", handleCurrencyChange);
currency2Element.addEventListener("input", handleCurrencyChange);
amount1Element.addEventListener("input", handleCurrencyChange);
amount2Element.addEventListener("input", handleCurrencyChange);
swap.addEventListener("click", reverse);
