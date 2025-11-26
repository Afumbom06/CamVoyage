import { useState } from 'react';
import { MapPin, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { mockDestinations, regions, categories } from '../lib/mockData';
import { Link } from 'react-router-dom';

export default function InteractiveMapPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const filteredDestinations = mockDestinations.filter((dest) => {
    const matchesRegion = selectedRegion === 'all' || dest.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    return matchesRegion && matchesCategory;
  });

  const selectedDest = mockDestinations.find((d) => d.id === selectedDestination);

  return (
    <div className="h-screen flex flex-col">
      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl text-gray-900 flex items-center">
              <MapPin className="size-6 mr-2 text-emerald-600" />
              Interactive Map
            </h1>
            <div className="flex-1 flex items-center space-x-3">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Badge variant="secondary">
                {filteredDestinations.length} destinations
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Map Area */}
        <div className="flex-1 relative bg-gradient-to-br from-emerald-50 to-blue-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="size-24 mx-auto mb-4 text-emerald-600" />
              <h2 className="text-2xl text-gray-900 mb-2">Interactive Map View</h2>
              <p className="text-gray-600 mb-4">
                Map integration with Mapbox or Google Maps would display here
              </p>
              <p className="text-sm text-gray-500">
                Click on markers to view destination details
              </p>
            </div>
          </div>

          {/* Simulated Markers */}
          <div className="absolute inset-0 pointer-events-none">
            {filteredDestinations.slice(0, 6).map((dest, index) => (
              <div
                key={dest.id}
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  top: `${20 + index * 12}%`,
                  left: `${30 + index * 8}%`,
                }}
                onClick={() => setSelectedDestination(dest.id)}
              >
                <div className="relative group">
                  <MapPin className="size-8 text-red-600 drop-shadow-lg hover:scale-110 transition-transform" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white px-3 py-1 rounded shadow-lg whitespace-nowrap text-sm">
                      {dest.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destination Preview Sidebar */}
        {selectedDest && (
          <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl text-gray-900">Destination Details</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedDestination(null)}
              >
                <X className="size-5" />
              </Button>
            </div>

            <img
              src={selectedDest.images[0]}
              alt={selectedDest.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl text-gray-900 mb-2">{selectedDest.name}</h2>

            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="size-4 mr-1" />
              {selectedDest.region}
            </div>

            <div className="flex space-x-2 mb-4">
              <Badge>{selectedDest.category}</Badge>
              <Badge variant="outline">{selectedDest.difficulty}</Badge>
            </div>

            <p className="text-gray-700 mb-4">{selectedDest.description}</p>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Entry Fee:</span>
                <span className="text-gray-900">
                  {selectedDest.entryFee === 0
                    ? 'Free'
                    : `${selectedDest.entryFee.toLocaleString()} XAF`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating:</span>
                <span className="text-gray-900">
                  {selectedDest.rating} ({selectedDest.reviews} reviews)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coordinates:</span>
                <span className="text-gray-900 text-sm">
                  {selectedDest.coordinates.lat}, {selectedDest.coordinates.lng}
                </span>
              </div>
            </div>

            <Link to={`/destination/${selectedDest.id}`} className="block">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                View Full Details
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
