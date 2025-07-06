// Sound effects for MTXO Labs hero section
export class SoundEffects {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    this.initializeAudio();
  }

  private async initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.log('Audio context not supported');
    }
  }

  private async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Letter reveal sound - ascending frequency for each letter
  async playLetterReveal(letterIndex: number) {
    if (this.isMuted || !this.audioContext) return;
    
    await this.resumeAudioContext();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Different frequencies for M, T, X, O
    const frequencies = [220, 277, 330, 415]; // A3, C#4, E4, G#4
    const frequency = frequencies[letterIndex] || 220;
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    // Smooth filter sweep
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, this.audioContext.currentTime + 0.3);
    
    // Envelope
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.8);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.8);
  }

  // Labs reveal sound - softer, warmer tone
  async playLabsReveal() {
    if (this.isMuted || !this.audioContext) return;
    
    await this.resumeAudioContext();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(165, this.audioContext.currentTime); // E3
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.0);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 1.0);
  }

  // Tagline reveal sound - ethereal pad
  async playTaglineReveal() {
    if (this.isMuted || !this.audioContext) return;
    
    await this.resumeAudioContext();
    
    const frequencies = [330, 415, 523]; // E4, G#4, C5 - major chord
    
    frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, this.audioContext!.currentTime);
      
      const delay = index * 0.1;
      gainNode.gain.setValueAtTime(0, this.audioContext!.currentTime + delay);
      gainNode.gain.linearRampToValueAtTime(0.03, this.audioContext!.currentTime + delay + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext!.currentTime + delay + 2.0);
      
      oscillator.start(this.audioContext!.currentTime + delay);
      oscillator.stop(this.audioContext!.currentTime + delay + 2.0);
    });
  }

  // Hover sound - subtle chime
  async playHover() {
    if (this.isMuted || !this.audioContext) return;
    
    await this.resumeAudioContext();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(1760, this.audioContext.currentTime + 0.1); // A6
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  // Ambient drone for background atmosphere
  async playAmbientDrone() {
    if (this.isMuted || !this.audioContext) return;
    
    await this.resumeAudioContext();
    
    const oscillator1 = this.audioContext.createOscillator();
    const oscillator2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator1.connect(filter);
    oscillator2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator1.type = 'sawtooth';
    oscillator1.frequency.setValueAtTime(55, this.audioContext.currentTime); // A1
    
    oscillator2.type = 'sawtooth';
    oscillator2.frequency.setValueAtTime(82.5, this.audioContext.currentTime); // E2
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, this.audioContext.currentTime);
    filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.02, this.audioContext.currentTime + 2);
    
    oscillator1.start(this.audioContext.currentTime);
    oscillator2.start(this.audioContext.currentTime);
    
    // Let it play for 10 seconds then fade out
    setTimeout(() => {
      if (this.audioContext && gainNode) {
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1);
        setTimeout(() => {
          oscillator1.stop();
          oscillator2.stop();
        }, 1000);
      }
    }, 10000);
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }
}

export const soundEffects = new SoundEffects();