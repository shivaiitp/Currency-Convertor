const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.getElementById('exchangeRateBtn');
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapIcon = document.querySelector("#swapIcon");

// select.remove(Option);
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

console.log(fromCurr.value, toCurr.value);
const updateExchangeRate = async (amtVal) => {
    let amount = document.querySelector(".amount input");
    let errorMessage = document.getElementById("error-message");

    if (amtVal === "" || amtVal < 0 || isNaN(amtVal)) {
        errorMessage.innerText = "Please enter a number greater than 0.";
        let value = document.querySelector("form input");
        value.style.borderColor = "red";
        amtVal = 1;
    }
    else {
        errorMessage.innerText = "";
        amount.style.borderColor = "";
    }
        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        let finalAmount = amtVal * rate;
        finalAmount = parseFloat(finalAmount.toFixed(3));
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    let spinner = document.querySelector(".fa-spinner");
    // console.log(spinner);
    spinner.style.display = "inline-block";
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    updateExchangeRate(amtVal);
    spinner.style.display = "none";
});
console.log(swapIcon);
swapIcon.addEventListener("click", async (evt) => {
    evt.preventDefault();
    swap(fromCurr, toCurr); 
});


const swap = (fromSelect, toSelect) => {
    let fromValue = fromSelect.value;
    let toValue = toSelect.value;
    fromSelect.value = toValue;
    toSelect.value = fromValue;
    updateFlag(fromSelect); 
    updateFlag(toSelect);
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal != "" && amtVal > 0 && !isNaN(amtVal)){
        updateExchangeRate(amtVal);
    }
    else{
        updateExchangeRate(1);
    }
};