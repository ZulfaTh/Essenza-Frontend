import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function CustomDropdown({ options, selected, onSelect, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* The button that shows the selected value and toggles the dropdown */}
      <div
        className="p-3 rounded bg-white text-gray-800 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected?.name || placeholder}</span>
        <FaChevronDown className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* The dropdown list of options */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-48 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={option._id}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="p-3 cursor-pointer hover:bg-gray-200 text-gray-800"
              >
                {option.name}
              </li>
            ))
          ) : (
            <li className="p-3 text-gray-500">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
}