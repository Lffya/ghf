// Mock user for reference
export const mock_user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  status: 'Accepted',
  mobile: '9000000001',
};

// Mock order type
export type MockOrder = {
  
  id: number;
  userId: number;
  customerName?: string;
  mobile?: string;
  date: string;
  time: string;
  paymentType: string;
  paymentId: string;
  accountNumber: string;
  products: { id: number; count: number }[]; // Array of product objects with count
  total: number;
};

// Mock orders array
export const MOCK_ORDERS: MockOrder[] = [
  {
    id: 101,
    userId: mock_user.id,
    date: '2025-07-21',
    time: '14:30',
    paymentType: 'UPI',
    paymentId: 'UPI123456',
    accountNumber: '1234567890',
    products: [
      { id: 1, count: 1 }, // Healthy Salad Bowl
      { id: 2, count: 2 } // Protein Smoothie
    ],
    mobile: mock_user.mobile,
    total: 12.99 * 1 + 8.99 * 2,
  },
  {
    id: 102,
    userId: mock_user.id,
    date: '2025-07-20',
    time: '10:15',
    paymentType: 'Card',
    paymentId: 'CARD987654',
    accountNumber: '0987654321',
    products: [
      { id: 3, count: 1 }, // Masala Chai
      { id: 4, count: 1 }, // Organic Jam
      { id: 5, count: 3 } // Nutri Snack Bar
    ],
    mobile: mock_user.mobile,
    total: 4.5 * 1 + 6.75 * 1 + 2.99 * 3,
  },
];
// Notification mock data for admin panel
export const NOTIFICATIONS_MOCK_DATA = [
  {
    id: 101,
    userId: mock_user.id,
    customerName: 'John Doe',
    mobile: '9000000001',
    date: '2025-07-21',
    time: '14:30',
    paymentType: 'UPI',
    paymentId: 'UPI123456',
    accountNumber: '1234567890',
    products: [
      { id: 1, count: 1 }, // Healthy Salad Bowl
      { id: 2, count: 2 } // Protein Smoothie
    ]
  },
  {
    id: 102,
    userId: mock_user.id,
    customerName: 'John Doe',
    mobile: '9000000001',
    date: '2025-07-20',
    time: '10:15',
    paymentType: 'Card',
    paymentId: 'CARD987654',
    accountNumber: '0987654321',
    products: [
      { id: 3, count: 1 }, // Masala Chai
      { id: 4, count: 1 }, // Organic Jam
      { id: 5, count: 3 } // Nutri Snack Bar
    ]
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
];
export const mockRecentActivity = [
  { type: 'Account Created', user: 'John Doe', time: '2 min ago' },
  { type: 'New Product', user: 'Admin', time: '10 min ago' },
  { type: 'Order Placed', user: 'Jane Smith', time: '30 min ago' },
  { type: 'Franchise Added', user: 'Super Admin', time: '1 hr ago' },
];

// Recent activity mock data for B2B Dashboard
export const RECENT_ACTIVITY = [
  { type: "Order", detail: "Order #1024 placed by Acme Corp", time: "2 min ago" },
  { type: "Support", detail: "Ticket #2045 opened by Beta Ltd.", time: "10 min ago" },
  { type: "Order", detail: "Order #1023 delivered to Gamma Inc.", time: "30 min ago" },
  { type: "Order", detail: "Order #1022 cancelled by Delta LLC", time: "1 hr ago" },
  { type: "Support", detail: "Ticket #2044 resolved for Acme Corp", time: "2 hr ago" },
];

// Order record types and mock data for orderrecord page
export interface Order {
  id: string;
  date: string; // ISO string
  customer: string;
  franchise?: string;
  phone: string;
  items: string;
  total: number;
  status: string;
}

export const FRANCHISE_ORDER_HISTORY: Order[] = [
  { id: 'FO-2024-001', date: '2024-07-15T10:30:00Z', customer: 'John Doe', franchise: 'Downtown Branch', phone: '9876543210', items: 'Burger, Fries, Coke', total: 450.00, status: 'Delivered' },
  { id: 'FO-2024-002', date: '2024-07-14T14:15:00Z', customer: 'Jane Smith', franchise: 'Mall Branch', phone: '9123456780', items: 'Pizza, Salad', total: 680.00, status: 'Preparing' },
  { id: 'FO-2024-003', date: '2024-07-13T09:20:00Z', customer: 'Bob Wilson', franchise: 'Airport Branch', phone: '9988776655', items: 'Sandwich, Coffee', total: 320.00, status: 'Cancelled' },
  { id: 'FO-2024-004', date: '2024-07-12T16:45:00Z', customer: 'Alice Johnson', franchise: 'Downtown Branch', phone: '9090909090', items: 'Pasta, Garlic Bread', total: 520.00, status: 'Delivered' },
  { id: 'FO-2024-005', date: '2024-07-11T11:30:00Z', customer: 'Mike Davis', franchise: 'Mall Branch', phone: '8888888888', items: 'Steak, Mashed Potatoes', total: 850.00, status: 'Delivered' },
  { id: 'FO-2024-006', date: '2024-07-10T13:20:00Z', customer: 'Sarah Brown', franchise: 'Airport Branch', phone: '9191919191', items: 'Salad, Soup', total: 380.00, status: 'Preparing' },
];

export const USER_ORDER_HISTORY: Order[] = [
  { id: 'UO-2024-001', date: '2024-07-15T08:15:00Z', customer: 'Emily Chen', phone: '9000000001', items: 'Breakfast Combo', total: 290.00, status: 'Delivered' },
  { id: 'UO-2024-002', date: '2024-07-14T12:30:00Z', customer: 'David Lee', phone: '9000000002', items: 'Lunch Special', total: 420.00, status: 'Delivered' },
  { id: 'UO-2024-003', date: '2024-07-13T19:45:00Z', customer: 'Lisa Wang', phone: '9000000003', items: 'Dinner for Two', total: 890.00, status: 'Preparing' },
  { id: 'UO-2024-004', date: '2024-07-12T15:20:00Z', customer: 'Tom Jackson', phone: '9000000004', items: 'Snack Pack', total: 180.00, status: 'Cancelled' },
  { id: 'UO-2024-005', date: '2024-07-11T10:10:00Z', customer: 'Anna Martinez', phone: '9000000005', items: 'Healthy Bowl', total: 350.00, status: 'Delivered' },
  { id: 'UO-2024-006', date: '2024-07-10T17:30:00Z', customer: 'Chris Taylor', phone: '9000000006', items: 'Family Meal', total: 1200.00, status: 'Delivered' },
];
// Delivery record types and mock data for delivered records page
export type DeliveryRecordType =
  | {
      id: string;
      type: 'franchise-equipment';
      franchise: string;
      equipment?: string;
      product?: string;
      deliveredOn: string;
      status: 'Delivered' | 'Pending' | 'Issue';
      description?: string;
      phone?: string;
    }
  | {
      id: string;
      type: 'product-delivered';
      user: string;
      product: string;
      deliveredOn: string;
      status: 'Delivered' | 'Pending' | 'Issue';
      description?: string;
      phone?: string;
    }
  | {
      id: string;
      type: 'franchise-product';
      franchise: string;
      product: string;
      deliveredOn: string;
      status: 'Delivered' | 'Pending' | 'Issue';
      description?: string;
      phone?: string;
    };

export const DELIVERY_RECORDS: DeliveryRecordType[] = [
  {
    id: 'EQ-2024-001',
    type: 'franchise-equipment',
    franchise: 'Downtown Branch',
    equipment: 'Oven Model X',
    deliveredOn: '2024-07-10T10:00:00Z',
    status: 'Delivered',
    description: 'Installed and tested successfully.',
    phone: '9876543210'
  },
  {
    id: 'FP-2024-002',
    type: 'franchise-product',
    franchise: 'Mall Location',
    product: 'Protein Smoothie',
    deliveredOn: '2024-07-12T09:15:00Z',
    status: 'Pending',
    description: 'Awaiting franchise confirmation.',
    phone: '9123456780'
  },
  {
    id: 'EQ-2024-003',
    type: 'franchise-equipment',
    franchise: 'Airport Branch',
    equipment: 'Refrigerator Model Z',
    deliveredOn: '2024-07-13T15:45:00Z',
    status: 'Issue',
    description: 'Damaged during transport.',
    phone: '9988776655'
  },
  {
    id: 'FP-2024-004',
    type: 'franchise-product',
    franchise: 'Downtown Branch',
    product: 'Organic Jam',
    deliveredOn: '2024-07-14T08:00:00Z',
    status: 'Delivered',
    description: 'Received by franchise manager.',
    phone: '9090909090'
  },
  {
    id: 'PR-2024-005',
    type: 'product-delivered',
    user: 'John Doe',
    product: 'Healthy Salad Bowl',
    deliveredOn: '2024-07-11T12:30:00Z',
    status: 'Delivered',
    description: 'Delivered to user address.',
    phone: '9000000001'
  },
  {
    id: 'PR-2024-006',
    type: 'product-delivered',
    user: 'Jane Smith',
    product: 'Nutri Snack Bar',
    deliveredOn: '2024-07-13T17:00:00Z',
    status: 'Delivered',
    description: 'Delivered to user address.',
    phone: '9000000002'
  }
];
// User management types and mock data
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending' | 'Blocked' | 'Rejected';
  type: 'user' | 'franchise';
  joinDate: string;
  lastLogin: string;
  mobile: string;
}

