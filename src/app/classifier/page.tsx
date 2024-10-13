'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const InputDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState(""); // Store submitted value
  const [error, setError] = useState(""); // Store error message

  const sanitizeInput = (input: string) => {
    // Remove any unwanted characters or trim whitespace
    return input.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  };

  const validateInput = (input: string) => {
    // Example validation: input must be between 1 and 50 characters
    if (input.length < 1 || input.length > 50) {
      return "Input must be between 1 and 50 characters.";
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    const sanitizedInput = sanitizeInput(inputValue);
    const validationError = validateInput(sanitizedInput);

    if (validationError) {
      setError(validationError);
      setSubmittedValue("");
    } else {
      setError("");
      setSubmittedValue(sanitizedInput); // Set the submitted value
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 max-w-lg w-full">
          <h1 className="text-2xl font-semibold text-center mb-6">Search for Information</h1>
          <Input 
            type="text" 
            placeholder="Type here..." 
            value={inputValue} 
            onChange={handleInputChange} 
            className="w-full px-4 py-2 mb-4 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400 transition-all duration-300 rounded-md"
          />
          <Button 
            onClick={handleButtonClick} 
            className="w-full py-2 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
            Display Text
          </Button>
          {error && ( // Conditionally render the error message
            <div className="mt-6 text-center text-xl text-red-500">
              {error}
            </div>
          )}
          {submittedValue && !error && ( // Conditionally render the submitted text
            <div className="mt-6 text-center text-xl text-blue-500">
              You entered: {submittedValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputDemo;
