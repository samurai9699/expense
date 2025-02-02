import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  Tags,
  PieChart,
  Settings,
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/dashboard/transactions', icon: Receipt, label: 'Transactions' },
  { path: '/dashboard/categories', icon: Tags, label: 'Categories' },
  { path: '/dashboard/budgets', icon: PieChart, label: 'Budgets' },
  { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-luxury-background border-t border-luxury-border">
      <div className="grid grid-cols-5">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 text-xs font-medium transition-colors duration-300 ${
                isActive
                  ? 'text-luxury-gold'
                  : 'text-luxury-muted hover:text-luxury-text'
              }`
            }
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}