export interface UserDocument {
  type: string;
  url: string;
  verified: boolean;
}

export interface UserWithDocs extends User {
  documents: UserDocument[];
}

export const MOCK_USERS: UserWithDocs[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', type: 'user', joinDate: '2024-01-15', lastLogin: '2024-07-10', mobile: '9000000001', documents: [
    { type: 'Aadhar Card', url: '/file.svg', verified: true },
    { type: 'PAN Card', url: '/file.svg', verified: false },
  ] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', type: 'user', joinDate: '2023-11-20', lastLogin: '2024-07-14', mobile: '9000000002', documents: [
    { type: 'Aadhar Card', url: '/file.svg', verified: true },
  ] },
  { id: 3, name: 'Franchise Owner', email: 'franchise1@example.com', role: 'Franchise', status: 'Pending', type: 'franchise', joinDate: '2024-06-01', lastLogin: '2024-07-05', mobile: '9000000003', documents: [
    { type: 'GST Certificate', url: '/file.svg', verified: false },
    { type: 'FSSAI License', url: '/file.svg', verified: true },
  ] },
  { id: 4, name: 'Franchise Two', email: 'franchise2@example.com', role: 'Franchise', status: 'Blocked', type: 'franchise', joinDate: '2024-05-12', lastLogin: '2024-06-20', mobile: '9000000004', documents: [
    { type: 'GST Certificate', url: '/file.svg', verified: false },
  ] },
  { id: 5, name: 'Alice Cooper', email: 'alice@example.com', role: 'User', status: 'Rejected', type: 'user', joinDate: '2024-03-08', lastLogin: '2024-07-01', mobile: '9000000005', documents: [
    { type: 'Aadhar Card', url: '/file.svg', verified: false },
  ] },
  { id: 6, name: 'Bob Wilson', email: 'bob@example.com', role: 'Franchise', status: 'Active', type: 'franchise', joinDate: '2024-02-14', lastLogin: '2024-07-12', mobile: '9000000006', documents: [
    { type: 'GST Certificate', url: '/file.svg', verified: true },
    { type: 'FSSAI License', url: '/file.svg', verified: true },
  ] },
  { id: 7, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active', type: 'user', joinDate: '2024-04-22', lastLogin: '2024-07-13', mobile: '9000000007', documents: [
    { type: 'Aadhar Card', url: '/file.svg', verified: true },
  ] },
  { id: 8, name: 'Diana Prince', email: 'diana@example.com', role: 'Franchise', status: 'Pending', type: 'franchise', joinDate: '2024-06-28', lastLogin: '2024-07-08', mobile: '9000000008', documents: [
    { type: 'GST Certificate', url: '/file.svg', verified: false },
  ] },
  { id: 9, name: 'Eve Martinez', email: 'eve@example.com', role: 'User', status: 'Blocked', type: 'user', joinDate: '2024-01-30', lastLogin: '2024-06-15', mobile: '9000000009', documents: [
    { type: 'Aadhar Card', url: '/file.svg', verified: false },
  ] },
  { id: 10, name: 'Frank Miller', email: 'frank@example.com', role: 'Franchise', status: 'Active', type: 'franchise', joinDate: '2024-03-18', lastLogin: '2024-07-11', mobile: '9000000010', documents: [
    { type: 'GST Certificate', url: '/file.svg', verified: true },
  ] },
];

