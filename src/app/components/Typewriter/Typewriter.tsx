"use client";
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  // Split the text and use {'\n'} for line breaks
  return (
    <div>
      {displayedText.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          <p>{line}</p>
          {i < displayedText.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};