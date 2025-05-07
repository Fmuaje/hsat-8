import React from 'react';

const MedicationCard = ({ medication }) => {
  const today = new Date();
  const expDate = new Date(medication.expirationDate);
  const daysToExpire = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));
  
  let statusClass = "text-green-600";
  if (daysToExpire <= 30 && daysToExpire > 7) {
    statusClass = "text-yellow-500";
  } else if (daysToExpire <= 7) {
    statusClass = "text-red-500";
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-800">{medication.name}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusClass}`}>
          {daysToExpire > 0 ? `${daysToExpire} días` : "VENCIDO"}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>
          <p className="font-medium">Lote:</p>
          <p>{medication.lot}</p>
        </div>
        <div>
          <p className="font-medium">Ubicación:</p>
          <p>{medication.location}</p>
        </div>
        <div>
          <p className="font-medium">Vence:</p>
          <p>{medication.expirationDate}</p>
        </div>
        <div>
          <p className="font-medium">Cantidad:</p>
          <p>{medication.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default MedicationCard;