// Payment transaction types and mock data
export type PaymentType = 'all' | 'franchise' | 'user';

export interface PaymentTransaction {
  id: string;
  type: PaymentType;
  name: string;
  upiId: string;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
  date: string;
  reference: string;
}

export const PAYMENTS_MOCK_DATA: PaymentTransaction[] = [
  {
    id: 'TXN-1001',
    type: 'all',
    name: 'Platform Settlement',
    upiId: 'ghf@upi',
    amount: 50000,
    status: 'Success',
    date: '2024-07-13',
    reference: 'REF1001'
  },
  {
    id: 'TXN-1002',
    type: 'franchise',
    name: 'Downtown Branch',
    upiId: 'downtown@upi',
    amount: 12000,
    status: 'Success',
    date: '2024-07-12',
    reference: 'REF1002'
  },
  {
    id: 'TXN-1003',
    type: 'user',
    name: 'John Doe',
    upiId: 'john.doe@upi',
    amount: 1500,
    status: 'Pending',
    date: '2024-07-11',
    reference: 'REF1003'
  },
  {
    id: 'TXN-1004',
    type: 'franchise',
    name: 'Mall Location',
    upiId: 'mall@upi',
    amount: 8000,
    status: 'Failed',
    date: '2024-07-10',
    reference: 'REF1004'
  },
  {
    id: 'TXN-1005',
    type: 'user',
    name: 'Jane Smith',
    upiId: 'jane.smith@upi',
    amount: 2000,
    status: 'Success',
    date: '2024-07-09',
    reference: 'REF1005'
  },
  {
    id: 'TXN-1006',
    type: 'all',
    name: 'Monthly Payout',
    upiId: 'ghf@upi',
    amount: 75000,
    status: 'Success',
    date: '2024-07-08',
    reference: 'REF1006'
  }
];
// BMI mock records for dashboard
export const BMI_MOCK_RECORDS = [
  {
    id: 'BMI-2024-001',
    name: 'Sarah Johnson',
    age: 28,
    height: 170,
    weight: 70,
    activityLevel: 'Moderately Active',
    workType: 'Desk Job',
    sittingHours: 8,
    dietPreference: 'Vegetarian',
    goal: 'Weight Loss',
    gender: 'Female',
    submittedAt: '2024-07-11T10:30:00Z',
    bmi: 24.2,
    bmiCategory: 'Normal'
  },
  {
    id: 'BMI-2024-002',
    name: 'Michael Chen',
    age: 35,
    height: 180,
    weight: 85,
    activityLevel: 'Very Active',
    workType: 'Physical Job',
    sittingHours: 3,
    dietPreference: 'Non-Vegetarian',
    goal: 'Muscle Building',
    gender: 'Male',
    submittedAt: '2024-07-10T14:15:00Z',
    bmi: 26.2,
    bmiCategory: 'Overweight'
  },
  {
    id: 'BMI-2024-003',
    name: 'Emily Rodriguez',
    age: 24,
    height: 165,
    weight: 55,
    activityLevel: 'Lightly Active',
    workType: 'Standing Job',
    sittingHours: 4,
    dietPreference: 'Vegan',
    goal: 'Weight Gain',
    gender: 'Female',
    submittedAt: '2024-07-09T09:45:00Z',
    bmi: 20.2,
    bmiCategory: 'Normal'
  },
  {
    id: 'BMI-2024-004',
    name: 'David Kumar',
    age: 42,
    height: 175,
    weight: 95,
    activityLevel: 'Sedentary',
    workType: 'Desk Job',
    sittingHours: 9,
    dietPreference: 'Vegetarian',
    goal: 'Weight Loss',
    gender: 'Male',
    submittedAt: '2024-07-08T16:20:00Z',
    bmi: 31.0,
    bmiCategory: 'Obese'
  },
  {
    id: 'BMI-2024-005',
    name: 'Lisa Thompson',
    age: 29,
    height: 160,
    weight: 48,
    activityLevel: 'Moderately Active',
    workType: 'Mixed',
    sittingHours: 6,
    dietPreference: 'Flexitarian',
    goal: 'General Health',
    gender: 'Female',
    submittedAt: '2024-07-07T11:10:00Z',
    bmi: 18.8,
    bmiCategory: 'Normal'
  },
  {
    id: 'BMI-2024-006',
    name: 'James Wilson',
    age: 31,
    height: 185,
    weight: 78,
    activityLevel: 'Very Active',
    workType: 'Physical Job',
    sittingHours: 2,
    dietPreference: 'Non-Vegetarian',
    goal: 'Maintenance',
    gender: 'Male',
    submittedAt: '2024-07-06T13:30:00Z',
    bmi: 22.8,
    bmiCategory: 'Normal'
  },
  {
    id: 'BMI-2024-006',
    name: 'James Wilson',
    age: 31,
    height: 185,
    weight: 78,
    activityLevel: 'Very Active',
    workType: 'Physical Job',
    sittingHours: 2,
    dietPreference: 'Non-Vegetarian',
    goal: 'Maintenance',
    gender: 'Male',
    submittedAt: '2024-07-06T13:30:00Z',
    bmi: 22.8,
    bmiCategory: 'Normal'
  },
  {
    id: 'BMI-2024-006',
    name: 'James Wilson',
    age: 31,
    height: 185,
    weight: 78,
    activityLevel: 'Very Active',
    workType: 'Physical Job',
    sittingHours: 2,
    dietPreference: 'Non-Vegetarian',
    goal: 'Maintenance',
    gender: 'Male',
    submittedAt: '2024-07-06T13:30:00Z',
    bmi: 22.8,
    bmiCategory: 'Normal'
  }
];

