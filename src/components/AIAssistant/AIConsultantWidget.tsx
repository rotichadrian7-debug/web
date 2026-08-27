import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Calendar, 
  ShoppingBag, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { CLINIC_IMAGES } from '../../data/clinicData';

interface AIConsultantWidgetProps {
  onOpenBooking: (treatmentId?: string) => void;
  onOpenQuiz: () => void;
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export const AIConsultantWidget: React.FC<AIConsultantWidgetProps> = ({
  onOpenBooking,
  onOpenQuiz,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome to ÉLAN Medical Aesthetics. I am your Virtual Aesthetic Concierge. How may I assist your skin transformation today? Ask me about our in-clinic laser & injectable procedures or our medical skincare boutique formulations.'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/skin-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          userMessage: text
        })
      });

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'For customized clinical advice, we recommend booking a 3D facial imaging consultation with Dr. Elena Vance or our senior nurse injectors in Beverly Hills, Manhattan, or London.'
        }
      ]);
      setLoading(false);
    }
  };

  const starterPills = [
    'How long is Morpheus8 downtime?',
    'Best treatment for stubborn melasma?',
    'Recommend a daily anti-aging regimen',
    'How to prep for Botox & Dermal Fillers?'
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black shadow-2xl shadow-[#C5A880]/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer group"
          aria-label="Open AI Aesthetic Concierge"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
            Aesthetic AI Concierge
          </span>
        </button>
      )}

      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[540px] bg-[#0D0F14] border border-[#C5A880]/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-[#141721] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={CLINIC_IMAGES.directorDoctor} 
                  alt="Dr. Elena Vance Concierge"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-[#C5A880]/50"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0D0F14]"></span>
              </div>
              <div>
                <h3 className="font-serif-luxury text-sm font-bold text-white">ÉLAN Aesthetic Concierge</h3>
                <p className="text-[10px] text-[#C5A880] font-mono">Dr. Vance's AI Skin Specialist</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                    m.role === 'user'
                      ? 'bg-[#C5A880] text-black font-medium rounded-tr-none'
                      : 'bg-[#141721] border border-white/10 text-slate-200 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shrink-0">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-[#141721] border border-white/10 text-xs text-slate-400 rounded-tl-none flex items-center gap-1.5">
                  <span>Consulting clinical formulary...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter Pills */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {starterPills.map((pill, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(pill)}
                  className="px-2.5 py-1 rounded-full text-[11px] bg-[#141721] hover:bg-[#C5A880]/20 border border-white/10 hover:border-[#C5A880]/30 text-slate-300 transition-colors text-left"
                >
                  {pill}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-[#141721] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about treatments, serums, downtime..."
              className="flex-1 bg-[#0D0F14] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] disabled:opacity-40 text-black flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
