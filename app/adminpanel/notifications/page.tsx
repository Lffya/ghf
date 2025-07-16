"use client";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { NOTIFICATIONS_MOCK_DATA } from "../../../constants";

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
  const [notifications] = useState<NotificationType[]>(NOTIFICATIONS_MOCK_DATA);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700"
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

      {/* Notifications List with scrolling */}
      <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
        {currentNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Filter className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-gray-700">No notifications found matching your search</p>
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
                        <span className="truncate text-gray-700">👤 {notification.userName}</span>
                        <span className="truncate text-gray-700">📧 {notification.email}</span>
                        <span className="whitespace-nowrap text-gray-700">⏰ {notification.timestamp}</span>
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
            <span className="text-gray-700">Showing {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} of {filteredNotifications.length} results</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-gray-700"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
              <span className="hidden sm:inline text-gray-700">Previous</span>
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-colors text-gray-700 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
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
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-gray-700"
            >
              <span className="hidden sm:inline text-gray-700">Next</span>
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>
      )}

      {/* Reply feature removed */}
    </div>
  );
};

export default Notification;