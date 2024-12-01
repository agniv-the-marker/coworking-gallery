import React, { useState, useEffect } from 'react';

const CoworkingSpaceGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDayMode, setIsDayMode] = useState(true);

  // Predefined image lists
// Day images
const dayImages = [
'/images/daytime/DSC_0001.JPG',
'/images/daytime/DSC_0002.JPG',
'/images/daytime/DSC_0003 (2).JPG',
'/images/daytime/DSC_0003.JPG',
'/images/daytime/DSC_0004 (2).JPG',
'/images/daytime/DSC_0004.JPG',
'/images/daytime/DSC_0005 (2).JPG',
'/images/daytime/DSC_0005.JPG',
'/images/daytime/DSC_0006 (2).JPG',
'/images/daytime/DSC_0006 (3).JPG',
'/images/daytime/DSC_0006.JPG',
'/images/daytime/DSC_0007 (2).JPG',
'/images/daytime/DSC_0007 (3).JPG',
'/images/daytime/DSC_0007.JPG',
'/images/daytime/DSC_0008 (2).JPG',
'/images/daytime/DSC_0008 (3).JPG',
'/images/daytime/DSC_0008.JPG',
'/images/daytime/DSC_0009 (2).JPG',
'/images/daytime/DSC_0009 (3).JPG',
'/images/daytime/DSC_0009.JPG',
'/images/daytime/DSC_0010 (2).JPG',
'/images/daytime/DSC_0010 (3).JPG',
'/images/daytime/DSC_0010.JPG',
'/images/daytime/DSC_0011 (2).JPG',
'/images/daytime/DSC_0011 (3).JPG',
'/images/daytime/DSC_0011.JPG',
'/images/daytime/DSC_0012 (2).JPG',
'/images/daytime/DSC_0012 (3).JPG',
'/images/daytime/DSC_0012.JPG',
'/images/daytime/DSC_0013 (2).JPG',
'/images/daytime/DSC_0013 (3).JPG',
'/images/daytime/DSC_0013.JPG',
'/images/daytime/DSC_0014 (2).JPG',
'/images/daytime/DSC_0014 (3).JPG',
'/images/daytime/DSC_0014.JPG',
'/images/daytime/DSC_0015 (2).JPG',
'/images/daytime/DSC_0015 (3).JPG',
'/images/daytime/DSC_0015.JPG',
'/images/daytime/DSC_0016 (2).JPG',
'/images/daytime/DSC_0016 (3).JPG',
'/images/daytime/DSC_0016.JPG',
'/images/daytime/DSC_0017 (2).JPG',
'/images/daytime/DSC_0017.JPG',
'/images/daytime/DSC_0018 (2).JPG',
'/images/daytime/DSC_0018.JPG',
'/images/daytime/DSC_0019 (2).JPG',
'/images/daytime/DSC_0019.JPG',
'/images/daytime/DSC_0020 (2).JPG',
'/images/daytime/DSC_0020.JPG',
'/images/daytime/DSC_0021 (2).JPG',
'/images/daytime/DSC_0021.JPG',
'/images/daytime/DSC_0022 (2).JPG',
'/images/daytime/DSC_0022.JPG',
'/images/daytime/DSC_0023 (2).JPG',
'/images/daytime/DSC_0023.JPG',
'/images/daytime/DSC_0024 (2).JPG',
'/images/daytime/DSC_0024.JPG',
'/images/daytime/DSC_0025 (2).JPG',
'/images/daytime/DSC_0025.JPG',
'/images/daytime/DSC_0026 (2).JPG',
'/images/daytime/DSC_0026.JPG',
'/images/daytime/DSC_0027 (2).JPG',
'/images/daytime/DSC_0027.JPG',
'/images/daytime/DSC_0028 (2).JPG',
'/images/daytime/DSC_0028.JPG',
'/images/daytime/DSC_0029 (2).JPG',
'/images/daytime/DSC_0029.JPG',
'/images/daytime/DSC_0030 (2).JPG',
'/images/daytime/DSC_0030.JPG',
'/images/daytime/DSC_0031 (2).JPG',
'/images/daytime/DSC_0031.JPG',
'/images/daytime/DSC_0032 (2).JPG',
'/images/daytime/DSC_0032.JPG',
'/images/daytime/DSC_0033 (2).JPG',
'/images/daytime/DSC_0033.JPG',
'/images/daytime/DSC_0034 (2).JPG',
'/images/daytime/DSC_0034.JPG',
'/images/daytime/DSC_0035 (2).JPG',
'/images/daytime/DSC_0035.JPG',
'/images/daytime/DSC_0036.JPG',
'/images/daytime/DSC_0037.JPG',
'/images/daytime/DSC_0038.JPG',
'/images/daytime/DSC_0039.JPG',
'/images/daytime/DSC_0040.JPG',
'/images/daytime/DSC_0041.JPG',
'/images/daytime/DSC_0042.JPG',
'/images/daytime/DSC_0043.JPG',
'/images/daytime/DSC_0044.JPG',
'/images/daytime/DSC_0045.JPG',
'/images/daytime/DSC_0046.JPG',
'/images/daytime/DSC_0047.JPG',
'/images/daytime/DSC_0048.JPG',
'/images/daytime/DSC_0049.JPG',
'/images/daytime/DSC_0050.JPG',
'/images/daytime/DSC_0051.JPG',
'/images/daytime/DSC_0052.JPG',
'/images/daytime/DSC_0053.JPG',
'/images/daytime/DSC_0054.JPG',
'/images/daytime/DSC_0055.JPG',
'/images/daytime/DSC_0056.JPG',
'/images/daytime/DSC_0057.JPG',
'/images/daytime/DSC_0058.JPG',
'/images/daytime/DSC_0059.JPG'
];

