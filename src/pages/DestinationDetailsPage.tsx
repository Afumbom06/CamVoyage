import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  Heart,
  Share2,
  Calendar,
  Navigation,
  Car,
  Bus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner@2.0.3';
import { mockDestinations } from '../lib/mockData';
import { useTripPlanner, useUserStore } from '../lib/store';

export default function DestinationDetailsPage() {
  const { id } = useParams();
  const destination = mockDestinations.find((d) => d.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addDestination, selectedDestinations } = useTripPlanner();
  const { savedDestinations, toggleSaveDestination } = useUserStore();

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Destination not found</h2>
          <Link to="/destinations">
            <Button>Back to Destinations</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isInTrip = selectedDestinations.some((d) => d.id === destination.id);
  const isSaved = savedDestinations.includes(destination.id);

  const handleAddToTrip = () => {
    if (!isInTrip) {
      addDestination(destination);
      toast.success(`${destination.name} added to your trip!`);
    }
  };

  const handleSave = () => {
    toggleSaveDestination(destination.id);
    toast.success(isSaved ? 'Removed from saved' : 'Saved to your account');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + destination.images.length) % destination.images.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Gallery */}
      <div className="relative h-[500px] bg-black">
        <img
          src={destination.images[currentImageIndex]}
          alt={destination.name}
          className="w-full h-full object-cover opacity-90"
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
          aria-label="Previous image"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
          aria-label="Next image"
        >
          <ChevronRight className="size-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {destination.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`size-2 rounded-full transition ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge>{destination.category}</Badge>
                    <Badge variant="outline">{destination.difficulty}</Badge>
                  </div>
                  <h1 className="text-4xl text-gray-900 mb-2">{destination.name}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="size-5 mr-2" />
                    <span>{destination.region} Region</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleSave}
                    className={isSaved ? 'text-red-500' : ''}
                  >
                    <Heart className={`size-5 ${isSaved ? 'fill-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="size-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Star className="size-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-lg">{destination.rating}</span>
                  <span className="text-gray-600 ml-2">({destination.reviews} reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="text-lg text-emerald-600">
                  {destination.entryFee === 0
                    ? 'Free Entry'
                    : `${destination.entryFee.toLocaleString()} XAF`}
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{destination.description}</p>
              </CardContent>
            </Card>

            {/* Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {destination.activities.map((activity) => (
                    <Badge key={activity} variant="secondary">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How to Get There */}
            <Card>
              <CardHeader>
                <CardTitle>How to Get There</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Car className="size-5 text-emerald-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">By Car</p>
                    <p className="text-gray-900">{destination.howToGetThere.byCar}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start space-x-3">
                  <Bus className="size-5 text-emerald-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">By Bus/Taxi</p>
                    <p className="text-gray-900">{destination.howToGetThere.byBus}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start space-x-3">
                  <MapPin className="size-5 text-emerald-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Distance</p>
                    <p className="text-gray-900">{destination.howToGetThere.distance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="size-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600">
                      Coordinates: {destination.coordinates.lat}, {destination.coordinates.lng}
                    </p>
                    <Button variant="outline" className="mt-4">
                      <Navigation className="size-4 mr-2" />
                      Open in Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Attractions */}
            {destination.nearbyAttractions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Nearby Attractions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {destination.nearbyAttractions.map((attraction) => (
                      <li key={attraction} className="flex items-center">
                        <MapPin className="size-4 mr-2 text-emerald-600" />
                        <span>{attraction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="size-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Opening Hours</span>
                  </div>
                  <span className="text-sm text-gray-900">{destination.openingHours}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="size-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Entry Fee</span>
                  </div>
                  <span className="text-sm text-gray-900">
                    {destination.entryFee === 0
                      ? 'Free'
                      : `${destination.entryFee.toLocaleString()} XAF`}
                  </span>
                </div>

                <Separator />

                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleAddToTrip}
                  disabled={isInTrip}
                >
                  <Calendar className="size-4 mr-2" />
                  {isInTrip ? 'Already in Trip' : 'Add to Trip Planner'}
                </Button>

                <Link to="/trip-planner" className="block">
                  <Button variant="outline" className="w-full">
                    View Trip Planner
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
