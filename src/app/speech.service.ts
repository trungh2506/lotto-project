import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  constructor() {}

  speak(text: string) {
    const voices = window.speechSynthesis.getVoices();
    const vietnameseVoice = voices.find((voice) =>
      voice.voiceURI.includes('HoaiMy'),
    );
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'vi-VN';
    if (vietnameseVoice) {
      speech.voice = vietnameseVoice;
      window.speechSynthesis.speak(speech);
    } else {
      window.speechSynthesis.speak(speech);
    }
  }
}
