import React from 'react';
import { Contract } from '../types';
import Link from 'next/link';

interface Props {
  contracts: Contract[];
}

export default function ContractList({ contracts }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed': return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-600/20';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-600/20';
      case 'Locked': return 'bg-slate-100 text-slate-700 border-slate-200 ring-1 ring-slate-600/20';
      case 'Revoked': return 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-600/20';
      case 'Approved': return 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-600/20';
      case 'Sent': return 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-600/20';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (contracts.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50/50">
        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-sm">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No contracts found</h3>
        <p className="text-slate-500 mt-1 max-w-sm mx-auto">Try adjusting your filters or create a new contract to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/80 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 border-r border-slate-100">Contract Name</th>
            <th className="px-6 py-4 border-r border-slate-100">Blueprint</th>
            <th className="px-6 py-4 border-r border-slate-100">Status</th>
            <th className="px-6 py-4 border-r border-slate-100">Created Date</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {contracts.map((contract) => (
            <tr key={contract.id} className="hover:bg-slate-50/80 transition-colors duration-150">
              <td className="px-6 py-4 font-medium text-slate-900 border-r border-slate-50">
                {contract.name}
              </td>
              <td className="px-6 py-4 text-slate-600 border-r border-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                  {contract.blueprintName}
                </div>
              </td>
              <td className="px-6 py-4 border-r border-slate-50">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(contract.status)}`}>
                  {contract.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500 font-mono text-xs border-r border-slate-50">
                {new Date(contract.createdDate).toLocaleDateString(undefined, { 
                  year: 'numeric', month: 'short', day: 'numeric' 
                })}
              </td>
              <td className="px-6 py-4 text-right">
                <Link 
                  href={`/contracts/${contract.id}`}
                  className="cursor-pointer inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Manage
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}