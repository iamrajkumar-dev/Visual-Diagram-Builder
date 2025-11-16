import React from 'react';

interface TitleEditorProps {
  diagramId?: string;
  title: string;
  setTitle: (title: string) => void;
}

const TitleEditor: React.FC<TitleEditorProps> = ({ diagramId, title, setTitle }) => {
  return (
    <>
      <h3>{diagramId ? 'Edit Diagram' : 'New Diagram'}</h3>
      <div style={{ marginBottom: 12 }}>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: 8 }}
          placeholder="Enter diagram title"
        />
      </div>
    </>
  );
};

export default TitleEditor;
