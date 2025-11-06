import React from 'react';
import './Header.css';
import logo from '../assets/TestLogo.svg';
import home from '../assets/home.svg'; 
import calendar from '../assets/calendar.svg'; 
import credit_card from '../assets/credit_card.svg'; 
import chat_bubble from '../assets/chat_bubble.svg'; 
import group_Fill0 from '../assets/group_FILL0.svg'; 
import doctorProfile from '../assets/doctor-profile.png';
import three_dot from '../assets/three_dot.png';
import settings from '../assets/settings.png';



export default function Header() {
  return (
    <header className="tc-header">
      <div className="tc-header-left">
        <img src={logo} alt="Tech.Care logo" className="tc-logo" />
        <div className="tc-brand">
        </div>

        <nav className="tc-nav" aria-label="Main navigation">
                      
          <button className="tc-nav-item" aria-current="false">  <img src={home} alt="home" /> Overview</button>
          <button className="tc-nav-item tc-active" aria-current="page"> <img src={group_Fill0} alt="group_Fill0" /> Patients</button>
          <button className="tc-nav-item"> <img src={calendar} alt="calendar" /> Schedule</button>
          <button className="tc-nav-item"> <img src={chat_bubble} alt="chat_bubble" /> Message</button>
          <button className="tc-nav-item"> <img src={credit_card} alt="credit_card" /> Transactions</button>
        </nav>
      </div>

      <div className="tc-header-right">
        <div className="tc-actions">
          {/* <button className="tc-icon-btn" title="Notifications" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 17H9v-5a3 3 0 10-6 0v5H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button> */}

          {/* <button className="tc-icon-btn" title="Settings" aria-label="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09c.68 0 1.26-.39 1.51-1a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06c.45.45 1.06.64 1.82.33.5-.2 1-.3 1.51-.3H12c.5 0 1 .1 1.51.3.76.31 1.37.12 1.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06c-.44.44-.64 1.05-.33 1.82.2.5.3 1 .3 1.51V12c0 .5-.1 1-.3 1.51-.31.76-.12 1.37.33 1.82z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button> */}
        </div>

        

        <div className="tc-user">
  <img className="tc-user-avatar" src={doctorProfile} alt="Dr. Jose Simmons" />

  <div className="tc-user-info">
    <div className="tc-user-name">Dr. Jose Simmons</div>
    <div className="tc-user-sub">General Practitioner</div>
  </div>

  <div className="tc-user-icons">
    <img src={settings} alt="Setting" />
    <img src={three_dot} alt="three dot" />
    
  </div>
</div>

      </div>
    </header>
  );
}