// Franchise mock records for admin panel
export interface FranchiseMockData {
  id: number;
  name: string;
  location: string;
  manager: string;
  revenue: number;
  status: string;
  zone: string;
  pinCode: string;
  state: string;
  district: string;
  type: string;
  size: number;
  parking: string;
  gst: string;
  maxDeliveryTime: string;
  minDeliveryTime: string;
  description: string;
  mapLink: string;
  refundableDeposit: number;
  ownerFirstName: string;
  ownerLastName: string;
  ownerPhone: string;
  beneficiaryName: string;
  accountType: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  email: string;
}

export const FRANCHISE_MOCK_DATA: FranchiseMockData[] = [
  {
    id: 1,
    name: 'Downtown Branch',
    location: '123 Main St, Downtown',
    manager: 'Sarah Johnson',
    revenue: 45000,
    status: 'Active',
    zone: 'North',
    pinCode: '110001',
    state: 'Delhi',
    district: 'Central Delhi',
    type: 'Standard',
    size: 1200,
    parking: 'Available',
    gst: 'GST123456789',
    maxDeliveryTime: '45 mins',
    minDeliveryTime: '20 mins',
    description: 'Prime location with high foot traffic',
    mapLink: 'https://maps.google.com',
    refundableDeposit: 50000,
    ownerFirstName: 'John',
    ownerLastName: 'Doe',
    ownerPhone: '+91 9876543210',
    beneficiaryName: 'John Doe',
    accountType: 'Current',
    accountNumber: '1234567890',
    bankName: 'State Bank of India',
    ifsc: 'SBIN0001234',
    email: 'john.doe@email.com'
  },
  {
    id: 2,
    name: 'Mall Location',
    location: '456 Shopping Mall, Suite 201',
    manager: 'Mike Chen',
    revenue: 38000,
    status: 'Active',
    zone: 'South',
    pinCode: '110002',
    state: 'Delhi',
    district: 'South Delhi',
    type: 'Express',
    size: 800,
    parking: 'Limited',
    gst: 'GST987654321',
    maxDeliveryTime: '30 mins',
    minDeliveryTime: '15 mins',
    description: 'Modern mall location with premium clientele',
    mapLink: 'https://maps.google.com',
    refundableDeposit: 75000,
    ownerFirstName: 'Jane',
    ownerLastName: 'Smith',
    ownerPhone: '+91 9876543211',
    beneficiaryName: 'Jane Smith',
    accountType: 'Savings',
    accountNumber: '0987654321',
    bankName: 'HDFC Bank',
    ifsc: 'HDFC0001234',
    email: 'jane.smith@email.com'
  },
  {
    id: 3,
    name: 'Airport Branch',
    location: '789 Airport Road',
    manager: 'David Kumar',
    revenue: 52000,
    status: 'Inactive',
    zone: 'East',
    pinCode: '110003',
    state: 'Delhi',
    district: 'East Delhi',
    type: 'Express',
    size: 1000,
    parking: 'Available',
    gst: 'GST456789123',
    maxDeliveryTime: '35 mins',
    minDeliveryTime: '18 mins',
    description: 'Strategic airport location',
    mapLink: 'https://maps.google.com',
    refundableDeposit: 60000,
    ownerFirstName: 'David',
    ownerLastName: 'Kumar',
    ownerPhone: '+91 9876543212',
    beneficiaryName: 'David Kumar',
    accountType: 'Current',
    accountNumber: '1122334455',
    bankName: 'ICICI Bank',
    ifsc: 'ICIC0001234',
    email: 'david.kumar@email.com'
  }
];

