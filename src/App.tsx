import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailsPage from './pages/DestinationDetailsPage';
import InteractiveMapPage from './pages/InteractiveMapPage';
import TripPlannerPage from './pages/TripPlannerPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import UserAccountPage from './pages/UserAccountPage';
import LoginPage from './pages/LoginPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDestinations from './pages/admin/AdminDestinations';
import AdminFinancial from './pages/admin/AdminFinancial';
import AdminUsers from './pages/admin/AdminUsers';
import AdminBlog from './pages/admin/AdminBlog';
import AdminSettings from './pages/admin/AdminSettings';
import AdminCategories from './pages/admin/AdminCategories';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { Toaster } from 'sonner@2.0.3';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
          <Route path="/destinations" element={<><Navbar /><DestinationsPage /><Footer /></>} />
          <Route path="/destination/:id" element={<><Navbar /><DestinationDetailsPage /><Footer /></>} />
          <Route path="/map" element={<><Navbar /><InteractiveMapPage /><Footer /></>} />
          <Route path="/trip-planner" element={<><Navbar /><TripPlannerPage /><Footer /></>} />
          <Route path="/blog" element={<><Navbar /><BlogPage /><Footer /></>} />
          <Route path="/blog/:id" element={<><Navbar /><ArticlePage /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />
          <Route path="/account" element={<><Navbar /><UserAccountPage /><Footer /></>} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/destinations" element={<ProtectedAdminRoute><AdminDestinations /></ProtectedAdminRoute>} />
          <Route path="/admin/financial" element={<ProtectedAdminRoute><AdminFinancial /></ProtectedAdminRoute>} />
          <Route path="/admin/users" element={<ProtectedAdminRoute><AdminUsers /></ProtectedAdminRoute>} />
          <Route path="/admin/blog" element={<ProtectedAdminRoute><AdminBlog /></ProtectedAdminRoute>} />
          <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettings /></ProtectedAdminRoute>} />
          <Route path="/admin/categories" element={<ProtectedAdminRoute><AdminCategories /></ProtectedAdminRoute>} />
          
          {/* Catch-all redirect to home */}
          <Route path="*" element={<><Navbar /><HomePage /><Footer /></>} />
        </Routes>
      </div>
    </Router>
  );
}