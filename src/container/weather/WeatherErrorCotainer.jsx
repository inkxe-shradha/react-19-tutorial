import React from 'react';

const WeatherErrorContainer = ({ error }) => {
  return (
    <div className="flex justify-center items-center min-h-[250px]">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-heading mb-2">
          Weather Data Not Found
        </h2>
        <p className="text-sm text-body">
          Please check the city name and try again.
        </p>
        <p className="text-sm text-body mt-2 text-red-200">
          Error: {error || 'Unknown error occurred.'}
        </p>
      </div>
    </div>
  );
};

export default WeatherErrorContainer;
