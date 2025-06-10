import React from 'react';
import { Trip } from '../types';
import { Calendar, MapPin, Clock, Trash2, Edit } from 'lucide-react';

interface SidebarProps {
  trips: Trip[];
  activeTrip: Trip | null;
  onSelectTrip: (trip: Trip) => void;
  onDeleteTrip: (tripId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  trips,
  activeTrip,
  onSelectTrip,
  onDeleteTrip,
  isOpen,
  onClose,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">My Trips</h2>
          <p className="text-sm text-gray-500">{trips.length} trip{trips.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {trips.length === 0 ? (
            <div className="p-4 text-center">
              <div className="text-gray-400 mb-2">
                <MapPin className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-500">No trips yet</p>
              <p className="text-sm text-gray-400">Create your first trip to get started</p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    activeTrip?.id === trip.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onSelectTrip(trip)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 truncate">{trip.name}</h3>
                      {trip.description && (
                        <p className="text-sm text-gray-500 mt-1 truncate">{trip.description}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-1 ml-2">
                      <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                        <Edit className="h-3 w-3 text-gray-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTrip(trip.id);
                        }}
                        className="p-1 rounded hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3" />
                      <span>{trip.destinations.length} stop{trip.destinations.length !== 1 ? 's' : ''}</span>
                    </div>
                    
                    {trip.totalDistance > 0 && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{trip.totalDistance} km • {formatDuration(trip.estimatedDuration)}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(trip.startDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden -z-10"
          onClick={onClose}
        />
      )}
    </div>
  );
};