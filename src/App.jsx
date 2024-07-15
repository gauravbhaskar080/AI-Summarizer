import React, { useEffect, useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import { TutorialProvider, useTutorial } from "./context/TutorialContext";
import Character from "./components/Character";
import Chatbot from "./components/Chatbot";

const Tutorial = () => {
  const { step, steps, nextStep, prevStep, showCharacter } = useTutorial();
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => setUserInteracted(true);

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (steps[step]?.message) {
      const speakMessage = () => {
        try {
          const utterance = new SpeechSynthesisUtterance(steps[step].message);
          speechSynthesis.speak(utterance);
        } catch (error) {
          console.error("Error fetching text-to-speech:", error);
        }
      };

      speakMessage();
    }
  }, [step, steps, userInteracted]);

  return (
    <div className="fixed bottom-5 left-5 flex flex-col items-center space-y-2 z-50">
      {showCharacter && steps[step] && (
        <Character message={steps[step].message}  />
      )}
      {/* {step !== steps.length - 1 && (
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
      )} */}
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <TutorialProvider>
      <main>
        <div className="main">
          <div className="gradient" />
        </div>
        <div className="app">
          <Hero toggleTheme={toggleTheme} />
          <Demo />
          <div className="mt-[18rem]">
            <Tutorial />
            <Chatbot />
          </div>
        </div>
      </main>
    </TutorialProvider>
  );
};

export default App;
