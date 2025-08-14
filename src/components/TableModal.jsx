import React, { useState } from 'react';

const TableModal = ({ onClose, onInsertTable }) => {
  const [rows, setRows] = useState(3); // Default rows
  const [cols, setCols] = useState(2); // Default columns

  const handleSubmit = (e) => {
    e.preventDefault();
    onInsertTable(rows, cols);
  };

  return (
    <div className="fixed top-16 right-4 bg-gray-600 bg-opacity-50 flex items-start justify-end z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Insert Table</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rows" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Rows:
            </label>
            <input
              type="number"
              id="rows"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={rows}
              onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cols" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Columns:
            </label>
            <input
              type="number"
              id="cols"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={cols}
              onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableModal;