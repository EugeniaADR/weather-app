
const api = {
    baseUrl: "https://api.openweathermap.org/data/2.5/",
    key: "f2bfcb686bc97653b4f120c965a27f64"
}

const input = document.querySelector('#input')
input.addEventListener("keydown", enter)

getOurDate()

const localApi = {
    url: "https://geolocation-db.com/json/",
    apiKey:"f2e84010-e1e9-11ed-b2f8-6b70106be3c8"
}
localCity();

async function localCity() {
    const result = await fetch(`${localApi.url}${localApi.apiKey}`)
    const resultReceived = await result.json()
    displayCity(resultReceived)
}

function displayCity(resultReceived) {
    let usersCity = document.querySelector('#city');
    usersCity.textContent = `${resultReceived.city}, ${resultReceived.country_code}`
    getInfo(resultReceived.city)
}


function enter(e) {
    if (e.keyCode === 13) { // if enter pressed starts the search function
        getInfo(input.value)
    }
}
async function getInfo(data) {
    const res = await fetch(`${api.baseUrl}weather?q=${data}&units=metric&appID=${api.key}`)
    const resReceived = await res.json()
    displayResult(resReceived)
}

function displayResult(resReceived) {
    let city = document.querySelector('#city');
    city.textContent = `${resReceived.name}, ${resReceived.sys.country}`

    getOurDate();

    let temperature = document.querySelector('#temp');
    temperature.innerHTML = `${Math.round(resReceived.main.temp)}<span>°</span>`

    let feelslike = document.querySelector('#feelslike');
    feelslike.innerHTML = 'feels like ' + `${Math.round(resReceived.main.feels_like)}<span>°</span>`
    
    let conditions = document.querySelector('#condition');
    conditions.textContent = `${resReceived.weather[0].description}`

    let minmax = document.querySelector('#minmax');
    minmax.innerHTML = 'Min: ' + `${Math.round(resReceived.main.temp_min)}<span>°</span> ` + ' Max: ' + `${Math.round(resReceived.main.temp_max)}<span>°</span>`
}
function getOurDate() {
    const myDate = new Date; //today's date
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[myDate.getDay()]; // get day

    let todaysDate = myDate.getDate();

    let month = months[myDate.getMonth()];

    let year = myDate.getFullYear()
   
    let showDate = document.querySelector('#date');
    showDate.textContent = `${day}` + ' ' + `${todaysDate}` + ' ' + `${month}` + ' ' + `${year}`
  
}