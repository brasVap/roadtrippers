export interface Trip {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  destinations: Destination[];
  totalDistance: number;
  estimatedDuration: number;
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'start' | 'stop' | 'end';
  category?: PoiCategory;
  description?: string;
  rating?: number;
  photos?: string[];
  visitDuration?: number; // minutes
}

export interface PointOfInterest {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: PoiCategory;
  rating: number;
  description: string;
  photos: string[];
  openingHours?: string;
  website?: string;
  phone?: string;
}

export type PoiCategory = 
  | 'restaurant'
  | 'attraction'
  | 'hotel'
  | 'gas-station'
  | 'park'
  | 'museum'
  | 'shopping'
  | 'entertainment'
  | 'scenic-view'
  | 'historic-site';

export interface RouteSegment {
  from: Destination;
  to: Destination;
  distance: number; // km
  duration: number; // minutes
  polyline?: string;
}