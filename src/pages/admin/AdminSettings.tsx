import { useState } from 'react';
import { Save, Upload, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import AdminSidebar from '../../components/AdminSidebar';
import { useAdminStore } from '../../lib/adminStore';
import { toast } from 'sonner@2.0.3';

export default function AdminSettings() {
  const { admin, twoFactorEnabled, enableTwoFactor, disableTwoFactor } = useAdminStore();
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: admin?.name || 'Admin User',
    email: admin?.email || 'admin@camvoyage.cm',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [systemSettings, setSystemSettings] = useState({
    siteName: 'CAMVOYAGE',
    siteDescription: 'Discover the beauty of Cameroon - Your ultimate tourism guide',
    contactEmail: 'info@camvoyage.cm',
    contactPhone: '+237 6XX XXX XXX',
    address: 'Bonanjo, Douala, Cameroon',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleSaveSystem = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('System settings updated successfully!');
  };

  const handleToggle2FA = (enabled: boolean) => {
    if (enabled) {
      enableTwoFactor();
      toast.success('Two-factor authentication enabled');
    } else {
      disableTwoFactor();
      toast.success('Two-factor authentication disabled');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and system settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Admin Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="size-20 rounded-full bg-emerald-100 flex items-center justify-center text-2xl text-emerald-600">
                      {admin?.name?.charAt(0) || 'A'}
                    </div>
                    <Button type="button" variant="outline">
                      <Upload className="size-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
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
                      />
                    </div>
                  </div>

                  <Separator />

                  <h3 className="text-lg text-gray-900">Change Password</h3>

                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">Current Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={profileData.currentPassword}
                        onChange={(e) =>
                          setProfileData({ ...profileData, currentPassword: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-5 text-gray-400" />
                        ) : (
                          <Eye className="size-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">New Password</label>
                      <Input
                        type="password"
                        value={profileData.newPassword}
                        onChange={(e) =>
                          setProfileData({ ...profileData, newPassword: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Confirm Password</label>
                      <Input
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={(e) =>
                          setProfileData({ ...profileData, confirmPassword: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="size-4 mr-2" />
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <Shield className="size-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg text-gray-900">Two-Factor Authentication</h3>
                        {twoFactorEnabled && (
                          <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account. When enabled, you'll need to
                        enter a code from your authenticator app when signing in.
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={handleToggle2FA}
                  />
                </div>

                {twoFactorEnabled && (
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <h4 className="text-sm text-emerald-900 mb-2">Setup Instructions:</h4>
                    <ol className="text-sm text-emerald-800 space-y-1 list-decimal list-inside">
                      <li>Download an authenticator app (Google Authenticator, Authy, etc.)</li>
                      <li>Scan the QR code below with your authenticator app</li>
                      <li>Enter the 6-digit code to verify</li>
                    </ol>
                    <div className="mt-4 p-4 bg-white rounded border border-emerald-300 text-center">
                      <p className="text-sm text-gray-600 mb-2">QR Code would appear here</p>
                      <p className="text-xs text-gray-500">Demo: Use code 123456</p>
                    </div>
                  </div>
                )}

                <Separator />

                <div>
                  <h3 className="text-lg text-gray-900 mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="text-sm text-gray-900">Current Device</p>
                        <p className="text-xs text-gray-500">Last active: Just now</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveSystem} className="space-y-6">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">Site Name</label>
                    <Input
                      value={systemSettings.siteName}
                      onChange={(e) =>
                        setSystemSettings({ ...systemSettings, siteName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">Site Description</label>
                    <Textarea
                      rows={3}
                      value={systemSettings.siteDescription}
                      onChange={(e) =>
                        setSystemSettings({ ...systemSettings, siteDescription: e.target.value })
                      }
                    />
                  </div>

                  <Separator />

                  <h3 className="text-lg text-gray-900">Contact Information</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Contact Email</label>
                      <Input
                        type="email"
                        value={systemSettings.contactEmail}
                        onChange={(e) =>
                          setSystemSettings({ ...systemSettings, contactEmail: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Contact Phone</label>
                      <Input
                        value={systemSettings.contactPhone}
                        onChange={(e) =>
                          setSystemSettings({ ...systemSettings, contactPhone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">Address</label>
                    <Input
                      value={systemSettings.address}
                      onChange={(e) =>
                        setSystemSettings({ ...systemSettings, address: e.target.value })
                      }
                    />
                  </div>

                  <Separator />

                  <h3 className="text-lg text-gray-900">Social Media Links</h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Facebook URL</label>
                      <Input
                        placeholder="https://facebook.com/camvoyage"
                        value={systemSettings.facebookUrl}
                        onChange={(e) =>
                          setSystemSettings({ ...systemSettings, facebookUrl: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Twitter URL</label>
                      <Input
                        placeholder="https://twitter.com/camvoyage"
                        value={systemSettings.twitterUrl}
                        onChange={(e) =>
                          setSystemSettings({ ...systemSettings, twitterUrl: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">Instagram URL</label>
                      <Input
                        placeholder="https://instagram.com/camvoyage"
                        value={systemSettings.instagramUrl}
                        onChange={(e) =>
                          setSystemSettings({ ...systemSettings, instagramUrl: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="size-4 mr-2" />
                    Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">Site Logo</label>
                    <div className="flex items-center space-x-4">
                      <div className="size-20 rounded bg-emerald-100 flex items-center justify-center">
                        <span className="text-2xl">🗺️</span>
                      </div>
                      <Button variant="outline">
                        <Upload className="size-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">Primary Color</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        defaultValue="#059669"
                        className="size-12 rounded border border-gray-300"
                      />
                      <span className="text-sm text-gray-600">#059669 (Emerald)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">Favicon</label>
                    <Button variant="outline">
                      <Upload className="size-4 mr-2" />
                      Upload Favicon
                    </Button>
                  </div>

                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="size-4 mr-2" />
                    Save Appearance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}