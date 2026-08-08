import React from 'react';
import Loader from '../../components/Loading/Loader';

const WeatherContainer = ({ set, isLoading }) => {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="mb-6 space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
          Weather search
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Find any city instantly
        </h2>
        <p className="text-sm leading-6 text-slate-300">
          Start typing a city name. Results update automatically after a short
          pause.
        </p>
      </div>

      <form className="w-full">
        <label htmlFor="search" className="sr-only">
          Search by city name
        </label>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            type="search"
            id="search"
            onChange={(e) => set(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-4 pl-12 pr-28 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15"
            placeholder="Try London, Tokyo, or Mumbai"
            required
          />

          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-200">
              {isLoading ? 'Searching...' : 'Live search'}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WeatherContainer;
