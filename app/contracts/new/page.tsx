"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../../context/AppContext';

export default function NewContract() {
  const router = useRouter();
  const { blueprints, addContract } = useApp();
  
  const [name, setName] = useState('');
  const [selectedBpId, setSelectedBpId] = useState('');

  const handleCreate = () => {
    if (!name || !selectedBpId) return alert('Please fill all fields');
    
    const blueprint = blueprints.find(b => b.id === selectedBpId);
    if (!blueprint) return;

    const newContractId = crypto.randomUUID();

    addContract({
      id: newContractId,
      name,
      blueprintId: blueprint.id,
      blueprintName: blueprint.name,
      status: 'Created',
      createdDate: new Date().toISOString(),
      fieldValues: {}
    });

    router.push(`/contracts/${newContractId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg shadow-slate-200/50 p-6 sm:p-8 border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Start New Contract</h1>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Contract Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., John Doe Offer Letter"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Select Blueprint</label>
          <select 
            value={selectedBpId}
            onChange={(e) => setSelectedBpId(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
          >
            <option value="">-- Choose a Template --</option>
            {blueprints.map(bp => (
              <option key={bp.id} value={bp.id}>{bp.name}</option>
            ))}
          </select>
          {blueprints.length === 0 && <p className="text-xs text-rose-500 mt-2 font-medium">No blueprints found. Create one first!</p>}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
           {/* EXACT SAME CANCEL BUTTON AS BLUEPRINT */}
           <button 
            onClick={() => router.push('/')}
            className="cursor-pointer px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
          >
            Cancel
          </button>
          
          {/* EXACT SAME PRIMARY BUTTON STYLE AS BLUEPRINT */}
          <button 
            onClick={handleCreate}
            className="cursor-pointer w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200"
          >
            Create Contract
          </button>
        </div>
      </div>
    </div>
  );
}