import React, { createContext, useContext, useState } from 'react';

const EnrollmentContext = createContext(null);

const initialData = {
  hasInsurance: null,
  address: { street: '', city: '', zip: '' },
};

export function EnrollmentProvider({ children }) {
  const [data, setData] = useState(initialData);
  const updateData = (patch) => setData((prev) => ({ ...prev, ...patch }));
  return (
    <EnrollmentContext.Provider value={{ data, updateData }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error('useEnrollment must be used within an EnrollmentProvider');
  return ctx;
}
