import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



function TaskPage ({match}){
    const {taskPrompt} = match.params;
    return (
        <h1>Task: {taskPrompt.replace(/_/g, ' ').title()}</h1>

    );
}


function Chats({history}){
    return(
        <Router>
        <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h3 style={{color: '#000000'}}>History</h3>
        <ul>
          {history.map(item => (
            <TaskButton key={item.prompt} item={item} />
          ))}
        </ul>
        <Routes>
            <Route path="/task/:taskPrompt" element={<TaskPage />} />
        </Routes>
      </div>
      </Router>
  
    );
}

export default Chats;