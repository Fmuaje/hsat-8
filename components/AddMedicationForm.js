import React, { useState } from 'react';

const AddMedicationForm = ({ onAddMedication }) => {
  const [formData, setFormData] = useState({
    name: '',
    lot: '',
    expirationDate: '',
    location: 'Sala de Reanimación',
    quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.lot && formData.expirationDate && formData.quantity) {
      const newMedication = {
        ...formData,
        id: Date.now(),
        quantity: parseInt(formData.quantity)
      };
      onAddMedication(newMedication);
      setFormData({
        name: '',
        lot: '',
        expirationDate: '',
        location: 'Sala de Reanimación',
        quantity: ''
      });
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="font-medium text-gray-800 mb-3">Agregar nuevo medicamento</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del medicamento</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de lote</label>
            <input
              type="text"
              name="lot"
              value={formData.lot}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de vencimiento</label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Sala de Reanimación">Sala de Reanimación</option>
              <option value="Sala de Parto">Sala de Parto</option>
              <option value="Hospitalización">Hospitalización</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Agregar medicamento
        </button>
      </form>
    </div>
  );
};

export default AddMedicationForm;