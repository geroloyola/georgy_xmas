"use client";
import React, { useEffect, useState, useRef } from 'react';

interface ScrollImageSequenceProps {
  totalFrames: number;
  folderPath: string;
}

export const ScrollVideo: React.FC<ScrollImageSequenceProps> = ({ totalFrames, folderPath }) => {
  const [currentImage, setCurrentImage] = useState(`${folderPath}0075.png`);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to generate the image path based on the frame index
  const imagePath = (index: number) => {
    return `${folderPath}${String(index + 75).padStart(4, '0')}.png`;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create an artificial scroll height
    container.style.height = `${window.innerHeight * 3}px`; // Adjust multiplier as needed

    const handleScroll = () => {
      if (!container) return;

      // Calculate scroll percentage
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress within the container
      const scrollProgress = (scrollTop - containerTop) / (containerHeight - windowHeight);
      
      // Ensure scroll progress is between 0 and 1
      const clampedScrollProgress = Math.max(0, Math.min(1, scrollProgress));

      // Calculate frame index
      const frameIndex = Math.floor(clampedScrollProgress * (totalFrames - 1));

      // Calculate background opacity (smooth transition)
      // Start darkening after 20% scroll and complete by 80%
      const opacity = Math.min(1, Math.max(0, 
        (clampedScrollProgress - 0.2) / 0.6 // Adjust these values to control darkening range
      ));

      setCurrentImage(imagePath(frameIndex));
      setBackgroundOpacity(opacity);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial setup
    handleScroll();

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalFrames, folderPath]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '300vh', // Ensure enough scroll space
      }}
    >
      {/* Darkening overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: backgroundOpacity,
          pointerEvents: 'none',
          zIndex: 1, // Changed to ensure it's behind the image container
          mixBlendMode: 'multiply' // This is the key change
        }}
      />

      {/* Image container with gradient background */}
      <div style={{ 
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '100%',
        maxWidth: '1280px',
        background: `
          linear-gradient(
            to bottom, 
            transparent 0%, 
            transparent 5%, 
            black 5%, 
            black 75%, 
            #000 75%, 
            #000 100%
          )
        `, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
      }}>
        <img 
          src={currentImage} 
          alt="Scroll Image Sequence" 
          style={{ 
            width: '100%', 
            height: 'auto',
            objectFit: 'contain',
            maxHeight: '100vh', // Ensure image doesn't overflow
            zIndex: 3
          }} 
        />
      </div>
    </div>
  );
};