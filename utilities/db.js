const DB_NAME = 'MediTrackHSAT';
const DB_VERSION = 2;
const STORE_NAME = 'medications';
const ALERT_STORE = 'alerts';
const LOCATION_STORE = 'locations';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('location', 'location', { unique: false });
        store.createIndex('expiration', 'expirationDate', { unique: false });
      }

      if (!db.objectStoreNames.contains(ALERT_STORE)) {
        const alertStore = db.createObjectStore(ALERT_STORE, { keyPath: 'id' });
        alertStore.createIndex('medicationId', 'medicationId', { unique: false });
        alertStore.createIndex('status', 'status', { unique: false });
      }

      if (!db.objectStoreNames.contains(LOCATION_STORE)) {
        const locationStore = db.createObjectStore(LOCATION_STORE, { keyPath: 'id' });
        locationStore.createIndex('name', 'name', { unique: true });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

// Operaciones para Medicamentos
export const getAllMedications = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = (error) => reject(error);
  });
};

export const getMedicationsByLocation = async (location) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('location');
    const request = index.getAll(location);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (error) => reject(error);
  });
};

export const getExpiringMedications = async (days = 30) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const today = new Date();
      const result = request.result.filter(med => {
        const expDate = new Date(med.expirationDate);
        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days && diffDays >= 0;
      });
      resolve(result);
    };
    request.onerror = (error) => reject(error);
  });
};

export const addMedication = async (medication) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(medication);

    request.onsuccess = () => resolve();
    request.onerror = (error) => reject(error);
  });
};

export const updateMedication = async (medication) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(medication);

    request.onsuccess = () => resolve();
    request.onerror = (error) => reject(error);
  });
};

export const deleteMedication = async (id) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = (error) => reject(error);
  });
};

// Operaciones para Alertas
export const getAlerts = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALERT_STORE, 'readonly');
    const store = transaction.objectStore(ALERT_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = (error) => reject(error);
  });
};

export const addAlert = async (alert) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALERT_STORE, 'readwrite');
    const store = transaction.objectStore(ALERT_STORE);
    const request = store.add(alert);

    request.onsuccess = () => resolve();
    request.onerror = (error) => reject(error);
  });
};

export const updateAlert = async (alert) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALERT_STORE, 'readwrite');
    const store = transaction.objectStore(ALERT_STORE);
    const request = store.put(alert);

    request.onsuccess = () => resolve();
    request.onerror = (error) => reject(error);
  });
};

// Operaciones para Ubicaciones
export const getLocations = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(LOCATION_STORE, 'readonly');
    const store = transaction.objectStore(LOCATION_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = (error) => reject(error);
  });
};

export const initializeLocations = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(LOCATION_STORE, 'readwrite');
    const store = transaction.objectStore(LOCATION_STORE);
    
    // Verificar si ya existen ubicaciones
    const countRequest = store.count();
    
    countRequest.onsuccess = () => {
      if (countRequest.result === 0) {
        const locations = [
          { id: 1, name: 'Sala de Reanimación', description: 'Área de cuidados intensivos' },
          { id: 2, name: 'Sala de Parto', description: 'Área de atención obstétrica' },
          { id: 3, name: 'Hospitalización', description: 'Área de pacientes internados' }
        ];
        
        const addRequests = locations.map(location => store.add(location));
        
        Promise.all(addRequests)
          .then(() => resolve())
          .catch(error => reject(error));
      } else {
        resolve();
      }
    };
    
    countRequest.onerror = (error) => reject(error);
  });
};

// Función para generar alertas automáticamente
export const generateAlerts = async () => {
  const medications = await getAllMedications();
  const today = new Date();
  
  const alertPromises = medications.map(async med => {
    const expDate = new Date(med.expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let status = 'safe';
    if (diffDays <= 0) status = 'expired';
    else if (diffDays <= 7) status = 'critical';
    else if (diffDays <= 30) status = 'warning';
    
    const existingAlert = await getAlertByMedicationId(med.id);
    
    if (existingAlert) {
      if (existingAlert.status !== status) {
        return updateAlert({ ...existingAlert, status });
      }
    } else if (status !== 'safe') {
      return addAlert({
        id: Date.now(),
        medicationId: med.id,
        medicationName: med.name,
        expirationDate: med.expirationDate,
        location: med.location,
        status,
        createdAt: new Date().toISOString()
      });
    }
    return Promise.resolve();
  });
  
  return Promise.all(alertPromises);
};

const getAlertByMedicationId = async (medicationId) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALERT_STORE, 'readonly');
    const store = transaction.objectStore(ALERT_STORE);
    const index = store.index('medicationId');
    const request = index.get(medicationId);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (error) => reject(error);
  });
};

// DONE