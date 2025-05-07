import React, { useState } from 'react';

const LocationFilter = ({ locations, onFilterChange }) => {
  const [selectedLocation, setSelectedLocation] = useState('Todas');

  const handleChange = (location) => {
    setSelectedLocation(location);
    onFilterChange(location);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por ubicación:</label>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleChange('Todas')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${selectedLocation === 'Todas' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Todas
        </button>
        {locations.map(location => (
          <button
            key={location}
            onClick={() => handleChange(location)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${selectedLocation === location ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {location}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationFilter;