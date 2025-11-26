import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, Heart, Calendar, Settings, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { useUserStore, useTripPlanner } from '../lib/store';
import { mockDestinations } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';

export default function UserAccountPage() {
  const { user, isAuthenticated, logout, savedDestinations } = useUserStore();
  const { selectedDestinations } = useTripPlanner();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const savedDests = mockDestinations.filter((d) => savedDestinations.includes(d.id));

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Avatar className="size-16 border-4 border-white">
              <AvatarFallback className="bg-white text-emerald-600 text-2xl">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl text-white mb-1">{user?.name}</h1>
              <p className="text-white/90">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="saved">Saved Destinations</TabsTrigger>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="size-8 mx-auto mb-2 text-red-500" />
                  <div className="text-3xl text-gray-900 mb-1">{savedDestinations.length}</div>
                  <p className="text-gray-600">Saved Destinations</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="size-8 mx-auto mb-2 text-emerald-600" />
                  <div className="text-3xl text-gray-900 mb-1">
                    {selectedDestinations.length}
                  </div>
                  <p className="text-gray-600">Current Trip</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <User className="size-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-3xl text-gray-900 mb-1">0</div>
                  <p className="text-gray-600">Past Bookings</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No recent activity to show.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Destinations */}
          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved Destinations ({savedDests.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {savedDests.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="size-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">No saved destinations yet</p>
                    <Link to="/destinations">
                      <Button>Browse Destinations</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedDests.map((dest) => (
                      <Link
                        key={dest.id}
                        to={`/destination/${dest.id}`}
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition"
                      >
                        <img
                          src={dest.images[0]}
                          alt={dest.name}
                          className="size-20 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg text-gray-900">{dest.name}</h3>
                          <p className="text-sm text-gray-600">{dest.region}</p>
                        </div>
                        <Button variant="outline">View</Button>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Trips */}
          <TabsContent value="trips">
            <Card>
              <CardHeader>
                <CardTitle>Current Trip</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDestinations.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="size-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">No active trip</p>
                    <Link to="/trip-planner">
                      <Button>Start Planning</Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {selectedDestinations.map((dest) => (
                        <div
                          key={dest.id}
                          className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50"
                        >
                          <img
                            src={dest.images[0]}
                            alt={dest.name}
                            className="size-16 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-gray-900">{dest.name}</h3>
                            <p className="text-sm text-gray-600">{dest.region}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link to="/trip-planner">
                      <Button className="w-full">Manage Trip</Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Settings</CardTitle>
                  {!isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Settings className="size-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Name</label>
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                {isEditing && (
                  <div className="flex space-x-3">
                    <Button onClick={handleSaveProfile} className="flex-1">
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                <Separator />

                <Button variant="destructive" onClick={handleLogout} className="w-full">
                  <LogOut className="size-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
