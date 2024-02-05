console.log("script is working");

const number = document.getElementById("amount");
const from_select = document.getElementById("from_currency");
const to_select = document.getElementById("to_currency");
const reaultParagraph = document.getElementById("result");
const button = document.getElementById("btn");

const countriesCode = async (SelectElement) =>{
    try{
        const response = await fetch("https://open.er-api.com/v6/latest");
        
        if(!response.ok){
            throw new Error("Network issue")
        }
        const data = await response.json();
        const currencies =Object.keys(data.rates);
        currencies.forEach((currency)=>{
            const option = document.createElement("option");
            option.value = currency;
            option.text = `${currency}`;
            SelectElement.appendChild(option);
        })
    } catch (error) {
        console.error("error is occure during fetching data", error);
    }
};
countriesCode(from_select);
countriesCode(to_select);

const exchange = async (e)=>{
    e.preventDefault();

    const amount = parseFloat(number.value);
    const from_currency = from_select.value;
    const to_currency = to_select.value;

    fetch(`https://v6.exchangerate-api.com/v6/14fee86c202aa5aea32dc59b/latest/${from_currency}`)
    .then((response)=> {
        if(!response.ok){
            throw new Error ("Network issue")
        }
        return response.json();
    })
    .then((data)=>{
        let result = (data.conversion_rates[to_currency]*amount).toFixed(2);
        reaultParagraph.innerHTML = `${amount} ${from_currency} = ${result} ${to_currency}`
    })
    .catch((error)=>{
        console.error("Error fetching data:",error);
        reaultParagraph.innerHTML =  "Error occure during fetching the data, please try again";
    });
};
button.addEventListener("click",exchange)  