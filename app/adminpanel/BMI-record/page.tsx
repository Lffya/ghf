import { Activity, Briefcase, Calendar, Clock, Download, Eye, Filter, Ruler, Search, Target, User, Users, Utensils, Weight } from 'lucide-react';
import React, { useState } from 'react';
import { BMI_MOCK_RECORDS } from '../../../constants';

interface BMIRecord {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active' | 'Extremely Active';
  workType: 'Desk Job' | 'Standing Job' | 'Physical Job' | 'Mixed' | 'Other';
  sittingHours: number;
  dietPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Flexitarian';
  goal: 'Weight Loss' | 'Weight Gain' | 'Muscle Building' | 'Maintenance' | 'General Health';
  gender: 'Male' | 'Female' | 'Other';
  submittedAt: string;
  bmi: number;
  bmiCategory: string;
}

const BMIRecordsDashboard: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<BMIRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6; // You can adjust this as needed

  // Sample BMI records data
  const [records] = useState<BMIRecord[]>(BMI_MOCK_RECORDS as BMIRecord[]);

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-blue-600 bg-blue-50';
    if (bmi < 25) return 'text-green-600 bg-green-50';
    if (bmi < 30) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'Sedentary': return 'bg-red-100 text-red-800';
      case 'Lightly Active': return 'bg-yellow-100 text-yellow-800';
      case 'Moderately Active': return 'bg-green-100 text-green-800';
      case 'Very Active': return 'bg-blue-100 text-blue-800';
      case 'Extremely Active': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return <span className="text-gray-700">{new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })}</span>;
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'All' || record.bmiCategory === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const categories = ['All', 'Normal', 'Overweight', 'Obese', 'Underweight'];

  if (selectedRecord) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedRecord(null)}
            className="mb-6 flex items-center text-[#22c55e] hover:text-green-600 transition-colors"
          >
            ← Back to Records
          </button>

          {/* Header */}
          <div className="bg-white shadow-lg rounded-lg mb-8 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedRecord.name}</h1>
                <p className="text-gray-600">Record ID: <span className="text-gray-700">{selectedRecord.id}</span></p>
                <p className="text-sm text-gray-500 mt-1">
                  Submitted: {formatDate(selectedRecord.submittedAt)}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getBMIColor(selectedRecord.bmi)}`}>
                  BMI: {selectedRecord.bmi} ({selectedRecord.bmiCategory})
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Basic Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-[#22c55e]" />
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Age</p>
                        <p className="text-lg font-semibold text-gray-900"><span className="text-gray-700">{selectedRecord.age} years</span></p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Gender</p>
                        <p className="text-lg font-semibold text-gray-900"><span className="text-gray-700">{selectedRecord.gender}</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Ruler className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Height</p>
                        <p className="text-lg font-semibold text-gray-900"><span className="text-gray-700">{selectedRecord.height} cm</span></p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Weight className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Weight</p>
                        <p className="text-lg font-semibold text-gray-900"><span className="text-gray-700">{selectedRecord.weight} kg</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lifestyle Information */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-[#22c55e]" />
                  Lifestyle Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Activity Level</p>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(selectedRecord.activityLevel)} text-gray-700`}>
                          {selectedRecord.activityLevel}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Daily Sitting Hours</p>
                        <p className="text-lg font-semibold text-gray-900"><span className="text-gray-700">{selectedRecord.sittingHours} hours</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Work Type</p>
                        <p className="text-lg font-semibold text-gray-900"><span className="text-gray-700">{selectedRecord.workType}</span></p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Utensils className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Diet Preference</p>
                        <p className="text-lg font-semibold text-gray-900"><span className="text-gray-700">{selectedRecord.dietPreference}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goal Information */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#22c55e]" />
                  Health Goal
                </h2>
                
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Primary Goal</p>
                    <p className="text-lg font-semibold text-gray-900"><span className="text-gray-700">{selectedRecord.goal}</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* BMI Analysis Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-lg rounded-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">BMI Analysis</h2>
                
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-2xl font-bold ${getBMIColor(selectedRecord.bmi)}`}>
                      {selectedRecord.bmi}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Body Mass Index</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Category</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getBMIColor(selectedRecord.bmi)} text-gray-700`}>
                      {selectedRecord.bmiCategory}
                    </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#22c55e] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((selectedRecord.bmi / 40) * 100, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Underweight</span>
                        <span className="text-gray-700">&lt;18.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Normal</span>
                        <span className="text-gray-700">18.5-24.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Overweight</span>
                        <span className="text-gray-700">25-29.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Obese</span>
                        <span className="text-gray-700">≥30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-lg mb-8 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">BMI Records Dashboard</h1>
              <p className="text-gray-600">Total Records: {records.length}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="bg-[#22c55e] hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white shadow-lg rounded-lg mb-8 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
               
                <input
                  id="bmi-search"
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent text-gray-700"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <label htmlFor="bmi-category" className="text-gray-700 text-sm mb-1 block">Category</label>
              <select
                id="bmi-category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent text-gray-700"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="text-gray-700">{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedRecords.map((record) => (
            <div key={record.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900"><span className="text-gray-700">{record.name}</span></h3>
                  <p className="text-sm text-gray-500"><span className="text-gray-700">{record.id}</span></p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getBMIColor(record.bmi)}`}>
                  BMI: {record.bmi}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Age</span>
                  <span className="text-sm font-medium text-gray-900"><span className="text-gray-700">{record.age} years</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gender</span>
                  <span className="text-sm font-medium text-gray-900"><span className="text-gray-700">{record.gender}</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Height</span>
                  <span className="text-sm font-medium text-gray-900"><span className="text-gray-700">{record.height} cm</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Weight</span>
                  <span className="text-sm font-medium text-gray-900"><span className="text-gray-700">{record.weight} kg</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Goal</span>
                  <span className="text-sm font-medium text-gray-900"><span className="text-gray-700">{record.goal}</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Activity</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(record.activityLevel)} text-gray-700`}>
                    {record.activityLevel}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Submitted</span>
                  <span className="text-sm font-medium text-gray-900">{formatDate(record.submittedAt)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedRecord(record)}
                  className="w-full bg-[#22c55e] hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg border ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg border ${currentPage === page ? 'bg-[#22c55e] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg border ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Next
            </button>
          </div>
        )}

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No records found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMIRecordsDashboard;