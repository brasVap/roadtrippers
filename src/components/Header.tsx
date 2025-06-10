import React from 'react';
import { Map, Plus, User, Menu } from 'lucide-react';

interface HeaderProps {
  onCreateTrip: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateTrip, onToggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Map className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">TripPlanner</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onCreateTrip}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Trip</span>
          </button>
          
          <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <User className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};