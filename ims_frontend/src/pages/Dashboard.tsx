import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Dashboard
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/items"
          className="rounded-xl bg-white p-6 shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-700">Items</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your products
          </p>
        </Link>

        <Link
          to="/customers"
          className="rounded-xl bg-white p-6 shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-700">Customers</h2>
          <p className="text-sm text-gray-500 mt-1">
            View customer list
          </p>
        </Link>

        <Link
          to="/sales"
          className="rounded-xl bg-white p-6 shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-700">Sales</h2>
          <p className="text-sm text-gray-500 mt-1">
            Track sales records
          </p>
        </Link>

        <Link
          to="/reports"
          className="rounded-xl bg-white p-6 shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-700">Reports</h2>
          <p className="text-sm text-gray-500 mt-1">
            Analytics & insights
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
