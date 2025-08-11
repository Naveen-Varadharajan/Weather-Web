async function GetWeather(event) {
  event.preventDefault();

  const city = document.getElementById("city").value.trim();
  const output = document.getElementById("weather-output");
  const iconImg = document.getElementById("weather-icon");

  if (!city) {
    output.innerHTML = "<p>Please enter a valid location.</p>";
    iconImg.src = "";
    return;
  }

  const apiKey = "your key";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  output.innerHTML = "<p>Fetching weather...</p>";
  iconImg.src = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      output.innerHTML = "<p>City not found. Try again.</p>";
      iconImg.src = "";
      return;
    }

    const { name } = data;
    const { temp } = data.main;
    const { speed } = data.wind;
    const { description, icon } = data.weather[0];
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    output.innerHTML = `
      <h3>Weather in ${name}</h3>
      <p>🌡️ Temperature: ${temp}°C</p>
      <p>🌬️ Wind Speed: ${speed} m/s</p>
      <p>☁️ Description: ${description}</p>
    `;
    iconImg.src = iconURL;
    iconImg.alt = description;
  } catch (error) {
    console.error("Weather fetch error:", error);
    output.innerHTML = "<p'>Unable to fetch data. Please try again later.</p>";
    iconImg.src = "";
  }

}
