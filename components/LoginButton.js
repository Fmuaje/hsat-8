import React from 'react';

const LoginButton = () => {
  return (
    <div className="text-center mt-8">
      <a 
        href="/inventory" 
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
      >
        Ingresar a Zona de Inventario
        <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  );
};

export default LoginButton;