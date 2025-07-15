'use client';
import { ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface NotificationType {
  id: number;
  type: string;
  title: string;
  message: string;
  email: string;
  userName: string;
  timestamp: string;
  isRead: boolean;
  color: string;
}

const Notification = () => {
  // Sample notification data
  const [notifications] = useState<NotificationType[]>([
    {
      id: 1,
      type: 'registration',
      title: 'New user registration',
      message: 'John Doe has registered as a new user',
      email: 'john.doe@example.com',
      userName: 'John Doe',
      timestamp: '5 minutes ago',
      isRead: false,
      color: 'blue'
    },
    {
      id: 2,
      type: 'product',
      title: 'Product added',
      message: 'New healthy meal option added to catalog',
      email: 'admin@foodapp.com',
      userName: 'Admin User',
      timestamp: '1 hour ago',
      isRead: true,
      color: 'green'
    },
    {
      id: 3,
      type: 'order',
      title: 'New order received',
      message: 'Sarah Johnson placed an order for premium meal plan',
      email: 'sarah.johnson@example.com',
      userName: 'Sarah Johnson',
      timestamp: '2 hours ago',
      isRead: false,
      color: 'purple'
    },
    {
      id: 4,
      type: 'review',
      title: 'Product review',
      message: 'Mike Wilson left a 5-star review for Mediterranean Bowl',
      email: 'mike.wilson@example.com',
      userName: 'Mike Wilson',
      timestamp: '3 hours ago',
      isRead: true,
      color: 'orange'
    },
    {
      id: 5,
      type: 'registration',
      title: 'New user registration',
      message: 'Lisa Chen needs help with delivery issues',
      email: 'lisa.chen@example.com',
      userName: 'Lisa Chen',
      timestamp: '4 hours ago',
      isRead: false,
      color: 'red'
    },
    {
      id: 6,
      type: 'registration',
      title: 'New user registration',
      message: 'Alex Smith has registered as a new user',
      email: 'alex.smith@example.com',
      userName: 'Alex Smith',
      timestamp: '5 hours ago',
      isRead: true,
      color: 'blue'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  // Reply feature removed

  // Filter notifications based on search term
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification =>
      notification.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notifications, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

  // Handle pagination
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Reply feature removed

  const getColorClasses = (color: string, isRead: boolean) => {
    const opacity = isRead ? '30' : '50';
    const dotColor = isRead ? '400' : '600';
    
    switch (color) {
      case 'blue':
        return { bg: `bg-blue-${opacity}`, dot: `bg-blue-${dotColor}` };
      case 'green':
        return { bg: `bg-green-${opacity}`, dot: `bg-green-${dotColor}` };
      case 'purple':
        return { bg: `bg-purple-${opacity}`, dot: `bg-purple-${dotColor}` };
      case 'orange':
        return { bg: `bg-orange-${opacity}`, dot: `bg-orange-${dotColor}` };
      case 'red':
        return { bg: `bg-red-${opacity}`, dot: `bg-red-${dotColor}` };
      default:
        return { bg: `bg-gray-${opacity}`, dot: `bg-gray-${dotColor}` };
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Notifications</h2>
        
        {/* Search Bar */}
        <div className="relative flex-1 sm:flex-none sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, email, or content..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''} found
      </div>

      {/* Notifications List */}
      <div className="space-y-4 mb-6">
        {currentNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Filter className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No notifications found matching your search</p>
          </div>
        ) : (
          currentNotifications.map((notification) => {
            const colorClasses = getColorClasses(notification.color, notification.isRead);
            
            return (
              <div key={notification.id} className={`flex flex-col sm:flex-row sm:items-start gap-3 p-4 ${colorClasses.bg} rounded-lg transition-all hover:shadow-md`}>
                <div className={`w-2 h-2 ${colorClasses.dot} rounded-full mt-2 flex-shrink-0`}></div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-2 text-xs text-gray-500">
                        <span className="truncate">👤 {notification.userName}</span>
                        <span className="truncate">📧 {notification.email}</span>
                        <span className="whitespace-nowrap">⏰ {notification.timestamp}</span>
                      </div>
                    </div>
                    
                    {/* Reply feature removed */}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} of {filteredNotifications.length} results
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Reply feature removed */}
    </div>
  );
};

export default Notification;