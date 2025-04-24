import React, { use, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './InputPage.css';   
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';


function LongFormInput() {
  const [textContent, setTextContent] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
//   const navigate = useNavigate();


  const handleInputChange = (event) => {
    setTextContent(event.target.value);
  };
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async () => {
    if (textContent === ""){
        return;
    }
    try {
      const response = await fetch('http://10.0.0.108:8000/summarize', {
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
        // navigate('/history', { state: { processedData: data } });
    
        console.log('Summary:', data.summary);
      } else {
        console.error('Failed to send text data.');
      }
    } catch (error) {
      console.error('There was an error sending the request:', error);
    }
  };

  return (
    <div>
        <Sidebar history={chatHistory} />
        {/* <BrowserRouter>
            <Routes>
                <Route path="/" element={<InputPage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </BrowserRouter> */}
        
    <div id="block"> 

        <Container className="mt-5">
        <h2>Enter Your Notes or Summary</h2>
        <Form>
            <Form.Group className="mb-3" controlId="longFormText">
            <Form.Control
                as="textarea"
                rows={8}
                style={{ height: '300px', width: '300px' }}
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
                rows={8}
                style={{ height: '400px', width: '400px' }}
                placeholder="..."
                value={summarizedText}
                readOnly
            />
            </Form.Group>
        </Form>
        </Container>
    </div>
    </div>
  );
}

export default LongFormInput;