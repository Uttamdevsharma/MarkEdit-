import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';


const Preview = ({ value, imageMap, previewRef }) => {

  return (
    <div className="h-full flex flex-col border-t border-gray-300 mb-4">
      <div ref={previewRef} className="p-4 pl-12 flex-1 overflow-auto prose">
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

