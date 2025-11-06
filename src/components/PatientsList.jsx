import React from 'react';
import './PatientsList.css';
import search from '../assets/search.svg';




export default function PatientsList({ patients = [], selectedName = '', onSelect = () => {} }) {
  return (
    <aside className="pc-sidebar" aria-label="Patients">
     <header className="pc-sidebar-head">
  <div className="pc-header-row">
    <h3>Patients</h3>
    <img src={search} alt="Search" className="pc-search-icon" />
  </div>
</header>

      <ul className="pc-list" role="list">
        {patients.map((p, idx) => {
          const isActive = p.name === selectedName;
          return (
            <li
              key={p.name + idx}
              className={`pc-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onSelect(p); }}
            >
              <img className="pc-avatar" src={p.profile_picture} alt={p.name} />
              <div className="pc-meta">
                <div className="pc-name">{p.name}</div>
                <div className="pc-sub">{p.gender}{p.age ? `, ${p.age}` : ''}</div>
              </div>
              <div className="pc-more" aria-hidden>⋯</div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
