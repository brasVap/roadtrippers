import React from 'react';
import { usePointsOfInterest } from '../hooks/usePointsOfInterest';
import { Search, Filter, Star, MapPin, Clock, ExternalLink } from 'lucide-react';
import { PoiCategory } from '../types';

const categoryLabels: Record<PoiCategory, string> = {
  restaurant: 'Restaurants',
  attraction: 'Attractions',
  hotel: 'Hotels',
  'gas-station': 'Gas Stations',
  park: 'Parks',
  museum: 'Museums',
  shopping: 'Shopping',
  entertainment: 'Entertainment',
  'scenic-view': 'Scenic Views',
  'historic-site': 'Historic Sites',
};

export const PointsOfInterest: React.FC = () => {
  const {
    pois,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = usePointsOfInterest();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Discover Places</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as PoiCategory | 'all')}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <p className="text-sm text-gray-500">{pois.length} places found</p>
      </div>

      {/* POI List */}
      <div className="flex-1 overflow-y-auto">
        {pois.length === 0 ? (
          <div className="p-4 text-center">
            <div className="text-gray-400 mb-2">
              <MapPin className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500">No places found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {pois.map((poi) => (
              <div key={poi.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {poi.photos.length > 0 && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={poi.photos[0]}
                      alt={poi.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 flex-1">{poi.name}</h3>
                    <div className="flex items-center space-x-1 ml-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{poi.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{poi.address}</span>
                  </div>
                  
                  {poi.openingHours && (
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <Clock className="h-3 w-3" />
                      <span>{poi.openingHours}</span>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{poi.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {categoryLabels[poi.category]}
                    </span>
                    
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 transition-colors">
                        <MapPin className="h-4 w-4" />
                      </button>
                      {poi.website && (
                        <button className="text-blue-600 hover:text-blue-700 transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};