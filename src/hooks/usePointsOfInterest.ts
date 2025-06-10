import { useState, useEffect } from 'react';
import { PointOfInterest, PoiCategory } from '../types';

// Mock data for points of interest
const mockPOIs: PointOfInterest[] = [
  {
    id: '1',
    name: 'Grand Canyon National Park',
    address: 'Grand Canyon Village, AZ 86023',
    coordinates: { lat: 36.1069, lng: -112.1129 },
    category: 'park',
    rating: 4.8,
    description: 'One of the most spectacular natural wonders in the world',
    photos: ['https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg'],
    openingHours: '24 hours',
  },
  {
    id: '2',
    name: 'Times Square',
    address: 'Times Square, New York, NY 10036',
    coordinates: { lat: 40.7580, lng: -73.9855 },
    category: 'attraction',
    rating: 4.5,
    description: 'The bustling heart of New York City',
    photos: ['https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg'],
    openingHours: '24 hours',
  },
  {
    id: '3',
    name: 'Golden Gate Bridge',
    address: 'Golden Gate Bridge, San Francisco, CA',
    coordinates: { lat: 37.8199, lng: -122.4783 },
    category: 'scenic-view',
    rating: 4.9,
    description: 'Iconic suspension bridge spanning the Golden Gate strait',
    photos: ['https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg'],
    openingHours: '24 hours',
  },
  {
    id: '4',
    name: 'Statue of Liberty',
    address: 'Liberty Island, New York, NY 10004',
    coordinates: { lat: 40.6892, lng: -74.0445 },
    category: 'historic-site',
    rating: 4.6,
    description: 'Symbol of freedom and democracy',
    photos: ['https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg'],
    openingHours: '9:30 AM - 5:00 PM',
  },
  {
    id: '5',
    name: 'Yellowstone National Park',
    address: 'Yellowstone National Park, WY 82190',
    coordinates: { lat: 44.4280, lng: -110.5885 },
    category: 'park',
    rating: 4.7,
    description: 'Americas first national park with geysers and wildlife',
    photos: ['https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg'],
    openingHours: '24 hours',
  },
];

export const usePointsOfInterest = () => {
  const [pois, setPois] = useState<PointOfInterest[]>(mockPOIs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PoiCategory | 'all'>('all');

  const filteredPOIs = pois.filter(poi => {
    const matchesSearch = poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poi.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || poi.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const searchNearby = (coordinates: { lat: number; lng: number }, radius: number) => {
    return pois.filter(poi => {
      const distance = calculateDistance(coordinates, poi.coordinates);
      return distance <= radius;
    });
  };

  const calculateDistance = (coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }) => {
    const R = 6371;
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return {
    pois: filteredPOIs,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    searchNearby,
  };
};