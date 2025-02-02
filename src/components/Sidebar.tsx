import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  Tags,
  PieChart,
  Settings,
  CreditCard,
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/dashboard/transactions', icon: Receipt, label: 'Transactions' },
  { path: '/dashboard/categories', icon: Tags, label: 'Categories' },
  { path: '/dashboard/budgets', icon: PieChart, label: 'Budgets' },
  { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-luxury-border lg:bg-luxury-background">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <CreditCard className="h-8 w-8 text-luxury-gold" />
          <span className="ml-2 text-xl font-bold text-luxury-text">
            WealthTracker
          </span>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  isActive
                    ? 'bg-luxury-gold bg-opacity-10 text-luxury-gold'
                    : 'text-luxury-text hover:bg-luxury-hover'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}