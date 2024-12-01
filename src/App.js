import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { dayImages, nightImages } from './images';

const ImageGallery = () => {

  const [isNightMode, setIsNightMode] = useState(false);
  const [images, setImages] = useState(dayImages);
  const audioRef = useRef(null);

  // Determine image orientation
  const getImageOrientation = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img.width > img.height ? 'horizontal' : 'vertical');
      };
      img.src = src;
    });
  };

  // Organize images into rows
  const organizeImages = async (imageList) => {
    const orientations = await Promise.all(
      imageList.map(async (src) => {
        try {
          return await getImageOrientation(src);
        } catch (error) {
          console.error(`Error getting orientation for image ${src}: ${error}`);
          return 'horizontal'; // Default to horizontal if there's an error
        }
      })
    );

    const rows = [];
    let currentRow = [];

    for (let i = 0; i < imageList.length; i++) {
      currentRow.push({
        src: imageList[i],
        orientation: orientations[i]
      });

      // Rule for row creation
      if (orientations[i] === 'horizontal' && currentRow.length === 2) {
        rows.push(currentRow);
        currentRow = [];
      } else if (orientations[i] === 'vertical' && currentRow.length === 3) {
        rows.push(currentRow);
        currentRow = [];
      }
    }

    // Add any remaining images
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  // Toggle mode
  const toggleMode = () => {
    setIsNightMode(!isNightMode);
  };

  // Effect to change images and audio
  useEffect(() => {
    setImages(isNightMode ? nightImages : dayImages);

    if (audioRef.current) {
      audioRef.current.src = isNightMode 
        ? '/audio/night-music.mp3' 
        : '/audio/day-music.mp3';
      audioRef.current.play();
    }
  }, [isNightMode]);

  // State for organized images
  const [imageRows, setImageRows] = useState([]);

  // Organize images when images change
  useEffect(() => {
    const organizeAndSetImages = async () => {
      const rows = await organizeImages(images);
      setImageRows(rows);
    };
    organizeAndSetImages();
  }, [images]);

  return (
    <div 
      className={`min-h-screen flex flex-col ${
        isNightMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      } transition-colors duration-300`}
    >
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        loop 
        className="hidden"
      />

      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-2xl font-bold">[orchard] gallery</h1>
        <button 
          onClick={toggleMode} 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {isNightMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      {/* Image Grid */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 space-y-4">
        {imageRows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex space-x-4 justify-center"
          >
            {row.map((image, imgIndex) => (
              <div 
                key={imgIndex}
                className={`
                  ${image.orientation === 'horizontal' 
                    ? 'w-[600px] h-[400px]' 
                    : 'w-[400px] h-[600px]'
                  } 
                  object-cover overflow-hidden
                `}
              >
                <img 
                  src={image.src} 
                  alt={`Gallery image ${rowIndex}-${imgIndex}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;