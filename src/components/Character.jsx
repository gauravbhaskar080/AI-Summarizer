import React from 'react';

const Character = ({ message }) => {
  return (
    <div className="flex flex-col items-center fixed bottom-16  left-5 z-50 space-y-2">
      <div className="relative flex items-center ">
        <img src="/images/zoro.png" alt="Guide" className="w-[150px] h-[200px]" />
        <div className="absolute -top-[10px] -right-[180px]  bg-gray-800 w-[220px] text-white p-4 rounded-lg shadow-lg max-w-xs ml-2">
          {message}
          <div className="absolute -left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-800 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default Character;
