import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import WeatherInfo from "./WeatherInfo";
import Loader from "./Loader";
import ErrorMsg from "./ErrorMsg";
import randomCities from "./assets/randomCities";
import ThemeButton from "./ThemeButton";

const API_KEY = "0c218e61ef6844a88f0180827253105";

const getRandomCity =
  randomCities[Math.floor(Math.random() * randomCities.length)];

function App() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cityWeather, setCityWeather] = useState(null);
  const [theme, setTheme] = useState(true);

  function handleTheme() {
    setTheme((theme) => !theme);
  }

  useEffect(() => {
    document.body.className = theme ? "" : "dark";
  }, [theme]);

  useEffect(function () {
    async function fetchInitialWeather() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${getRandomCity}`
        );

        if (!res.ok)
          throw new Error("Something went wrong. Please try again later.");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setCityWeather(data);
        setErrorMessage("");
      } catch (e) {
        setErrorMessage(e.message);
        console.error(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInitialWeather();
  }, []);

  useEffect(
    function () {
      if (!city || city.length < 3) {
        setCityWeather(null);
        setErrorMessage("");
        return;
      }
      async function fetchWeather() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
          );

          if (!res.ok)
            throw new Error("Something went wrong. Please try again later.");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setCityWeather(data);
          setErrorMessage("");
          console.clear();
        } catch (e) {
          setErrorMessage(e.message);
          console.error(e.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchWeather();
    },
    [city]
  );
  return (
    <div>
      <ThemeButton theme={theme} onTheme={handleTheme} />
      <SearchForm city={city} setCity={setCity} theme={theme} />
      {isLoading && <Loader />}
      {!isLoading && !errorMessage && (
        <WeatherInfo cityWeather={cityWeather} theme={theme} />
      )}
      {errorMessage && <ErrorMsg message={errorMessage} />}
    </div>
  );
}

export default App;
