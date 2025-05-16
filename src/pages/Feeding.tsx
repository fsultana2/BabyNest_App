import { useLocation } from 'react-router-dom';
import Layout from '../layouts/Layout';
import FeedingTracker from '../components/FeedingTracker';

const Feeding: React.FC = () => {
  const location = useLocation();
  return (
    <Layout>
      <FeedingTracker />
    </Layout>
  );
};

export default Feeding;
