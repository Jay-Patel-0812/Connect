import React, { useState } from 'react';
import './index.scss';
import ConnectLogo from '../../../assets/ConnectLogo.png';
import usericon from '../../../assets/user-icon.png';
import { IoMdHome, IoIosBriefcase, IoMdNotifications } from 'react-icons/io';
import { FaUserPlus, FaSearch, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { onLogout } from '../../../API/AuthAPI';

export default function Navbar() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const Route = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar-master">
      <img className="connect-logo" src={ConnectLogo} alt="Connect Logo" />
      <div className="icons">
        <IoMdHome size={40} className="icon-scss" onClick={() => Route('/Home')} />
        <FaUserPlus size={30} className="icon-scss" onClick={() => Route('/Connections')} />
        <IoIosBriefcase size={40} className="icon-scss" onClick={() => Route('/Jobs')} />
        <FaSearch size={30} className="icon-scss" onClick={() => Route('/Search')} />
        <FaComments size={30} className="icon-scss" onClick={() => Route('/Messages')} />
        <IoMdNotifications size={40} className="icon-scss" onClick={() => Route('/Notifications')} />
      </div>
      <div className="user-logo-container" onMouseEnter={() => setShowPopup(true)} onMouseLeave={() => setShowPopup(false)}>
        <img className="user-logo" src={usericon} alt="User Icon" />
        {showPopup && (
          <div className="popup">
            <button className="logout-button" onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}