
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { 
  CalendarDays, 
  Repeat, 
  ClipboardList,
  History, 
  BarChart, 
  Settings
} from 'lucide-react';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          "hover:bg-gray-100 hover:text-primary",
          isActive 
            ? "bg-primary text-white hover:bg-primary hover:text-white" 
            : "text-gray-700"
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isManager = user?.role === 'manager';
  
  return (
    <aside className="w-64 border-r bg-white hidden md:block flex-shrink-0">
      <div className="flex flex-col h-full py-6">
        <div className="px-6 mb-6">
          <h1 className="text-2xl font-bold text-primary">ShiftSwap</h1>
          <p className="text-sm text-gray-500">Shift Management System</p>
        </div>
        
        <nav className="space-y-1 px-3 flex-1">
          <NavItem 
            to="/" 
            icon={<CalendarDays className="h-5 w-5" />} 
            label="My Schedule" 
          />
          <NavItem 
            to="/swap-board" 
            icon={<Repeat className="h-5 w-5" />} 
            label="Swap Board" 
          />
          {isManager && (
            <NavItem 
              to="/approve" 
              icon={<ClipboardList className="h-5 w-5" />} 
              label="Approval Queue" 
            />
          )}
          <NavItem 
            to="/history" 
            icon={<History className="h-5 w-5" />} 
            label="Request History" 
          />
          {isManager && (
            <NavItem 
              to="/analytics" 
              icon={<BarChart className="h-5 w-5" />} 
              label="Analytics" 
            />
          )}
        </nav>
        
        <div className="mt-auto px-3">
          <NavItem 
            to="/settings" 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
