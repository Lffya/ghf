'use client';
import {
  Bell,
  ChevronDown,
  Headphones,
  Home,
  LogOut,
  Menu,
  Package,
  Settings,
  User,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import B2BDashboard from './b2bDashboard/page';
import B2BManageOrders from './b2bManageOrders/page';
import B2BOrderRecords from './b2bOrderRecords/page';
import B2BDeliveredRecords from './b2bDeliveredRecords/page';
import B2BPayments from './b2bPayments/page';
import B2BSupport from './b2bSupport/page';
import B2BFranchiseProfile from './b2bFranchiseProfile/page';
import B2BRequestOrder from './b2bRequestOrder/page';
// Placeholder B2B modules



const B2BNotifications = () => <div className="text-lg text-gray-700">B2B Notifications</div>;

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const B2BPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      component: <B2BDashboard />
    },
    {
      id: 'b2b-profile',
      label: 'Profile',
      icon: <Home className="w-5 h-5" />,
      component: <B2BFranchiseProfile />
    },
    
    {
      id: 'orders-request',
      label: 'Orders Request',
      icon: <Package className="w-5 h-5" />,
      component: <B2BRequestOrder />
    },
    {
      id: 'manage-orders',
      label: 'Manage Orders',
      icon: <Package className="w-5 h-5" />,
      component: <B2BManageOrders />
    },
    {
      id: 'order-records',
      label: 'Order Records',
      icon: <Users className="w-5 h-5" />,
      component: <B2BOrderRecords />
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: <Settings className="w-5 h-5" />,
      component: <B2BPayments />
    },
    {
      id: 'delivered-records',
      label: 'Delivered Records',
      icon: <Headphones className="w-5 h-5" />,
      component: <B2BDeliveredRecords />
    },
    {
      id: 'support',
      label: 'Support',
      icon: <Headphones className="w-5 h-5" />,
      component: <B2BSupport />
    }
  ];

  const currentComponent = menuItems.find(item => item.id === activeTab)?.component;

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)} style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(0px)' }}
        />
      )}

      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-56 md:w-60 lg:w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-800">B2B Panel</h1>
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
                  ? 'bg-[#e6faef] border-r-2 border-[#22c55e] text-[#22c55e]' 
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
              <button
                className="p-2 rounded-md hover:bg-gray-100 relative"
                onClick={() => setShowNotificationPanel(true)}
                title="View Notifications"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#22c55e] rounded-full"></span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">B2B Admin</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
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
          {/* Notification Panel/Modal */}
          {showNotificationPanel && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(0px)' }}>
              <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowNotificationPanel(false)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <B2BNotifications />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default B2BPanel;
