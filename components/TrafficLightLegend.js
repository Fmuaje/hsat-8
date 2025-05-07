import React from 'react';

const TrafficLightLegend = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Sistema de Semaforización</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start">
          <div className="h-6 w-6 rounded-full bg-red-500 mt-1 mr-3 flex-shrink-0"></div>
          <div>
            <h4 className="font-medium text-gray-800">Rojo - Crítico</h4>
            <p className="text-sm text-gray-600">Medicamentos vencidos o que vencen en menos de 7 días</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="h-6 w-6 rounded-full bg-yellow-500 mt-1 mr-3 flex-shrink-0"></div>
          <div>
            <h4 className="font-medium text-gray-800">Amarillo - Advertencia</h4>
            <p className="text-sm text-gray-600">Medicamentos que vencen entre 8 y 30 días</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="h-6 w-6 rounded-full bg-green-500 mt-1 mr-3 flex-shrink-0"></div>
          <div>
            <h4 className="font-medium text-gray-800">Verde - Seguro</h4>
            <p className="text-sm text-gray-600">Medicamentos con más de 30 días para vencer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficLightLegend;