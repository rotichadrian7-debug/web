import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Calendar, 
  ShoppingBag, 
  RefreshCw, 
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkle,
  Check,
  Info
} from 'lucide-react';
import { CLINIC_IMAGES, PRODUCTS, TREATMENTS, DOCTORS } from '../../data/clinicData';
import { Product, Treatment } from '../../types';

interface SuggestedAction {
  label: string;
  type: 'treatment' | 'product' | 'book' | 'quiz';
  targetId?: string;
  doctorId?: string;
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
  suggestedActions?: SuggestedAction[];
  timestamp?: string;
}

interface AIConsultantWidgetProps {
  onOpenBooking: (treatmentId?: string, doctorId?: string) => void;
  onOpenQuiz: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectTreatment?: (treatment: Treatment) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
}

const STARTER_PROMPTS = [
  { text: 'How long is Morpheus8 downtime & when are results visible?', category: 'Lasers & RF' },
  { text: 'Which treatment is best for stubborn melasma & sun spots?', category: 'Pigmentation' },
  { text: 'Recommend a morning and evening Glass Skin regimen', category: 'Skincare' },
  { text: 'How to prepare for Botox & Dermal Fillers to prevent bruising?', category: 'Injectables' },
  { text: 'Is Sculptra or Hyaluronic Acid filler better for volume loss?', category: 'Anti-Aging' }
];

const SKIN_TYPES = ['Combination', 'Dry', 'Oily', 'Sensitive', 'Normal'];
const MAIN_CONCERNS = ['Fine Lines', 'Melasma/Sun Spots', 'Acne Scars', 'Loss of Firmness', 'Large Pores', 'Redness/Rosacea'];

