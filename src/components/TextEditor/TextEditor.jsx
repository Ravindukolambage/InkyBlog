import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({ value, onChange }) => {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    height: 400,
    width: 837,
    uploader: {
      insertImageAsBase64URI: true,
    },
    buttons: [
      'source', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'image', 'video', 'link', '|',
      'left', 'center', 'right', 'justify', '|',
      'undo', 'redo'
    ],
    toolbarAdaptive: false,
    showXPathInStatusbar: false
  }), []);

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onChange={onChange}
    />
  );
};

export default TextEditor;