// Night images
const nightImages = [
  '/images/nighttime/DSC_0001.JPG',
'/images/nighttime/DSC_0002 (2).JPG',
'/images/nighttime/DSC_0002 (3).JPG',
'/images/nighttime/DSC_0002.JPG',
'/images/nighttime/DSC_0003 (2).JPG',
'/images/nighttime/DSC_0003 (3).JPG',
'/images/nighttime/DSC_0003.JPG',
'/images/nighttime/DSC_0004 (2).JPG',
'/images/nighttime/DSC_0004 (3).JPG',
'/images/nighttime/DSC_0004 (4).JPG',
'/images/nighttime/DSC_0004.JPG',
'/images/nighttime/DSC_0005 (2).JPG',
'/images/nighttime/DSC_0005 (3).JPG',
'/images/nighttime/DSC_0005.JPG',
'/images/nighttime/DSC_0006 (2).JPG',
'/images/nighttime/DSC_0006 (3).JPG',
'/images/nighttime/DSC_0006 (4).JPG',
'/images/nighttime/DSC_0006.JPG',
'/images/nighttime/DSC_0007 (2).JPG',
'/images/nighttime/DSC_0007 (3).JPG',
'/images/nighttime/DSC_0007.JPG',
'/images/nighttime/DSC_0008 (2).JPG',
'/images/nighttime/DSC_0008 (3).JPG',
'/images/nighttime/DSC_0008.JPG',
'/images/nighttime/DSC_0009 (2).JPG',
'/images/nighttime/DSC_0009 (3).JPG',
'/images/nighttime/DSC_0009.JPG',
'/images/nighttime/DSC_0010 (2).JPG',
'/images/nighttime/DSC_0010 (3).JPG',
'/images/nighttime/DSC_0010.JPG',
'/images/nighttime/DSC_0011 (2).JPG',
'/images/nighttime/DSC_0011 (3).JPG',
'/images/nighttime/DSC_0011.JPG',
'/images/nighttime/DSC_0012 (2).JPG',
'/images/nighttime/DSC_0012 (3).JPG',
'/images/nighttime/DSC_0012.JPG',
'/images/nighttime/DSC_0013 (2).JPG',
'/images/nighttime/DSC_0013 (3).JPG',
'/images/nighttime/DSC_0013.JPG',
'/images/nighttime/DSC_0014 (2).JPG',
'/images/nighttime/DSC_0014 (3).JPG',
'/images/nighttime/DSC_0014.JPG',
'/images/nighttime/DSC_0015 (2).JPG',
'/images/nighttime/DSC_0015 (3).JPG',
'/images/nighttime/DSC_0015.JPG',
'/images/nighttime/DSC_0016 (2).JPG',
'/images/nighttime/DSC_0016 (3).JPG',
'/images/nighttime/DSC_0016.JPG',
'/images/nighttime/DSC_0017 (2).JPG',
'/images/nighttime/DSC_0017 (3).JPG',
'/images/nighttime/DSC_0017.JPG',
'/images/nighttime/DSC_0018 (2).JPG',
'/images/nighttime/DSC_0018 (3).JPG',
'/images/nighttime/DSC_0018.JPG',
'/images/nighttime/DSC_0019 (2).JPG',
'/images/nighttime/DSC_0019 (3).JPG',
'/images/nighttime/DSC_0019.JPG',
'/images/nighttime/DSC_0020 (2).JPG',
'/images/nighttime/DSC_0020 (3).JPG',
'/images/nighttime/DSC_0020.JPG',
'/images/nighttime/DSC_0021 (2).JPG',
'/images/nighttime/DSC_0021 (3).JPG',
'/images/nighttime/DSC_0021.JPG',
'/images/nighttime/DSC_0022 (2).JPG',
'/images/nighttime/DSC_0022 (3).JPG',
'/images/nighttime/DSC_0022.JPG',
'/images/nighttime/DSC_0023 (2).JPG',
'/images/nighttime/DSC_0023 (3).JPG',
'/images/nighttime/DSC_0023.JPG',
'/images/nighttime/DSC_0024 (2).JPG',
'/images/nighttime/DSC_0024 (3).JPG',
'/images/nighttime/DSC_0024.JPG',
'/images/nighttime/DSC_0025 (2).JPG',
'/images/nighttime/DSC_0025 (3).JPG',
'/images/nighttime/DSC_0025.JPG',
'/images/nighttime/DSC_0026 (2).JPG',
'/images/nighttime/DSC_0026.JPG',
'/images/nighttime/DSC_0027 (2).JPG',
'/images/nighttime/DSC_0027.JPG',
'/images/nighttime/DSC_0028 (2).JPG',
'/images/nighttime/DSC_0028.JPG',
'/images/nighttime/DSC_0029 (2).JPG',
'/images/nighttime/DSC_0029.JPG',
'/images/nighttime/DSC_0030 (2).JPG',
'/images/nighttime/DSC_0030.JPG',
'/images/nighttime/DSC_0031 (2).JPG',
'/images/nighttime/DSC_0031.JPG',
'/images/nighttime/DSC_0032 (2).JPG',
'/images/nighttime/DSC_0032.JPG',
'/images/nighttime/DSC_0033 (2).JPG',
'/images/nighttime/DSC_0033.JPG',
'/images/nighttime/DSC_0034 (2).JPG',
'/images/nighttime/DSC_0034.JPG',
'/images/nighttime/DSC_0035 (2).JPG',
'/images/nighttime/DSC_0035.JPG',
'/images/nighttime/DSC_0036 (2).JPG',
'/images/nighttime/DSC_0036.JPG',
'/images/nighttime/DSC_0037 (2).JPG',
'/images/nighttime/DSC_0037.JPG',
'/images/nighttime/DSC_0038 (2).JPG',
'/images/nighttime/DSC_0038.JPG',
'/images/nighttime/DSC_0039 (2).JPG',
'/images/nighttime/DSC_0039.JPG',
'/images/nighttime/DSC_0040 (2).JPG',
'/images/nighttime/DSC_0040.JPG',
'/images/nighttime/DSC_0041 (2).JPG',
'/images/nighttime/DSC_0041.JPG',
'/images/nighttime/DSC_0042.JPG',
'/images/nighttime/DSC_0043.JPG',
'/images/nighttime/DSC_0044.JPG',
'/images/nighttime/DSC_0045.JPG',
'/images/nighttime/DSC_0046.JPG',
'/images/nighttime/DSC_0047.JPG',
'/images/nighttime/DSC_0048.JPG',
'/images/nighttime/DSC_0049.JPG'
];

  // Simple toggle mode function
  const toggleMode = () => {
    setIsDayMode(!isDayMode);
  };

  // Update images when mode changes
  useEffect(() => {
    setImages(isDayMode ? dayImages : nightImages);
  }, [isDayMode]);

  return (
    <div 
      className={`min-h-screen p-4 transition-colors duration-500 ${
        isDayMode 
          ? 'bg-white text-gray-800' 
          : 'bg-gray-900 text-white'
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
                isDayMode 
                  ? 'bg-yellow-300' 
                  : 'bg-indigo-600'
              }`}
            />
            <div 
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                isDayMode 
                  ? 'transform translate-x-0' 
                  : 'transform translate-x-8'
              }`}
            />
          </div>
          <span className="ml-3">
            {isDayMode ? 'Day Mode' : 'Night Mode'}
          </span>
        </label>
      </div>

      {/* Gallery Title */}
      <h1 className={`text-3xl font-bold mb-6 ${
        isDayMode ? 'text-gray-800' : 'text-white'
      }`}>
        Coworking Space Gallery
      </h1>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer ${
              isDayMode 
                ? 'hover:shadow-lg' 
                : 'hover:shadow-xl hover:shadow-indigo-500/50'
            }`}
            onClick={() => setSelectedImage(image)}
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
              ? 'bg-black bg-opacity-75' 
              : 'bg-gray-900 bg-opacity-90'
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