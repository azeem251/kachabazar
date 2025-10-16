import React from "react";

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div>
      <div
        onClick={onClick}
        className="cursor-pointer bg-gray-100 p-2 flex justify-between items-center"
      >
        <strong className="text-slate-700">{question}</strong>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] mt-2 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600 bg-slate-50 p-3">{answer}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
