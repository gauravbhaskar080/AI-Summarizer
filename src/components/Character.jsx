import React, { useState } from "react";
import { zoro, commentator } from "../assets";
import "./Character.css";
import { useTutorial } from "../context/TutorialContext";

const Character = ({ message }) => {
  const { nextStep, prevStep, step, steps } = useTutorial();
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleNextStep = () => {
    nextStep();
    if(step == steps.length){
      setIsOpen();
    }
  };

  const handlePrevStep = () => {
    prevStep();
  };

  return (
    <>
      {isOpen && (
        <div className="flex flex-col items-center fixed bottom-16 left-5 z-50 space-y-2 character-container">
          <div className="relative flex items-center ">
            <img src={zoro} alt="Guide" className="w-[150px] h-[200px]" />
            <div className="absolute -top-[10px] -right-[180px] bg-gray-800 w-[220px] text-white p-4 rounded-lg shadow-lg max-w-xs ml-2">
              {message}
              <div className="absolute -left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-800 rotate-45"></div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevStep}
              disabled={step === 0}
              className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextStep}
              disabled={step === steps.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {!isOpen &&  (
        <img
          src={commentator}
          alt="commentator Icon"
          className="commentator-icon"
          onClick={toggleChatbot}
        />
      )}
      
    </>
  );
};

export default Character;
