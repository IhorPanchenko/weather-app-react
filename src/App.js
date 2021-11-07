import weatherSVG from "./img/weather.svg";
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
    <div>
      <section>
        <img src={weatherSVG} alt="weather icon" />

        <div>
          <h2>Weather App</h2>
          <p>Find out the current weather situation around the world</p>

          {/* Input  value optional!!!*/}
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search City"
          ></input>

          {/* Button */}
          <button
            type="button"
            onClick={() => dispatch(fetchWeatherAction(city))}
          >
            Search
          </button>
        </div>

        {/*Weather info */}
        {loading ? (
          <h1 style={{ color: "black" }}>Loading...</h1>
        ) : error ? (
          <h1 style={{ color: "red" }}>{error?.message}</h1>
        ) : (
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <span>
                      {/* weather logo */}
                      <img
                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                        alt="/"
                      />
                    </span>
                    <h1>{weather?.weather[0].main}</h1>{" "}
                  </div>
                  <h1>
                    {Math.round(weather?.main.temp * 10) / 10} <span>°C</span>
                  </h1>
                  <h3>
                    {weather?.name}, {weather?.sys?.country}
                  </h3>
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
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
