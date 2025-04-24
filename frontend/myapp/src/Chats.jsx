import React from "react";

function Chats({history}){
    return(
        <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h3 style={{color: '#000000'}}>History</h3>
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