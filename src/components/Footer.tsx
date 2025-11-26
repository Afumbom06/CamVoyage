import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="size-8 text-emerald-500" />
              <span className="text-2xl">CAMVOYAGE</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate guide to discovering the beauty and culture of Cameroon.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition">
                <Facebook className="size-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition">
                <Instagram className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/destinations" className="hover:text-emerald-500 transition">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-emerald-500 transition">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link to="/trip-planner" className="hover:text-emerald-500 transition">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-emerald-500 transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Regions */}
          <div>
            <h3 className="text-white mb-4">Explore Regions</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-emerald-500 transition cursor-pointer">Southwest</li>
              <li className="hover:text-emerald-500 transition cursor-pointer">Littoral</li>
              <li className="hover:text-emerald-500 transition cursor-pointer">Far North</li>
              <li className="hover:text-emerald-500 transition cursor-pointer">West</li>
              <li className="hover:text-emerald-500 transition cursor-pointer">South</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="size-4" />
                <span>info@camvoyage.cm</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="size-4" />
                <span>+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="size-4" />
                <span>Douala, Cameroon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 CAMVOYAGE. All rights reserved.</p>
          <div className="mt-4">
            <Link to="/admin/login" className="text-gray-500 hover:text-emerald-500 transition text-xs">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}