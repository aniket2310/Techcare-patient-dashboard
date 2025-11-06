// src/components/DiagnosticList.jsx
import React from 'react';
import './DiagnosticList.css';

export default function DiagnosticList({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <div className="dl-empty">
        <p>No diagnostics available.</p>
      </div>
    );
  }

  return (
    <div className="dl-root">
      <h4 className="dl-title">Diagnostic List</h4>
      <div className="dl-table-wrap" role="region" aria-label="Diagnostic list">
        <table className="dl-table">
          <thead>
            <tr>
              <th>Problem / Diagnosis</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d, i) => (
              <tr key={d.name ? `${d.name}-${i}` : i}>
                <td className="dl-name">{d.name || '—'}</td>
                <td className="dl-desc">{d.description || '—'}</td>
                <td className="dl-status">{d.status || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
