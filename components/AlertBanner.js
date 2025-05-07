import React from 'react';

const AlertBanner = ({ medications }) => {
  const today = new Date();
  const expiringMedications = medications.filter(med => {
    const expDate = new Date(med.expirationDate);
    const daysToExpire = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));
    return daysToExpire <= 30;
  });

  if (expiringMedications.length === 0) return null;

  const criticalCount = expiringMedications.filter(med => {
    const expDate = new Date(med.expirationDate);
    const daysToExpire = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));
    return daysToExpire <= 7;
  }).length;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-700">
            {criticalCount > 0 
              ? `¡ALERTA! Tienes ${criticalCount} medicamentos críticos y ${expiringMedications.length - criticalCount} por vencer`
              : `Tienes ${expiringMedications.length} medicamentos por vencer en los próximos 30 días`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;