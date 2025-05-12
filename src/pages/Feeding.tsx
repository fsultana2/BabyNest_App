// src/pages/Feeding.tsx
import React from 'react';
import Layout from '../layouts/Layout';  // Import Layout from the layouts folder
import FeedingTracker from '../components/FeedingTracker';  // Import your FeedingTracker component

const Feeding: React.FC = () => {
  return (
    <Layout>  {/* Wrap FeedingTracker with Layout to include Header and Footer */}
      <FeedingTracker />  {/* Display the FeedingTracker component */}
    </Layout>
  );
};

export default Feeding;
