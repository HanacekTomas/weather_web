const apiKey = "ab68cc3e73aa8e09bd670cda919068b9";
const weatherOutput = document.getElementById("weather");
const dropdownItems = document.querySelectorAll(".dropdown-item");
const dropdownToggle = document.getElementById("cityDropdown");
const loadBtn = document.getElementById("loadBtn");

let selectedCity = "Prague"; // výchozí hodnota

function loadWeather(city) {
  weatherOutput.textContent = "Načítám počasí...";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const location = `${data.name}, ${data.sys.country}`;
      weatherOutput.textContent = `🌡️ ${temp} °C`;
    })
    .catch(error => {
      weatherOutput.textContent = "Nepodařilo se načíst počasí 😢";
      console.error("Chyba při načítání dat:", error);
    });
}

// Změna vybrané hodnoty v dropdownu (ale nic se ještě nenačítá)
dropdownItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    selectedCity = item.getAttribute("data-city");
    dropdownToggle.textContent = item.textContent; // změna zobrazeného názvu
  });
});

// Kliknutí na tlačítko = teprve načtení počasí
loadBtn.addEventListener("click", () => {
  loadWeather(selectedCity);
});

// Výchozí načtení pro Prahu
loadWeather(selectedCity);