// Support tickets mock data
export const SUPPORT_TICKETS_MOCK = [
  {
    id: 'T001',
    type: 'user',
    subject: 'Login Issues',
    description: 'User unable to access account after password reset',
    priority: 'High',
    status: 'Open',
    createdAt: '2 hours ago',
    customerName: 'John Doe',
    email: 'john.doe@gmail.com',
    mobile: '+1-234-567-8901',
    messages: [
      { sender: 'customer', text: 'I cannot log in after resetting my password', time: '2 hours ago' },
      { sender: 'support', text: 'We are looking into this issue', time: '1 hour ago' }
    ]
  },
  {
    id: 'T002',
    type: 'b2b',
    subject: 'Bulk Order Pricing',
    description: 'Request for corporate discount on bulk orders',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '4 hours ago',
    customerName: 'ABC Corp',
    email: 'procurement@abccorp.com',
    mobile: '+1-234-567-8902',
    messages: [
      { sender: 'customer', text: 'We need pricing for 500+ meal orders monthly', time: '4 hours ago' }
    ]
  },
  {
    id: 'T003',
    type: 'franchise',
    subject: 'Equipment Malfunction',
    description: 'Kitchen equipment not working properly',
    priority: 'Critical',
    status: 'Open',
    createdAt: '1 hour ago',
    customerName: 'Downtown Branch',
    email: 'manager@downtown.franchise.com',
    mobile: '+1-234-567-8903',
    messages: [
      { sender: 'customer', text: 'Our main oven is not heating properly', time: '1 hour ago' }
    ]
  },
  {
    id: 'T004',
    type: 'user',
    subject: 'Product Query',
    description: 'Question about healthy meal options',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '1 day ago',
    customerName: 'Sarah Smith',
    email: 'sarah.smith@yahoo.com',
    mobile: '+1-234-567-8904',
    messages: [
      { sender: 'customer', text: 'Do you have keto-friendly meal options?', time: '1 day ago' },
      { sender: 'support', text: 'Yes, we have several keto meal plans available', time: '1 day ago' }
    ]
  },
  {
    id: 'T005',
    type: 'b2b',
    subject: 'API Integration',
    description: 'Technical support for API integration',
    priority: 'High',
    status: 'In Progress',
    createdAt: '6 hours ago',
    customerName: 'TechCorp Solutions',
    email: 'dev@techcorp.com',
    mobile: '+1-234-567-8905',
    messages: [
      { sender: 'customer', text: 'Having issues with webhook integration', time: '6 hours ago' },
      { sender: 'support', text: 'Please share your API logs', time: '5 hours ago' }
    ]
  },
  {
    id: 'T006',
    type: 'franchise',
    subject: 'Staff Training',
    description: 'Request for additional staff training materials',
    priority: 'Medium',
    status: 'Open',
    createdAt: '3 hours ago',
    customerName: 'Westside Franchise',
    email: 'hr@westside.franchise.com',
    mobile: '+1-234-567-8906',
    messages: [
      { sender: 'customer', text: 'Need updated training materials for new hires', time: '3 hours ago' }
    ]
  }
];

