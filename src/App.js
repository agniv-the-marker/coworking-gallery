import React, { useState, useEffect } from "react";
import {dayImages, nightImages} from "./images";

// Utility function to shuffle images
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Utility function to determine image orientation
const getImageOrientation = (imageSrc) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img.width > img.height ? 'horizontal' : 'vertical');
    };
    img.src = imageSrc;
  });
};

const OrchardGallery = () => {
  const [images, setImages] = useState([]);
  const [imageOrientations, setImageOrientations] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDayMode, setIsDayMode] = useState(true);
  const [audio, setAudio] = useState(null);

  // Function to toggle day/night mode
  const toggleMode = () => {
    setIsDayMode(!isDayMode);
  };

  // Determine image orientations
  useEffect(() => {
    const determineOrientations = async () => {
      const orientations = {};
      for (const image of isDayMode ? dayImages : nightImages) {
        orientations[image] = await getImageOrientation(image);
      }
      setImageOrientations(orientations);
    };

    determineOrientations();
  }, [isDayMode]);

  // Update images and shuffle on mode change
  useEffect(() => {
    const newImages = shuffleArray(isDayMode ? dayImages : nightImages);
    setImages(newImages);

    // Update background music
    if (audio) audio.pause();
    const newAudio = new Audio(
      isDayMode ? "/audio/day-music.mp3" : "/audio/night-music.mp3"
    );
    newAudio.loop = true;
    newAudio.play();
    setAudio(newAudio);

    // Cleanup audio on unmount
    return () => newAudio.pause();
  }, [isDayMode]);

  // Custom grid layout logic
  const renderImageGrid = () => {
    const horizontalImages = images.filter(
      img => imageOrientations[img] === 'horizontal'
    );
    const verticalImages = images.filter(
      img => imageOrientations[img] === 'vertical'
    );

    const gridRows = [];
    let currentRow = [];
    let remainingHorizontal = [...horizontalImages];
    let remainingVertical = [...verticalImages];

    // Prioritize creating rows with 2 horizontal images
    while (remainingHorizontal.length >= 2 || remainingVertical.length >= 3) {
      // Try to fill row with 2 horizontal images first
      if (remainingHorizontal.length >= 2) {
        currentRow = [
          remainingHorizontal.shift(),
          remainingHorizontal.shift()
        ];
        gridRows.push(currentRow);
        currentRow = [];
      }
      // If not enough horizontal, try vertical
      else if (remainingVertical.length >= 3) {
        currentRow = [
          remainingVertical.shift(),
          remainingVertical.shift(),
          remainingVertical.shift()
        ];
        gridRows.push(currentRow);
        currentRow = [];
      }
    }

    // Add any remaining images
    if (remainingHorizontal.length > 0) {
      gridRows.push(remainingHorizontal);
    }
    if (remainingVertical.length > 0) {
      gridRows.push(remainingVertical);
    }

    return gridRows;
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-500 ${
        isDayMode ? "bg-yellow-100 text-gray-800" : "bg-gray-900 text-white"
      }`}
    >
      {/* Day/Night Toggle */}
      <div className="fixed top-4 right-4 z-10">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={!isDayMode}
              onChange={toggleMode}
            />
            <div
              className={`w-16 h-8 rounded-full shadow-inner transition-colors duration-300 ${
                isDayMode ? "bg-yellow-300" : "bg-indigo-600"
              }`}
            />
            <div
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                isDayMode
                  ? "transform translate-x-0"
                  : "transform translate-x-8"
              }`}
            />
          </div>
          <span className="ml-3 text-sm">
            {isDayMode ? "Day Mode" : "Night Mode"}
          </span>
        </label>
      </div>

      {/* Gallery Title */}
      <h1
        className={`text-3xl font-bold text-center mb-8 ${
          isDayMode ? "text-gray-800" : "text-white"
        }`}
      >
        [orchard] gallery
      </h1>

      {/* Responsive Image Grid */}
      <div className="max-w-6xl mx-auto space-y-4">
        {renderImageGrid().map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {row.map((image, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer ${
                  isDayMode
                    ? "hover:shadow-lg"
                    : "hover:shadow-xl hover:shadow-indigo-500/50"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-48 md:h-56 lg:h-64 object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Enlarged Image Modal */}
      {selectedImage && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-colors duration-500 ${
            isDayMode
              ? "bg-black bg-opacity-75"
              : "bg-gray-900 bg-opacity-90"
          }`}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default OrchardGallery;