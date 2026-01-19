"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Blueprint, Contract, ContractStatus } from '../types';

interface AppContextType {
  blueprints: Blueprint[];
  contracts: Contract[];
  addBlueprint: (bp: Blueprint) => void;
  addContract: (c: Contract) => void;
  updateContractStatus: (id: string, newStatus: ContractStatus) => void;
  updateContractField: (id: string, fieldId: string, value: string | boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // We use useState to store data. In a real app, this would be a database.
  // Requirement: "Mock persistence" [cite: 21]
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);

  // Load data from localStorage so you don't lose it on refresh
  useEffect(() => {
    const storedBp = localStorage.getItem('blueprints');
    const storedCt = localStorage.getItem('contracts');
    if (storedBp) setBlueprints(JSON.parse(storedBp));
    if (storedCt) setContracts(JSON.parse(storedCt));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('blueprints', JSON.stringify(blueprints));
    localStorage.setItem('contracts', JSON.stringify(contracts));
  }, [blueprints, contracts]);

  const addBlueprint = (bp: Blueprint) => {
    setBlueprints((prev) => [...prev, bp]);
  };

  const addContract = (c: Contract) => {
    setContracts((prev) => [...prev, c]);
  };

  // Handles the Lifecycle Rules [cite: 29-32]
  const updateContractStatus = (id: string, newStatus: ContractStatus) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;

        // Rule: Revoked contracts cannot proceed [cite: 32]
        if (c.status === 'Revoked') return c; 
        
        // Rule: Locked contracts cannot be edited 
        if (c.status === 'Locked' && newStatus !== 'Revoked') return c; 

        return { ...c, status: newStatus };
      })
    );
  };

  const updateContractField = (id: string, fieldId: string, value: string | boolean) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        // Rule: Locked contracts cannot be edited 
        if (c.status === 'Locked' || c.status === 'Revoked') return c;

        return {
          ...c,
          fieldValues: { ...c.fieldValues, [fieldId]: value },
        };
      })
    );
  };

  return (
    <AppContext.Provider value={{ blueprints, contracts, addBlueprint, addContract, updateContractStatus, updateContractField }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}