import React from 'react';
import WeatherContainer from '../container/weather';
import { useDebounce } from '../hooks/useDebounceHook';
import DisplayMyWeather from '../container/weather/DisplayMyWeather';
import Loader from '../components/Loading/Loader';
const WeatherErrorContainer = React.lazy(
  () => import('../container/weather/WeatherErrorCotainer'),
);

const apiKey = 'b1fd6e14799699504191b6bdbcadfc35'; // Default
const unit = 'metric';

const WeatherApp = () => {
  const [searchByCity, setSearchByCity] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorState, setErrorState] = React.useState(null);
  const [weatherData, setWeatherData] = React.useState(null);
  // debounce searchByCity to avoid too many API calls
  const debouncedSearchByCity = useDebounce(searchByCity, 500); // 500ms debounce
  const fetchWeatherDetails = async (city) => {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log('Error fetching weather data:', response.statusText);
        setErrorState(response.statusText);
      } else {
        const data = await response.json();
        setErrorState(null); // Clear any previous error state
        console.log('Weather data:', data);
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setErrorState(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (debouncedSearchByCity) {
      setLoading(true);
      fetchWeatherDetails(debouncedSearchByCity);
    }
  }, [debouncedSearchByCity]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_42%,_#111827_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-sky-300">
            Weather dashboard
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Explore live conditions with a cleaner Tailwind weather layout.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            Search for a city to view current temperature, conditions, wind and
            key atmospheric details in a single responsive panel.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <WeatherContainer
            set={(value) => setSearchByCity(value)}
            isLoading={loading}
          />
          <div className="space-y-4">
            {!weatherData && !errorState && (
              <div className="rounded-[2rem] border border-dashed border-white/12 bg-white/5 p-8 text-slate-300 shadow-xl shadow-black/10 backdrop-blur-sm">
                <p className="text-lg font-medium text-white">
                  No city selected yet
                </p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                  Enter a city name in the search panel to load the latest
                  weather data and populate the dashboard.
                </p>
              </div>
            )}
            {loading && <Loader />}
            {errorState && <WeatherErrorContainer error={errorState} />}
            {weatherData && !errorState && (
              <DisplayMyWeather {...weatherData} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default WeatherApp;
