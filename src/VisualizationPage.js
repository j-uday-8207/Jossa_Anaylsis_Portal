import React from 'react';
import Header from './Header';
import AdvancedVisualizations from './AdvancedVisualizations';
import './VisualizationPage.css';

const VisualizationPage = () => {
  return (
    <div className="visualization-page">
      <Header showBackButton={true} backLink="/" />
      <div className="page-content">
        <div className="page-header">
          <h1>Advanced Data Visualizations</h1>
          <p>Explore JoSAA data through interactive charts, heat maps, flow diagrams, and more!</p>
        </div>
        <AdvancedVisualizations />
      </div>
    </div>
  );
};

export default VisualizationPage;