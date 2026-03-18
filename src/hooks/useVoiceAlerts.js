import { useCallback } from 'react';
import { useBehaviorStore } from '../store/useBehaviorStore';

export const useVoiceAlerts = () => {
  const { language } = useBehaviorStore();

  const playAlarm = useCallback(() => {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    const playTone = (freq, type, start, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.3, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    // Futuristic dual-tone siren
    playTone(880, 'square', ctx.currentTime, 0.15);
    playTone(440, 'square', ctx.currentTime + 0.15, 0.15);
    playTone(880, 'square', ctx.currentTime + 0.3, 0.15);
  }, []);

  const speak = useCallback((text, langOverride, isUrgent = false) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // Prefix with "STOP" if urgent
    const prefix = isUrgent ? (language === 'hi' ? 'रुको! ' : language === 'kn' ? 'ನಿಲ್ಲಿಸಿ! ' : language === 'ta' ? 'நில்ಲುங்கள்! ' : 'STOP! ') : '';
    const utterance = new SpeechSynthesisUtterance(prefix + text);
    
    const langMap = { en: 'en-US', hi: 'hi-IN', kn: 'kn-IN', ta: 'ta-IN' };
    utterance.lang = langMap[langOverride || language] || 'en-US';
    utterance.rate = isUrgent ? 1.1 : 0.9;
    utterance.pitch = isUrgent ? 1.2 : 1.0;
    utterance.volume = 1.0;
    window.speechSynthesis.speak(utterance);
  }, [language]);

  const alertVoice = useCallback((type) => {
    playAlarm(); // Play siren sound first
    
    const alerts = {
      en: { 
        helmet: "Helmet not detected. Please wear your helmet immediately.", 
        fatigue: "High fatigue detected. Please take a short break.", 
        phone: "Mobile phone usage detected. Stay focused on your task.", 
        safe: "You are currently in a safe environment.", 
        risk: "Warning. High risk behavior detected. Please follow safety protocols.",
        emergency: "Emergency situation detected. Help is on the way."
      },
      hi: { 
        helmet: "हेलमेट नहीं मिला। कृपया तुरंत अपना हेलमेट पहनें।", 
        fatigue: "थकावट का पता चला है। कृपया थोड़ा आराम करें।", 
        phone: "मोबाइल फोन का उपयोग देखा गया। अपने काम पर ध्यान दें।", 
        safe: "आप अभी सुरक्षित क्षेत्र में हैं।", 
        risk: "चेतावनी। उच्च जोखिम वाला व्यवहार पाया गया। सुरक्षा नियमों का पालन करें।",
        emergency: "आपातकालीन स्थिति का पता चला। मदद रास्ते में है।"
      },
      kn: { 
        helmet: "ಹೆಲ್ಮೆಟ್ ಪತ್ತೆಯಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ತಕ್ಷಣ ನಿಮ್ಮ ಹೆಲ್ಮೆಟ್ ಧರಿಸಿ.", 
        fatigue: "ಹೆಚ್ಚಿನ ಆಯಾಸ ಪತ್ತೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ.", 
        phone: "ಮೊಬೈಲ್ ಫೋನ್ ಬಳಕೆ ಪತ್ತೆಯಾಗಿದೆ. ನಿಮ್ಮ ಕೆಲಸದ ಮೇಲೆ ಗಮನವಿರಲಿ.", 
        safe: "ನೀವು ಪ್ರಸ್ತುತ ಸುರಕ್ಷಿತ ಪರಿಸರದಲ್ಲಿದ್ದೀರಿ.", 
        risk: "ಎಚ್ಚರಿಕೆ. ಹೆಚ್ಚಿನ ಅಪಾಯದ ನಡವಳಿಕೆ ಪತ್ತೆಯಾಗಿದೆ. ಸುರಕ್ಷತಾ ನಿಯಮಗಳನ್ನು ಪಾಲಿಸಿ.",
        emergency: "ತುರ್ತು ಪರಿಸ್ಥಿತಿ ಪತ್ತೆಯಾಗಿದೆ. ಸಹಾಯ ಬರುತ್ತಿದೆ."
      },
      ta: { 
        helmet: "தலைக்கவசம் கண்டறியப்படவில்லை. தயவுசெய்து உடனடியாக அணியுங்கள்.", 
        fatigue: "அதிக சோர்வு கண்டறியப்பட்டது. தயவுசெய்து சிறிது ஓய்வு எடுங்கள்.", 
        phone: "கைபேசி பயன்பாடு கண்டறியப்பட்டது. உங்கள் வேலையில் கவனம் செலுத்துங்கள்.", 
        safe: "நீங்கள் தற்போது பாதுகாப்பான சூழலில் உள்ளீர்கள்.", 
        risk: "எச்சரிக்கை. அதிக ஆபத்தான நடத்தை கண்டறியப்பட்டது. பாதுகாப்பு விதிகளைப் பின்பற்றுங்கள்.",
        emergency: "அவசரநிலை கண்டறியப்பட்டது. உதவி வந்து கொண்டிருக்கிறது."
      }
    };

    const currentAlerts = alerts[language] || alerts.en;
    if (currentAlerts[type]) {
      // Pass true for urgent messages to prefix with "STOP"
      speak(currentAlerts[type], null, type !== 'safe');
    }
  }, [language, speak, playAlarm]);

  return { speak, alertVoice };
};
