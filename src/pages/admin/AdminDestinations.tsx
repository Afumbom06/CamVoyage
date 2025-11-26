import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Upload, MapPin, Power } from 'lucide-react';
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
  DialogFooter,
} from '../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import AdminLayout from '../../components/AdminLayout';
import { mockDestinations, regions, categories } from '../../lib/mockData';
import { useT } from '../../lib/translationStore';
import { toast } from 'sonner@2.0.3';

export default function AdminDestinations() {
  const t = useT();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingDestination, setViewingDestination] = useState<any>(null);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    category: '',
    description: '',
    entryFee: '',
    difficulty: '',
    published: true,
    latitude: '',
    longitude: '',
    images: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isEditMode ? 'Destination updated successfully!' : 'Destination created successfully!');
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      region: '',
      category: '',
      description: '',
      entryFee: '',
      difficulty: '',
      published: true,
      latitude: '',
      longitude: '',
      images: [],
    });
  };

  const handleEdit = (dest: any) => {
    setIsEditMode(true);
    setEditingId(dest.id);
    setFormData({
      name: dest.name,
      region: dest.region,
      category: dest.category,
      description: dest.description,
      entryFee: dest.entryFee.toString(),
      difficulty: dest.difficulty || 'Easy',
      published: dest.published !== false,
      latitude: dest.coordinates?.lat?.toString() || '',
      longitude: dest.coordinates?.lng?.toString() || '',
      images: dest.images || [],
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    toast.success('Destination deleted successfully!');
    setDeleteDialogOpen(false);
    setDeletingId(null);
  };

  const handleView = (dest: any) => {
    setViewingDestination(dest);
    setViewDialogOpen(true);
  };

  const handleTogglePublish = (dest: any) => {
    toast.success(dest.published !== false ? 'Destination unpublished' : 'Destination published');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload to a server and get URLs back
      toast.success(`${files.length} image(s) uploaded successfully`);
      // For demo, we'll just use placeholder URLs
      const newImages = Array.from(files).map((_, i) => 
        `https://images.unsplash.com/photo-${Date.now()}-${i}?w=800`
      );
      setFormData({ ...formData, images: [...formData.images, ...newImages] });
    }
  };

  const handleAddLocation = () => {
    setMapDialogOpen(true);
  };

  const handleSaveLocation = (lat: string, lng: string) => {
    setFormData({ ...formData, latitude: lat, longitude: lng });
    setMapDialogOpen(false);
    toast.success('Location saved successfully');
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
                <DialogTitle>{isEditMode ? t('editDestination') : t('addNewDestination')}</DialogTitle>
                <DialogDescription>
                  {isEditMode ? 'Update destination information below' : 'Fill in the details to create a new destination'}
                </DialogDescription>
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

                {/* Image Upload Section */}
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition">
                    <Upload className="size-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (max 5MB each)</p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      className="mt-3"
                      onChange={handleImageUpload}
                    />
                  </div>
                  {formData.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-20 object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 size-6 opacity-0 group-hover:opacity-100 transition"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Section */}
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Location Coordinates</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Latitude"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    />
                    <Input
                      placeholder="Longitude"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={handleAddLocation}
                  >
                    <MapPin className="size-4 mr-2" />
                    Select on Map
                  </Button>
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

                {/* Publish Toggle */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published" className="cursor-pointer">
                    Publish immediately
                  </Label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    {isEditMode ? t('updateDestination') : t('saveDestination')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setIsEditMode(false);
                      setEditingId(null);
                      resetForm();
                    }}
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
                        <Button variant="ghost" size="icon" title={t('view')} onClick={() => handleView(dest)}>
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title={t('edit')} onClick={() => handleEdit(dest)}>
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title={dest.published !== false ? 'Unpublish' : 'Publish'}
                          onClick={() => handleTogglePublish(dest)}
                        >
                          <Power className={`size-4 ${dest.published !== false ? 'text-green-500' : 'text-gray-400'}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(dest.id)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the destination and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Destination Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingDestination?.name}</DialogTitle>
            <DialogDescription>Destination Details</DialogDescription>
          </DialogHeader>
          {viewingDestination && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {viewingDestination.images?.slice(0, 4).map((img: string, idx: number) => (
                  <img key={idx} src={img} alt={`View ${idx + 1}`} className="w-full h-40 object-cover rounded" />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="text-gray-900">{viewingDestination.region}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-gray-900">{viewingDestination.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Entry Fee</p>
                  <p className="text-gray-900">
                    {viewingDestination.entryFee === 0 ? 'Free' : `${viewingDestination.entryFee.toLocaleString()} XAF`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="text-gray-900">{viewingDestination.rating} ⭐</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-900">{viewingDestination.description}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Map Location Dialog */}
      <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select Location on Map</DialogTitle>
            <DialogDescription>Click on the map to set the destination location</DialogDescription>
          </DialogHeader>
          <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="size-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Interactive map would appear here</p>
              <p className="text-sm text-gray-500 mt-2">Integration with Google Maps or Leaflet</p>
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between">
            <div className="flex gap-2">
              <Input placeholder="Latitude" value={formData.latitude} onChange={(e) => setFormData({ ...formData, latitude: e.target.value })} />
              <Input placeholder="Longitude" value={formData.longitude} onChange={(e) => setFormData({ ...formData, longitude: e.target.value })} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setMapDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => handleSaveLocation(formData.latitude, formData.longitude)} className="bg-emerald-600">
                Save Location
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}