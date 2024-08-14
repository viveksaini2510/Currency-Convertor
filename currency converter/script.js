const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converterContainer');

// Array to populate the select tag with these countries
const countries = [ 
    { code:"USD", name: "United States Dollar"},
    { code:"INR", name: "Indian Rupees"},
    
];

// Showing countries from array to select tag

countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    
    option1.value = option2.value= country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;
    
    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    // setting default value to select tag
    fromCurrencyElement.value="USD";
    toCurrencyElement.value="INR";
});

// fucntion to get exchange rate using API
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching Exchange Rates ...";


        // fetch data from API

    try{
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        
        
        const conversionRate = data.rates[toCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);

        if(typeof conversionRate ==='indefined'){
            resultElement.textContent="Exchange rate data is not available for selected counties !!!";
            convertedAmountElement = '';
        }
        else{
            convertedAmountElement.value = convertedAmount;
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        }

        
    }
    catch(error){
        converterContainer.innerHTML = `<h2> Error while fetching exchange rates !!!</h2>`;
    }
   
}

//fetching exchange rate when user input the amount 
fromAmountElement.addEventListener('input',getExchangeRate);

//fetching exchange rate when user change currency 
fromCurrencyElement.addEventListener('change',getExchangeRate);
toCurrencyElement.addEventListener('change',getExchangeRate);
window.addEventListener('load',getExchangeRate);