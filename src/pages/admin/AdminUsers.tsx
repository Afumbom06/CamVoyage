import { useState } from 'react';
import { Search, Shield, Ban, RotateCcw, Mail } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import AdminSidebar from '../../components/AdminSidebar';
import { toast } from 'sonner@2.0.3';

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      joinDate: '2025-10-15',
      status: 'active',
      savedDestinations: 5,
      trips: 2,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      joinDate: '2025-09-20',
      status: 'active',
      savedDestinations: 8,
      trips: 3,
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael@example.com',
      joinDate: '2025-11-01',
      status: 'banned',
      savedDestinations: 2,
      trips: 0,
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      joinDate: '2025-08-10',
      status: 'active',
      savedDestinations: 12,
      trips: 5,
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBanUser = (userId: string, currentStatus: string) => {
    const action = currentStatus === 'banned' ? 'unban' : 'ban';
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      toast.success(`User ${action}ned successfully`);
    }
  };

  const handleResetPassword = (email: string) => {
    toast.success(`Password reset email sent to ${email}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Users Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl text-gray-900 mb-1">{users.length}</div>
              <p className="text-sm text-gray-600">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl text-green-600 mb-1">
                {users.filter((u) => u.status === 'active').length}
              </div>
              <p className="text-sm text-gray-600">Active Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl text-red-600 mb-1">
                {users.filter((u) => u.status === 'banned').length}
              </div>
              <p className="text-sm text-gray-600">Banned Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl text-gray-900 mb-1">12</div>
              <p className="text-sm text-gray-600">New This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-emerald-100 text-emerald-600">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        <div>{user.savedDestinations} saved</div>
                        <div>{user.trips} trips</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Reset Password"
                          onClick={() => handleResetPassword(user.email)}
                        >
                          <RotateCcw className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title={user.status === 'banned' ? 'Unban User' : 'Ban User'}
                          onClick={() => handleBanUser(user.id, user.status)}
                        >
                          {user.status === 'banned' ? (
                            <Shield className="size-4 text-green-600" />
                          ) : (
                            <Ban className="size-4 text-red-600" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" title="Send Email">
                          <Mail className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
