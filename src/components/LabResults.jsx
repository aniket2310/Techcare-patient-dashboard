import React from "react";
import "./LabResults.css";
import download from '../assets/download.svg';



export default function LabResults({ results = [] }) {
  return (
    <div className="lab-card">
      <h4 className="lab-title">Lab Results</h4>

      <div className="lab-results-wrap">
        {results && results.length > 0 ? (
          <ul className="lab-results-list">
            {results.map((r, i) => (
              <li key={i} className="lab-result-item">
                {r}
                <img src={download} alt="dowmlaod button" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="lab-empty">No lab results available.</p>
        )}
      </div>
    </div>
  );
}
