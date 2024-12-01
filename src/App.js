import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { dayImages, nightImages } from './images';

const App = () => {
  const [isDayMode, setIsDayMode] = useState(true);
  const [audioElement, setAudioElement] = useState(null);

  // Toggle between day and night modes
  const toggleMode = () => {
    setIsDayMode(!isDayMode);
  };

  // Handle audio changes when mode is toggled
  useEffect(() => {
    if (audioElement) {
      audioElement.pause();
      audioElement.src = isDayMode 
        ? '/audio/day-music.mp3' 
        : '/audio/night-music.mp3';
      audioElement.play().catch(error => console.log('Audio play failed:', error));
    }
  }, [isDayMode, audioElement]);

  // Initialize audio on component mount
  useEffect(() => {
    const audio = new Audio('/audio/day-music.mp3');
    audio.loop = true;
    setAudioElement(audio);

    // Cleanup audio on unmount
    return () => {
      audio.pause();
    };
  }, []);

  // Play audio when component mounts
  useEffect(() => {
    if (audioElement) {
      audioElement.play().catch(error => console.log('Initial audio play failed:', error));
    }
  }, [audioElement]);

  return (
    <div 
      className={`min-h-screen p-4 transition-colors duration-500 ${
        isDayMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-1/3"></div>
        <h1 className="text-2xl font-bold text-center flex-grow">
          [orchard] gallery
        </h1>
        
        {/* Mode Toggle */}
        <div 
          onClick={toggleMode} 
          className="cursor-pointer hover:bg-gray-200 p-2 rounded-full transition"
        >
          {isDayMode ? <Moon size={24} /> : <Sun size={24} />}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(isDayMode ? dayImages : nightImages).map((image, index) => (
          <div 
            key={index} 
            className="flex justify-center items-center overflow-hidden"
          >
            <img 
              src={image} 
              alt={`Gallery image ${index + 1}`}
              className="max-w-full max-h-[500px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;