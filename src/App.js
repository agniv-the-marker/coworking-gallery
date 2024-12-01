import React, { useState, useEffect } from "react";
import {dayImages, nightImages} from "./images";

// Utility function to shuffle images
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const CoworkingSpaceGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDayMode, setIsDayMode] = useState(true);
  const [audio, setAudio] = useState(null);

  // Function to toggle day/night mode
  const toggleMode = () => {
    setIsDayMode(!isDayMode);
  };

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

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-500 ${
        isDayMode ? "bg-yellow-100 text-gray-800" : "bg-gray-900 text-white"
      }`}
    >
      {/* Day/Night Toggle */}
      <div className="flex justify-end mb-4">
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
          <span className="ml-3">
            {isDayMode ? "Day Mode" : "Night Mode"}
          </span>
        </label>
      </div>

      {/* Gallery Title */}
      <h1
        className={`text-3xl font-bold mb-6 ${
          isDayMode ? "text-gray-800" : "text-white"
        }`}
      >
        Coworking Space Gallery
      </h1>

      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer ${
              isDayMode
                ? "hover:shadow-lg"
                : "hover:shadow-xl hover:shadow-indigo-500/50"
            }`}
            onClick={() => setSelectedImage(image)}
            style={{
              gridColumn: image.includes("vertical") ? "span 1" : "span 2",
            }}
          >
            <img
              src={image}
              alt={`Coworking space ${index + 1}`}
              className="w-full h-48 object-cover"
            />
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

export default CoworkingSpaceGallery;
