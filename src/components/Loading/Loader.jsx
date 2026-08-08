import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center bg-neutral-secondary-soft h-56 w-56 border border-default text-fg-brand-strong text-xs font-medium rounded-base">
      <div className="px-2 py-px ring-1 ring-inset ring-brand-subtle text-fg-brand-strong text-xs font-medium rounded-sm bg-brand-softer animate-pulse">
        loading...
      </div>
    </div>
  );
};

export default Loader;
