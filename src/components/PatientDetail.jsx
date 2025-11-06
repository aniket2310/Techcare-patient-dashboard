// src/components/PatientDetail.jsx
import React, { useMemo } from 'react';
import 'chart.js/auto';                
import { Line } from 'react-chartjs-2';
import './PatientDetail.css';
import HeartBPM from '../assets/HeartBPM.svg';
import respiratory_rate from '../assets/respiratory_rate.svg';
import temperature from '../assets/temperature.svg';
import { color } from 'chart.js/helpers';
import DiagnosticList from './DiagnosticList';
import './DiagnosticList.css';



function shortMonthLabel(monthName) {
  return monthName ? monthName.slice(0,3) : '';
}

function parseBPData(history = []) {
  const monthIndex = {
    "January":1,"February":2,"March":3,"April":4,"May":5,"June":6,
    "July":7,"August":8,"September":9,"October":10,"November":11,"December":12
  };
  const sorted = [...history].sort((a,b)=>{
    const aKey = (a.year||0)*100 + (monthIndex[a.month]||0);
    const bKey = (b.year||0)*100 + (monthIndex[b.month]||0);
    return aKey - bKey;
  });

  const labels = [];
  const systolic = [];
  const diastolic = [];
  sorted.forEach(entry => {
    labels.push(`${shortMonthLabel(entry.month)}${entry.year ? ' ' + String(entry.year).slice(-2) : ''}`);
    const bp = entry.blood_pressure || {};
    systolic.push(bp.systolic && bp.systolic.value ? bp.systolic.value : null);
    diastolic.push(bp.diastolic && bp.diastolic.value ? bp.diastolic.value : null);
  });

  return { labels, systolic, diastolic, sorted };
}

export default function PatientDetail({ patient }) {
  // patient can be null
  const { labels, systolic, diastolic, sorted } = useMemo(
    () => parseBPData(patient?.diagnosis_history || []),
    [patient]
  );

  const latest = sorted && sorted.length ? sorted[sorted.length - 1] : null;

const chartData = useMemo(() => ({
  labels,
  datasets: [
    {
      label: 'Systolic',
      data: systolic,
      borderWidth: 2,
      tension: 0.35,
      borderColor: '#ec4899',
      pointRadius: 4,
      fill: false
    },
    {
      label: 'Diastolic',
      data: diastolic,
      borderWidth: 2,
      tension: 0.35,
      borderColor: '#7c3aed',
      pointRadius: 4,
      fill: false
    }
  ]
}), [labels, systolic, diastolic]);

const chartOptions = useMemo(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    tooltip: { mode: 'index', intersect: false }
  },
  scales: {
    y: { beginAtZero: false, suggestedMin: 40, suggestedMax: 180 },
    x: { grid: { display: false } }
  }
}), []);

  if (!patient) {
    return <div className="pd-empty">Select a patient to view details.</div>;
  }

  return (
    <div className="pd-root">
      <section className="pd-chart-card">
        <div className="pd-chart-header">
          <h3>Blood Pressure</h3>
          <div className="pd-pill">Last 6 months</div>
        </div>
        <div className="pd-chart-area">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="pd-vitals">
          <div className="pd-vital" style={{ background: "#E0F3FA" }}>
            <img src={respiratory_rate} alt="respiratory_rate" />
            <div className="pd-vital-title">Respiratory Rate</div>
            <div className="pd-vital-value">{latest && latest.respiratory_rate && latest.respiratory_rate.value ? `${latest.respiratory_rate.value} bpm` : '—'}</div>
            <div className="pd-vital-sub">{latest && latest.respiratory_rate && latest.respiratory_rate.levels ? latest.respiratory_rate.levels : ''}</div>
          </div>

          <div className="pd-vital" style={{ background: "#FFE6E9" }}>
            <img src={temperature} alt="temperature" />
            <div className="pd-vital-title">Temperature</div>
            <div className="pd-vital-value">{latest && latest.temperature && latest.temperature.value ? `${latest.temperature.value}°F` : '—'}</div>
            <div className="pd-vital-sub">{latest && latest.temperature && latest.temperature.levels ? latest.temperature.levels : ''}</div>
          </div>

          <div className="pd-vital" style={{ background: "#FFE6F1" }}>
            <img src={HeartBPM} alt="HeartBPM" />
            <div className="pd-vital-title">Heart Rate</div>
            <div className="pd-vital-value">{latest && latest.heart_rate && latest.heart_rate.value ? `${latest.heart_rate.value} bpm` : '—'}</div>
            <div className="pd-vital-sub">{latest && latest.heart_rate && latest.heart_rate.levels ? latest.heart_rate.levels : ''}</div>
          </div>
        </div>
      </section>

       {/* <section className="pd-lists-digonistic">
  <DiagnosticList items={patient.diagnostic_list || []}/>
</section> */}
    </div>
  );
}
