import React from 'react';

const DisplayMyWeather = (props) => {
  console.log('DisplayMyWeather props:', props); // Debugging line to check the props
  const { name, main, weather, wind } = props;
  const currentWeather = weather?.[0];
  const weatherIcon = currentWeather?.icon
    ? `https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`
    : null;

  const formatValue = (value, suffix = '') => {
    if (value === undefined || value === null) {
      return '--';
    }

    return `${Math.round(value)}${suffix}`;
  };

  const statCards = [
    {
      label: 'Feels like',
      value: formatValue(main?.feels_like, '°C'),
    },
    {
      label: 'Humidity',
      value: formatValue(main?.humidity, '%'),
    },
    {
      label: 'Wind speed',
      value: formatValue(wind?.speed, ' m/s'),
    },
    {
      label: 'Pressure',
      value: formatValue(main?.pressure, ' hPa'),
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700 p-6 text-white shadow-2xl shadow-sky-950/40 sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.28),_transparent_30%)]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-sky-100/80">
              Current forecast
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              {name}
            </h2>
            <p className="max-w-md text-sm text-sky-50/85 sm:text-base">
              {currentWeather?.description || 'Weather details unavailable'}
            </p>
          </div>

          <div className="flex items-end gap-4">
            <p className="text-6xl font-semibold leading-none sm:text-7xl">
              {formatValue(main?.temp, '°C')}
            </p>
            <div className="space-y-1 pb-1 text-sm text-sky-50/85">
              <p>High {formatValue(main?.temp_max, '°C')}</p>
              <p>Low {formatValue(main?.temp_min, '°C')}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat) => (
              <article
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-white/12 p-4 backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/70">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {stat.value}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex min-w-[220px] flex-col items-center justify-center rounded-[1.75rem] border border-white/15 bg-slate-950/20 px-6 py-5 text-center backdrop-blur-md">
          {weatherIcon ? (
            <img
              src={weatherIcon}
              alt={currentWeather?.main || 'Weather icon'}
              className="h-28 w-28 drop-shadow-[0_18px_30px_rgba(15,23,42,0.35)]"
            />
          ) : null}
          <p className="text-lg font-semibold text-white">
            {currentWeather?.main || 'Conditions'}
          </p>
          <p className="mt-2 max-w-[16rem] text-sm text-sky-50/80">
            Live conditions for your selected city with temperature, wind and
            atmospheric details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DisplayMyWeather;
