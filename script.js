const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=&lon=&appid=';
const url1 = 'http://api.openweathermap.org/geo/1.0/direct?q=';
const apiKey = 'f583e137e6ddfebd8564a8ae04d84003';
const main = document.querySelector('.main-container');
const range = document.querySelector('.range');
const rangeOutput = document.querySelector('#rangeOutput');

const cityName = document.querySelector('.cityInput');
const submitButton = document.querySelector('.submit');
// const inputText = document.querySelector(".");


let cityLatitude = '';
let cityLongitude = '';


const getLonLat = async () => {
  const response = await axios.get(`${url1}${cityName.value}&limit=&appid=${apiKey}`);
  // Saving the lan and lat
  cityLatitude = response.data[0].lat;
  cityLongitude = response.data[0].lon;
  console.log(response.data);
}


const getWheatherData = async () => {
  let date = '';
  let temperature = '';
  let rainProbability = '';

  for (let i = 0; i < range.value; i++) {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&appid=${apiKey}&units=metric`);

    date = response.data.list[i].dt_txt.substr(0, 16);
    temperature = response.data.list[i].main.temp;

    const gridContainer = document.createElement('span');
    gridContainer.classList = 'gridContainer';
    const gridDate = document.createElement('div');
    gridDate.classList = 'gridDate';
    gridDate.innerText = date;
    const gridTemperature = document.createElement('div');
    gridTemperature.classList = 'gridTemperature';
    gridTemperature.innerText = parseInt(temperature) + '\xB0C';
    const gridRainProbability = document.createElement('div');
    gridRainProbability.classList = 'gridRainProbability';

    if (response.data.list[i].rain !== undefined) {
      rainProbability = response.data.list[i].rain['3h'];
      gridRainProbability.innerText = `Chance of rain ${rainProbability.toString()}%`;
    }

    gridContainer.append(gridDate, gridTemperature, gridRainProbability);
    main.appendChild(gridContainer);

  }
}

const clearElements = async () => {
  const elements = document.querySelectorAll('.main-container span');
  if (elements !== undefined) {
    elements.forEach(el => el.remove());
  }
}


rangeOutput.addEventListener('keypress', async function (e) {
  if (e.key == 'Enter') {
    await getLonLat();
    await clearElements();
    getWheatherData();
  }
})

submitButton.onclick = async () => {
  await getLonLat();
  await clearElements();
  getWheatherData();
};



// cityName.addEventListener("keypress", async (event) => {
//   if (event == "Enter") {
//     await getLonLat();
//     await clearElements();
//     getWheatherData();
//   }
// })







