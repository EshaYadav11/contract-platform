"use client";
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ContractList from '../components/ContractList';
import Link from 'next/link';

export default function Dashboard() {
  const { contracts } = useApp();
  const [filter, setFilter] = useState('All');

  // Logic: Calculate Stats
  const filteredContracts = contracts.filter(c => {
    if (filter === 'All') return true;
    return c.status === filter;
  });

  const totalContracts = contracts.length;
  const activeContracts = contracts.filter(c => ['Created', 'Approved', 'Sent'].includes(c.status)).length;
  const completedContracts = contracts.filter(c => ['Signed', 'Locked'].includes(c.status)).length;

  const getCount = (status: string) => {
    if (status === 'All') return contracts.length;
    return contracts.filter(c => c.status === status).length;
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
            <p className="text-slate-500 mt-1">Streamline your contract lifecycle from draft to signature.</p>
          </div>
          
          <div className="flex gap-3">
            <Link 
              href="/blueprints/new" 
              className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:text-blue-600 hover:border-blue-200 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              New Blueprint
            </Link>

            <Link 
              href="/contracts/new" 
              className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-medium rounded-lg shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 hover:bg-slate-800 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              New Contract
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Contracts</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalContracts}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Progress</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{activeContracts}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{completedContracts}</p>
          </div>
        </div>

        {/* Tabs & Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-6 pt-4">
            <nav className="flex space-x-8">
              {['All', 'Created', 'Sent', 'Signed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`cursor-pointer pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 flex items-center gap-2 outline-none ${
                    filter === status
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  {status}
                  <span className={`text-xs py-0.5 px-2 rounded-full ${
                    filter === status ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {getCount(status)}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-0">
            <ContractList contracts={filteredContracts} />
          </div>
        </div>

      </div>
    </main>
  );
}