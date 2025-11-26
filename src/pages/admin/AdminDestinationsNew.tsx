import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import AdminLayout from '../../components/AdminLayout';
import { mockDestinations, regions, categories } from '../../lib/mockData';
import { useT } from '../../lib/translationStore';
import { toast } from 'sonner@2.0.3';

export default function AdminDestinations() {
  const t = useT();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    category: '',
    description: '',
    entryFee: '',
    difficulty: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Destination saved successfully!');
    setIsDialogOpen(false);
    setFormData({
      name: '',
      region: '',
      category: '',
      description: '',
      entryFee: '',
      difficulty: '',
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      toast.success('Destination deleted successfully!');
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">{t('destinationsManagement')}</h1>
            <p className="text-gray-600">{t('manageAllDestinations')}</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="size-4 mr-2" />
                {t('addDestination')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t('addNewDestination')}</DialogTitle>
                <DialogDescription>Fill in the details to create a new destination</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">{t('name')}</label>
                  <Input
                    required
                    placeholder="Destination name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t('region')}</label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData({ ...formData, region: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t('category')}</label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">{t('description')}</label>
                  <Textarea
                    required
                    placeholder="Destination description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t('entryFee')} (XAF)</label>
                    <Input
                      required
                      type="number"
                      placeholder="0"
                      value={formData.entryFee}
                      onChange={(e) => setFormData({ ...formData, entryFee: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t('difficulty')}</label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    {t('saveDestination')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('allDestinations')} ({mockDestinations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('region')}</TableHead>
                  <TableHead>{t('category')}</TableHead>
                  <TableHead>{t('rating')}</TableHead>
                  <TableHead>{t('entryFee')}</TableHead>
                  <TableHead>{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDestinations.map((dest) => (
                  <TableRow key={dest.id}>
                    <TableCell>
                      <img
                        src={dest.images[0]}
                        alt={dest.name}
                        className="size-12 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell>{dest.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{dest.region}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{dest.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-1">{dest.rating}</span>
                        <span className="text-yellow-500">⭐</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {dest.entryFee === 0 ? t('free') : `${dest.entryFee.toLocaleString()} XAF`}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" title={t('view')}>
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title={t('edit')}>
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(dest.id)}
                          title={t('delete')}
                        >
                          <Trash2 className="size-4 text-red-500" />
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
    </AdminLayout>
  );
}