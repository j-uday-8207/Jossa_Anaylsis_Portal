import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import './Header.css';

const Header = ({ 
  showBackButton = false, 
  backLink = "/" 
}) => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          {showBackButton && (
            <Link to={backLink} className="header-back-button">
              ← Back to Home
            </Link>
          )}
          <h1>Josaa Analysis Portal</h1>
        </div>
        <div className="header-buttons">
          <button className="header-profile-button" onClick={toggleProfile}>
            👤 Profile
          </button>
        </div>
      </header>
      {showProfile && (
        <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default Header;