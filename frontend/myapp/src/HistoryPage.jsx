import React from 'react';
import { useLocation } from 'react-router-dom';

function HistoryPage() {
  const location = useLocation();
  const { processedData } = location.state || {}; 

  const historyItems = processedData ? [processedData] : (location.state?.history || []);

  return (
    <div>
      <h2>History</h2>
      {historyItems.length > 0 ? (
        <ul>
          {historyItems.map((item, index) => (
            <li key={index}>
              {item.original_text && <p>Original Text: {item.original_text}</p>}
              {item.result && <p>Result: {item.result}</p>}
              {typeof item === 'string' && <p>{item}</p>} 
            </li>
          ))}
        </ul>
      ) : (
        <p>No history available yet.</p>
      )}
    </div>
  );
}

export default HistoryPage;