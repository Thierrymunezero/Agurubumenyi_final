import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`block py-2 px-4 rounded-md transition-all duration-300 ${
          isActive
            ? 'bg-[#0073E6] text-white shadow-md transform scale-105'
            : 'text-[#F2F2F2] hover:bg-[#0073E6] hover:text-white'
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <motion.nav 
      className="bg-[#002855] text-white shadow-lg fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold hover:text-[#F2F2F2] transition-colors duration-300">
            Agurubumenyi
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            {token ? (
              <>
                <NavLink to="/welcome">Ahabanza</NavLink>
                <NavLink to="/download-pdf">Downloadinga Igitabo</NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Sohoka
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Injira</NavLink>
                <NavLink to="/register">Iyandikishe</NavLink>
              </>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
        {isOpen && (
          <motion.div 
            className="md:hidden py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {token ? (
              <>
                <NavLink to="/welcome">Ahabanza</NavLink>
                <NavLink to="/download-pdf">Downloadinga Igitabo</NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 transition-colors duration-300 mt-2"
                >
                  Sohoka
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Injira</NavLink>
                <NavLink to="/register">Iyandikishe</NavLink>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;

