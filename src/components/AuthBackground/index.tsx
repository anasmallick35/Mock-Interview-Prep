import React from 'react';

const AuthBackground: React.FC = () => {
  return (
    <div className="hidden lg:block lg:grow">
      <div className="flex h-full flex-col items-center justify-between gap-6 p-6">
        <div className="relative size-full w-full overflow-hidden rounded-3xl bg-neutral-100">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pink-200 to-orange-200"
            style={{ opacity: 1 }}
          ></div>
          <div className="absolute inset-0 flex size-full flex-col items-center" aria-hidden="true">
            {/* SVG or design here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBackground;
