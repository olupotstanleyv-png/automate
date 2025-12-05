
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PRODUCTS, MOCK_FLEET } from './data';

// --- TYPES ---
type FlowType = 'MAIN' | 'INVENTORY' | 'EMI' | 'TEST_DRIVE' | 'ASSISTANT' | 'SERVICE' | 'PAYMENT' | 'AGENT' | 'AI_CHAT';

interface Message {
  role: 'user' | 'model' | 'system';
  text: string;
  type?: 'text' | 'image' | 'options' | 'payment_request' | 'payment_success';
  options?: string[];
  image?: string;
  amount?: number;
  meta?: any;
}

interface UserSession {
  name?: string;
  phone?: string;
  city?: string;
  selectedModel?: string;
  budget?: number;
  serviceType?: string;
  date?: string;
  flowData: any;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Hello 👋 Welcome to Car Automate Inc.\nI'm your virtual assistant.\n\nHow can I help you today?",
      type: 'options',
      options: [
        "1. Browse Inventory 🚗",
        "2. Price & EMI 💰",
        "3. Book Test Drive 🏎️",
        "4. Shopping Assistant 🤖",
        "5. Service & Maintenance 🔧",
        "6. Make Payment 💳",
        "7. Live Agent 👨‍💼"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<FlowType>('MAIN');
  const [step, setStep] = useState(0);
  const [session, setSession] = useState<UserSession>({ flowData: {} });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  // --- HELPER: SIMULATE CRM SAVE ---
  const saveToCRM = (type: string, data: any) => {
    console.log(`[CRM SYNC] New ${type} captured:`, {
      timestamp: new Date().toISOString(),
      source: 'WhatsApp_Bot',
      ...data
    });
  };

  // --- CORE ENGINE ---
  const handleSend = async (textOverride?: string) => {
    const userText = textOverride || input;
    if (!userText.trim()) return;

    // Add User Message
    const newMsg: Message = { role: 'user', text: userText };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsLoading(true);

    // Global Reset Command
    if (userText.toLowerCase() === 'menu' || userText === '0' || userText.toLowerCase() === 'restart') {
      setTimeout(() => resetFlow(), 600);
      return;
    }

    // Process based on Flow
    setTimeout(() => {
      processFlow(userText);
    }, 800); // Simulate network delay
  };

  const resetFlow = () => {
    setCurrentFlow('MAIN');
    setStep(0);
    setSession({ flowData: {} });
    setIsLoading(false);
    setMessages(prev => [...prev, {
      role: 'model',
      text: "Main Menu 🏠\nHow can I help you?",
      type: 'options',
      options: [
        "1. Browse Inventory 🚗",
        "2. Price & EMI 💰",
        "3. Book Test Drive 🏎️",
        "4. Shopping Assistant 🤖",
        "5. Service & Maintenance 🔧",
        "6. Make Payment 💳",
        "7. Live Agent 👨‍💼"
      ]
    }]);
  };

  // --- WORKFLOW LOGIC ---
  const processFlow = async (text: string) => {
    const lowerText = text.toLowerCase();

    // 1. MAIN MENU SELECTION
    if (currentFlow === 'MAIN') {
      if (text.includes('1') || lowerText.includes('browse') || lowerText.includes('inventory')) {
        setCurrentFlow('INVENTORY');
        setStep(1);
        addBotMessage("Choose a category:", ['SUV', 'Sedan', 'Sports', 'Electric']);
      } else if (text.includes('2') || lowerText.includes('price') || lowerText.includes('emi')) {
        setCurrentFlow('EMI');
        setStep(1);
        addBotMessage("Which model are you interested in for the price/EMI check?", PRODUCTS.slice(0, 3).map(p => p.name));
      } else if (text.includes('3') || lowerText.includes('test')) {
        setCurrentFlow('TEST_DRIVE');
        setStep(1);
        addBotMessage("Great! Which car would you like to test drive?", PRODUCTS.slice(0, 3).map(p => p.name));
      } else if (text.includes('4') || lowerText.includes('assistant')) {
        setCurrentFlow('ASSISTANT');
        setStep(1);
        addBotMessage("I can help you find the perfect car. First, what is your approximate budget? (e.g. $50k, $100k)");
      } else if (text.includes('5') || lowerText.includes('service')) {
        setCurrentFlow('SERVICE');
        setStep(1);
        addBotMessage("Please enter your Vehicle Registration Number (or VIN) to start.");
      } else if (text.includes('6') || lowerText.includes('payment')) {
        setCurrentFlow('PAYMENT');
        setStep(1);
        addBotMessage("What type of payment is this?", ["Booking Token ($100)", "Full Booking", "Service Bill", "Accessories"]);
      } else if (text.includes('7') || lowerText.includes('agent')) {
        setCurrentFlow('AGENT');
        addBotMessage("Connecting you to a live sales advisor... 👨‍💻\n\nSomeone will be with you shortly. You can keep typing to leave a message.");
        saveToCRM('AGENT_REQUEST', { transcript: messages });
      } else {
        // Fallback to AI if no number matched in Main Menu
        await runGeminiAI(text);
      }
      setIsLoading(false);
      return;
    }

    // 2. INVENTORY WORKFLOW
    if (currentFlow === 'INVENTORY') {
      if (step === 1) {
        // Category Selected -> Show Models
        const category = text; // e.g., SUV
        const models = PRODUCTS.filter(p => p.category.toLowerCase().includes(category.toLowerCase()) || p.category === 'cars');
        // Fallback if strict category match fails, just show all top cars
        const displayModels = models.length > 0 ? models : PRODUCTS;
        
        setSession(prev => ({ ...prev, flowData: { ...prev.flowData, category } }));
        setStep(2);
        
        const options = displayModels.map(p => p.name).slice(0, 4);
        addBotMessage(`Here are some available ${category}s:\n` + displayModels.map(p => `• ${p.name} - $${p.price.toLocaleString()}`).join('\n'), options);
      } else if (step === 2) {
        // Model Selected -> Show Details
        const modelName = text;
        const car = PRODUCTS.find(p => p.name.toLowerCase().includes(modelName.toLowerCase())) || PRODUCTS[0];
        setSession(prev => ({ ...prev, selectedModel: car.name }));
        
        addBotMessage(`*${car.name}*\n\nPrice: $${car.price.toLocaleString()}\nRating: ${car.rating} ⭐\n\n${car.description}`, 
          ["Book Test Drive", "Check EMI", "Main Menu"], 
          car.image
        );
        setStep(3);
      } else if (step === 3) {
        if (text.includes('Test')) {
          setCurrentFlow('TEST_DRIVE');
          setStep(2); // Skip model selection
          addBotMessage("Okay! What is your full name?");
        } else if (text.includes('EMI')) {
          setCurrentFlow('EMI');
          setStep(2); // Skip model selection
          addBotMessage(`Calculating EMI for ${session.selectedModel}. What is your planned Down Payment?`);
        } else {
          resetFlow();
        }
      }
      setIsLoading(false);
      return;
    }

    // 3. EMI WORKFLOW
    if (currentFlow === 'EMI') {
      if (step === 1) {
        setSession(prev => ({ ...prev, selectedModel: text }));
        setStep(2);
        addBotMessage("What is your planned Down Payment amount? (e.g. 5000)");
      } else if (step === 2) {
        const dp = parseInt(text.replace(/[^0-9]/g, '')) || 0;
        setSession(prev => ({ ...prev, flowData: { ...prev.flowData, dp } }));
        setStep(3);
        addBotMessage("Select Loan Tenure:", ["36 Months", "48 Months", "60 Months"]);
      } else if (step === 3) {
        const tenure = parseInt(text) || 60;
        const car = PRODUCTS.find(p => p.name === session.selectedModel) || PRODUCTS[3];
        const principal = car.price - (session.flowData.dp || 0);
        const rate = 5.5; // 5.5% interest
        const interest = (principal * (rate * 0.01)) * (tenure / 12);
        const totalAmount = principal + interest;
        const emi = Math.round(totalAmount / tenure);

        addBotMessage(`💰 *EMI Estimate for ${session.selectedModel}*\n\nLoan Amount: $${principal.toLocaleString()}\nTenure: ${tenure} Months\nInterest: ${rate}%\n\n*Monthly EMI: ~$${emi.toLocaleString()}*`, ["Book Test Drive", "Main Menu"]);
        setStep(4);
      } else if (step === 4) {
        if(text.includes("Test")) {
          setCurrentFlow('TEST_DRIVE');
          setStep(2);
          addBotMessage("Okay! What is your full name?");
        } else {
          resetFlow();
        }
      }
      setIsLoading(false);
      return;
    }

    // 4. TEST DRIVE WORKFLOW
    if (currentFlow === 'TEST_DRIVE') {
      if (step === 1) {
        setSession(prev => ({ ...prev, selectedModel: text }));
        setStep(2);
        addBotMessage("May I have your full name?");
      } else if (step === 2) {
        setSession(prev => ({ ...prev, name: text }));
        setStep(3);
        addBotMessage("Please pick a preferred date (DD/MM):");
      } else if (step === 3) {
        setSession(prev => ({ ...prev, date: text }));
        setStep(4);
        addBotMessage("Preferred location?", ["Showroom Visit", "Home Test Drive"]);
      } else if (step === 4) {
        const location = text;
        const finalData = { ...session, location };
        saveToCRM('TEST_DRIVE_LEAD', finalData);
        
        addBotMessage(`✅ *Test Drive Confirmed!*\n\nCar: ${session.selectedModel}\nName: ${session.name}\nDate: ${session.date}\nType: ${location}\n\nOur sales team has been notified. Would you like to pay a token amount ($99) to secure a priority slot?`, ["Pay Token Now", "No, Thanks"]);
        setStep(5);
      } else if (step === 5) {
        if (text.includes("Pay")) {
          setCurrentFlow('PAYMENT');
          processFlow("Booking Token"); // Jump to payment
        } else {
          resetFlow();
        }
      }
      setIsLoading(false);
      return;
    }

    // 5. SERVICE WORKFLOW
    if (currentFlow === 'SERVICE') {
        if (step === 1) {
            setSession(prev => ({ ...prev, flowData: { regNo: text }}));
            setStep(2);
            addBotMessage("Select Service Type:", ["General Service", "Oil Change", "Repair/Body Work", "Emergency"]);
        } else if (step === 2) {
            setSession(prev => ({ ...prev, serviceType: text }));
            setStep(3);
            addBotMessage("Pickup or Drop-off?", ["Drop at Workshop", "Doorstep Pickup"]);
        } else if (step === 3) {
            setSession(prev => ({ ...prev, flowData: { ...prev.flowData, type: text }}));
            setStep(4);
            addBotMessage("Preferred Date & Time?");
        } else if (step === 4) {
            saveToCRM('SERVICE_REQUEST', { ...session, date: text });
            addBotMessage(`🛠️ *Service Request Logged*\n\nReg: ${session.flowData.regNo}\nType: ${session.serviceType}\nDate: ${text}\n\nA service advisor will call you shortly to confirm.`, ["Main Menu"]);
            setCurrentFlow('MAIN');
            setStep(0);
        }
        setIsLoading(false);
        return;
    }

    // 6. PAYMENT WORKFLOW
    if (currentFlow === 'PAYMENT') {
        if (step === 1) {
            let amount = 0;
            if (text.includes("Token")) amount = 100;
            else if (text.includes("Booking")) amount = 5000;
            else if (text.includes("Service")) amount = 250;
            else amount = 50;

            setSession(prev => ({ ...prev, flowData: { paymentType: text, amount }}));
            
            setMessages(prev => [...prev, {
                role: 'model',
                text: `Payment Request: ${text}`,
                type: 'payment_request',
                amount: amount,
                meta: { id: `PAY-${Date.now()}` }
            }]);
            setStep(2);
        } else if (step === 2) {
             // Handle "Paid" simulation
             if (text === 'PAID_SUCCESS') {
                 addBotMessage(`✅ Payment of $${session.flowData.amount} received successfully! Receipt #${Math.floor(Math.random()*100000)} generated.`, ["Main Menu"]);
                 saveToCRM('PAYMENT_SUCCESS', session.flowData);
                 setStep(0);
                 setCurrentFlow('MAIN');
             }
        }
        setIsLoading(false);
        return;
    }

    // 7. ASSISTANT & FALLBACK (AI)
    if (currentFlow === 'ASSISTANT' || currentFlow === 'AI_CHAT') {
      await runGeminiAI(text);
      setIsLoading(false);
    }
  };

  // --- GEMINI AI INTEGRATION ---
  const runGeminiAI = async (userMsg: string) => {
    try {
      if (!process.env.API_KEY) {
        addBotMessage("AI Service Unavailable. Please configure API_KEY.");
        return;
      }
      const model = new GoogleGenerativeAI({process.env.API_KEY });
    
      const systemPrompt = `You are the smart assistant for Car Automate Inc.
      Context: User is likely looking for a car, service, or parts.
      Inventory: ${JSON.stringify(PRODUCTS.map(p => ({ name: p.name, price: p.price, cat: p.category })))}
      
      Rules:
      1. If user asks for car suggestions, recommend from inventory based on budget.
      2. Keep answers short (WhatsApp style).
      3. If they want to book, suggest typing "Menu" to use the booking system.
      `;

      const chat = ai.chats.create({
        model: 'gemini-1.5-flash',
        config: { systemInstruction: systemPrompt },
        history: [{ role: 'model', parts: [{ text: "Hello! I am the Car Automate assistant." }] }]
      });

      const result = await chat.sendMessage({ message: userMsg });
      addBotMessage(result.text);
    } catch (e) {
      addBotMessage("I'm having trouble connecting to the AI. Please try the Menu options.", ["Main Menu"]);
    }
  };

  const addBotMessage = (text: string, options?: string[], image?: string) => {
    setMessages(prev => [...prev, { role: 'model', text, type: options ? 'options' : image ? 'image' : 'text', options, image }]);
  };

  const handlePaymentClick = () => {
      // Simulate Payment Gateway Popup
      setTimeout(() => {
          processFlow('PAID_SUCCESS');
      }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-2xl"></i>
        ) : (
            <div className="relative">
                <i className="fa-brands fa-whatsapp text-3xl"></i>
                <span className="absolute -top-2 -right-2 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-50 w-[90vw] md:w-[400px] h-[600px] bg-[#0b141a] rounded-xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden animate-fade-in-up font-sans">
          
          {/* Header */}
          <div className="bg-[#202c33] p-3 flex items-center gap-3 border-b border-gray-700">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-gray-600">
               <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-full h-full object-cover p-1" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-100 font-bold text-base flex items-center gap-1">
                  Car Automate 
                  <i className="fa-solid fa-circle-check text-green-500 text-xs"></i>
              </h3>
              <p className="text-gray-400 text-xs truncate">Business Account • Typically replies instantly</p>
            </div>
            <div className="flex gap-4 text-gray-400 pr-2">
                <i className="fa-solid fa-video cursor-pointer hover:text-white"></i>
                <i className="fa-solid fa-phone cursor-pointer hover:text-white"></i>
                <i className="fa-solid fa-ellipsis-vertical cursor-pointer hover:text-white"></i>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative bg-[#0b141a]">
             {/* WhatsApp Doodle Background */}
             <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
                  style={{backgroundImage: "url('https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png')", backgroundSize: '400px'}}>
             </div>

             {/* Encryption Notice */}
             <div className="flex justify-center mb-4 relative z-10">
                 <div className="bg-[#182229] text-[#8696a0] text-[10px] px-3 py-1.5 rounded-lg shadow-sm text-center max-w-[80%]">
                     <i className="fa-solid fa-lock text-[8px] mr-1"></i> Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
                 </div>
             </div>

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
                
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-lg p-2 text-sm shadow-sm relative ${
                    msg.role === 'user'
                      ? 'bg-[#005c4b] text-white rounded-tr-none' // WhatsApp Green
                      : 'bg-[#202c33] text-gray-100 rounded-tl-none' // WhatsApp Dark Mode Gray
                  }`}
                >
                  {/* Image Type */}
                  {msg.image && (
                      <div className="mb-2 rounded-lg overflow-hidden">
                          <img src={msg.image} alt="content" className="w-full h-auto object-cover" />
                      </div>
                  )}

                  {/* Text Content */}
                  <div className="whitespace-pre-wrap leading-relaxed px-1">
                      {msg.text}
                  </div>

                  {/* Payment Request Type */}
                  {msg.type === 'payment_request' && (
                      <div className="mt-3 bg-[#182229] rounded p-3 border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-400 text-xs">Total Amount</span>
                              <span className="text-green-400 font-bold">${msg.amount}</span>
                          </div>
                          <button 
                            onClick={handlePaymentClick}
                            className="w-full bg-[#00a884] hover:bg-[#008f6f] text-black font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors"
                          >
                              <i className="fa-brands fa-whatsapp"></i> Pay Now
                          </button>
                      </div>
                  )}

                  {/* Timestamp */}
                  <div className={`text-[10px] text-right mt-1 flex justify-end items-center gap-1 ${msg.role === 'user' ? 'text-green-200' : 'text-gray-400'}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {msg.role === 'user' && <i className="fa-solid fa-check-double text-blue-400"></i>}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start relative z-10">
                <div className="bg-[#202c33] rounded-lg p-3 rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Options / Quick Replies (Fixed at bottom above input) */}
          {messages[messages.length - 1]?.role === 'model' && messages[messages.length - 1]?.options && !isLoading && (
              <div className="bg-[#0b141a] p-2 flex gap-2 overflow-x-auto border-t border-gray-800 custom-scrollbar">
                  {messages[messages.length - 1].options?.map((opt, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSend(opt)}
                        className="whitespace-nowrap bg-[#202c33] text-[#00a884] border border-[#2a3942] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#2a3942] transition-colors flex-shrink-0"
                      >
                          {opt}
                      </button>
                  ))}
              </div>
          )}

          {/* Input Area */}
          <div className="p-2 bg-[#202c33] flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-200 p-2"><i className="fa-solid fa-plus"></i></button>
            <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center px-4 py-2">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message"
                className="bg-transparent text-gray-100 text-sm w-full focus:outline-none placeholder-gray-400"
                />
            </div>
            {input.trim() ? (
                <button
                onClick={() => handleSend()}
                className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center text-white shadow-md transform active:scale-95 transition-all"
                >
                <i className="fa-solid fa-paper-plane"></i>
                </button>
            ) : (
                <button className="w-10 h-10 flex items-center justify-center text-gray-400">
                    <i className="fa-solid fa-microphone"></i>
                </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
