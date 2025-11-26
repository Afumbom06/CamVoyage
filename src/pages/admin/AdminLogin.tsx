import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '../../components/ui/dialog';
import { useAdminStore } from '../../lib/adminStore';
import { toast } from 'sonner@2.0.3';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const { login, verifyTwoFactor, twoFactorEnabled } = useAdminStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        if (twoFactorEnabled) {
          // Show 2FA input
          setShowTwoFactor(true);
          toast.success('Please enter your 2FA code');
        } else {
          // Direct login without 2FA
          toast.success('Login successful!');
          navigate('/admin');
        }
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await verifyTwoFactor(twoFactorCode);
      
      if (success) {
        toast.success('2FA verification successful!');
        navigate('/admin');
      } else {
        toast.error('Invalid 2FA code');
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Password reset link sent to ${resetEmail}`);
    setIsResetDialogOpen(false);
    setResetEmail('');
  };

  if (showTwoFactor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-emerald-500/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 size-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <Shield className="size-8 text-emerald-600" />
              </div>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Enter the 6-digit code from your authenticator app
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
                <div>
                  <Input
                    required
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                    className="text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Demo code: 123456
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isLoading || twoFactorCode.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setShowTwoFactor(false);
                    setTwoFactorCode('');
                  }}
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Back to Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Shield className="size-12 text-emerald-500" />
          </div>
          <h1 className="text-3xl text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Sign in to manage CAMVOYAGE</p>
        </div>

        <Card className="border-emerald-500/20">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    required
                    type="email"
                    placeholder="admin@camvoyage.cm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-700">Remember me</span>
                </label>

                <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-sm text-emerald-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reset Password</DialogTitle>
                      <DialogDescription>
                        Enter your email to receive a password reset link
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-700 mb-2 block">
                          Email Address
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder="admin@camvoyage.cm"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        We'll send you a link to reset your password.
                      </p>
                      <div className="flex space-x-3">
                        <Button type="submit" className="flex-1">
                          Send Reset Link
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setIsResetDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-900 mb-2">Demo Credentials:</p>
                <p className="text-xs text-emerald-700">
                  Email: admin@camvoyage.cm
                  <br />
                  Password: admin123
                </p>
              </div>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
                ← Back to Website
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Unauthorized access is prohibited and will be prosecuted.
          </p>
        </div>
      </motion.div>
    </div>
  );
}