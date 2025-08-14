import React, { useState, useEffect } from 'react';
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Editor from './components/Editor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

const App = () => {
  const [markdown, setMarkdown] = useLocalStorage('markdown', '# Hello, Markdown!\n\nDrag and drop an image here.');
  const [imageMap, setImageMap] = useState({}); // Stores { uniqueId: File }
  const [objectUrlMap, setObjectUrlMap] = useState({}); // Stores { uniqueId: objectURL }

  useEffect(() => {
    // Cleanup object URLs when component unmounts or imageMap changes
    return () => {
      Object.values(objectUrlMap).forEach(url => URL.revokeObjectURL(url));
    };
  }, [objectUrlMap]);

  const handleImageDrop = (uniqueId, file) => {
    setImageMap(prevMap => ({ ...prevMap, [uniqueId]: file }));
    const url = URL.createObjectURL(file);
    setObjectUrlMap(prevMap => ({ ...prevMap, [uniqueId]: url }));
  };

  const handleToolbarClick = (type) => {
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
          <Editor value={markdown} onChange={setMarkdown} onImageDrop={handleImageDrop} />
          <Preview value={markdown} imageMap={objectUrlMap} />
        </Allotment>
      </div>
    </div>
  );
};

export default App;