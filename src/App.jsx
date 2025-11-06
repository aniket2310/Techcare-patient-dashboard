
// src/App.jsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PatientsList from "./components/PatientsList";
import DiagnosticList from "./components/DiagnosticList";
import "./components/DiagnosticList.css";
import PatientDetail from "./components/PatientDetail";
import LabResults from "./components/LabResults";
import "./components/LabResults.css";

import "./App.css";
import BirthIcon from "./assets/BirthIcon.svg";
import FemaleIcon from "./assets/FemaleIcon.svg";
import PhoneIcon from "./assets/PhoneIcon.svg";
import InsuranceIcon from "./assets/InsuranceIcon.svg";

const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";
const AUTH_HEADER = "Basic " + btoa("coalition:skills-test");

export default function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPatients() {
      try {
        setLoading(true);
        const res = await fetch(API_URL, {
          method: "GET",
          headers: { Authorization: AUTH_HEADER },
        });
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        setPatients(data || []);

        // auto-select Jessica Taylor if present
        const jessica = (data || []).find(
          (p) => p.name && p.name.toLowerCase() === "jessica taylor"
        );
        setSelectedPatient(jessica || (data && data[0]) || null);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load patients");
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  return (
    <div className="app-root">
      <Header />

      <div
        className="app-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr 320px",
          gap: 20,
          padding: 20,
        }}
      >
        {/* Sidebar - Patients list */}
        <PatientsList
          patients={patients}
          selectedName={selectedPatient ? selectedPatient.name : ""}
          onSelect={(p) => setSelectedPatient(p)}
        />

        {/* Main content area */}
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Main patient details card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 18,
              minHeight: 600,
              boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
            }}
          >
            {loading && <p>Loading patient data…</p>}
            {error && <p style={{ color: "#a00" }}>Error: {error}</p>}

            {!loading && selectedPatient && (
              <PatientDetail patient={selectedPatient} />
            )}

            {!loading && !selectedPatient && !error && (
              <p>No patient selected.</p>
            )}
          </div>

          {/* Separate Diagnostic List card below */}
          {!loading && selectedPatient && (
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 18,
                boxShadow: "0 6px 18px rgba(16,24,40,0.04)",

              }}
              className="dig-list-card"
            >
              <DiagnosticList items={selectedPatient.diagnostic_list || []} />
            </div>
          )}
        </main>

        {/* Right column: Profile / details (placeholder) */}
        <aside
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 18,
            boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
            maxHeight: '600px'
          }}
        >
          {selectedPatient ? (
            <>
              <img
                src={selectedPatient.profile_picture}
                alt={selectedPatient.name}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto 12px",
                }}
              />
              <h3
                style={{ textAlign: "center", margin: "6px 0", color: "black" }}
              >
                {selectedPatient.name}
              </h3>

              {/* Top row: info + button */}
              <div className="pm-main-row">
                <div className="pm-info-section">
                  {/* Date of Birth */}
                  <div className="pm-info-row">
                    <div className="pm-icon-circle">
                      <img
                        src={BirthIcon}
                        alt="Birth Icon"
                        className="pm-icon-img"
                      />
                    </div>
                    <div className="pm-info-text">
                      <div className="pm-info-label">Date Of Birth</div>
                      <div className="pm-info-value">
                        {selectedPatient.date_of_birth
                          ? new Date(
                              selectedPatient.date_of_birth
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="pm-info-row">
                    <div className="pm-icon-circle">
                      <img
                        src={FemaleIcon}
                        alt="Gender Icon"
                        className="pm-icon-img"
                      />
                    </div>
                    <div className="pm-info-text">
                      <div className="pm-info-label">Gender</div>
                      <div className="pm-info-value">
                        {selectedPatient.gender || "—"}
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="pm-info-row">
                    <div className="pm-icon-circle">
                      <img
                        src={PhoneIcon}
                        alt="Phone Icon"
                        className="pm-icon-img"
                      />
                    </div>
                    <div className="pm-info-text">
                      <div className="pm-info-label">Contact Info.</div>
                      <div className="pm-info-value">
                        {selectedPatient.phone_number || "—"}
                      </div>
                    </div>
                  </div>

                  {/* Emergency */}
                  <div className="pm-info-row">
                    <div className="pm-icon-circle">
                      <img
                        src={PhoneIcon}
                        alt="Emergency Icon"
                        className="pm-icon-img"
                      />
                    </div>
                    <div className="pm-info-text">
                      <div className="pm-info-label">Emergency Contacts</div>
                      <div className="pm-info-value">
                        {selectedPatient.emergency_contact || "—"}
                      </div>
                    </div>
                  </div>

                  {/* Insurance */}
                  <div className="pm-info-row">
                    <div className="pm-icon-circle">
                      <img
                        src={InsuranceIcon}
                        alt="Insurance Icon"
                        className="pm-icon-img"
                      />
                    </div>
                    <div className="pm-info-text">
                      <div className="pm-info-label">Insurance Provider</div>
                      <div className="pm-info-value">
                        {selectedPatient.insurance_type || "—"}
                      </div>
                    </div>
                  </div>
                </div>

                <button className="pm-info-but">Show All Information</button>
              </div>

              {/* ===== LAB RESULTS: separate card BELOW the profile area ===== */}
              <div
                className="lab-card-container"
                style={{
                  marginTop: 18,
                }}
              >
                <LabResults results={selectedPatient.lab_results || []} />
              </div>
            </>
          ) : (
            <p className="muted">Select a patient to view profile details.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
