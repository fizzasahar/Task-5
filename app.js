var apiKey = 'bcc7d5336f241a8b3d573afb185f6de9'; // Replace with your OpenWeatherMap API key
var weatherDisplay = document.getElementById('weatherDisplay');
var getWeatherBtn = document.getElementById('getWeatherBtn');
var locationInput = document.getElementById('locationInput');

// Function to fetch weather data
async function fetchWeather(location) {
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    var data = await response.json();

    if (data.cod === 200) {
        var { main, weather, name } = data;
        weatherDisplay.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Pressure: ${main.pressure} hPa</p>
        `;
    } else {
        weatherDisplay.innerHTML = `<p>Location not found.</p>`;
    }
}

// Event listener for the button
getWeatherBtn.addEventListener('click', () => {
    var location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        weatherDisplay.innerHTML = `<p>Please enter a location.</p>`;
    }
});

// Optional: Automatically fetch weather based on user's location
function fetchWeatherByLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                var { main, weather, name } = data;
                weatherDisplay.innerHTML = `
                    <h2>Weather in ${name}</h2>
                    <p>Temperature: ${main.temp}°C</p>
                    <p>Weather: ${weather[0].description}</p>
                    <p>Humidity: ${main.humidity}%</p>
                    <p>Pressure: ${main.pressure} hPa</p>
                `;
            } else {
                weatherDisplay.innerHTML = `<p>Unable to retrieve weather data.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherDisplay.innerHTML = `<p>Unable to retrieve weather data.</p>`;
        });
}

// Get user's location and fetch weather
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {
            var { latitude, longitude } = position.coords;
            fetchWeatherByLocation(latitude, longitude);
        },
        error => {
            console.error('Error getting location:', error);
            weatherDisplay.innerHTML = `<p>Unable to retrieve location.</p>`;
        }
    );
} else {
    weatherDisplay.innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
}
