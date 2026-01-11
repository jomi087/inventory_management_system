import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Page content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
