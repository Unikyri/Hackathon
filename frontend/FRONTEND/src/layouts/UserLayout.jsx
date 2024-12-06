import React from 'react';
import { UserProvider } from '../providers/UserProvider';
import Navbar from '../components/user/Navbar';
import Sidebar from '../components/user/Sidebar';

export default function Layout({ children }) {
  return (
    <UserProvider>
      <div className="w-full h-full bg-white">
        {/* Navbar */}
        <Navbar />
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="ml-0 transition-all duration-300">{children}</main>
      </div>
    </UserProvider>
  );
}
