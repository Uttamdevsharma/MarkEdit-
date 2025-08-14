
import React, { useRef, useEffect } from 'react';

const Editor = ({ value, onChange, onImageDrop, onInsertText }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (onInsertText) {
      onInsertText.current = (textToInsert) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newValue = value.substring(0, start) + textToInsert + value.substring(end);
        onChange(newValue);

        setTimeout(() => {
          textarea.selectionStart = start + textToInsert.length;
          textarea.selectionEnd = start + textToInsert.length;
          textarea.focus();
        }, 0);
      };
    }
  }, [value, onChange, onInsertText]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    let newMarkdown = value;
    let cursorPosition = textareaRef.current.selectionStart;

    files.forEach((file) => {
      if (file && file.type.startsWith('image/')) {
        const altText = window.prompt('Enter Alt Text for the image (optional):', file.name);
        const uniqueId = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const markdownImage = `![${altText || ''}](${uniqueId})`;

        newMarkdown = newMarkdown.substring(0, cursorPosition) + markdownImage + newMarkdown.substring(cursorPosition);
        cursorPosition += markdownImage.length;

        onImageDrop(uniqueId, file);
      }
    });

    onChange(newMarkdown);
  };

  return (
    <div className="h-full border-t border-gray-300 mb-4" onDragOver={handleDragOver} onDrop={handleDrop}>
      <textarea
        ref={textareaRef}
        className="w-full h-full p-4 border-r border-gray-300 resize-none focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Editor;
