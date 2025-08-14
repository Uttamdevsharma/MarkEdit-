
import React from 'react';

const Toolbar = ({ onButtonClick }) => {
  return (
    <div className="bg-gray-200 p-2 flex items-center">
      <button
        className="mr-2 px-3 py-1 bg-gray-300 rounded"
        onClick={() => onButtonClick('bold')}
      >
        Bold
      </button>
      <button
        className="mr-2 px-3 py-1 bg-gray-300 rounded"
        onClick={() => onButtonClick('italic')}
      >
        Italic
      </button>
      <button
        className="mr-2 px-3 py-1 bg-gray-300 rounded"
        onClick={() => onButtonClick('heading')}
      >
        Heading
      </button>
      <button
        className="mr-2 px-3 py-1 bg-gray-300 rounded"
        onClick={() => onButtonClick('ordered-list')}
      >
        Ordered List
      </button>
      <button
        className="mr-2 px-3 py-1 bg-gray-300 rounded"
        onClick={() => onButtonClick('unordered-list')}
      >
        Unordered List
      </button>
      <button
        className="mr-2 px-3 py-1 bg-gray-300 rounded"
        onClick={() => onButtonClick('link')}
      >
        Link
      </button>
      <button
        className="mr-2 px-3 py-1 bg-gray-300 rounded"
        onClick={() => onButtonClick('code-block')}
      >
        Code Block
      </button>
    </div>
  );
};

export default Toolbar;
