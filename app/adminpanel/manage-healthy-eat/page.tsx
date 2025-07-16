import { Edit, Eye, Filter, Plus, Shield, Trash2, Users } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { HEALTHY_EAT_SAMPLE_FOODS } from '../../../constants';

interface Food {
  id: number;
  category: string;
  image: string;
  timeToDeliver: string;
  title: string;
  price: string;
  subCategory: string;
  customSubCategory?: string;
  weight: string;
  calories: string;
  description: string;
  nutritionName: string;
  perItemServing: string;
  per10ItemsServing: string;
  per1ItemServing: string;
  ingredients: string;
  listingType: string;
  createdAt: string;
}

interface Filters {
  type: string;
  title: string;
  calories: string;
  price: string;
  time: string;
  listingType: string;
}

const ManageHealthyEat = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [filters, setFilters] = useState<Filters>({
    type: '',
    title: '',
    calories: '',
    price: '',
    time: '',
    listingType: 'all'
  });

  const categories = [
    'Beverage',
    'Fresh',
    'Nutrition kids foods for age 1-10',
    'Healthy Teenage Foods for age 10-20',
    'Adult balanced Foods for age 20-40',
    'Adult aged foods for age 40+'
  ];

  const subCategories = ['Fruit', 'Vegetable', 'Other'];
  const timeOptions = ['10-15 min', '15-30 min', '30-45 min', '1-2 hrs', '2-4 hrs'];
  const nutritionNames = ['Protein', 'Carbs', 'Fat', 'Fiber', 'Vitamin A', 'Vitamin C', 'Calcium', 'Iron'];

  const [formData, setFormData] = useState<Omit<Food, 'id' | 'createdAt'>>({
    category: '',
    image: '',
    timeToDeliver: '',
    title: '',
    price: '',
    subCategory: '',
    customSubCategory: '',
    weight: '',
    calories: '',
    description: '',
    nutritionName: '',
    perItemServing: '',
    per10ItemsServing: '',
    per1ItemServing: '',
    ingredients: '',
    listingType: 'admin'
  });

  const [viewFood, setViewFood] = useState<Food | null>(null);
  const [editFood, setEditFood] = useState<Food | null>(null);

  // Sample data
  useEffect(() => {
    setFoods(HEALTHY_EAT_SAMPLE_FOODS);
    setFilteredFoods(HEALTHY_EAT_SAMPLE_FOODS);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = foods;

    if (filters.type) {
      filtered = filtered.filter((food) => 
        food.category.toLowerCase().includes(filters.type.toLowerCase()) ||
        food.subCategory.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.title) {
      filtered = filtered.filter((food) => 
        food.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.calories) {
      filtered = filtered.filter((food) => parseInt(food.calories) <= parseInt(filters.calories));
    }

    if (filters.price) {
      filtered = filtered.filter((food) => parseFloat(food.price) <= parseFloat(filters.price));
    }

    if (filters.time) {
      filtered = filtered.filter((food) => food.timeToDeliver === filters.time);
    }

    if (filters.listingType !== 'all') {
      filtered = filtered.filter((food) => food.listingType === filters.listingType);
    }

    setFilteredFoods(filtered);
    setCurrentPage(1);
  }, [filters, foods]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for viewing food details
  const handleView = (food: Food) => {
    setViewFood(food);
  };

  // Handler for editing food
  const handleEdit = (food: Food) => {
    setEditFood(food);
    setShowAddForm(true);
    setFormData({ ...food });
  };

  // When closing the add/edit modal, reset editFood
  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditFood(null);
  };

  // Update food on submit if editing
  const handleSubmit = () => {
    if (editFood) {
      setFoods(prev => prev.map(f => f.id === editFood.id ? { ...editFood, ...formData } : f));
      setEditFood(null);
    } else {
      const newFood: Food = {
        ...formData,
        id: Date.now(),
        createdAt: 'Just now'
      };
      setFoods(prev => [newFood, ...prev]);
    }
    setFormData({
      category: '',
      image: '',
      timeToDeliver: '',
      title: '',
      price: '',
      subCategory: '',
      customSubCategory: '',
      weight: '',
      calories: '',
      description: '',
      nutritionName: '',
      perItemServing: '',
      per10ItemsServing: '',
      per1ItemServing: '',
      ingredients: '',
      listingType: 'admin'
    });
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    setFoods((prev) => prev.filter((food) => food.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Healthy Eat</h1>
              <p className="text-gray-600 mt-1">Manage your healthy food inventory and listings</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add New Food
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              name="search"
              value={filters.title}
              onChange={e => setFilters(prev => ({ ...prev, title: e.target.value, type: e.target.value }))}
              placeholder="Search by type or title..."
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
            />
            <input
              type="number"
              name="calories"
              value={filters.calories}
              onChange={handleFilterChange}
              placeholder="Max calories"
              className="w-full md:w-1/6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
            />
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="Max price"
              className="w-full md:w-1/6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
            />
            <select
              name="time"
              value={filters.time}
              onChange={handleFilterChange}
              className="w-full md:w-1/6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
            >
              <option value="">All Times</option>
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <select
              name="listingType"
              value={filters.listingType}
              onChange={handleFilterChange}
              className="w-full md:w-1/6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
            >
              <option value="all">All</option>
              <option value="admin">Admin Listed</option>
              <option value="b2b">B2B Listed</option>
            </select>
          </div>
        </div>

        {/* Add Food Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(0px)' }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{editFood ? 'Edit Healthy Food' : 'Add New Healthy Food'}</h2>
                  <button
                    onClick={handleCloseForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time *</label>
                      <select
                        name="timeToDeliver"
                        value={formData.timeToDeliver}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Time</option>
                        {timeOptions.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="Food item title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category *</label>
                      <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Sub Category</option>
                        {subCategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight *</label>
                      <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 200g, 1kg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Calories *</label>
                      <input
                        type="number"
                        name="calories"
                        value={formData.calories}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 250"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Nutrition</label>
                      <select
                        name="nutritionName"
                        value={formData.nutritionName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Nutrition</option>
                        {nutritionNames.map(nutrition => (
                          <option key={nutrition} value={nutrition}>{nutrition}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
                      <select
                        name="listingType"
                        value={formData.listingType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="admin">Admin Listed</option>
                        <option value="b2b">B2B Listed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Per Item Serving</label>
                      <input
                        type="text"
                        name="perItemServing"
                        value={formData.perItemServing}
                        onChange={handleInputChange}
                        placeholder="e.g., 1 cup"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Per 10 Items Serving</label>
                      <input
                        type="text"
                        name="per10ItemsServing"
                        value={formData.per10ItemsServing}
                        onChange={handleInputChange}
                        placeholder="e.g., 10 cups"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Per 1 Item Serving</label>
                      <input
                        type="text"
                        name="per1ItemServing"
                        value={formData.per1ItemServing}
                        onChange={handleInputChange}
                        placeholder="e.g., 1 piece"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Describe the food item..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                    <textarea
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="List all ingredients..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Food Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* View Food Modal */}
        {viewFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">View Food Details</h2>
                  <button
                    onClick={() => setViewFood(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-2">
                  <img src={viewFood.image || 'https://via.placeholder.com/300x200'} alt={viewFood.title} className="w-full h-48 object-cover rounded" />
                  <h3 className="text-xl font-semibold mt-2">{viewFood.title}</h3>
                  <p className="text-gray-600">{viewFood.category}</p>
                  <p><b>Sub Category:</b> {viewFood.subCategory}</p>
                  <p><b>Price:</b> ${viewFood.price}</p>
                  <p><b>Calories:</b> {viewFood.calories} cal</p>
                  <p><b>Weight:</b> {viewFood.weight}</p>
                  <p><b>Delivery:</b> {viewFood.timeToDeliver}</p>
                  <p><b>Description:</b> {viewFood.description}</p>
                  <p><b>Ingredients:</b> {viewFood.ingredients}</p>
                  <p><b>Nutrition:</b> {viewFood.nutritionName}</p>
                  <p><b>Listing Type:</b> {viewFood.listingType}</p>
                  <p className="text-xs text-gray-500">Created: {viewFood.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentItems.map(food => (
            <div key={food.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={food.image || 'https://via.placeholder.com/300x200'}
                  alt={food.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{food.title}</h3>
                    <p className="text-sm text-gray-600">{food.category}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {food.listingType === 'admin' ? (
                      <Shield size={16} className="text-blue-600" />
                    ) : (
                      <Users size={16} className="text-green-600" />
                    )}
                    <span className="text-xs text-gray-500 capitalize">{food.listingType}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-gray-700">${food.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Calories:</span>
                    <span className="font-medium text-gray-700">{food.calories} cal</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium text-gray-700">{food.weight}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-medium text-gray-700">{food.timeToDeliver}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{food.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => handleView(food)}>
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" onClick={() => handleEdit(food)}>
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(food.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Created: {food.createdAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredFoods.length)} of {filteredFoods.length} results
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 text-sm rounded ${
                        currentPage === pageNum
                          ? 'bg-green-600 text-gray-700'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageHealthyEat;