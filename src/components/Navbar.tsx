import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, User, Heart, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { useUserStore, useTripPlanner } from '../lib/store';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useUserStore();
  const { selectedDestinations } = useTripPlanner();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="size-8 text-emerald-600" />
            <span className="text-xl tracking-tight text-gray-900">CAMVOYAGE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/destinations" className="text-gray-700 hover:text-emerald-600 transition">
              Destinations
            </Link>
            <Link to="/map" className="text-gray-700 hover:text-emerald-600 transition">
              Map
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-emerald-600 transition">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-emerald-600 transition">
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/trip-planner" className="relative">
              <Button variant="ghost" size="sm">
                <Calendar className="size-5" />
                {selectedDestinations.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full size-5 flex items-center justify-center">
                    {selectedDestinations.length}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/account">
                  <Button variant="ghost" size="sm">
                    <User className="size-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
            <Link
              to="/destinations"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Destinations
            </Link>
            <Link
              to="/map"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Map
            </Link>
            <Link
              to="/blog"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/trip-planner"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Trip Planner {selectedDestinations.length > 0 && `(${selectedDestinations.length})`}
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Account
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 text-emerald-600"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
