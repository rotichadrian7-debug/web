import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, ArrowUpRight, Cpu } from 'lucide-react';
import { ChatMessage } from '../../types';

interface AIAssistantWidgetProps {
  onOpenBookingModal: () => void;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({ onOpenBookingModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I am Nexus AI\'s Systems Architect Assistant. I can evaluate your business sales pipeline, explain our 6 core AI revenue systems, or help calculate your ROI. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: currentInput,
          messages: messages.map(m => ({ role: m.sender, content: m.text }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply || 'I am ready to help you architect an automated AI sales pipeline.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botReply]);
      } else {
        throw new Error('Chat route returned error');
      }
    } catch (err) {
      console.error(err);
      const fallbackReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'I can analyze your lead qualification needs and calculate expected revenue growth. Would you like to schedule a 15-minute Strategy Session with our lead Systems Architect?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl shadow-blue-600/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
          aria-label="Open AI Architect Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#050816]"></span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] glass-panel rounded-2xl border border-blue-500/30 shadow-2xl overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom duration-300">
          
          {/* Header */}
          <div className="bg-[#080D1A] p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-heading font-bold text-white">Nexus Architect AI</h4>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Gemini 3.6 Real-Time Model
                </div>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#050816]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed font-sans ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-[#0B1120] text-slate-200 border border-slate-800 rounded-tl-none font-mono'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Gemini is analyzing architecture...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-[#070C1B] border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
            <button
              onClick={() => { setInput('How does AI Lead Qualification work?'); }}
              className="px-2.5 py-1 bg-[#0B1120] text-slate-300 hover:text-white border border-slate-800 rounded-full whitespace-nowrap"
            >
              Lead Qualification
            </button>
            <button
              onClick={() => { setInput('What is the cost & deployment timeline?'); }}
              className="px-2.5 py-1 bg-[#0B1120] text-slate-300 hover:text-white border border-slate-800 rounded-full whitespace-nowrap"
            >
              Pricing & Time
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBookingModal();
              }}
              className="px-2.5 py-1 bg-blue-600/30 text-blue-300 border border-blue-500/40 rounded-full whitespace-nowrap font-bold"
            >
              Book Call
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#080D1A] border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about AI revenue systems..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#0B1120] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl disabled:opacity-40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
