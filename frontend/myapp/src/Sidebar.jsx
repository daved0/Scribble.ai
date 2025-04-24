import React, { useState, useRef, useEffect } from 'react';
import './Sidebar.css'; // Assuming you'll create a Sidebar.css file
import Chats from './Chats';

function Sidebar({history}) {
  const sidebarRef = useRef(null);
  const mainRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openNav = () => {
    if (sidebarRef.current && mainRef.current) {
      sidebarRef.current.style.width = '250px';
      mainRef.current.style.marginLeft = '250px';
      setIsSidebarOpen(true);
    }
  };

  const closeNav = () => {
    if (sidebarRef.current && mainRef.current) {
      sidebarRef.current.style.width = '0';
      mainRef.current.style.marginLeft = '0';
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <div
        id="mySidebar"
        className="sidebar"
        ref={sidebarRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100%',
          width: '0', // Initially closed
          backgroundColor: '#f1f1f1',
          overflowX: 'hidden',
          transition: '0.5s',
          paddingTop: '60px',
          zIndex: '1',
        }}
      >
        <a
          href="javascript:void(0)"
          className="closebtn"
          onClick={closeNav}
          style={{
            position: 'absolute',
            top: '0',
            right: '25px',
            fontSize: '36px',
            marginLeft: '50px',
            textDecoration: 'none',
            color: '#818181',
            display: 'block',
            transition: '0.3s',
          }}
        >
          &times;
        </a>
        <Chats history={history} />
      </div>

      <div
        id="main"
        ref={mainRef}
        style={{
          transition: 'margin-left .5s',
          padding: '16px',
        }}
      >
        <button className="openbtn" onClick={openNav}>
          &#9776;
        </button>
      </div>
    </>
  );
}

export default Sidebar;