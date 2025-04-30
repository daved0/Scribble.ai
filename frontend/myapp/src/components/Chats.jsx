import React from "react";
import { useNavigate } from "react-router-dom";

function Chats({history}){
    return(
        <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h2 style={{backgroundColor: '#f0f0f0', color: '#000000'}}>History</h2>
        <ul>
          {history.map(item => (
            <li key={item.id}>
              <button>{item.prompt}</button>
            </li>
          ))}
        </ul>
      </div>
  
    );
}

export default Chats;