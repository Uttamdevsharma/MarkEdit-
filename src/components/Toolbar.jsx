
import React from 'react';

const Toolbar = ({ onButtonClick }) => {
  return (
    <div className="bg-gray-800 text-white p-3 flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="mr-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => onButtonClick('bold')}
        >
          Bold
        </button>
        <button
          className="mr-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => onButtonClick('italic')}
        >
          Italic
        </button>
        <button
          className="mr-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => onButtonClick('heading')}
        >
          Heading
        </button>
        <button
          className="mr-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => onButtonClick('ordered-list')}
        >
          Ordered List
        </button>
        <button
          className="mr-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => onButtonClick('unordered-list')}
        >
          Unordered List
        </button>
        <button
          className="mr-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => onButtonClick('link')}
        >
          Link
        </button>
        <button
          className="mr-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => onButtonClick('code-block')}
        >
          Code Block
        </button>
        <button
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => onButtonClick('table')}
        >
          Table
        </button>
      </div>
      <div className="flex items-center">
        <button
          className="mr-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => onButtonClick('download-md')}
        >
          Download .md
        </button>
        <button
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => onButtonClick('download-pdf')}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
