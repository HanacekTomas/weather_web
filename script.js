const apiKey = "ab68cc3e73aa8e09bd670cda919068b9";
const weatherOutput = document.getElementById("weather");
const dropdownItems = document.querySelectorAll(".dropdown-item");
const dropdownToggle = document.getElementById("cityDropdown");
const loadBtn = document.getElementById("loadBtn");

let selectedCity = "Prague"; // výchozí hodnota

// Slovník pro překlady popisů počasí
const translations = {
  "clear sky": "jasno",
  "few clouds": "málo oblačno",
  "scattered clouds": "oblačno",
  "broken clouds": "zataženo",
  "overcast clouds": "zcela zataženo",
  "shower rain": "přeháňky",
  "rain": "déšť",
  "moderate rain": "mírný déšť",
  "light rain": "slabý déšť",
  "heavy intensity rain": "silný déšť",
  "thunderstorm": "bouřka",
  "snow": "sněžení",
  "mist": "mlha"
};

function loadWeather(city) {
  weatherOutput.textContent = "Načítám počasí...";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const translatedDesc = translations[desc] || desc;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      // Nastavení barvy podle teploty
      if (temp < 5) {
        weatherOutput.style.color = "blue";
      } else if (temp <= 15) {
        weatherOutput.style.color = "green";
      } else {
        weatherOutput.style.color = "red";
      }

      // Výpis teploty, překladu a ikony
      weatherOutput.innerHTML = `🌡️ ${temp} °C – ${translatedDesc} <img src="${iconUrl}" alt="${desc}" style="vertical-align: middle;" />`;
    })
    .catch(error => {
      weatherOutput.textContent = "Nepodařilo se načíst počasí 😢";
      weatherOutput.style.color = "black";
      console.error("Chyba při načítání dat:", error);
    });
}

// Změna vybraného města
dropdownItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    selectedCity = item.getAttribute("data-city");
    dropdownToggle.textContent = item.textContent;
  });
});

// Tlačítko pro načtení počasí
loadBtn.addEventListener("click", () => {
  loadWeather(selectedCity);
});

// Výchozí načtení
loadWeather(selectedCity);
