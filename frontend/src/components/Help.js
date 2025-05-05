import React, { useState, useRef, useEffect } from 'react';
import './Help.css';

function Help() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false); // New: Typing animation
  const chatBoxRef = useRef(null);

  // Toggle chat window visibility and reset on close
  const toggleChatWindow = () => {
    if (isChatOpen) {
      setChatMessages([]);
      setStep(0);
      setMessage("");
    } else {
      // Chat is being opened: greet the user
      setChatMessages([{ text: "Hello! I'm here to assist you with your health concerns.", isUser: false }]);
      setStep(0);
    }
    setIsChatOpen(!isChatOpen);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const userMessage = { text: message, isUser: true };
    setChatMessages(prevMessages => [...prevMessages, userMessage]);
    setMessage("");

    // Show typing animation
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const assistantReply = { text: getAssistantResponse(step), isUser: false };
      setChatMessages(prevMessages => [...prevMessages, assistantReply]);
      setStep(prevStep => prevStep + 1);
    }, 1500);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  const getAssistantResponse = (step) => {
    switch (step) {
      case 0:
        return "What health issue would you like help with? (e.g., Heart Disease, Brain Stroke)";
      case 1:
        return "Can you provide your age?";
      case 2:
        return "Do you have any family history of this condition?";
      case 3:
        return "Are you currently experiencing any symptoms like chest pain or shortness of breath?";
      case 4:
        return "Thank you for the information! Our team will analyze your data and suggest treatment steps.";
      default:
        return "Thank you for chatting with us! If you need further assistance, feel free to ask.";
    }
  };

  return (
    <div className="help-container">
      <h1>Need Help?</h1>
      <p className="subheading">Here’s how to use the Smart Healthcare Portal effectively:</p>

      <div className="step-cards">
        <div className="card">
          <h2>Step 1: Register / Login</h2>
          <p>Create an account or login to access your health dashboard.</p>
        </div>
        <div className="card">
          <h2>Step 2: Enter Health Details</h2>
          <p>Fill in your personal health data to get accurate predictions.</p>
        </div>
        <div className="card">
          <h2>Step 3: Predict Your Risk</h2>
          <p>Select Heart or Brain stroke prediction and get instant results.</p>
        </div>
        <div className="card">
          <h2>Step 4: View Results</h2>
          <p>Check your results and follow recommended steps and treatments.</p>
        </div>
        <div className="card">
          <h2>Step 5: Book Appointments</h2>
          <p>Book a consultation with a doctor directly through the portal.</p>
        </div>
      </div>

      <div className="contact-section">
        <h2>Still need help?</h2>
        <p>Reach out to us:</p>
        <ul>
          <li>Email: support@smarthealthcare.com</li>
          <li>Phone: +91 98765 43210</li>
        </ul>
        <p>Or chat with our assistant anytime via the chatbox in the corner!</p>
      </div>

      {/* Chat Toggle Button */}
      <button onClick={toggleChatWindow} className="chat-btn">
        {isChatOpen ? "Close Chat" : "Chat with Support"}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <button onClick={toggleChatWindow} className="close-chat-btn">X</button>
            <h3>Chat with Support</h3>
          </div>
          <div className="chat-box" ref={chatBoxRef}>
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.isUser ? 'user' : 'support'}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-message support typing-indicator">...</div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message..."
              autoFocus
            />
            <button onClick={handleSendMessage} disabled={!message.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Help;
