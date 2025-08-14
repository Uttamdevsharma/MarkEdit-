import React, { useState, useEffect, useRef } from 'react';
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Editor from './components/Editor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import TableModal from './components/TableModal';
import useLocalStorage from './hooks/useLocalStorage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  const [markdown, setMarkdown] = useLocalStorage('markdown', '# Hello, Markdown!\n\nDrag and drop an image here.');
  const [imageMap, setImageMap] = useState({}); // Stores { uniqueId: File }
  const [objectUrlMap, setObjectUrlMap] = useState({}); // Stores { uniqueId: objectURL }

  const handleImageDrop = (uniqueId, file) => {
    setImageMap(prevMap => ({ ...prevMap, [uniqueId]: file }));
    const url = URL.createObjectURL(file);
    setObjectUrlMap(prevMap => ({ ...prevMap, [uniqueId]: url }));
  };

  const [showTableModal, setShowTableModal] = useState(false);
  const insertTextRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    // Cleanup object URLs when component unmounts or imageMap changes
    return () => {
      Object.values(objectUrlMap).forEach(url => URL.revokeObjectURL(url));
    };
  }, [objectUrlMap]);

  const generateTableMarkdown = (rows, cols) => {
    let header = '|';
    let separator = '|';
    for (let i = 1; i <= cols; i++) {
      header += ` Column ${i} |`;
      separator += `----------|`;
    }
    header += '\n';
    separator += '\n';

    let body = '';
    for (let i = 0; i < rows - 1; i++) {
      let row = '|';
      for (let j = 0; j < cols; j++) {
        row += `          |`;
      }
      body += row + '\n';
    }
    return header + separator + body;
  };

  const handleInsertTable = (rows, cols) => {
    const tableMarkdown = generateTableMarkdown(rows, cols);
    if (insertTextRef.current) {
      insertTextRef.current(tableMarkdown);
    }
    setShowTableModal(false);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    const input = previewRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('markdown.pdf');
      });
    } else {
      alert('Preview content not available for PDF download.');
    }
  };

  const handleToolbarClick = (type) => {
    if (type === 'table') {
      setShowTableModal(true);
      return;
    }

    if (type === 'download-md') {
      handleDownloadMarkdown();
      return;
    }

    if (type === 'download-pdf') {
      handleDownloadPdf();
      return;
    }

    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    let newText;

    switch (type) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'heading':
        newText = `# ${selectedText}`;
        break;
      case 'ordered-list':
        newText = selectedText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
        break;
      case 'unordered-list':
        newText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        break;
      case 'link':
        const url = window.prompt('Enter the URL:');
        if (url) {
          newText = selectedText ? `[${selectedText}](${url})` : `[Text](${url})`;
        } else {
          newText = selectedText; // If no URL is entered, don't change the text
        }
        break;
      case 'code-block':
        newText = '```js\n' + selectedText + '\n```';
        break;
      default:
        newText = selectedText;
    }

    const newValue = markdown.substring(0, start) + newText + markdown.substring(end);
    setMarkdown(newValue);
  };

  return (
    <div className="h-screen flex flex-col">
      <Toolbar onButtonClick={handleToolbarClick} />
      <div className="flex-1">
        <Allotment>
          <Editor value={markdown} onChange={setMarkdown} onImageDrop={handleImageDrop} onInsertText={insertTextRef} />
          <Preview value={markdown} imageMap={objectUrlMap} previewRef={previewRef} />
        </Allotment>
      </div>
      {showTableModal && (
        <TableModal
          onClose={() => setShowTableModal(false)}
          onInsertTable={handleInsertTable}
        />
      )}
    </div>
  );
};

export default App;