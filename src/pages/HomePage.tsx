import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Compass, Star, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockDestinations, regions, categories } from '../lib/mockData';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const featuredDestinations = mockDestinations.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl text-white mb-4"
          >
            Discover Cameroon
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            Explore the beauty of Africa in miniature - from pristine beaches to majestic mountains
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-2xl p-4 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link to="/destinations" className="w-full">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Compass className="size-4 mr-2" />
                  Explore
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl text-gray-900 mb-2">Featured Destinations</h2>
            <p className="text-gray-600">Discover the most popular sites in Cameroon</p>
          </div>
          <Link to="/destinations">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/destination/${destination.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.images[0]}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                      {destination.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl text-gray-900 mb-2">{destination.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="size-4 mr-1" />
                      {destination.region}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="size-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm">{destination.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({destination.reviews})
                        </span>
                      </div>
                      <span className="text-emerald-600">
                        {destination.entryFee === 0
                          ? 'Free'
                          : `${destination.entryFee.toLocaleString()} XAF`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-gray-900 mb-8 text-center">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link to="/destinations" key={category}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Compass className="size-8 mx-auto mb-2 text-emerald-600" />
                    <p className="text-gray-900">{category}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Most Visited */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="size-6 text-emerald-600 mr-2" />
                <h3 className="text-2xl text-gray-900">Most Visited</h3>
              </div>
              <div className="space-y-4">
                {mockDestinations.slice(0, 3).map((dest) => (
                  <Link
                    to={`/destination/${dest.id}`}
                    key={dest.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    <img
                      src={dest.images[0]}
                      alt={dest.name}
                      className="size-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-gray-900">{dest.name}</p>
                      <p className="text-sm text-gray-600">{dest.region}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm">{dest.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hidden Gems */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Star className="size-6 text-emerald-600 mr-2" />
                <h3 className="text-2xl text-gray-900">Hidden Gems</h3>
              </div>
              <div className="space-y-4">
                {mockDestinations.slice(3, 6).map((dest) => (
                  <Link
                    to={`/destination/${dest.id}`}
                    key={dest.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    <img
                      src={dest.images[0]}
                      alt={dest.name}
                      className="size-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-gray-900">{dest.name}</p>
                      <p className="text-sm text-gray-600">{dest.region}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm">{dest.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">Ready to Plan Your Adventure?</h2>
          <p className="text-xl text-white/90 mb-8">
            Create your perfect itinerary with our Trip Planner
          </p>
          <Link to="/trip-planner">
            <Button size="lg" variant="secondary">
              Start Planning
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
