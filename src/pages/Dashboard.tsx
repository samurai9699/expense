import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import DashboardHome from './DashboardHome';
import Transactions from './Transactions';
import Categories from './Categories';
import Budgets from './Budgets';
import Settings from './Settings';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center" />
      <Sidebar />
      
      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen pb-16 lg:pb-0">
        <main className="flex-1 relative">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="categories" element={<Categories />} />
            <Route path="budgets" element={<Budgets />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}