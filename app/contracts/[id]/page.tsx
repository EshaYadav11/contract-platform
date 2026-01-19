"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../../../context/AppContext';
import { ContractStatus } from '../../../types';

export default function ContractManager() {
  const { id } = useParams(); // Gets the ID from the URL
  const router = useRouter();
  const { contracts, blueprints, updateContractStatus, updateContractField } = useApp();
  
  // Find the contract and its blueprint
  const contract = contracts.find(c => c.id === id);
  const blueprint = blueprints.find(b => b.id === contract?.blueprintId);

  // If not found, show error
  if (!contract || !blueprint) {
    return <div className="p-10">Contract not found.</div>;
  }

  const isLocked = contract.status === 'Locked' || contract.status === 'Revoked';

  // LOGIC: Allowable Lifecycle Transitions 
  // This ensures users can't skip steps (e.g., go from Created straight to Signed)
  const getNextStatus = (current: ContractStatus): ContractStatus | null => {
    switch (current) {
      case 'Created': return 'Approved';
      case 'Approved': return 'Sent';
      case 'Sent': return 'Signed';
      case 'Signed': return 'Locked';
      default: return null;
    }
  };

  const nextStatus = getNextStatus(contract.status);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Lifecycle Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{contract.name}</h1>
            <p className="text-sm text-gray-500">Template: {contract.blueprintName}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-gray-100 rounded-full font-bold text-sm">
              Status: {contract.status}
            </span>

            {/* Lifecycle Buttons */}
            {nextStatus && (
              <button 
                onClick={() => updateContractStatus(contract.id, nextStatus)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Mark as {nextStatus}
              </button>
            )}

            {contract.status !== 'Revoked' && contract.status !== 'Locked' && (
              <button 
                onClick={() => updateContractStatus(contract.id, 'Revoked')}
                className="text-red-600 border border-red-200 px-4 py-2 rounded hover:bg-red-50 transition"
              >
                Revoke
              </button>
            )}
          </div>
        </div>

        {/* The Contract Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-6">
            {blueprint.fields.map((field) => (
              <div key={field.id} className="border-b border-gray-100 pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                
                {/* Render different inputs based on field type [cite: 17] */}
                {field.type === 'text' && (
                  <input
                    type="text"
                    disabled={isLocked}
                    value={(contract.fieldValues[field.id] as string) || ''}
                    onChange={(e) => updateContractField(contract.id, field.id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                  />
                )}

                {field.type === 'date' && (
                  <input
                    type="date"
                    disabled={isLocked}
                    value={(contract.fieldValues[field.id] as string) || ''}
                    onChange={(e) => updateContractField(contract.id, field.id, e.target.value)}
                    className="p-2 border border-gray-300 rounded disabled:bg-gray-100"
                  />
                )}

                {field.type === 'checkbox' && (
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      disabled={isLocked}
                      checked={(contract.fieldValues[field.id] as boolean) || false}
                      onChange={(e) => updateContractField(contract.id, field.id, e.target.checked)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-sm text-gray-600">Yes, I agree</span>
                  </label>
                )}

                {field.type === 'signature' && (
                  <input
                    type="text"
                    placeholder="Type name to sign..."
                    disabled={isLocked}
                    value={(contract.fieldValues[field.id] as string) || ''}
                    onChange={(e) => updateContractField(contract.id, field.id, e.target.value)}
                    className="w-full p-2 border-b-2 border-gray-400 font-serif italic text-lg bg-yellow-50 disabled:bg-gray-100"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
            <button onClick={() => router.push('/')} className="text-gray-500 hover:text-gray-900">
              ← Back to Dashboard
            </button>
            {isLocked && <p className="text-red-500 text-sm">This contract is locked and cannot be edited.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}