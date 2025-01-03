import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import Quiz from './Quiz';

function Layout({ children }) {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <motion.main 
        className="flex-grow container mx-auto px-4 py-8 mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <footer className="bg-[#002855] text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {year} Agurubumenyi. Amategeko n'amabwiriza biruhahirizwa.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
