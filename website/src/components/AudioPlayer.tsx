'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AudioPlayer.module.css';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Local ambient music
  const audioSrc = "/music/musicccc.mp3";

  // Default volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Fixed particle count
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    animationDuration: (Math.random() * 1 + 0.8) + 's',
    animationDelay: (Math.random() * 0.5) + 's'
  }));

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioRef} src={audioSrc} loop preload="none" />
      
      {/* Container for Fire and Particles */}
      <div className={styles.fireWrapper}>
        {isPlaying && (
          <div className={styles.fireContainer}>
            {particles.map((p) => (
              <div 
                key={p.id} 
                className={styles.fireParticle}
                style={{
                  left: p.left,
                  animationDuration: p.animationDuration,
                  animationDelay: p.animationDelay
                }}
              />
            ))}
          </div>
        )}

        {/* Clickable Area */}
        <button 
          className={`${styles.toggleBtn} ${isPlaying ? styles.playing : ''}`}
          onClick={togglePlay}
          title={isPlaying ? 'Extinguish' : 'Ignite'}
        >
          {isPlaying ? (
             <img src="/fire/processed.gif" alt="Fire" className={styles.fireGif} draggable="false" />
          ) : (
            // Extinguished state (ash/coal look)
            <div className={styles.ashState}>
              <span className={styles.musicNote}>♪</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
