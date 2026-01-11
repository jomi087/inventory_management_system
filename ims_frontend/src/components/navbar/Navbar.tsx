import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold text-blue-600">
          Inventory
        </Link>
        {/* Nav links */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/items"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }
          >
            Items
          </NavLink>

          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }
          >
            Customers
          </NavLink>

          <NavLink
            to="/sales"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }
          >
            Sales
          </NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600"
        >
          Log out <span>🏃‍♂️‍➡️</span>
        </button>{' '}
      </div>
    </header>
  );
};

export default Navbar;
