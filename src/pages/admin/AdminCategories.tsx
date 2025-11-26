import { useState } from 'react';
import { Plus, Edit, Trash2, Tag, MapPin } from 'lucide-react';
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
  DialogFooter,
  DialogDescription,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import AdminLayout from '../../components/AdminLayout';
import { categories as initialCategories, regions as initialRegions } from '../../lib/mockData';
import { useT } from '../../lib/translationStore';
import { toast } from 'sonner@2.0.3';

export default function AdminCategories() {
  const t = useT();
  const [categories, setCategories] = useState(initialCategories);
  const [regions, setRegions] = useState(initialRegions);
  
  // Category State
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ name: '', icon: '', color: '' });
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
  
  // Region State
  const [regionDialog, setRegionDialog] = useState(false);
  const [regionForm, setRegionForm] = useState({ name: '', description: '' });
  const [editingRegion, setEditingRegion] = useState<string | null>(null);
  const [deleteRegionDialog, setDeleteRegionDialog] = useState(false);
  const [deletingRegion, setDeletingRegion] = useState<string | null>(null);

  // Category Handlers
  const handleAddCategory = () => {
    if (categoryForm.name) {
      setCategories([...categories, categoryForm.name]);
      toast.success('Category added successfully!');
      setCategoryDialog(false);
      setCategoryForm({ name: '', icon: '', color: '' });
    }
  };

  const handleEditCategory = (category: string) => {
    setEditingCategory(category);
    setCategoryForm({ name: category, icon: '', color: '' });
    setCategoryDialog(true);
  };

  const handleUpdateCategory = () => {
    if (editingCategory && categoryForm.name) {
      setCategories(categories.map(c => c === editingCategory ? categoryForm.name : c));
      toast.success('Category updated successfully!');
      setCategoryDialog(false);
      setEditingCategory(null);
      setCategoryForm({ name: '', icon: '', color: '' });
    }
  };

  const handleDeleteCategory = () => {
    if (deletingCategory) {
      setCategories(categories.filter(c => c !== deletingCategory));
      toast.success('Category deleted successfully!');
      setDeleteCategoryDialog(false);
      setDeletingCategory(null);
    }
  };

  // Region Handlers
  const handleAddRegion = () => {
    if (regionForm.name) {
      setRegions([...regions, regionForm.name]);
      toast.success('Region added successfully!');
      setRegionDialog(false);
      setRegionForm({ name: '', description: '' });
    }
  };

  const handleEditRegion = (region: string) => {
    setEditingRegion(region);
    setRegionForm({ name: region, description: '' });
    setRegionDialog(true);
  };

  const handleUpdateRegion = () => {
    if (editingRegion && regionForm.name) {
      setRegions(regions.map(r => r === editingRegion ? regionForm.name : r));
      toast.success('Region updated successfully!');
      setRegionDialog(false);
      setEditingRegion(null);
      setRegionForm({ name: '', description: '' });
    }
  };

  const handleDeleteRegion = () => {
    if (deletingRegion) {
      setRegions(regions.filter(r => r !== deletingRegion));
      toast.success('Region deleted successfully!');
      setDeleteRegionDialog(false);
      setDeletingRegion(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl text-gray-900 mb-1">Categories & Regions Management</h1>
          <p className="text-sm text-gray-600">Organize your destinations with categories and regions</p>
        </div>

        <Tabs defaultValue="categories" className="space-y-4">
          <TabsList>
            <TabsTrigger value="categories">
              <Tag className="size-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="regions">
              <MapPin className="size-4 mr-2" />
              Regions
            </TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-base">All Categories ({categories.length})</CardTitle>
                <Button 
                  onClick={() => {
                    setEditingCategory(null);
                    setCategoryForm({ name: '', icon: '', color: '' });
                    setCategoryDialog(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="size-4 mr-2" />
                  Add Category
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Destinations Count</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Badge>{category}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">12 destinations</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditCategory(category)}
                            >
                              <Edit className="size-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setDeletingCategory(category);
                                setDeleteCategoryDialog(true);
                              }}
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
          </TabsContent>

          {/* Regions Tab */}
          <TabsContent value="regions">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-base">All Regions ({regions.length})</CardTitle>
                <Button 
                  onClick={() => {
                    setEditingRegion(null);
                    setRegionForm({ name: '', description: '' });
                    setRegionDialog(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="size-4 mr-2" />
                  Add Region
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Destinations Count</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {regions.map((region) => (
                      <TableRow key={region}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <MapPin className="size-4 text-emerald-600" />
                            <span className="text-gray-900">{region}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">8 destinations</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditRegion(region)}
                            >
                              <Edit className="size-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setDeletingRegion(region);
                                setDeleteRegionDialog(true);
                              }}
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
          </TabsContent>
        </Tabs>

        {/* Category Dialog */}
        <Dialog open={categoryDialog} onOpenChange={setCategoryDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
              <DialogDescription>
                {editingCategory ? 'Update the category details' : 'Create a new category for organizing destinations'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Category Name</label>
                <Input
                  placeholder="e.g., Wildlife, Beaches, Mountains"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Icon (Optional)</label>
                <Input
                  placeholder="e.g., 🏔️, 🏖️, 🦁"
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Color (Optional)</label>
                <Input
                  type="color"
                  value={categoryForm.color}
                  onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCategoryDialog(false)}>Cancel</Button>
              <Button 
                onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                className="bg-emerald-600"
              >
                {editingCategory ? 'Update' : 'Add'} Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Region Dialog */}
        <Dialog open={regionDialog} onOpenChange={setRegionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRegion ? 'Edit Region' : 'Add New Region'}</DialogTitle>
              <DialogDescription>
                {editingRegion ? 'Update the region details' : 'Create a new region for organizing destinations'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Region Name</label>
                <Input
                  placeholder="e.g., Southwest, Littoral, Far North"
                  value={regionForm.name}
                  onChange={(e) => setRegionForm({ ...regionForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Description (Optional)</label>
                <Input
                  placeholder="Brief description of the region"
                  value={regionForm.description}
                  onChange={(e) => setRegionForm({ ...regionForm, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRegionDialog(false)}>Cancel</Button>
              <Button 
                onClick={editingRegion ? handleUpdateRegion : handleAddRegion}
                className="bg-emerald-600"
              >
                {editingRegion ? 'Update' : 'Add'} Region
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Category Dialog */}
        <AlertDialog open={deleteCategoryDialog} onOpenChange={setDeleteCategoryDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Category?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the category from all destinations. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteCategory} className="bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Region Dialog */}
        <AlertDialog open={deleteRegionDialog} onOpenChange={setDeleteRegionDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Region?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the region from all destinations. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteRegion} className="bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}