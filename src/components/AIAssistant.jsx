import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, Globe, X, Command } from 'lucide-react';
import { useBehaviorStore } from '../store/useBehaviorStore';
import { useVoiceAlerts } from '../hooks/useVoiceAlerts';

const AIAssistant = () => {
  const { language, setLanguage, workers } = useBehaviorStore();
  const { speak } = useVoiceAlerts();
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your RakshaTantra AI Safety Assistant. Ask me about your status or safety tips.", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);
  const worker = workers[0];

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  ];

  const quickPrompts = [
    { id: 'status', label: 'Safety Status', query: 'What is my current safety status?' },
    { id: 'risk', label: 'Risk Info', query: 'Explain my current risk level.' },
    { id: 'tips', label: 'Safety Tips', query: 'How can I improve my safety score?' },
    { id: 'emergency', label: '🆘 Emergency', query: 'EMERGENCY: I need help immediately!' },
  ];

  const handleSend = (textOverride) => {
    const text = textOverride || input;
    if (!text.trim()) return;
    
    const userMessage = { text, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response logic
    setTimeout(() => {
      if (text.toLowerCase().includes('emergency')) {
        const emergencyRes = {
          en: "⚠️ EMERGENCY DETECTED. SOS Signal transmitted. Stay calm, help is arriving.",
          hi: "⚠️ आपातकालीन स्थिति। एसओएस संकेत भेजा गया है। शांत रहें, मदद आ रही है।",
          kn: "⚠️ ತುರ್ತು ಪರಿಸ್ಥಿತಿ ಪತ್ತೆಯಾಗಿದೆ. SOS ಸಿಗ್ನಲ್ ಕಳುಹಿಸಲಾಗಿದೆ. ಶಾಂತವಾಗಿರಿ, ಸಹಾಯ ಬರುತ್ತಿದೆ.",
          ta: "⚠️ அவசரகால நிலை! SOS சிக்னல் அனுப்பப்பட்டுள்ளது. அமைதியாக இருங்கள், உதவி வந்து கொண்டிருக்கிறது."
        };
        const res = emergencyRes[language] || emergencyRes.en;
        setMessages(prev => [...prev, { text: res, isUser: false, isEmergency: true }]);
        speak(res);
        return;
      }

      const responseText = getAssistantResponse(text);
      setMessages(prev => [...prev, { text: responseText, isUser: false }]);
      speak(responseText);
    }, 600);
  };

  const getAssistantResponse = (query) => {
    const q = query.toLowerCase();
    const responses = {
      en: {
        safe: `You are ${worker.status}. Your credit score is ${worker.creditScore}. Keep up the safe work!`,
        risk: `Current risk score is ${worker.riskScore}%. Please follow all safety protocols in ${worker.zone}.`,
        improve: `To boost your score, ensure full PPE compliance and maintain focused activity in your zone.`,
        default: `I am monitoring your safety in real-time. How can I assist you, ${worker.name}?`
      },
      hi: {
        safe: `आप ${worker.status} हैं। आपका क्रेडिट स्कोर ${worker.creditScore} है। सुरक्षित काम जारी रखें!`,
        risk: `वर्तमान जोखिम स्कोर ${worker.riskScore}% है। कृपया ${worker.zone} में सभी सुरक्षा नियमों का पालन करें।`,
        improve: `अपना स्कोर बढ़ाने के लिए, पूर्ण PPE अनुपालन सुनिश्चित करें और अपने क्षेत्र में केंद्रित रहें।`,
        default: `मैं वास्तविक समय में आपकी सुरक्षा की निगरानी कर रहा हूं। मैं आपकी कैसे मदद कर सकता हूं?`
      },
      kn: {
        safe: `ನೀವು ${worker.status} ಆಗಿದ್ದೀರಿ. ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ${worker.creditScore} ಆಗಿದೆ. ಸುರಕ್ಷಿತ ಕೆಲಸವನ್ನು ಮುಂದುವರೆಸಿ!`,
        risk: `ಪ್ರಸ್ತುತ ಅಪಾಯದ ಸ್ಕೋರ್ ${worker.riskScore}% ಆಗಿದೆ. ದಯವಿಟ್ಟು ${worker.zone} ನಲ್ಲಿ ಎಲ್ಲಾ ಸುರಕ್ಷತಾ ನಿಯಮಗಳನ್ನು ಪಾಲಿಸಿ.`,
        improve: `ನಿಮ್ಮ ಸ್ಕೋರ್ ಅನ್ನು ಹೆಚ್ಚಿಸಲು, ಪೂರ್ಣ PPE ಅನುಸರಣೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ ಮತ್ತು ನಿಮ್ಮ ವಲಯದಲ್ಲಿ ಏಕಾಗ್ರತೆಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ.`,
        default: `ನಾನು ನೈಜ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ಸುರಕ್ಷತೆಯನ್ನು ಮೇಲ್ವಿசாரಣೆ ಮಾಡುತ್ತಿದ್ದೇನೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`
      },
      ta: {
        safe: `நீங்கள் ${worker.status} நிலையில் உள்ளீர்கள். உங்கள் கிரெடிட் ஸ்கோர் ${worker.creditScore}. பாதுகாப்பாக வேலையைத் தொடருங்கள்!`,
        risk: `தற்போதைய அபாய ஸ்கோர் ${worker.riskScore}% ஆகும். தயவுசெய்து ${worker.zone}-ல் உள்ள அனைத்து பாதுகாப்பு விதிகளையும் பின்பற்றுங்கள்.`,
        improve: `உங்கள் ஸ்கோரை அதிகரிக்க, முழுமையான PPE விதிகளைப் பின்பற்றி, உங்கள் மண்டலத்தில் கவனத்துடன் செயல்படுங்கள்.`,
        default: `நேரலையில் உங்கள் பாதுகாப்பை நான் கண்காணித்து வருகிறேன். ${worker.name}, நான் உங்களுக்கு எப்படி உதவ முடியும்?`
      }
    };

    const res = responses[language] || responses.en;
    if (q.includes('safe') || q.includes('status') || q.includes('ಸ್ಥಿತಿ') || q.includes('स्थिति')) return res.safe;
    if (q.includes('risk') || q.includes('ಅಪಾಯ') || q.includes('जोखिम')) return res.risk;
    if (q.includes('improve') || q.includes('score') || q.includes('ಸುಧಾರಣೆ')) return res.improve;
    return res.default;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden border-b border-white/5">
      <div className="p-3 bg-bg-deep/80 border-b border-white/5 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2 font-hud text-[10px] text-neon-blue font-bold tracking-widest uppercase">
          <div className="w-0.5 h-3 bg-neon-blue" />
          AI Safety Assistant
        </div>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-bg-elevated border border-white/10 text-[9px] text-text-secondary rounded px-2 py-0.5 outline-none font-hud cursor-pointer"
        >
          {languages.map(l => (
            <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
          ))}
        </select>
      </div>

      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-2 max-w-[90%] ${m.isUser ? 'flex-row-reverse' : ''}`}>
               <div className={`w-6 h-6 rounded-full flex items-center justify-center font-hud text-[8px] shrink-0 border ${
                 m.isUser ? 'bg-neon-green/10 border-neon-green/30 text-neon-green' : 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue'
               }`}>
                 {m.isUser ? 'U' : 'AI'}
               </div>
               <div className={`p-3 rounded-lg text-[11px] leading-relaxed border ${
                 m.isUser ? 'bg-neon-blue/10 border-neon-blue/20 text-text-primary' : 'bg-bg-elevated border-white/5 text-text-primary'
               }`}>
                 {m.text}
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/5 bg-bg-deep/50">
        <div className="flex flex-wrap gap-1.5 mb-3">
           {quickPrompts.map(qp => (
             <button 
               key={qp.id} 
               onClick={() => handleSend(qp.query)}
               className="px-2.5 py-1 rounded-full border border-white/10 text-[8px] text-text-muted hover:text-neon-blue hover:border-neon-blue/30 transition-all font-hud uppercase tracking-tighter"
             >
               {qp.label}
             </button>
           ))}
        </div>
        <div className="flex gap-2">
           <input
             type="text"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
             placeholder="Ask about safety..."
             className="flex-1 bg-bg-elevated border border-white/10 rounded-md px-3 py-2 text-[10px] text-text-primary outline-none focus:border-neon-blue/40 transition-all"
           />
           <button 
            onClick={() => handleSend()}
            className="w-9 h-9 flex items-center justify-center bg-neon-blue/10 border border-neon-blue/30 text-neon-blue rounded-md hover:bg-neon-blue hover:text-black transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]"
           >
             <Send size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
