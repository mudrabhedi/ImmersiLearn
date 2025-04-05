import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AiTutor = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI Tutor. Ask me anything about STEM subjects!", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await axios.post('/api/ask', {
        messages: [{ role: "user", content: input }]
      }, {
        timeout: 20000,
        headers: { 'Content-Type': 'application/json' }
      });

      setMessages(prev => [...prev, { 
        text: data?.answer || "I didn't understand that. Could you rephrase?", 
        sender: 'ai' 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I'm having trouble connecting. Please try again later.", 
        sender: 'ai',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Modern Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">ImmerseLearn</h1>
          <p className="text-blue-100 mt-1">AI Tutor - Ask me anything about STEM subjects</p>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : message.isError 
                  ? 'bg-red-100 text-red-800 border border-red-200' 
                  : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-none'}`}>
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                <div className="flex space-x-2 items-center text-blue-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 shadow-inner">
        <form 
          onSubmit={handleSubmit} 
          className="max-w-4xl mx-auto flex gap-3 items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about math, science, or coding..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`px-5 py-3 rounded-xl text-white font-medium transition-all ${
              isLoading || !input.trim() 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiTutor;