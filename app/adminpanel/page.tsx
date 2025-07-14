'use client';
import {
  Bell,
  Building,
  ChevronDown,
  Headphones,
  Heart,
  Home,
  LogOut,
  Menu,
  Package,
  Settings,
  Tag,
  User,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import AdminDashboard from './admindashboard/page';
import BMIRecordsDashboard from './BMI-record/page';
import DeliveredRecord from './deliveredrecord/page';
import FranchiseVerification from './franchiseverification/franchiseverification';
import ManageFranchise from './manage-franchise/page';
import ManageHealthyEat from './manage-healthy-eat/page';
import ManageOffers from './manage-offers/page'; // Assuming you have a ManageOffers component
import ManageProduct from './manage-product/page';
import ManageUser from './manage-users/page';
import ManageOrders from './manageorder/page';
import Notification from './notifications/page';
import PaymentsPage from './payments/page';
import Support from './support/page';
// Mock components for the admin modules






interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />, // Home icon for dashboard
      component: <AdminDashboard />
    },
    {
      id: 'support',
      label: 'Support',
      icon: <Headphones className="w-5 h-5" />, // Headphones for support
      component: <Support />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-5 h-5" />, // Bell for notifications
      component: <Notification />
    },
    {
      id: 'manage-orders',
      label: 'Manage Orders',
      icon: <Package className="w-5 h-5" />, // Package for orders
      component: <ManageOrders />
    },
    {
      id: 'manage-users',
      label: 'Manage Users',
      icon: <Users className="w-5 h-5" />, // Users for user management
      component: <ManageUser />
    },
    {
      id: 'manage-products',
      label: 'Manage Products',
      icon: <Package className="w-5 h-5" />, // Package for products
      component: <ManageProduct />
    },
    {
      id: 'manage-offers',
      label: 'Manage Offers',
      icon: <Tag className="w-5 h-5" />, // Tag for offers
      component: <ManageOffers />
    },
    {
      id: 'manage-healthy-eat',
      label: 'Manage Healthy Eat',
      icon: <Heart className="w-5 h-5" />, // Heart for healthy eat
      component: <ManageHealthyEat />
    },
    {
      id: 'manage-franchise',
      label: 'Manage Franchise',
      icon: <Building className="w-5 h-5" />, // Building for franchise
      component: <ManageFranchise />
    },
    {
      id: 'franchise-verification',
      label: 'Franchise Verification',
      icon: <User className="w-5 h-5" />, // User for franchise verification
      component: <FranchiseVerification />
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: <Settings className="w-5 h-5" />, // Settings (or use CreditCard if available) for payments
      component: <PaymentsPage />
    },
    {
      id: 'delivered-records',
      label: 'Delivered Records',
      icon: <Building className="w-5 h-5" />, // ChevronDown for delivered records (or use Truck if available)
      component: <DeliveredRecord />
    },
    {
      id: 'manage-bmi',
      label: 'BMI Records',
      icon: <Heart className="w-5 h-5" />, // Heart for BMI (or use Activity if available)
      component: <BMIRecordsDashboard />
    }
  ];

  const currentComponent = menuItems.find(item => item.id === activeTab)?.component;

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(0px)' }}
        />
      )}

      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-56 md:w-60 lg:w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors duration-200 ${
                activeTab === item.id 
                  ? 'bg-green-50 border-r-2 border-green-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={{
                color: activeTab === item.id ? '#22c55e' : undefined
              }}
            >
              {item.icon}
              <span className="ml-3 font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Fixed Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-md hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <button className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {currentComponent}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;