export const AIConsultantWidget: React.FC<AIConsultantWidgetProps> = ({
  onOpenBooking,
  onOpenQuiz,
  onSelectProduct,
  onSelectTreatment,
  onAddToCart,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Client Skin Profile State
  const [skinProfile, setSkinProfile] = useState<{
    skinType: string;
    concerns: string[];
  }>({
    skinType: 'Combination',
    concerns: ['Fine Lines', 'Melasma/Sun Spots']
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to **ÉLAN Medical Aesthetics**. I am your Virtual Aesthetic Concierge, trained on Dr. Elena Vance's clinical protocols.\n\nHow may I guide your skin transformation today? Ask about our in-clinic injectables & lasers, downtime protocols, or physician-formulated skincare.",
      suggestedActions: [
        { label: 'Book Clinical Consultation', type: 'book', targetId: 'hydrafacial-md-deluxe' },
        { label: 'Explore Skincare Boutique', type: 'product', targetId: 'elan-c-radiance-ferulic-serum' },
        { label: 'Take 60-Sec Skin Quiz', type: 'quiz' }
      ],
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading]);

  // Check speech synthesis and recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        setSpeechSupported(true);
      }
      
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setMicSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInput(transcript);
            setIsListening(false);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Text to Speech playback
  const speakText = useCallback((text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Strip markdown asterisks and hashtags for clean speech
      const cleaned = text.replace(/[*#_`]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis error:', e);
    }
  }, [speechEnabled]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages: Message[] = [
      ...messages, 
      { role: 'user', content: text, timestamp: timeStr }
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/skin-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.slice(-6), // Send recent context
          userMessage: text,
          skinProfile
        })
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply || "For personalized clinical guidance, our medical team is available for in-person consultations.",
        suggestedActions: data.suggestedActions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages([...newMessages, assistantMessage]);
      setLoading(false);

      if (speechEnabled) {
        speakText(assistantMessage.content);
      }
    } catch (err) {
      console.error(err);
      const fallbackReply = "Our medical director Dr. Elena Vance recommends scheduling a 3D facial imaging consultation in Beverly Hills, Manhattan, or London Mayfair for precision treatment planning.\n\nIn the meantime, our **C-Radiance 15% Ferulic Serum** and **Hydrafacial MD®** protocol provide an immediate luminous transformation.";
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: fallbackReply,
          suggestedActions: [
            { label: 'Book Clinical Consultation', type: 'book' },
            { label: 'Explore Skincare Boutique', type: 'product', targetId: 'elan-c-radiance-ferulic-serum' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setLoading(false);
    }
  };

  // Action executor for chip clicks
  const handleExecuteAction = (action: SuggestedAction) => {
    if (action.type === 'book') {
      onOpenBooking(action.targetId, action.doctorId);
    } else if (action.type === 'quiz') {
      onOpenQuiz();
    } else if (action.type === 'treatment' && action.targetId) {
      const found = TREATMENTS.find(t => t.id === action.targetId);
      if (found && onSelectTreatment) {
        onSelectTreatment(found);
      } else {
        onOpenBooking(action.targetId);
      }
    } else if (action.type === 'product' && action.targetId) {
      const found = PRODUCTS.find(p => p.id === action.targetId);
      if (found && onSelectProduct) {
        onSelectProduct(found);
      }
    }
  };

  const handleQuickAddProduct = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const found = PRODUCTS.find(p => p.id === productId);
    if (found && onAddToCart) {
      onAddToCart(found, 1);
      setAddedToast(`Added ${found.name} to bag`);
      setTimeout(() => setAddedToast(null), 2500);
    }
  };

  const handleResetChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setMessages([
      {
        role: 'assistant',
        content: "Welcome to **ÉLAN Medical Aesthetics**. I am your Virtual Aesthetic Concierge, trained on Dr. Elena Vance's clinical protocols.\n\nHow may I guide your skin transformation today?",
        suggestedActions: [
          { label: 'Book Clinical Consultation', type: 'book', targetId: 'hydrafacial-md-deluxe' },
          { label: 'Explore Skincare Boutique', type: 'product', targetId: 'elan-c-radiance-ferulic-serum' },
          { label: 'Take 60-Sec Skin Quiz', type: 'quiz' }
        ],
        timestamp: 'Just now'
      }
    ]);
  };

  const toggleConcern = (concern: string) => {
    setSkinProfile(prev => {
      const exists = prev.concerns.includes(concern);
      if (exists) {
        return { ...prev, concerns: prev.concerns.filter(c => c !== concern) };
      } else {
        return { ...prev, concerns: [...prev.concerns, concern] };
      }
    });
  };

  // Formatter for markdown-like text
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split('\n\n');

    return (
      <div className="space-y-2">
        {paragraphs.map((para, pIdx) => {
          // Check if paragraph is bullet points
          if (para.includes('\n- ') || para.startsWith('- ') || para.startsWith('* ')) {
            const lines = para.split('\n');
            return (
              <ul key={pIdx} className="space-y-1 my-1.5 pl-1">
                {lines.map((line, lIdx) => {
                  const cleaned = line.replace(/^[-*]\s+/, '');
                  return (
                    <li key={lIdx} className="flex items-start gap-1.5 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5 shrink-0"></span>
                      <span>{renderInlineFormatting(cleaned)}</span>
                    </li>
                  );
                })}
              </ul>
            );
          }

          return (
            <p key={pIdx} className="leading-relaxed">
              {renderInlineFormatting(para)}
            </p>
          );
        })}
      </div>
    );
  };

  // Helper for bold and italic inline tokens
  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="text-[#E4D5BE] font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-24 right-6 z-50 px-4 py-2 rounded-2xl bg-[#141721] border border-[#C5A880] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-[#C5A880]" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          id="btn-open-aesthetic-concierge"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black shadow-2xl shadow-[#C5A880]/30 hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer group"
          aria-label="Open Aesthetic AI Concierge"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
            Aesthetic AI Concierge
          </span>
        </button>
      )}

      {/* Chat Window Drawer */}
      {isOpen && (
        <div 
          id="aesthetic-ai-concierge-window"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[440px] h-[600px] max-h-[calc(100vh-40px)] bg-[#0D0F14] border border-[#C5A880]/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn"
        >
          
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-[#141721] border-b border-white/10 flex items-center justify-between">
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
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif-luxury text-sm font-bold text-white">ÉLAN Aesthetic Concierge</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-[#C5A880]/20 text-[#C5A880]">Live</span>
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span>Dr. Vance's Clinical AI</span>
                  <span>•</span>
                  <span className="text-[#C5A880]">{skinProfile.skinType} Skin</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Profile Config Toggle */}
              <button
                onClick={() => setShowProfileSelector(!showProfileSelector)}
                title="Customize Skin Profile"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  showProfileSelector ? 'bg-[#C5A880] text-black' : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>

              {/* Audio Readout Toggle */}
              {speechSupported && (
                <button
                  onClick={() => {
                    const next = !speechEnabled;
                    setSpeechEnabled(next);
                    if (!next && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  title={speechEnabled ? "Mute Voice" : "Enable Voice Readout"}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    speechEnabled ? 'bg-[#C5A880] text-black' : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {speechEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Reset Chat */}
              <button
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Close Drawer */}
              <button
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer ml-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Skin Profile Customization Dropdown Panel */}
          {showProfileSelector && (
            <div className="p-3 bg-[#11141C] border-b border-[#C5A880]/20 text-xs space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#C5A880] uppercase tracking-wider">
                  Personalize Consultation Context
                </span>
                <button 
                  onClick={() => setShowProfileSelector(false)}
                  className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Done
                </button>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 mb-1">Your Skin Type:</p>
                <div className="flex flex-wrap gap-1">
                  {SKIN_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => setSkinProfile(prev => ({ ...prev, skinType: type }))}
                      className={`px-2 py-0.5 rounded-md text-[10px] transition-colors cursor-pointer ${
                        skinProfile.skinType === type
                          ? 'bg-[#C5A880] text-black font-semibold'
                          : 'bg-[#181C26] text-slate-300 border border-white/5 hover:border-[#C5A880]/30'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 mb-1">Primary Concerns (Select Multiple):</p>
                <div className="flex flex-wrap gap-1">
                  {MAIN_CONCERNS.map(concern => {
                    const isSelected = skinProfile.concerns.includes(concern);
                    return (
                      <button
                        key={concern}
                        onClick={() => toggleConcern(concern)}
                        className={`px-2 py-0.5 rounded-md text-[10px] transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#C5A880]/20 text-[#E4D5BE] border border-[#C5A880]/50'
                            : 'bg-[#181C26] text-slate-400 border border-white/5 hover:border-white/20'
                        }`}
                      >
                        {concern}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex gap-2.5 max-w-[92%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {m.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shrink-0 mt-0.5 border border-[#C5A880]/30">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs ${
                      m.role === 'user'
                        ? 'bg-[#C5A880] text-black font-medium rounded-tr-none shadow-md'
                        : 'bg-[#141721] border border-white/10 text-slate-200 rounded-tl-none shadow-lg'
                    }`}
                  >
                    {m.role === 'assistant' ? renderFormattedContent(m.content) : m.content}

                    {m.timestamp && (
                      <div className={`text-[9px] mt-1.5 ${m.role === 'user' ? 'text-black/60 text-right' : 'text-slate-500'}`}>
                        {m.timestamp}
                      </div>
                    )}
                  </div>
                </div>

                {/* Suggested Action Chips & Interactive Cards */}
                {m.role === 'assistant' && m.suggestedActions && m.suggestedActions.length > 0 && (
                  <div className="mt-2.5 pl-8 space-y-1.5 w-full">
                    <p className="text-[10px] font-semibold text-[#C5A880] uppercase tracking-wider flex items-center gap-1">
                      <Sparkle className="w-2.5 h-2.5" /> Clinical Recommendations
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.suggestedActions.map((action, aIdx) => {
                        const isProduct = action.type === 'product';
                        const isTreatment = action.type === 'treatment';
                        const isBook = action.type === 'book';

                        const matchedProduct = isProduct && action.targetId 
                          ? PRODUCTS.find(p => p.id === action.targetId) 
                          : null;
                        const matchedTreatment = isTreatment && action.targetId 
                          ? TREATMENTS.find(t => t.id === action.targetId) 
                          : null;

                        return (
                          <div key={aIdx} className="flex items-center gap-1">
                            <button
                              onClick={() => handleExecuteAction(action)}
                              className="px-2.5 py-1.5 rounded-xl text-[11px] font-medium bg-[#1A1E29] hover:bg-[#C5A880] text-slate-200 hover:text-black border border-[#C5A880]/30 hover:border-[#C5A880] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group"
                            >
                              {isBook && <Calendar className="w-3 h-3 text-[#C5A880] group-hover:text-black" />}
                              {isProduct && <ShoppingBag className="w-3 h-3 text-[#C5A880] group-hover:text-black" />}
                              {isTreatment && <Sparkles className="w-3 h-3 text-[#C5A880] group-hover:text-black" />}
                              <span>{action.label}</span>
                              <ChevronRight className="w-3 h-3 opacity-60" />
                            </button>

                            {/* Optional Instant Add-to-bag shortcut if it's a product */}
                            {matchedProduct && onAddToCart && (
                              <button
                                onClick={(e) => handleQuickAddProduct(matchedProduct.id, e)}
                                title={`Add ${matchedProduct.name} ($${matchedProduct.price}) to bag`}
                                className="px-2 py-1.5 rounded-xl text-[10px] font-semibold bg-[#C5A880]/15 hover:bg-[#C5A880] text-[#C5A880] hover:text-black border border-[#C5A880]/40 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <span>+${matchedProduct.price}</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start pl-1">
                <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shrink-0 border border-[#C5A880]/30">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-[#141721] border border-white/10 text-xs text-slate-400 rounded-tl-none flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping"></span>
                  <span>Synthesizing clinical formulary & physician protocols...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter Quick Inquiry Pills */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-[#0E1017] border-t border-white/5">
              <p className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">Suggested Clinical Topics:</p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {STARTER_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt.text)}
                    className="px-2.5 py-1 rounded-full text-[11px] bg-[#141721] hover:bg-[#C5A880]/20 border border-white/10 hover:border-[#C5A880]/40 text-slate-300 hover:text-white transition-all text-left flex items-center gap-1 cursor-pointer"
                  >
                    <span>{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input & Voice Controls Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-[#141721] border-t border-white/10 flex items-center gap-2"
          >
            {/* Mic Dictation Button */}
            {micSupported && (
              <button
                type="button"
                onClick={toggleListening}
                title={isListening ? "Listening... click to stop" : "Speak to Concierge"}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isListening 
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/40' 
                    : 'bg-[#0D0F14] border border-white/10 text-slate-400 hover:text-[#C5A880]'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening to your voice..." : "Ask about lasers, serums, downtime..."}
              className="flex-1 bg-[#0D0F14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880] transition-colors"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#D4AF37] hover:brightness-110 disabled:opacity-40 text-black flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-md"
              aria-label="Send Inquiry"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Note */}
          <div className="px-3 py-1 bg-[#0A0C10] border-t border-white/5 flex items-center justify-between text-[9px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 text-[#C5A880]" />
              <span>Medical-Grade Clinical Intelligence</span>
            </span>
            <span>ÉLAN Flagship Protocol</span>
          </div>

        </div>
      )}
    </>
  );
};
