import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { mockDestinations, regions, categories } from '../lib/mockData';

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredDestinations = useMemo(() => {
    let filtered = mockDestinations.filter((dest) => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || dest.region === selectedRegion;
      const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === 'all' || dest.difficulty === selectedDifficulty;

      return matchesSearch && matchesRegion && matchesCategory && matchesDifficulty;
    });

    // Sort
    if (sortBy === 'popular') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'cheapest') {
      filtered.sort((a, b) => a.entryFee - b.entryFee);
    }

    return filtered;
  }, [searchQuery, selectedRegion, selectedCategory, selectedDifficulty, sortBy]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-gray-700 mb-2 block">Region</label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger>
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
      </div>

      <div>
        <label className="text-sm text-gray-700 mb-2 block">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
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
      </div>

      <div>
        <label className="text-sm text-gray-700 mb-2 block">Difficulty</label>
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedRegion('all');
          setSelectedCategory('all');
          setSelectedDifficulty('all');
        }}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl text-white mb-4">Explore Destinations</h1>
          <p className="text-xl text-white/90">
            Discover {mockDestinations.length} amazing places in Cameroon
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Sort */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="cheapest">Lowest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <SlidersHorizontal className="size-5 mr-2" />
                  <h2 className="text-xl text-gray-900">Filters</h2>
                </div>
                <FilterPanel />
              </CardContent>
            </Card>
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="size-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Destinations Grid */}
          <div className="lg:col-span-3">
            {filteredDestinations.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-600">No destinations found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link to={`/destination/${destination.id}`}>
                      <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group h-full">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={destination.images[0]}
                            alt={destination.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <Badge className="absolute top-3 right-3 bg-white text-gray-900">
                            {destination.category}
                          </Badge>
                          <Badge className="absolute top-3 left-3 bg-emerald-600">
                            {destination.difficulty}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg text-gray-900 mb-2">{destination.name}</h3>
                          <div className="flex items-center text-gray-600 text-sm mb-3">
                            <MapPin className="size-4 mr-1" />
                            {destination.region}
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {destination.description}
                          </p>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
