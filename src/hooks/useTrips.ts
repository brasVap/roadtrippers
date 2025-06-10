import { useState, useEffect } from 'react';
import { Trip, Destination } from '../types';

const STORAGE_KEY = 'roadtrippers_trips';

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const savedTrips = localStorage.getItem(STORAGE_KEY);
    if (savedTrips) {
      const parsed = JSON.parse(savedTrips);
      setTrips(parsed);
      if (parsed.length > 0) {
        setActiveTrip(parsed[0]);
      }
    }
  }, []);

  const saveTrips = (newTrips: Trip[]) => {
    setTrips(newTrips);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrips));
  };

  const createTrip = (name: string, description?: string): Trip => {
    const newTrip: Trip = {
      id: Date.now().toString(),
      name,
      description,
      destinations: [],
      totalDistance: 0,
      estimatedDuration: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTrips = [...trips, newTrip];
    saveTrips(updatedTrips);
    setActiveTrip(newTrip);
    return newTrip;
  };

  const updateTrip = (tripId: string, updates: Partial<Trip>) => {
    const updatedTrips = trips.map(trip => 
      trip.id === tripId 
        ? { ...trip, ...updates, updatedAt: new Date().toISOString() }
        : trip
    );
    saveTrips(updatedTrips);
    
    if (activeTrip?.id === tripId) {
      setActiveTrip(updatedTrips.find(t => t.id === tripId) || null);
    }
  };

  const deleteTrip = (tripId: string) => {
    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    saveTrips(updatedTrips);
    
    if (activeTrip?.id === tripId) {
      setActiveTrip(updatedTrips[0] || null);
    }
  };

  const addDestination = (tripId: string, destination: Omit<Destination, 'id'>) => {
    const newDestination: Destination = {
      ...destination,
      id: Date.now().toString(),
    };

    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const updatedDestinations = [...trip.destinations, newDestination];
    const { totalDistance, estimatedDuration } = calculateTripMetrics(updatedDestinations);

    updateTrip(tripId, {
      destinations: updatedDestinations,
      totalDistance,
      estimatedDuration,
    });
  };

  const removeDestination = (tripId: string, destinationId: string) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const updatedDestinations = trip.destinations.filter(d => d.id !== destinationId);
    const { totalDistance, estimatedDuration } = calculateTripMetrics(updatedDestinations);

    updateTrip(tripId, {
      destinations: updatedDestinations,
      totalDistance,
      estimatedDuration,
    });
  };

  const calculateTripMetrics = (destinations: Destination[]) => {
    if (destinations.length < 2) {
      return { totalDistance: 0, estimatedDuration: 0 };
    }

    let totalDistance = 0;
    let estimatedDuration = 0;

    for (let i = 0; i < destinations.length - 1; i++) {
      const distance = calculateDistance(
        destinations[i].coordinates,
        destinations[i + 1].coordinates
      );
      totalDistance += distance;
      estimatedDuration += distance * 1.2; // rough estimate: 1.2 minutes per km
    }

    return { totalDistance: Math.round(totalDistance), estimatedDuration: Math.round(estimatedDuration) };
  };

  const calculateDistance = (coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }) => {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return {
    trips,
    activeTrip,
    setActiveTrip,
    createTrip,
    updateTrip,
    deleteTrip,
    addDestination,
    removeDestination,
  };
};