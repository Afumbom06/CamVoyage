import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Trash2,
  GripVertical,
  Download,
  DollarSign,
  Clock,
  Plus,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { useTripPlanner } from '../lib/store';
import { toast } from 'sonner@2.0.3';

export default function TripPlannerPage() {
  const { selectedDestinations, removeDestination, clearTrip, reorderDestinations } =
    useTripPlanner();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const totalCost = selectedDestinations.reduce((sum, dest) => sum + dest.entryFee, 0);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    reorderDestinations(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleExportPDF = () => {
    toast.success('Trip itinerary exported! (Demo)');
  };

  const handleClearTrip = () => {
    if (window.confirm('Are you sure you want to clear your entire trip?')) {
      clearTrip();
      toast.success('Trip cleared');
    }
  };

  if (selectedDestinations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-12 text-center">
            <Calendar className="size-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl text-gray-900 mb-2">Your trip is empty</h2>
            <p className="text-gray-600 mb-6">
              Start planning your adventure by adding destinations to your trip
            </p>
            <Link to="/destinations">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="size-4 mr-2" />
                Browse Destinations
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl text-white mb-4">My Trip Planner</h1>
          <p className="text-xl text-white/90">
            Plan your perfect journey through Cameroon
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Itinerary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Your Itinerary</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={handleExportPDF}>
                  <Download className="size-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="destructive" onClick={handleClearTrip}>
                  Clear Trip
                </Button>
              </div>
            </div>

            <p className="text-gray-600">
              Drag and drop destinations to reorder your itinerary
            </p>

            <div className="space-y-4">
              {selectedDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className="cursor-move"
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="bg-emerald-600 text-white rounded-full size-10 flex items-center justify-center mb-2">
                            {index + 1}
                          </div>
                          <GripVertical className="size-5 text-gray-400" />
                        </div>

                        <img
                          src={destination.images[0]}
                          alt={destination.name}
                          className="size-24 rounded object-cover"
                        />

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl text-gray-900 mb-1">{destination.name}</h3>
                              <div className="flex items-center text-gray-600 text-sm mb-2">
                                <MapPin className="size-4 mr-1" />
                                {destination.region}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                removeDestination(destination.id);
                                toast.success('Destination removed from trip');
                              }}
                            >
                              <Trash2 className="size-5 text-red-500" />
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary">{destination.category}</Badge>
                            <Badge variant="outline">{destination.difficulty}</Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <DollarSign className="size-4 mr-1" />
                              {destination.entryFee === 0
                                ? 'Free'
                                : `${destination.entryFee.toLocaleString()} XAF`}
                            </div>
                            <div className="flex items-center">
                              <Clock className="size-4 mr-1" />
                              {destination.openingHours}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Link to="/destinations">
              <Button variant="outline" className="w-full">
                <Plus className="size-4 mr-2" />
                Add More Destinations
              </Button>
            </Link>
          </div>

          {/* Summary Sidebar */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Destinations</span>
                  <span className="text-2xl text-gray-900">{selectedDestinations.length}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Cost</span>
                  <span className="text-2xl text-emerald-600">
                    {totalCost.toLocaleString()} XAF
                  </span>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm text-gray-600 mb-2">Regions Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(selectedDestinations.map((d) => d.region))).map(
                      (region) => (
                        <Badge key={region} variant="secondary">
                          {region}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm text-gray-600 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(selectedDestinations.map((d) => d.category))).map(
                      (category) => (
                        <Badge key={category} variant="outline">
                          {category}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <Separator />

                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h3 className="text-sm text-emerald-900 mb-2">Travel Tips</h3>
                  <ul className="text-sm text-emerald-800 space-y-1">
                    <li>• Book accommodation in advance</li>
                    <li>• Carry local currency (XAF)</li>
                    <li>• Check weather conditions</li>
                    <li>• Respect local customs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
