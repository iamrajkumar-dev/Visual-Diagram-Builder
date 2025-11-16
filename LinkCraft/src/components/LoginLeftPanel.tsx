import type { JSX } from 'react';
import React from 'react';
import LoginBrand from './LoginBrand';
import FeaturesList from './FeaturesList';
import DiagramPreview from './DiagramPreview';

const LoginLeftPanel = (): JSX.Element => {
  return (
    <div className="login-left">
      <LoginBrand />
      <div className="login-content">
        <h2>Create Beautiful Diagrams</h2>
        <p>Design, connect, and share your ideas with an intuitive diagram builder.</p>
        <FeaturesList />
        <DiagramPreview />
      </div>
    </div>
  );
};

export default React.memo(LoginLeftPanel);
