let input = document.querySelector('.input');
let btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    let city = input.value.trim();

    if (!city) {
        alert('Enter a city name');
        return;
    }

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=af79d6acb953fdc8b615b1df19a27b03&units=metric`;

    async function getdata() {
        try {
            let response = await fetch(api);
            if (!response.ok) {
                throw new Error('City not found');
            }

            let data = await response.json();
            console.log(data);

            // Update weather info with data
            document.getElementById('city-name').innerText = data.name;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;

            // Set weather icon
            let iconCode = data.weather[0].icon;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Show the weather info section
            document.getElementById('weather-info').classList.remove('hidden');
        } catch (error) {
            console.error(error);
            alert('Error: ' + error.message);
        }
    }

    getdata();
});
