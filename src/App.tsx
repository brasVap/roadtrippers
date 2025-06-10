import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TripPlanner } from './components/TripPlanner';
import { PointsOfInterest } from './components/PointsOfInterest';
import { CreateTripModal } from './components/CreateTripModal';
import { useTrips } from './hooks/useTrips';

function App() {
  const {
    trips,
    activeTrip,
    setActiveTrip,
    createTrip,
    deleteTrip,
    addDestination,
    removeDestination,
  } = useTrips();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeView, setActiveView] = useState<'planner' | 'discover'>('planner');

  const handleCreateTrip = (name: string, description?: string, startDate?: string, endDate?: string) => {
    createTrip(name, description);
  };

  const handleAddDestination = (destination: any) => {
    if (activeTrip) {
      addDestination(activeTrip.id, destination);
    }
  };

  const handleRemoveDestination = (destinationId: string) => {
    if (activeTrip) {
      removeDestination(activeTrip.id, destinationId);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header
        onCreateTrip={() => setShowCreateModal(true)}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          trips={trips}
          activeTrip={activeTrip}
          onSelectTrip={setActiveTrip}
          onDeleteTrip={deleteTrip}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* View Toggle */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveView('planner')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'planner'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Trip Planner
              </button>
              <button
                onClick={() => setActiveView('discover')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'discover'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Discover Places
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            {activeView === 'planner' ? (
              <TripPlanner
                trip={activeTrip}
                onAddDestination={handleAddDestination}
                onRemoveDestination={handleRemoveDestination}
              />
            ) : (
              <div className="h-full max-w-md mx-auto">
                <PointsOfInterest />
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateTripModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateTrip={handleCreateTrip}
      />
    </div>
  );
}

export default App;