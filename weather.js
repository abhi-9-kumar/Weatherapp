document.addEventListener('DOMContentLoaded', function () {
  const apiKey = "164675974e8efc36ede92d2af194a757";

  const weatherDataEl = document.getElementById("weather-data");
  const cityInputEl = document.getElementById("city-input");
  const formEl = document.getElementById("weather-form");
  const backgroundEl = document.querySelector(".background");

  formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const cityValue = cityInputEl.value;
      getWeatherData(cityValue);
  });

  async function getWeatherData(cityValue) {
      try {
          const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
          );

          if (!response.ok) {
              throw new Error("Network response was not ok");
          }

          const data = await response.json();

          const temperature = Math.round(data.main.temp);
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
          const feelsLike = Math.round(data.main.feels_like);
          const precipitation = data.rain ? data.rain["1h"] : 0;
          const humidity = data.main.humidity;

          document.querySelector(".city").textContent = `${data.name}, ${data.sys.country}`;
          document.querySelector(".date-time").textContent = new Date().toLocaleString();
          document.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">`;
          document.querySelector(".temperature").textContent = `${temperature}°C`;
          document.querySelector(".description").textContent = description;
          document.querySelector(".feels-like").textContent = `${feelsLike}°C`;
          document.querySelector(".precipitation").textContent = `${precipitation} mm`;
          document.querySelector(".humidity").textContent = `${humidity}%`;

          updateBackground(data.weather[0].main.toLowerCase());

          weatherDataEl.style.display = "block";
      } catch (error) {
          weatherDataEl.style.display = "none";
          alert("An error happened, please try again later");
      }
  }

  function updateBackground(weather) {
      let backgroundUrl;

      switch (weather) {
          case 'clear':
              backgroundUrl = 'https://images.unsplash.com/photo-1617141870574-82529c331676?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
              break;
          case 'clouds':
              backgroundUrl = 'https://images.unsplash.com/photo-1527377844612-ae9febb890c0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
              break;
          case 'rain':
          case 'drizzle':
              backgroundUrl = 'https://images.unsplash.com/photo-1534265854528-0c270f95e0d8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
              break;
          case 'snow':
              backgroundUrl = 'https://plus.unsplash.com/premium_photo-1673726864881-49e0f3816082?q=80&w=868&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
              break;
          case 'thunderstorm':
              backgroundUrl = 'https://images.unsplash.com/photo-1561485132-59468cd0b553?q=80&w=1052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
              break;
          case 'mist':
              backgroundUrl = 'https://images.unsplash.com/photo-1507726088673-48659fccdc8a?q=80&w=1777&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
              break;
          default:
              backgroundUrl = 'https://images.unsplash.com/photo-1516907450399-41d50409e739?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
              break;
      }

      backgroundEl.style.backgroundImage = `url(${backgroundUrl})`;
  }
});
