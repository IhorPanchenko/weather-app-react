import searchIcon from "./img/search-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWeatherAction } from "./redux/slices/weatherSlices";
import "./App.css";

function App() {
  const [city, setCity] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherAction("kiev"));
  }, []);

  // console.log("API KEY:");
  // console.log(process.env.REACT_APP_OPEN_WEATHER_KEY);

  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  console.log(state);

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "page warm" : "page") : "page"}>
      <section>
        {/* <img src={weatherSVG} alt="weather icon" /> */}

        <div className="search-area">
          {/* Input  value optional!!!*/}
          <input
            type="text"
            className="search-bar"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search..."
          ></input>

          {/* Button */}
          <button
            type="button"
            className="search-btn"
            onClick={() => dispatch(fetchWeatherAction(city))}
          >
            <img src={searchIcon} alt="search icon" width="20" height="20"/>
          </button>
        </div>

        {/*Weather info */}
        {loading ? (
          <h1 style={{ color: "black" }}>Loading...</h1>
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
                  {/* weather logo */}
                  <img
                    src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
                    alt="/"
                  />
                </span>
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
