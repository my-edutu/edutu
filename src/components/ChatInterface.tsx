import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, ExternalLink, Users, MessageSquare, Sparkles, Zap, Brain, Mic, MicOff, Paperclip, MoreHorizontal } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import { useDarkMode } from '../hooks/useDarkMode';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  buttons?: Array<{
    text: string;
    type: 'scholarship' | 'community' | 'expert' | 'link';
    data?: any;
  }>;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  user: { name: string; age: number } | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi ${user?.name || 'there'}! 👋 I'm Edutu, your AI opportunity coach. I'm here to help you discover amazing opportunities and guide you toward your goals. What would you like to explore today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();

  const quickPrompts = [
    { text: "Help me find scholarships", icon: "🎓" },
    { text: "Career guidance", icon: "💼" },
    { text: "Skills to develop", icon: "🚀" },
    { text: "Networking tips", icon: "🤝" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        buttons: botResponse.buttons
      };
      
      setMessages(prev => prev.filter(m => !m.isTyping).concat([botMessage]));
      setIsTyping(false);
    }, 2000);
  };

  const generateBotResponse = (userInput: string): { content: string; buttons?: Array<{ text: string; type: 'scholarship' | 'community' | 'expert' | 'link'; data?: any }> } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('scholarship')) {
      return {
        content: "🎓 Excellent! I've found some amazing scholarship opportunities that match your profile:\n\n• **Mastercard Foundation Scholars Program** - Full funding for African students with leadership potential\n• **AAUW International Fellowships** - Supporting women in graduate studies worldwide\n• **Mandela Rhodes Scholarships** - Comprehensive leadership development in Africa\n• **Local university merit scholarships** - Institution-specific opportunities\n\nI can help you create a personalized application strategy. What type of scholarship interests you most?",
        buttons: [
          { text: "🎯 View Mastercard Foundation", type: "scholarship", data: { id: "1", title: "Mastercard Foundation Scholars Program" } },
          { text: "👩‍🎓 AAUW Fellowship Details", type: "scholarship", data: { id: "2", title: "AAUW International Fellowships" } },
          { text: "🤝 Join Scholarship Community", type: "community" },
          { text: "💬 Talk to Expert", type: "expert" }
        ]
      };
    }
    
    if (input.includes('career')) {
      return {
        content: "🚀 Let's explore your career path! Based on current trends in Africa and global opportunities, here are some high-growth fields:\n\n• **Technology & Software Development** - High demand, remote-friendly, excellent growth\n• **Digital Marketing & E-commerce** - Booming with Africa's digital transformation\n• **Renewable Energy & Sustainability** - Critical for Africa's future development\n• **Healthcare & Telemedicine** - Essential services with growing demand\n• **Financial Technology (FinTech)** - Revolutionary banking and payment solutions\n\nWhich field sparks your interest? I can create a detailed roadmap for you!",
        buttons: [
          { text: "💻 Tech Career Path", type: "link", data: { url: "#tech-career" } },
          { text: "🌱 Sustainability Careers", type: "link", data: { url: "#sustainability" } },
          { text: "🏥 Healthcare Opportunities", type: "link", data: { url: "#healthcare" } },
          { text: "🤝 Join Career Community", type: "community" }
        ]
      };
    }
    
    if (input.includes('skill')) {
      return {
        content: "💪 Building the right skills is your gateway to success! Here are the most in-demand skills for young African professionals:\n\n• **Digital & Technical Skills** - Python, JavaScript, data analysis, AI/ML basics\n• **Communication & Leadership** - Public speaking, writing, team management\n• **Critical Thinking & Problem-Solving** - Analytical thinking, creative solutions\n• **Project Management** - Agile methodologies, organization, planning\n• **Languages & Cultural Intelligence** - English, French, local languages, global awareness\n\nWhich skill area would you like to focus on first? I'll create a learning plan for you!",
        buttons: [
          { text: "🐍 Start Python Journey", type: "link", data: { url: "#python-path" } },
          { text: "🗣️ Communication Skills", type: "link", data: { url: "#communication" } },
          { text: "📊 Data Analysis Track", type: "link", data: { url: "#data-analysis" } },
          { text: "🎯 Talk to Skills Expert", type: "expert" }
        ]
      };
    }
    
    return {
      content: `That's a fantastic question, ${user?.name}! 🌟 I'm here to be your personal opportunity coach and help you navigate your journey to success. Whether you're looking for:\n\n✨ **Educational opportunities** - Scholarships, courses, certifications\n🚀 **Career development** - Job opportunities, skill building, networking\n🎯 **Personal growth** - Goal setting, mentorship, community building\n\nI can provide personalized guidance, create roadmaps, and connect you with the right resources. What specific area would you like to explore together?`,
      buttons: [
        { text: "🎓 Find Opportunities", type: "link", data: { url: "#opportunities" } },
        { text: "🤝 Join Community", type: "community" },
        { text: "💬 Talk to Expert", type: "expert" },
        { text: "🎯 Set Goals", type: "link", data: { url: "#goals" } }
      ]
    };
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleButtonClick = (button: { text: string; type: 'scholarship' | 'community' | 'expert' | 'link'; data?: any }) => {
    switch (button.type) {
      case 'scholarship':
        console.log('Navigate to scholarship:', button.data);
        break;
      case 'community':
        console.log('Navigate to community');
        break;
      case 'expert':
        console.log('Connect with expert');
        break;
      case 'link':
        console.log('Navigate to:', button.data?.url);
        break;
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic here
  };

  return (
    <div className={`flex flex-col h-screen max-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
              </div>
              <div>
                <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
                  Edutu AI Coach
                  <Sparkles size={16} className="text-primary animate-pulse" />
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-1`}>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Online • Ready to help
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className={`p-2 rounded-xl ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                <MoreHorizontal size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                message.type === 'user' 
                  ? `${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}` 
                  : 'bg-gradient-to-br from-primary to-accent'
              }`}>
                {message.type === 'user' ? (
                  <User size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                ) : (
                  <Bot size={18} className="text-white" />
                )}
              </div>

              {/* Message Content */}
              <div className={`${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`px-5 py-4 rounded-2xl shadow-sm ${
                  message.type === 'user' 
                    ? 'bg-primary text-white rounded-br-md' 
                    : `${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} border rounded-bl-md`
                }`}>
                  {message.isTyping ? (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Edutu is thinking...</span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
                  )}
                </div>
                
                {/* Action Buttons */}
                {message.buttons && message.buttons.length > 0 && !message.isTyping && (
                  <div className="mt-4 space-y-2">
                    {message.buttons.map((button, index) => (
                      <button
                        key={index}
                        onClick={() => handleButtonClick(button)}
                        className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all hover:scale-105 mr-2 mb-2 shadow-sm ${
                          button.type === 'scholarship' 
                            ? `${isDarkMode ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border border-blue-800' : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'}`
                            : button.type === 'community'
                            ? `${isDarkMode ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50 border border-green-800' : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'}`
                            : button.type === 'expert'
                            ? `${isDarkMode ? 'bg-purple-900/30 text-purple-400 hover:bg-purple-900/50 border border-purple-800' : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'}`
                            : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'}`
                        }`}
                      >
                        {button.type === 'scholarship' && <ExternalLink size={14} />}
                        {button.type === 'community' && <Users size={14} />}
                        {button.type === 'expert' && <MessageSquare size={14} />}
                        {button.type === 'link' && <ExternalLink size={14} />}
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mt-2`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Quick Prompts for First Message */}
        {messages.length === 1 && (
          <div className="space-y-4 animate-slide-up">
            <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              <Lightbulb size={16} />
              <span className="text-sm font-medium">Try asking about:</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className={`p-4 text-left ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'} border rounded-2xl transition-all hover:scale-105 shadow-sm group`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{prompt.icon}</span>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'} group-hover:text-primary transition-colors`}>
                      {prompt.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className={`fixed bottom-20 left-0 right-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t shadow-lg`}>
        <div className="p-4">
          <div className="flex gap-3 max-w-4xl mx-auto">
            {/* Attachment Button */}
            <button className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-colors`}>
              <Paperclip size={20} />
            </button>

            {/* Input Field */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about opportunities, goals, or career advice..."
                className={`w-full px-5 py-4 rounded-2xl border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-200 bg-white text-gray-800 placeholder-gray-500'} focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm`}
              />
              {input && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Voice Button */}
            <button 
              onClick={toggleRecording}
              className={`p-3 rounded-2xl transition-all ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                  : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`
              }`}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </Button>
          </div>

          {/* Voice Recording Indicator */}
          {isRecording && (
            <div className="flex items-center justify-center gap-2 mt-3 text-red-500 animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">Recording... Tap to stop</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;