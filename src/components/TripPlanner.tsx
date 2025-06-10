import React, { useState } from 'react';
import { Trip, Destination } from '../types';
import { Plus, MapPin, Navigation, Clock, Trash2 } from 'lucide-react';

interface TripPlannerProps {
  trip: Trip | null;
  onAddDestination: (destination: Omit<Destination, 'id'>) => void;
  onRemoveDestination: (destinationId: string) => void;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({
  trip,
  onAddDestination,
  onRemoveDestination,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDestination, setNewDestination] = useState({
    name: '',
    address: '',
    type: 'stop' as const,
  });

  const handleAddDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestination.name || !newDestination.address) return;

    // Mock coordinates - in a real app, you'd geocode the address
    const mockCoordinates = {
      lat: 40.7128 + (Math.random() - 0.5) * 10,
      lng: -74.0060 + (Math.random() - 0.5) * 10,
    };

    onAddDestination({
      ...newDestination,
      coordinates: mockCoordinates,
    });

    setNewDestination({ name: '', address: '', type: 'stop' });
    setShowAddForm(false);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (!trip) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <MapPin className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Trip Selected</h2>
          <p className="text-gray-500">Select a trip from the sidebar or create a new one to start planning</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Trip Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{trip.name}</h2>
            {trip.description && (
              <p className="text-gray-600 mt-1">{trip.description}</p>
            )}
          </div>
        </div>

        {trip.destinations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Destinations</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{trip.destinations.length}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Navigation className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Distance</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{trip.totalDistance} km</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Duration</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">{formatDuration(trip.estimatedDuration)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Destinations List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Route</h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Stop</span>
            </button>
          </div>

          {/* Add Destination Form */}
          {showAddForm && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <form onSubmit={handleAddDestination}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Destination Name
                    </label>
                    <input
                      type="text"
                      value={newDestination.name}
                      onChange={(e) => setNewDestination(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter destination name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={newDestination.address}
                      onChange={(e) => setNewDestination(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={newDestination.type}
                      onChange={(e) => setNewDestination(prev => ({ ...prev, type: e.target.value as 'start' | 'stop' | 'end' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="start">Start Point</option>
                      <option value="stop">Stop</option>
                      <option value="end">End Point</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Destination
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Destinations */}
          <div className="space-y-4">
            {trip.destinations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MapPin className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-500">No destinations added yet</p>
                <p className="text-sm text-gray-400">Add your first stop to start planning your route</p>
              </div>
            ) : (
              trip.destinations.map((destination, index) => (
                <div key={destination.id} className="relative">
                  {index > 0 && (
                    <div className="absolute left-6 -top-4 h-4 w-0.5 bg-gray-300"></div>
                  )}
                  
                  <div className="flex items-start space-x-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className={`p-2 rounded-full ${
                      destination.type === 'start' ? 'bg-green-100 text-green-600' :
                      destination.type === 'end' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <MapPin className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{destination.name}</h4>
                      <p className="text-sm text-gray-500">{destination.address}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          destination.type === 'start' ? 'bg-green-100 text-green-800' :
                          destination.type === 'end' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {destination.type}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onRemoveDestination(destination.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};