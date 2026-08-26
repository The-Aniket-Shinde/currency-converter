const base_url ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const options = document.querySelectorAll(".select select");
const flag = document.querySelectorAll(".select img");
const exchangeBtn = document.getElementById("exchange");
const from_option = document.querySelector("#from select");
const to_option = document.querySelector("#to select");
const output = document.getElementById("output");

for(select of options){
    for(let country_currency in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = country_currency;
    newOption.value = country_currency;
    select.append(newOption);
    if (select.name === "from" && country_currency === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && country_currency === "INR") {
      newOption.selected = "selected";
    }
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })

}

function updateFlag(option){
    let flag_currency = option.value;
    let flag_code = countryList[flag_currency];
    let img = option.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${flag_code}/flat/64.png`;
}

exchangeBtn.addEventListener("click", (evt)=>{
    output.innerText = "Getting Exchange Rate...";
    evt.preventDefault();
    try{
        getExchangeRate();
    } catch(err){
        output.innerText = "Error";
    }
});


async function getExchangeRate(option){
    let date = document.querySelector("#date");
    let input = document.querySelector(".value input");
    const url = `https://api.frankfurter.dev/v2/rate/${from_option.value}/${to_option.value}`;
    let promise = await fetch(url);
    if(promise.status != 200){
        output.innerText = "Not Found";
        return;
    }else{
        let data = await promise.json();
        let result = await input.value * data.rate;
        output.innerText = `${result} ${to_option.value}`;
        date.innerText = `Updated Date: ${data.date}`;
        return;
    }
}