import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Chào em! Tôi là trợ lý AI, sẵn sàng giúp em học toán. Em có thắc mắc gì không?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'user' as const
      };
      setMessages([...messages, newMessage]);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: getBotResponse(inputValue),
          sender: 'bot' as const
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);

      setInputValue('');
    }
  };

  const getBotResponse = (input: string) => {
    const responses = [
      'Câu hỏi thú vị! Hãy thử phân tích từng bước một cách cẩn thận nhé.',
      'Tốt lắm! Để giải bài này, em có thể áp dụng quy tắc mà cô đã dạy.',
      'Đừng lo lắng! Toán học chỉ cần kiên nhẫn và luyện tập thôi.',
      'Em có thể vẽ hình hoặc lập bảng để dễ hình dung hơn đấy!',
      'Rất hay! Cách tư duy của em đang đi đúng hướng rồi.',
      'Hãy thử chia nhỏ bài toán thành những phần đơn giản hơn nhé!'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed ${isFullscreen ? 'inset-0' : 'bottom-6 right-6 w-96 h-[500px]'} bg-white rounded-lg shadow-2xl border z-50 flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6" />
          <h3 className="font-semibold">Trợ lý AI</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleFullscreen}
            className="p-1 hover:bg-white/20 rounded"
          >
            {isFullscreen ? '📱' : '🔍'}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Nhập câu hỏi của em..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;