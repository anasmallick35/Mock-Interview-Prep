import React from "react";

interface ConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Card: React.FC<ConfirmationProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="group select-none w-[300px] flex flex-col p-6 bg-gray-800 border border-gray-700 shadow-lg rounded-2xl">
        <div className="text-center p-3 flex-auto">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="group-hover:animate-bounce w-12 h-12 text-red-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              fillRule="evenodd"
            />
          </svg>
          <h2 className="text-xl font-bold py-4 text-gray-200">Are you sure?</h2>
          <p className="font-bold text-sm text-gray-400 px-2">
            Do you really want to continue? This process cannot be undone.
          </p>
        </div>
        <div className="p-2 mt-4 text-center space-x-2">
          <button
            className="bg-gray-700 px-5 py-2 text-sm font-medium border-2 border-gray-600 text-gray-300 rounded-full hover:bg-gray-800 transition duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 px-5 py-2 text-sm font-medium border-2 border-red-500 text-white rounded-full hover:bg-transparent hover:text-red-500 transition duration-300"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
