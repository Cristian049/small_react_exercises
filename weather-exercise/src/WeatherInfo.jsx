export default function WeatherInfo({ cityWeather, theme }) {
  if (!cityWeather) {
    return <p>Search any location to get informations about the weather.</p>;
  }

  const {
    location: { country, name, region, localtime },
    current: {
      condition: { icon, text },
      temp_c,
      temp_f,
      uv,
    },
  } = cityWeather;

  return (
    <div className={`weather-info ${theme ? "" : "dark"}`}>
      <div className="details">
        <span>
          {name}, {region}, {country}
        </span>{" "}
        <span>{localtime}</span>
      </div>
      <div className="conditions">
        <div>
          <img src={icon} alt={text} />
          <h2>{text}</h2>
        </div>
        <div>
          <h1>
            {temp_c}°C/{temp_f}°F
          </h1>
          <div>
            <p>Index UV:</p>
          </div>
        </div>
      </div>
    </div>
  );
}
