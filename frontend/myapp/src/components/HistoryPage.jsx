import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Accordion, Card } from 'react-bootstrap';


function History(){
  
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchChatHistory = async () => {
    try {
      const response = await fetch('/retrieve_chat_history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null; 
      }
  
      const data = await response.json();
      console.log(data.history)
      return data.history; 
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return null; 
    }
  };


  useEffect(() => {
    const getHistoryOnMount = async () => {
      const historyData = await fetchChatHistory();
      setLoading(false);
      if (historyData) {
        setChatHistory(historyData);
      } else {
        setError('Failed to load chat history.');
      }
    };
  
    getHistoryOnMount();
  }, []); 
  
  if (loading) {
    return <p>Loading chat history...</p>;
  }
  
  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
      <>
      <h1>History page</h1>
        <a
          href="javascript:void(0)"
          className="backbtn"
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '0',
            fontSize: '36px',
            marginLeft: '0px',
            textDecoration: 'none',
            color: '#818181',
            display: 'block'
          }}
        >
          &lt; Back
        </a>
        <p>
          <br></br>
          <br></br>
          <br></br>
        <Accordion defaultActiveKey="">
        {chatHistory.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{item.prompt}</Accordion.Header>
            <Accordion.Body>{item.summary}</Accordion.Body>
          </Accordion.Item>
        ))}
        </Accordion>
        </p>
      </>
    );
  }
export default History;