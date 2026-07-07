'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AudioPlayer.module.css';

const STORAGE_KEY = 'audioPlayerPosition';
const DRAG_THRESHOLD = 6; // px of movement before it counts as a drag, not a click

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  const dragState = useRef({
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
    pointerId: -1,
  });

  const audioSrc = '/music/musicccc.mp3';

  function clampToViewport(x: number, y: number) {
    const width = 120;
    const height = 150;
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;
    return {
      x: Math.min(Math.max(x, 0), Math.max(maxX, 0)),
      y: Math.min(Math.max(y, 0), Math.max(maxY, 0)),
    };
  }

  // Restore saved position on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPosition(clampToViewport(parsed.x, parsed.y));
        return;
      } catch {
        // fall through to default
      }
    }
    // Default: bottom-right corner, matching the old fixed bottom/right: 30px
    setPosition(
      clampToViewport(window.innerWidth - 120 - 30, window.innerHeight - 150 - 30)
    );
  }, []);

  // Keep bubble on-screen if the window is resized
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => (prev ? clampToViewport(prev.x, prev.y) : prev));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.log('Audio play failed:', e));
    }
    setIsPlaying((prev) => !prev);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!position) return;
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
      moved: false,
      pointerId: e.pointerId,
    };
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragState.current.pointerId !== e.pointerId) return;

    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;

    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      dragState.current.moved = true;
    }

    if (dragState.current.moved) {
      setPosition(clampToViewport(dragState.current.originX + dx, dragState.current.originY + dy));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragState.current.pointerId !== e.pointerId) return;
    setIsDragging(false);

    if (dragState.current.moved) {
      // It was a drag: save the final position, don't toggle play
      setPosition((prev) => {
        if (prev) localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
        return prev;
      });
    } else {
      // It was a tap/click: toggle play/pause
      togglePlay();
    }

    dragState.current.pointerId = -1;
  };

  // Fixed particle count
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    animationDuration: (Math.random() * 1 + 0.8) + 's',
    animationDelay: (Math.random() * 0.5) + 's',
  }));

  if (!position) return null; // wait for initial position calc to avoid flash at 0,0

  return (
    <div
      className={`${styles.audioPlayer} ${isDragging ? styles.dragging : ''}`}
      style={{ left: position.x, top: position.y }}
    >
      <audio ref={audioRef} src={audioSrc} loop preload="none" />

      {/* Container for Fire and Particles */}
      <div className={styles.fireWrapper}>
        {isPlaying && <div className={styles.torchGlow} />}

        {isPlaying && (
          <div className={styles.fireContainer}>
            {particles.map((p) => (
              <div
                key={p.id}
                className={styles.fireParticle}
                style={{
                  left: p.left,
                  animationDuration: p.animationDuration,
                  animationDelay: p.animationDelay,
                }}
              />
            ))}
          </div>
        )}

        {/* Draggable + clickable area — stays a fixed small circle always */}
        <div
          className={`${styles.toggleBtn} ${isPlaying ? styles.playing : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          title={isPlaying ? 'Extinguish (drag to move)' : 'Ignite (drag to move)'}
        >
          {!isPlaying && (
            <div className={styles.ashState}>
              <span className={styles.musicNote}>♪</span>
            </div>
          )}
        </div>

        {/* Fire gif overlay — larger, purely visual, doesn't affect the button's own size/transition */}
        {isPlaying && (
          <img
            src="/fire/processed.gif"
            alt="Fire"
            className={styles.fireGif}
            draggable="false"
          />
        )}
      </div>
    </div>
  );
}