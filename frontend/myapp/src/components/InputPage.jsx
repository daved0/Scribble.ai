import React, { use, useState} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './InputPage.css';   
import Sidebar from './Sidebar';
import { useNavigate } from "react-router-dom";



function LongFormInput() {
  const [textContent, setTextContent] = useState('');
  const [summarizedText, setSummarizedText] = useState('');

  const navigate = useNavigate();

  const handleNavigateHistory = async () => {
    try {
      const response = await fetch('/navigate_to_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.redirect_url) {
          navigate(data.redirect_url);
        } else {  
          console.warn('No redireect URL received from the backend');
        }
      } else {
        console.error('Failed to send navigation request');
      }
    } catch (error) {
      console.error("There was an error sending the request:",error);
    }
  };
  
  const handleInputChange = (event) => {
    setTextContent(event.target.value);
  };
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async () => {
    if (textContent === ""){
        return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textContent }),
      });

      if (response.ok) {
        const data = await response.json();
        
        const newId = chatHistory.length + 1;        

        setChatHistory([...chatHistory, { id: newId, prompt: data.prompt, body:data.summary }]);

        setSummarizedText(data.summary);

        setTextContent('');
    
        console.log('Summary:', data.summary);
      } else {
        console.error('Failed to send text data.');
      }
    } catch (error) {
      console.error('There was an error sending the request:', error);
    }
  };

  return (
    <>
    <h1>Scribble.ai</h1>
    <p>
      <a
        href="javascript:void(0)"
        className="historybtn"
        onClick={handleNavigateHistory}
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
        }}>History Page &gt;
      </a>
    {/* <button onClick={handleNavigateHistory} style={{backgroundColor: '#f1f1f1', color: '#000000'}}>History</button> */}
    </p>
    <Sidebar history={chatHistory} />        
    <div id="block"> 
        <Container className="mt-5">
        <h2>Enter Your Notes or Summary</h2>
        <Form>
            <Form.Group className="mb-3" controlId="longFormText">
            <Form.Control
                as="textarea"
                // rows={8}
                style={{ height: '400px', width: '400px' }}
                placeholder="Type your summary here..."
                value={textContent}
                onChange={handleInputChange}
            />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
            Submit Text
            </Button>
        </Form>
        </Container>
        <Container className="mt-5">
        <Form>
            <Form.Group className="mb-3" controlId="longFormText">
            <Form.Control
                as="textarea"
                // rows={8}
                style={{ height: '400px', width: '400px' }}
                placeholder="..."
                value={summarizedText}
                readOnly
            />
            </Form.Group>
        </Form>
        </Container>
    </div>
    </>
  );
}

export default LongFormInput;