import React from 'react';
import Header from './components/Header';
import TrafficLightLegend from './components/TrafficLightLegend';
import LoginButton from './components/LoginButton';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Control Inteligente de Medicamentos</h2>
          <p className="text-gray-600">Sistema de seguimiento y alerta temprana para medicamentos en áreas críticas</p>
        </div>
        
        <TrafficLightLegend />
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Cómo funciona?</h3>
          <div className="prose prose-blue max-w-none">
            <p>El sistema MediTrack HSAT clasifica automáticamente los medicamentos según su fecha de vencimiento:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Los <span className="font-semibold text-red-600">medicamentos en rojo</span> requieren acción inmediata</li>
              <li>Los <span className="font-semibold text-yellow-600">medicamentos en amarillo</span> deben ser monitoreados</li>
              <li>Los <span className="font-semibold text-green-600">medicamentos en verde</span> están dentro del período seguro</li>
            </ul>
            <p className="mt-4">Para gestionar el inventario completo, accede a la zona de administración.</p>
          </div>
        </div>
        
        <LoginButton />
      </main>
    </div>
  );
};

export default App;

// DONE