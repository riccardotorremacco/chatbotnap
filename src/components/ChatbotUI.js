import React, { useState, useRef, useEffect } from 'react';
import './ChatbotUI.css';

// Import delle icone per migliorare l'interfaccia
import { FaHome, FaUser, FaCalendar, FaBolt, FaBell, FaPaperPlane, FaPlus, FaPaperclip, FaMicrophone } from 'react-icons/fa';

const ChatbotUI = () => {
  // Stati per gestire messaggi, input e UI
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Tutti i servizi sono operativi. Richieste elaborate in tempo reale.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  // Riferimento per lo scrolling automatico
  const messagesEndRef = useRef(null);

  // Domande rapide preimpostate
  const quickQuestions = [
    "Come trovo il codice avviso?",
    "Dove verifico lo stato di pagamento?",
    "Posso ottenere una ricevuta?",
    "Come contatto l'assistenza?"
  ];

  // Effetto per lo scroll automatico quando arrivano nuovi messaggi
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Funzione per scrollare in basso
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

 // Gestione dell'invio messaggi
const handleSendMessage = (overrideText = null) => {
  const textToSend = overrideText || inputValue;
  if (textToSend.trim() === '') return;

  // Aggiungi il messaggio dell'utente
  const newUserMessage = { sender: 'user', text: textToSend };
  setMessages([...messages, newUserMessage]);
  setInputValue('');
  
  // Resto della funzione...;
    
    // Attiva l'indicatore di digitazione
    setIsTyping(true);

    // Simulazione risposta bot (qui integrerai con il backend Python)
    setTimeout(() => {
      let botResponse;
      
      // Logica per la risposta del bot (da sostituire con le chiamate API reali)
      if (inputValue.toLowerCase().includes('codice avviso')) {
        botResponse = { sender: 'bot', text: 'Il codice si trova sull\'avviso di pagamento ed è composto da 18 cifre.' };
      } else if (inputValue.toLowerCase().includes('ricevuta') || inputValue.toLowerCase().includes('codice fiscale')) {
        botResponse = { 
          sender: 'bot', 
          text: 'Ecco la ricevuta che stavi cercando:',
          isReceipt: true,
          receiptData: {
            codiceFiscale: 'PPAHSHBDOSNP839J',
            codiceAvviso: '193891485701AGJ384',
            importo: '127,35€',
            dataPagamento: '15/03/2023'
          }
        };
      } else {
        botResponse = { 
          sender: 'bot', 
          text: 'Posso aiutarti con informazioni sui pagamenti, ricevute e avvisi. Come posso esserti utile oggi?' 
        };
      }
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Gestione dell'invio tramite tasto Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

// Gestione click su domanda rapida
  const handleQuickQuestion = (question) => {
    setInputValue(question);
    // Invia automaticamente dopo la selezione
    handleSendMessage(question); // Passare direttamente la domanda
};

  // Pulizia della chat
    const handleNewChat = () => {
    setMessages([
      { sender: 'bot', text: 'Tutti i servizi sono operativi. Richieste elaborate in tempo reale.' }
    ]);
  };

  // Toggle della sidebar
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="chatbot-container">
      {/* Sidebar con tooltip e testo migliorato */}
      <div className={`sidebar ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div 
          className="sidebar-icon" 
          onClick={toggleSidebar}
          data-tooltip="Menu principale"
        >
          <FaHome size={20} />
          {sidebarExpanded && <span className="sidebar-icon-text">Home</span>}
        </div>
        <div 
          className="sidebar-icon"
          data-tooltip="Profilo utente" 
        >
          <FaUser size={20} />
          {sidebarExpanded && <span className="sidebar-icon-text">Profilo</span>}
        </div>
        <div 
          className="sidebar-icon" 
          data-tooltip="Calendario pagamenti"
        >
          <FaCalendar size={20} />
          {sidebarExpanded && <span className="sidebar-icon-text">Scadenze</span>}
        </div>
        <div 
          className="sidebar-icon" 
          data-tooltip="Azioni rapide"
        >
          <FaBolt size={20} />
          {sidebarExpanded && <span className="sidebar-icon-text">Azioni</span>}
        </div>
        <div 
          className="sidebar-icon" 
          data-tooltip="Notifiche"
        >
          <FaBell size={20} />
          {sidebarExpanded && <span className="sidebar-icon-text">Notifiche</span>}
        </div>
      </div>

      {/* Area principale della chat */}
      <div className="chat-area">
        {/* Header */}
        <div className="chat-header">
          <div className="header-logo">NAPL 1.0</div>
          <div className="header-icons">
            <div className="header-icon" data-tooltip="Statistiche">
              <FaHome size={18} />
            </div>
            <div className="header-icon" data-tooltip="Profilo">
              <FaUser size={18} />
            </div>
            <div className="header-icon" data-tooltip="Calendario">
              <FaCalendar size={18} />
            </div>
            <div className="header-icon" data-tooltip="Azioni">
              <FaBolt size={18} />
            </div>
            <div className="header-icon" data-tooltip="Notifiche">
              <FaBell size={18} />
            </div>
          </div>
        </div>

        {/* Container messaggi con stili migliorati */}
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index}>
              <div className="avatar-container">
                <div className={`avatar ${message.sender === 'bot' ? 'bot-avatar' : 'user-avatar'}`}>
                  {message.sender === 'bot' ? 'N' : 'U'}
                </div>
                <div>{message.sender === 'bot' ? 'NAPL' : 'User'}</div>
              </div>
              <div className={`message ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
                {message.text}
                
                {/* Rendering condizionale per le ricevute */}
                {message.isReceipt && message.receiptData && (
                  <div className="receipt-data" style={{marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
                    <div><strong>Codice fiscale:</strong> {message.receiptData.codiceFiscale}</div>
                    <div><strong>Codice di avviso:</strong> {message.receiptData.codiceAvviso}</div>
                    <div><strong>Importo:</strong> {message.receiptData.importo}</div>
                    <div><strong>Data pagamento:</strong> {message.receiptData.dataPagamento}</div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Indicatore di digitazione migliorato */}
          {isTyping && (
            <div className="avatar-container">
              <div className="avatar bot-avatar">N</div>
              <div>NAPL</div>
            </div>
          )}
          {isTyping && (
            <div className="message bot-message typing-indicator">
              <div className="typing-bubble"></div>
              <div className="typing-bubble"></div>
              <div className="typing-bubble"></div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Pulsanti per domande rapide */}
        <div className="quick-buttons">
          {quickQuestions.map((question, index) => (
            <button 
              key={index} 
              className="quick-button"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>

        {/* Area input con placeholder */}
        <div className="input-container">
          <button className="attach-button" style={{background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px'}}>
            <FaPaperclip size={20} color="#666" />
          </button>
          
          <input
            type="text"
            className="message-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Chiedi a Napl..."
            aria-label="Messaggio"
          />
          
          <button className="send-button" onClick={handleSendMessage} aria-label="Invia messaggio">
            <FaPaperPlane size={16} />
          </button>
        </div>

        
        {/* Pulsante per nuova conversazione */}
        <button className="new-chat-button" onClick={handleNewChat} aria-label="Nuova conversazione">
          <FaPlus size={20} />
          <span className="new-chat-text">Nuova chat</span>
        </button>

        {/* Footer */}
        <div className="chat-footer">
          NAPL 1.0 - © 2025 Municipality Service System - Versione 1.0.5
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;