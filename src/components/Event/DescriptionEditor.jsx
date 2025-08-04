'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
};

export default function DescriptionEditor({ value, onChange }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = (
    <div
      className={`transition-all duration-300 ${fullscreen
          ? 'fixed top-0 left-0 w-screen h-screen z-[9999] bg-white p-4'
          : ''
        }`}
    >
      {/* Fullscreen Toggle Button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setFullscreen(!fullscreen)}
          className="flex items-center gap-2 px-3 py-1 border rounded-md text-sm shadow-sm hover:bg-gray-100 transition"
        >
          {fullscreen ? (
            <>
              <BsFullscreenExit /> Exit Fullscreen
            </>
          ) : (
            <>
              <BsArrowsFullscreen /> Fullscreen
            </>
          )}
        </button>
      </div>

      {/* Editor */}
      <div className="border rounded">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          style={{
            height: fullscreen ? 'calc(100vh - 150px)' : '250px',
            overflowY: 'auto'
          }}
        />
      </div>
    </div>
  );

  if (fullscreen && mounted && typeof window !== 'undefined') {
    return createPortal(editor, document.body);
  }

  return editor;
}
