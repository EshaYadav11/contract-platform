"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../../context/AppContext';
import { BlueprintField, FieldType } from '../../../types';

export default function NewBlueprint() {
  const router = useRouter();
  const { addBlueprint } = useApp();
  
  const [name, setName] = useState('');
  const [fields, setFields] = useState<BlueprintField[]>([]);

  const addField = (type: FieldType) => {
    const newField: BlueprintField = {
      id: crypto.randomUUID(),
      type,
      label: `New ${type} field`,
      x: 0, 
      y: fields.length * 50
    };
    setFields([...fields, newField]);
  };

  const updateFieldLabel = (id: string, newLabel: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, label: newLabel } : f));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    if (!name) return alert('Please enter a blueprint name');
    if (fields.length === 0) return alert('Please add at least one field');

    addBlueprint({
      id: crypto.randomUUID(),
      name,
      fields
    });

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex items-center justify-center">
      {/* Changed max-w-3xl to max-w-2xl and reduced padding to make it compact */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Create New Blueprint</h1>

        {/* Compact Spacing mb-5 instead of mb-8 */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Blueprint Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Employment Contract"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div className="mb-5">
          <p className="text-sm font-semibold text-slate-700 mb-3">Add Fields to Template:</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => addField('text')} className="cursor-pointer px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-200 transition">+ Text</button>
            <button onClick={() => addField('date')} className="cursor-pointer px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-200 transition">+ Date</button>
            <button onClick={() => addField('checkbox')} className="cursor-pointer px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-200 transition">+ Checkbox</button>
            <button onClick={() => addField('signature')} className="cursor-pointer px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-200 transition">+ Signature</button>
          </div>
        </div>

        {/* Reduced min-height to 200px so it fits on screen */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 min-h-[200px] mb-6 bg-slate-50/50">
            {fields.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-10">
                <p>No fields added yet.</p>
                <p className="text-sm">Click the buttons above to build your form.</p>
              </div>
            )}
            
            {fields.map((field) => (
              <div key={field.id} className="flex items-center gap-3 mb-2 bg-white p-3 rounded-lg border border-slate-200 shadow-sm group">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 w-16 text-center bg-slate-100 py-1 rounded">{field.type}</span>
                <input 
                  type="text" 
                  value={field.label}
                  onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                  className="flex-1 p-1 bg-transparent border-b border-transparent focus:border-blue-500 outline-none text-slate-700 font-medium hover:border-slate-300 transition text-sm"
                />
                <button onClick={() => removeField(field.id)} className="cursor-pointer text-slate-300 hover:text-red-500 transition px-2">
                  ✕
                </button>
              </div>
            ))}
        </div>

        {/* Buttons: Fixed Cancel Hover to Red */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button 
            onClick={() => router.push('/')} 
            className="cursor-pointer px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="cursor-pointer px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200"
          >
            Save Blueprint
          </button>
        </div>
      </div>
    </div>
  );
}