import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const Preview = ({ value, imageMap }) => {
  const previewRef = useRef(null);

  const handleDownloadMD = () => {
    const blob = new Blob([value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const input = previewRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('markdown.pdf');
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-200 p-2 flex justify-end">
        <button
          className="mr-2 px-3 py-1 bg-gray-300 rounded"
          onClick={handleDownloadMD}
        >
          Download .md
        </button>
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={handleDownloadPDF}
        >
          Download .pdf
        </button>
      </div>
      <div ref={previewRef} className="p-4 border-t border-gray-300 flex-1 overflow-auto prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          
          components={{
            img: ({ node, ...props }) => {
              const src = props.src;
              const objectURL = imageMap[src];
              if (objectURL) {
                return <img {...props} src={objectURL} className="w-12 h-12 object-contain mb-2" />;
              }
              return <img {...props} className="w-12 h-12 object-contain mb-2" />;
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {value}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Preview;
