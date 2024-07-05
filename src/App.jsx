import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Demo from './components/Demo';
import { TutorialProvider, useTutorial } from './context/TutorialContext';
import Character from './components/Character';

const Tutorial = () => {
  const { step, steps, nextStep, prevStep, showCharacter } = useTutorial();

  return (
    <div className="fixed bottom-5 left-5 flex flex-col items-center space-y-2 z-50">
      {showCharacter && steps[step] && (
        <Character message={steps[step].message} />
      )}
      {step !== steps.length - 1 && ( 
        <div className="flex space-x-2">
          <button 
            onClick={prevStep} 
            disabled={step === 0}
            className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            onClick={nextStep} 
            disabled={step === steps.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <TutorialProvider>
      <main>
        <div className="main">
          <div className="gradient" />
        </div>
        <div className="app">
          <Hero />
          <Demo />
          <Tutorial />
        </div>
      </main>
    </TutorialProvider>
  );
};

export default App;
