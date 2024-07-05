import React, { createContext, useState, useContext, useEffect } from 'react';

const TutorialContext = createContext();

export const useTutorial = () => {
  return useContext(TutorialContext);
};

export const TutorialProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [showCharacter, setShowCharacter] = useState(true);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  const steps = [
    {
      message: 'Welcome to the article summarizer! Click Next to start the tour.',
      duration: 2000, 
    },
    {
      message: 'Enter the URL of an article and click ↵ to get a summary.',
      duration: null, 
    },
    {
      message: 'View the summary of the article here.',
      duration: 3000, 
    },
    {
      message: 'Click the GitHub button to visit my GitHub page.',
      duration: null, 
    },
    {
      message: '',
      duration: null, 
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (steps[step]?.duration !== null) {
        nextStep();
      }
    }, steps[step]?.duration || 0);

    return () => clearTimeout(timer);
  }, [step, steps, nextStep]);

  useEffect(() => {
    if (step === steps.length - 1) {
      setShowCharacter(false);
    }
  }, [step, steps]);

  return (
    <TutorialContext.Provider value={{ step, steps, nextStep, prevStep, showCharacter }}>
      {children}
    </TutorialContext.Provider>
  );
};
