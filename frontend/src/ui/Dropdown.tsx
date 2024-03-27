import React, { useState } from "react";

interface DropdownProps {
  name: string;
  options: string[];
  label?: string;
  customClass?: string;
  onSelect: (selectedOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  options,
  label,
  customClass,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [optionName, setOptionName] = useState<string>(name);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSelect = (option: string, index: number) => {
    setOptionName(option);
    onSelect(option);
    setSelectedOptionIndex(index);
    closeDropdown();
  };

  return (
    <div className={`relative inline-block text-left w-full ${customClass}`}>
      {label && <p className="font-medium">{label}</p>}
      <div className="mt-2">
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={toggleDropdown}
            className={`inline-flex justify-between w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-secondary ${
              selectedOptionIndex !== -1 ? "bg-gray-200" : ""
            }`}
            id="options-menu"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {optionName}
            <svg
              className={`-mr-1 ml-2 h-5 w-5 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>

      {/* Dropdown panel, show when clicking on the button */}
      {isOpen && (
        <div className="origin-top-right z-50 absolute right-30 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option, index)}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
                  index === selectedOptionIndex ? "bg-gray-200" : ""
                }`}
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
