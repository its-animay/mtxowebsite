export class AudioManager {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;

  constructor() {
    this.initializeAudio();
  }

  private async initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  async playAudioFile(audioSrc: string): Promise<HTMLAudioElement> {
    const audio = new Audio(audioSrc);
    
    if (this.audioContext && this.analyser) {
      const source = this.audioContext.createMediaElementSource(audio);
      source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    }

    return audio;
  }

  getAudioData(): Uint8Array | null {
    if (this.analyser && this.dataArray) {
      this.analyser.getByteFrequencyData(this.dataArray);
      return this.dataArray;
    }
    return null;
  }

  async synthesizeVoice(text: string, voice: string = 'en-US'): Promise<void> {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = speechSynthesis.getVoices().find(v => v.lang === voice) || null;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
    }
  }

  async startRecording(): Promise<MediaRecorder | null> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      if (this.audioContext && this.analyser) {
        const source = this.audioContext.createMediaStreamSource(stream);
        source.connect(this.analyser);
      }
      
      return mediaRecorder;
    } catch (error) {
      console.error('Failed to start recording:', error);
      return null;
    }
  }

  pause() {
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }

  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  destroy() {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

export const audioManager = new AudioManager();
