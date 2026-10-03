import React from 'react';
import { ShieldCheck, Clock, User } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AuditLogView: React.FC = () => {
  const { auditLogs } = useStore();

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
          SECURITY & AUDIT COMPLIANCE
        </span>
        <h1 className="font-serif-heading text-3xl font-bold text-stone-100">System Activity & Security Logs</h1>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-stone-400 text-[11px] font-bold uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User / Agent</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-stone-800/40">
                  <td className="p-4 font-mono text-stone-400">{log.timestamp}</td>
                  <td className="p-4 font-semibold text-stone-200">{log.user}</td>
                  <td className="p-4">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-stone-300">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
