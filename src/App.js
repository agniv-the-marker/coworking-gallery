import React, { useState } from 'react';

// Sample images - you'll replace these with your actual image imports
const images = [
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
'/images/nighttime/DSC_0049.JPG', // daytime
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



const CoworkingSpaceGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="36" 
          height="36" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mr-3 text-blue-600"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polygon points="21 15 16 10 5 21"></polygon>
        </svg>
        <h1 className="text-3xl font-bold text-gray-800">Coworking Space Gallery</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
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

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
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