// Healthy Eat sample foods mock data
export const HEALTHY_EAT_SAMPLE_FOODS = [
  {
    id: 1,
    category: 'Nutrition kids foods for age 1-10',
    image: 'https://via.placeholder.com/150',
    timeToDeliver: '10-15 min',
    title: 'Organic Baby Puree',
    price: '12.99',
    subCategory: 'Other',
    weight: '200g',
    calories: '85',
    description: 'Nutritious organic baby food puree with mixed vegetables',
    nutritionName: 'Vitamin A',
    perItemServing: '1 jar',
    per10ItemsServing: '10 jars',
    per1ItemServing: '1 jar',
    ingredients: 'Organic carrots, sweet potato, peas',
    listingType: 'admin',
    createdAt: '2 days ago'
  },
  {
    id: 2,
    category: 'Adult balanced Foods for age 20-40',
    image: 'https://via.placeholder.com/150',
    timeToDeliver: '15-30 min',
    title: 'Quinoa Power Bowl',
    price: '18.50',
    subCategory: 'Other',
    weight: '350g',
    calories: '420',
    description: 'High-protein quinoa bowl with fresh vegetables and lean protein',
    nutritionName: 'Protein',
    perItemServing: '1 bowl',
    per10ItemsServing: '10 bowls',
    per1ItemServing: '1 bowl',
    ingredients: 'Quinoa, chicken breast, avocado, spinach, cherry tomatoes',
    listingType: 'b2b',
    createdAt: '1 week ago'
  }
];

