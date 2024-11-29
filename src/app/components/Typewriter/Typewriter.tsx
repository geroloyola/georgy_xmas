"use client";
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index)); // Append the correct character
      index += 1;

      if (index === text.length) {
        clearInterval(interval); // Clear interval when done
      } else {
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [text, speed]);

  return <p>{displayedText}</p>;
};
