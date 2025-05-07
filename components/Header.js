import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <svg className="h-10 w-10 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            MediTrack HSAT
          </h1>
          <p className="mt-2 text-lg text-gray-600">Sistema Hospitalario de Alerta de Traumas</p>
        </div>
      </div>
    </header>
  );
};

export default Header;