// Product mock data for manage-product page
export const PRODUCT_MOCK_DATA = [
  {
    id: 1,
    name: 'Healthy Salad Bowl',
    description: 'Fresh mixed greens with quinoa',
    price: 12.99,
    category: 'Organic',
    deliveryTime: '10-15 min',
    image: null
  },
  {
    id: 2,
    name: 'Protein Smoothie',
    description: 'Banana and protein powder blend',
    price: 8.99,
    category: 'Powder',
    deliveryTime: '5-10 min',
    image: null
  },
  {
    id: 3,
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea',
    price: 4.5,
    category: 'Tea',
    deliveryTime: '5-10 min',
    image: null
  },
  {
    id: 4,
    name: 'Organic Jam',
    description: 'Mixed fruit jam with no added sugar',
    price: 6.75,
    category: 'Jam',
    deliveryTime: '10-15 min',
    image: null
  },
  {
    id: 5,
    name: 'Nutri Snack Bar',
    description: 'High-protein snack bar for energy',
    price: 2.99,
    category: 'Snacks',
    deliveryTime: '5-10 min',
    image: null
  },
  {
    id: 6,
    name: 'Coffee Beans',
    description: 'Premium roasted coffee beans',
    price: 15.0,
    category: 'Coffee',
    deliveryTime: '15-20 min',
    image: null
  },
  {
    id: 7,
    name: 'Herbal Masala Mix',
    description: 'Blend of organic herbs and spices',
    price: 7.25,
    category: 'Masalas',
    deliveryTime: '10-15 min',
    image: null
  },
  {
    id: 8,
    name: 'Fruit Additive',
    description: 'Natural fruit-based food additive',
    price: 5.5,
    category: 'Food additives',
    deliveryTime: '20-30 min',
    image: null
  },
  {
    id: 9,
    name: 'Mixing Powder',
    description: 'Multi-purpose mixing powder for recipes',
    price: 3.99,
    category: 'Mixing',
    deliveryTime: '15-20 min',
    image: null
  },
  {
    id: 10,
    name: 'Custom Product',
    description: 'Special product for custom orders',
    price: 20.0,
    category: 'Other',
    deliveryTime: '30-45 min',
    image: null
  }
];

// B2B Orders mock data
export const B2B_ORDERS = [
  { id: 'B2B-1001', date: '2025-07-16', franchise: 'Acme Corp', customer: 'John Doe', phone: '9001000001', items: 'Product A, Product B', total: 1200, status: 'Accepted' },
  { id: 'B2B-1002', date: '2025-07-15', franchise: 'Beta Ltd.', customer: 'Jane Smith', phone: '9001000002', items: 'Product C', total: 800, status: 'Dispatched' },
  { id: 'B2B-1003', date: '2025-07-14', franchise: 'Gamma Inc.', customer: 'Alice Brown', phone: '9001000003', items: 'Product D, Product E', total: 1500, status: 'Delivered' },
  { id: 'B2B-1004', date: '2025-07-13', franchise: 'Delta LLC', customer: 'Bob Wilson', phone: '9001000004', items: 'Product F', total: 600, status: 'Accepted' },
  { id: 'B2B-1005', date: '2025-07-12', franchise: 'Acme Corp', customer: 'Charlie Green', phone: '9001000005', items: 'Product G', total: 950, status: 'Dispatched' },
  { id: 'B2B-1006', date: '2025-07-11', franchise: 'Beta Ltd.', customer: 'Diana Prince', phone: '9001000006', items: 'Product H, Product I', total: 2000, status: 'Delivered' },
  { id: 'B2B-1007', date: '2025-07-10', franchise: 'Gamma Inc.', customer: 'Eve Adams', phone: '9001000007', items: 'Product J', total: 700, status: 'Accepted' },
  { id: 'B2B-1008', date: '2025-07-09', franchise: 'Delta LLC', customer: 'Frank Lee', phone: '9001000008', items: 'Product K', total: 1100, status: 'Dispatched' },
];
