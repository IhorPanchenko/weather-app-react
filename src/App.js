import searchIcon from "./img/search-icon.png";
import arrowIcon from "./img/arrow-down.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWeatherAction } from "./redux/slices/weatherSlices";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherAction("kiev"));
  }, []);

  const state = useSelector((state) => state);
  const { weather, loading, error } = state;

  const isWarm =
    weather && weather.main && weather.main.temp > 16 ? "page warm" : "page";
  console.log(state);

  function searchWeather() {
    setSearchHistory((oldSearchHistory) => {
      const newHistory = [city, ...oldSearchHistory];
      if (newHistory.length > 10) newHistory.splice(10, 1);
      return newHistory;
    });
    dispatch(fetchWeatherAction(city));
  }

  function seachFromHistory(city) {
    dispatch(fetchWeatherAction(city));
  }

  return (
    <div className={isWarm}>
      <section>
        <div className="search-area">
          {/* User Input */}
          <input
            type="text"
            className="search-bar"
            value={city}
            onKeyPress={(e) => e.key === "Enter" && searchWeather()}
            
            onInput={(e) => setCity(e.target.value)}
            placeholder="Search..."
          ></input>

          {/* Button */}
          <button type="button" className="search-btn" onClick={searchWeather}>
            <img src={searchIcon} alt="search icon" width="20" height="20" />
          </button>
        </div>

        {/* Weather Info */}
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1 style={{ color: "red" }}>{error?.message}</h1>
        ) : (
          <div className="weather-info">
            <div className="location">
              <h1>
                {weather?.name}, {weather?.sys?.country}
              </h1>
            </div>

            <div className="temp">
              <h1>
                {Math.round(weather?.main.temp * 10) / 10}
                <span>°C</span>
              </h1>
            </div>

            <div className="weather">
              <h3>{weather?.weather[0].main}</h3>
              <a href="#">
                <span>
                  {/* weather icon */}
                  <img
                    src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
                    alt="weather icon"
                    width="60"
                    height="60"
                  />
                </span>
              </a>
            </div>

            {/* Optional Weather Info */}
            <div className="humidity">
              <h3>Humidity: {weather?.main.humidity}%</h3>
            </div>

            <div className="wind">
              <h3>Wind: {weather?.wind.speed} m/s</h3>
            </div>

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="history">
                <div
                  className="historyTitle"
                  onClick={() => setVisible(!isVisible)}
                >
                  <span>Search History</span>
                  <img
                    className={isVisible ? "arrow active" : "arrow"}
                    src={arrowIcon}
                    alt="arrow icon"
                    width="20"
                    height="20"
                  />
                </div>

                {isVisible && (
                  <div>
                    {searchHistory.map((item, i) => (
                      <div
                        className="historyValue"
                        onClick={(e) => seachFromHistory(e.target.textContent)}
                        key={item + i}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
