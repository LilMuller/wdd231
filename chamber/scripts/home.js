const weatherApiKey = "a0b5b37880da17b9da66fe7a1ddcc574";

const latitude = 16.7666;
const longitude = -3.0026;

const currentWeather = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast");
const spotlightContainer = document.querySelector("#spotlight-container");


async function getWeather() {
    try {

        const currentUrl =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`;

        const forecastUrl =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`;

        const [currentResponse, forecastResponse] =
            await Promise.all([
                fetch(currentUrl),
                fetch(forecastUrl)
            ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {

        currentWeather.innerHTML =
            "<p>Weather information is currently unavailable.</p>";

        forecastContainer.innerHTML = "";

        console.error(error);
    }
}


function displayCurrentWeather(data) {

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    currentWeather.innerHTML = `
        <div class="current-weather-content">

            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
            >

            <div>
                <p class="temperature">
                    ${temperature}°C
                </p>

                <p>
                    ${description}
                </p>
            </div>

        </div>
    `;
}


function displayForecast(data) {

    forecastContainer.innerHTML = "";

    const dailyForecasts = {};

    data.list.forEach(item => {

        const date = new Date(item.dt * 1000);

        const dateKey = date.toISOString().split("T")[0];

        if (!dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = item;
        }

        const hour = date.getHours();

        if (hour >= 12 && hour <= 15) {
            dailyForecasts[dateKey] = item;
        }
    });


    const forecastDays = Object.values(dailyForecasts)
        .slice(1, 4);


    forecastDays.forEach(day => {

        const date = new Date(day.dt * 1000);

        const dayName = date.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );

        const temperature = Math.round(day.main.temp);

        const description = day.weather[0].description;

        const forecastCard = document.createElement("article");

        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <h4>${dayName}</h4>

            <p class="forecast-temperature">
                ${temperature}°C
            </p>

            <p>
                ${description}
            </p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}


async function loadSpotlights() {

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Members could not be loaded.");
        }

        const members = await response.json();


        const qualifiedMembers = members.filter(
            member =>
                member.membership === 2 ||
                member.membership === 3
        );


        const shuffledMembers =
            qualifiedMembers.sort(() => Math.random() - 0.5);


        const selectedMembers =
            shuffledMembers.slice(0, 3);


        displaySpotlights(selectedMembers);

    } catch (error) {

        spotlightContainer.innerHTML =
            "<p>Business spotlights are currently unavailable.</p>";

        console.error(error);
    }
}


function displaySpotlights(members) {

    spotlightContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("article");

        card.classList.add("spotlight-card");

        const membershipName =
            member.membership === 3
                ? "Gold Member"
                : "Silver Member";


        card.innerHTML = `
            <div class="spotlight-header">

                <h3>${member.name}</h3>

                <span class="membership">
                    ${membershipName}
                </span>

            </div>

            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >

            <div class="spotlight-info">

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Website:</strong>
                    <a
                        href="${member.website}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Website
                    </a>
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${membershipName}
                </p>

            </div>
        `;

        spotlightContainer.appendChild(card);
    });
}


getWeather();
loadSpotlights();