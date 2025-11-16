import type { JSX } from 'react';

const DiagramPreview = (): JSX.Element => {
  return (
    <div className="diagram-preview">
      <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="40" r="15" fill="var(--accent)" opacity="0.8" className="node-animate" />
        <circle cx="100" cy="80" r="15" fill="var(--accent)" opacity="0.8" className="node-animate" style={{ animationDelay: '0.2s' }} />
        <circle cx="150" cy="40" r="15" fill="var(--accent)" opacity="0.8" className="node-animate" style={{ animationDelay: '0.4s' }} />
        <line x1="65" y1="50" x2="85" y2="70" stroke="var(--accent)" strokeWidth="2" opacity="0.4" />
        <line x1="115" y1="70" x2="135" y2="50" stroke="var(--accent)" strokeWidth="2" opacity="0.4" />
        <text x="50" y="110" textAnchor="middle" fontSize="12" fill="var(--text)" opacity="0.7">Start</text>
        <text x="100" y="130" textAnchor="middle" fontSize="12" fill="var(--text)" opacity="0.7">Process</text>
        <text x="150" y="110" textAnchor="middle" fontSize="12" fill="var(--text)" opacity="0.7">End</text>
      </svg>
    </div>
  );
};

export default DiagramPreview;
