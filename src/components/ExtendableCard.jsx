import React, { useState } from 'react';

const ExtendableCard = () => {
  const [isFolded, setIsFolded] = useState(true);

  const toggleFold = () => {
    setIsFolded(!isFolded);
  };

  return (
    <div className="w-64 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">Judul Kartu</h3>
        <p className="text-gray-700">
          Ini adalah konten kartu yang dapat dilipat. Anda dapat menambahkan konten apa pun di sini.
        </p>
      </div>
      <div className="p-4 bg-gray-100">
        {isFolded ? (
          <button
            onClick={toggleFold}
            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
          >
            Buka Kartu
          </button>
        ) : (
          <div>
            <p className="text-gray-700">
              Ini adalah bagian tambahan dari kartu yang dilipat. Konten ini muncul ketika kartu dibuka.
            </p>
            <button
              onClick={toggleFold}
              className="mt-2 text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
            >
              Lipat Kartu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtendableCard;
