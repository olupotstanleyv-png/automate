import { Product, Vehicle, Customer, Booking, ServiceRecord, StaffMember, ActivityLog, Transaction, NotificationLog, AutomationRule, Order, POSSession, StaffTask, SupportTicket, Testimonial, Promotion, Feature, ServiceBooking, ServiceType, Milestone, AboutTeamMember, Award, FAQItem, TikTokPost, SocialAnalytics, TwitterTweet, PublicTeamMember, ServicePackage } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'AutoPilot Kit V2',
    price: 2500,
    category: 'automation',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2100&auto=format&fit=crop'
    ],
    description: 'Full self-driving hardware upgrade kit.',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Smart LED Matrix Lights',
    price: 450,
    category: 'parts',
    image: 'https://images.unsplash.com/photo-1549420959-1e1470481308?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549420959-1e1470481308?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop'
    ],
    description: 'Adaptive lighting system with AI control.',
    rating: 4.5
  },
  {
    id: '3',
    name: 'AI Dash Assistant',
    price: 300,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop'
    ],
    description: 'Voice controlled dashboard assistant.',
    rating: 4.2
  },
  {
    id: '4',
    name: '2024 Model X Plaid',
    price: 95000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop',
    images: [
        'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1553440637-d22ed8a0256b?q=80&w=2070&auto=format&fit=crop'
    ],
    description: 'The ultimate electric SUV with falcon wing doors.',
    rating: 5.0
  },
  {
    id: '5',
    name: 'Ceramic Brake Kit',
    price: 1200,
    category: 'parts',
    image: 'https://images.unsplash.com/photo-1605218427306-022ba7838506?q=80&w=2080&auto=format&fit=crop',
    images: [
        'https://images.unsplash.com/photo-1605218427306-022ba7838506?q=80&w=2080&auto=format&fit=crop'
    ],
    description: 'High performance carbon ceramic brakes.',
    rating: 4.9
  },
  {
    id: '6',
    name: 'Telemetry Module',
    price: 150,
    category: 'automation',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
    ],
    description: 'Real-time vehicle data tracking and transmission.',
    rating: 4.0
  }
];

export const MOCK_FLEET: Vehicle[] = [
  {
    id: 'v1',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    vin: '5YJSA1E12MF123456',
    engineType: 'Electric',
    category: 'Sedan',
    price: 104990,
    images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop'],
    status: 'Available',
    mileage: 5200,
    lastServiceDate: '2024-01-15',
    nextServiceMileage: 10000,
    documents: {
      rc: 'rc_doc_v1.pdf',
      insurance: 'ins_doc_v1.pdf',
      serviceHistory: 'svc_doc_v1.pdf'
    },
    compliance: [
      { id: 'cd1', type: 'Insurance', number: 'INS-998877', expiryDate: '2025-06-15' },
      { id: 'cd2', type: 'Registration', number: 'REG-5YJSA', expiryDate: '2028-01-01' },
      { id: 'cd3', type: 'Pollution', number: 'PUC-2024-01', expiryDate: '2024-12-31' }
    ]
  },
  {
    id: 'v2',
    make: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2023,
    vin: 'WP0AA2Y14PSA78901',
    engineType: 'Electric',
    category: 'Sports',
    price: 187000,
    images: ['https://images.unsplash.com/photo-1611016186353-9af29c77880e?q=80&w=2070&auto=format&fit=crop'],
    status: 'Booked',
    mileage: 12500,
    lastServiceDate: '2023-11-20',
    nextServiceMileage: 15000,
    documents: {
      rc: 'rc_doc_v2.pdf',
      insurance: 'ins_doc_v2.pdf',
      serviceHistory: null
    },
    compliance: [
      { id: 'cd4', type: 'Insurance', number: 'INS-112233', expiryDate: '2024-05-10' }, // Expiring soon or expired
      { id: 'cd5', type: 'Registration', number: 'REG-WP0AA', expiryDate: '2026-11-20' },
      { id: 'cd6', type: 'Pollution', number: 'PUC-2023-11', expiryDate: '2023-11-20' } // Expired
    ]
  },
  {
    id: 'v3',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    vin: 'WBS33AZ050CH11223',
    engineType: 'Petrol V6',
    category: 'Coupe',
    price: 82000,
    images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2070&auto=format&fit=crop'],
    status: 'In-Service',
    mileage: 8500,
    lastServiceDate: '2024-03-01',
    nextServiceMileage: 15000,
    documents: {
      rc: 'rc_doc_v3.pdf',
      insurance: 'ins_doc_v3.pdf',
      serviceHistory: 'svc_doc_v3.pdf'
    },
    compliance: [
      { id: 'cd7', type: 'Insurance', number: 'INS-445566', expiryDate: '2024-12-01' },
      { id: 'cd8', type: 'Registration', number: 'REG-WBS33', expiryDate: '2027-03-01' },
      { id: 'cd9', type: 'Pollution', number: 'PUC-2024-03', expiryDate: '2024-09-01' }
    ]
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    phone: '+1 (555) 012-3456',
    address: '42 Tech Blvd, San Francisco, CA',
    licenseVerified: true,
    licenseImage: 'https://via.placeholder.com/400x250?text=License+Front',
    paymentMethod: 'Visa ending 4242',
    joinDate: '2023-11-15',
    totalSpend: 12500,
    status: 'Active',
    history: [
      { id: 'h1', type: 'booking', item: 'Tesla Model S Plaid (Rental)', date: '2024-05-10', amount: 1500, status: 'completed' },
      { id: 'h2', type: 'order', item: 'AutoPilot Kit V2', date: '2024-02-15', amount: 2500, status: 'completed' }
    ],
    tickets: []
  },
  {
    id: 'c2',
    name: 'Bob Jones',
    email: 'bob.jones@example.com',
    phone: '+1 (555) 098-7654',
    address: '101 Innovation Dr, Austin, TX',
    licenseVerified: false,
    paymentMethod: 'MasterCard ending 8811',
    joinDate: '2024-01-20',
    totalSpend: 450,
    status: 'Pending',
    history: [
      { id: 'h3', type: 'order', item: 'Smart LED Matrix Lights', date: '2024-05-20', amount: 450, status: 'pending' }
    ],
    tickets: [
      { id: 't1', subject: 'Shipping Delay', description: 'My order is 3 days late.', status: 'open', date: '2024-05-22' }
    ]
  },
  {
    id: 'c3',
    name: 'Charlie Day',
    email: 'charlie@paddys.com',
    phone: '+1 (555) 777-9999',
    address: '200 Market St, Philadelphia, PA',
    licenseVerified: true,
    joinDate: '2023-06-01',
    totalSpend: 800,
    status: 'Active',
    history: [
      { id: 'h4', type: 'service', item: 'ECU Remapping', date: '2024-04-10', amount: 800, status: 'completed' }
    ],
    tickets: []
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    customerId: 'c1',
    customerName: 'Alice Smith',
    vehicleId: 'v2',
    vehicleName: 'Porsche Taycan Turbo S',
    type: 'Rental',
    startDate: '2024-06-01',
    endDate: '2024-06-05',
    totalAmount: 1200,
    status: 'Active'
  },
  {
    id: 'b2',
    customerId: 'c3',
    customerName: 'Charlie Day',
    vehicleId: 'v1',
    vehicleName: 'Tesla Model S Plaid',
    type: 'Rental',
    startDate: '2024-06-10',
    endDate: '2024-06-12',
    totalAmount: 600,
    status: 'Pending'
  }
];

export const MOCK_SERVICE_RECORDS: ServiceRecord[] = [
  {
    id: 'sr1',
    vehicleId: 'v3',
    vehicleName: 'BMW M4 Competition',
    type: 'Scheduled',
    date: '2024-05-15',
    description: 'Routine oil change and brake inspection.',
    cost: 350,
    status: 'In-Progress',
    serviceCenter: 'TechAuto Hub Main'
  },
  {
    id: 'sr2',
    vehicleId: 'v1',
    vehicleName: 'Tesla Model S Plaid',
    type: 'Scheduled',
    date: '2024-01-15',
    description: '10k Service, Tire Rotation, Software Diagnostic.',
    cost: 200,
    status: 'Completed',
    serviceCenter: 'Tesla Service Center',
    completionDate: '2024-01-16'
  }
];

export const MOCK_STAFF: StaffMember[] = [
  { 
    id: 's1', name: 'John Doe', email: 'john@carautomate.inc', phone: '555-1111', role: 'Manager', department: 'Management', status: 'Active', lastActive: '2024-05-25T09:00:00',
    joinDate: '2022-01-01', baseSalary: 5000, commissionRate: 2
  },
  { 
    id: 's2', name: 'Sarah Connor', email: 'sarah@carautomate.inc', phone: '555-2222', role: 'Service Advisor', department: 'Service', status: 'Active', lastActive: '2024-05-25T10:30:00',
    joinDate: '2023-03-15', baseSalary: 3500, commissionRate: 5
  },
  { 
    id: 's3', name: 'Mike Ross', email: 'mike@carautomate.inc', phone: '555-3333', role: 'Sales', department: 'Sales', status: 'Active', lastActive: '2024-05-24T16:45:00',
    joinDate: '2023-06-10', baseSalary: 3000, commissionRate: 8
  },
  { 
    id: 's4', name: 'Driver Dave', email: 'dave@carautomate.inc', phone: '555-4444', role: 'Driver', department: 'Logistics', status: 'Inactive', lastActive: '2024-05-20T08:00:00',
    joinDate: '2023-11-01', baseSalary: 2800, commissionRate: 0
  }
];

export const MOCK_PUBLIC_TEAM: PublicTeamMember[] = [
  {
    id: 'tm1',
    name: 'Elena Rodriguez',
    role: 'Chief Executive Officer',
    department: 'Management',
    bio: 'Former robotics engineer with a passion for autonomous driving systems. Founded Car Automate to bridge the gap between traditional mechanics and futuristic tech.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    status: 'Active',
    socialLinks: { linkedin: '#', twitter: '#' },
    certifications: ['Robotics Engineering', 'MBA', 'EV Systems'],
    yearsOfExperience: 15,
    specializations: ['Strategic Leadership', 'Autonomous Tech'],
    portfolioLink: 'https://elena-tech.portfolio',
    isFeatured: true,
    joinDate: '2020-01-01'
  },
  {
    id: 'tm2',
    name: 'David Chen',
    role: 'Head of Engineering',
    department: 'Engineering',
    bio: 'Expert in embedded systems and AI. Leads our R&D department, focusing on creating the safest autopilot kits on the market.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
    status: 'Active',
    socialLinks: { linkedin: '#', email: 'david@carautomate.inc' },
    certifications: ['AI Architecture', 'Embedded Systems'],
    yearsOfExperience: 12,
    specializations: ['Neural Networks', 'Firmware Development'],
    isFeatured: false,
    joinDate: '2021-03-15'
  },
  {
    id: 'tm3',
    name: 'Sarah Jones',
    role: 'Customer Experience Lead',
    department: 'Support',
    bio: 'Ensuring every client interaction is smooth, transparent, and helpful. Dedicated to 5-star service.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop',
    status: 'Active',
    socialLinks: { email: 'sarah@carautomate.inc' },
    certifications: ['Customer Relations'],
    yearsOfExperience: 8,
    specializations: ['Crisis Management', 'Client Success'],
    isFeatured: false,
    joinDate: '2022-06-01'
  },
  {
    id: 'tm4',
    name: 'Marcus Johnson',
    role: 'Senior Technician',
    department: 'Service',
    bio: 'Certified Master Mechanic with 15 years of experience. Specializes in hybrid and electric vehicle powertrains.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop',
    status: 'Active',
    socialLinks: {},
    certifications: ['ASE Master Tech', 'Tesla Certified'],
    yearsOfExperience: 18,
    specializations: ['EV Diagnostics', 'High Voltage Systems'],
    isFeatured: false,
    joinDate: '2021-01-10'
  },
  {
    id: 'tm5',
    name: 'Priya Patel',
    role: 'Sales Director',
    department: 'Sales',
    bio: 'Driving growth and helping customers find their dream automated vehicles.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1000&auto=format&fit=crop',
    status: 'Active',
    socialLinks: { linkedin: '#' },
    certifications: [],
    yearsOfExperience: 10,
    specializations: ['Luxury Auto Sales', 'Global Markets'],
    isFeatured: false,
    joinDate: '2022-02-20'
  }
];

export const MOCK_TASKS: StaffTask[] = [
    { id: 't1', staffId: 's2', staffName: 'Sarah Connor', title: 'Weekly Inventory Check', description: 'Count all parts in Sector A', status: 'Pending', priority: 'Medium', dueDate: '2024-05-30' },
    { id: 't2', staffId: 's3', staffName: 'Mike Ross', title: 'Client Follow-up', description: 'Call 5 pending leads from last week', status: 'In-Progress', priority: 'High', dueDate: '2024-05-26' }
];

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'l1', userId: 's1', userName: 'John Doe', role: 'Manager', action: 'Updated Vehicle Status', module: 'Vehicles', timestamp: '2024-05-25 09:15 AM', details: 'Changed V2 status to Available' },
  { id: 'l2', userId: 's2', userName: 'Sarah Connor', role: 'Service Advisor', action: 'Approved Booking', module: 'Bookings', timestamp: '2024-05-25 10:30 AM', details: 'Approved booking #B102 for Customer C1' },
  { id: 'l3', userId: 's3', userName: 'Mike Ross', role: 'Sales', action: 'Created Invoice', module: 'Finance', timestamp: '2024-05-24 04:45 PM', details: 'Generated invoice #INV-2024-001' },
  { id: 'l4', userId: 's1', userName: 'John Doe', role: 'Manager', action: 'Added New Vehicle', module: 'Vehicles', timestamp: '2024-05-24 09:00 AM', details: 'Added 2024 Tesla Model X Plaid' }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 't1', date: '2024-05-25', description: 'Booking Payment #B1', amount: 1200, type: 'Income', category: 'Rental', status: 'Completed', method: 'Credit Card', referenceId: 'b1' },
    { id: 't2', date: '2024-05-24', description: 'AutoPilot Kit V2 Sale', amount: 2500, type: 'Income', category: 'Sale', status: 'Completed', method: 'PayPal' },
    { id: 't3', date: '2024-05-23', description: 'Maintenance Parts Order', amount: 350, type: 'Expense', category: 'Maintenance', status: 'Completed', method: 'Bank Transfer' },
    { id: 't4', date: '2024-05-22', description: 'Deposit for Booking #B2', amount: 300, type: 'Income', category: 'Deposit', status: 'Pending', method: 'Credit Card', referenceId: 'b2' },
    { id: 't5', date: '2024-05-20', description: 'Refund: Cancelled Order', amount: 150, type: 'Expense', category: 'Refund', status: 'Completed', method: 'Bank Transfer' },
    { id: 't6', date: '2024-05-18', description: 'BMW M4 Service Labor', amount: 200, type: 'Expense', category: 'Service', status: 'Completed', method: 'Bank Transfer' },
    { id: 't7', date: '2024-05-15', description: 'Smart LED Sale', amount: 450, type: 'Income', category: 'Sale', status: 'Completed', method: 'Credit Card' },
];

export const MOCK_NOTIFICATIONS: NotificationLog[] = [
  { id: 'n1', recipient: 'Alice Smith', type: 'Email', category: 'Booking', message: 'Your booking #B1 for Porsche Taycan is confirmed.', status: 'Sent', timestamp: '2024-05-25 10:35 AM' },
  { id: 'n2', recipient: '+1 (555) 012-3456', type: 'SMS', category: 'Payment', message: 'Receipt: $1200 payment received for booking #B1.', status: 'Sent', timestamp: '2024-05-25 10:36 AM' },
  { id: 'n3', recipient: '+1 (555) 777-9999', type: 'WhatsApp', category: 'Service', message: 'Reminder: Your BMW M4 is due for service next week.', status: 'Failed', timestamp: '2024-05-24 09:00 AM' },
  { id: 'n4', recipient: 'bob.jones@example.com', type: 'Email', category: 'Alert', message: 'Your driver license verification is pending.', status: 'Sent', timestamp: '2024-05-20 02:00 PM' }
];

export const MOCK_AUTOMATION_RULES: AutomationRule[] = [
  { id: 'r1', name: 'Booking Confirmation', description: 'Send confirmation when booking is approved.', channels: ['Email', 'SMS'], trigger: 'Booking Created', isActive: true },
  { id: 'r2', name: 'Payment Receipt', description: 'Send receipt automatically after successful payment.', channels: ['Email'], trigger: 'Payment Received', isActive: true },
  { id: 'r3', name: 'Service Reminder', description: 'Notify customer 7 days before scheduled service.', channels: ['WhatsApp', 'Email'], trigger: 'Service Due', isActive: true },
  { id: 'r4', name: 'Document Expiry Alert', description: 'Alert admin and vehicle owner when docs expire.', channels: ['Email', 'SMS'], trigger: 'Document Expiry', isActive: true },
  { id: 'r5', name: 'Inactive Customer Follow-up', description: 'Re-engagement message after 30 days inactivity.', channels: ['Email'], trigger: '30 Days Inactive', isActive: false },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    customerName: 'Alice Smith',
    customerEmail: 'alice.smith@example.com',
    customerPhone: '+1 (555) 012-3456',
    items: [{...PRODUCTS[1], quantity: 2}],
    subtotal: 900,
    tax: 90,
    deliveryFee: 15,
    serviceCharge: 0,
    total: 1005,
    deliveryMethod: 'Shipping',
    shippingAddress: { street: '42 Tech Blvd', city: 'San Francisco', state: 'CA', zip: '94107' },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Shipped',
    createdAt: '2024-05-25T10:00:00',
    updatedAt: '2024-05-25T14:30:00',
    trackingNumber: 'TRK-99887766'
  },
  {
    id: 'ord-002',
    customerName: 'Bob Jones',
    customerEmail: 'bob.jones@example.com',
    customerPhone: '+1 (555) 098-7654',
    items: [{...PRODUCTS[2], quantity: 1}],
    subtotal: 300,
    tax: 30,
    deliveryFee: 0,
    serviceCharge: 0,
    total: 330,
    deliveryMethod: 'Pickup',
    pickupLocation: 'Silicon Valley Main Hub',
    pickupTime: '2024-05-26T10:00:00',
    paymentMethod: 'PayOnPickup',
    paymentStatus: 'Pending',
    status: 'Confirmed',
    createdAt: '2024-05-25T11:15:00',
    updatedAt: '2024-05-25T11:15:00'
  },
  {
    id: 'ord-003',
    customerName: 'Charlie Day',
    customerEmail: 'charlie@paddys.com',
    customerPhone: '+1 (555) 777-9999',
    items: [{...PRODUCTS[5], quantity: 1}],
    subtotal: 150,
    tax: 15,
    deliveryFee: 0,
    serviceCharge: 10,
    total: 175,
    deliveryMethod: 'DineIn',
    tableNumber: 'Table 5',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Served',
    createdAt: '2024-05-24T18:00:00',
    updatedAt: '2024-05-24T18:45:00'
  }
];

export const MOCK_POS_SESSIONS: POSSession[] = [
    { id: 'sess-1', staffId: 's1', startTime: '2024-05-26T08:00:00', startCash: 500, totalSales: 2450, status: 'Open' }
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-1001',
    customerName: 'Alice Smith',
    email: 'alice.smith@example.com',
    subject: 'Order Delay',
    message: 'My order #ord-001 is pending for 3 days. When will it ship?',
    status: 'Open',
    priority: 'High',
    category: 'Support',
    createdAt: '2024-05-26T09:00:00',
    replies: []
  },
  {
    id: 'TKT-1002',
    customerName: 'Bob Jones',
    email: 'bob.jones@example.com',
    subject: 'Product Inquiry',
    message: 'Does the AutoPilot Kit V2 support 2020 models?',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Inquiry',
    createdAt: '2024-05-25T14:30:00',
    replies: [
        { id: 'r1', sender: 'Staff', message: 'Hello Bob, checking compatibility now.', timestamp: '2024-05-25T15:00:00' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'John D.', role: 'Car Enthusiast', text: 'The autopilot kit completely transformed my driving experience. Installation was smooth!', rating: 5 },
  { id: 't2', name: 'Sarah L.', role: 'Daily Commuter', text: 'Booked a service online and they picked up my car within the hour. Amazing convenience.', rating: 5 },
  { id: 't3', name: 'Mike R.', role: 'Tech Reviewer', text: 'Top notch parts and the AI dash assistant is a game changer.', rating: 4 }
];

export const PROMOTIONS: Promotion[] = [
  { id: 'p1', title: 'Summer Automation Sale', description: 'Get 20% off all AI kits', code: 'AUTO20', discount: '20%', expiry: 'Limited Time', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop' },
  { id: 'p2', title: 'Free Diagnostics', description: 'Book any repair service and get a free system check.', code: 'FREEDIAG', discount: 'Free', expiry: 'This Week', image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop' }
];

export const FEATURES: Feature[] = [
  { icon: 'fa-rocket', title: 'Fast Service', description: 'Same-day diagnostics and quick turnaround times.' },
  { icon: 'fa-user-shield', title: 'Trusted Staff', description: 'Certified experts with years of automotive experience.' },
  { icon: 'fa-tags', title: 'Best Prices', description: 'Competitive pricing on all parts and labor.' },
  { icon: 'fa-headset', title: '24/7 Support', description: 'Always here to help with your vehicle needs.' }
];

export const MOCK_SERVICE_BOOKINGS: ServiceBooking[] = [
  {
    id: 'SVC-101',
    customerName: 'Alice Smith',
    customerEmail: 'alice@example.com',
    customerPhone: '+1 555-0123',
    vehicle: { make: 'Tesla', model: 'Model 3', year: 2022 },
    serviceType: ServiceType.Custom,
    description: 'Install ambient lighting kit.',
    date: '2024-06-15',
    timeSlot: '10:00 AM',
    deliveryMethod: 'Drop-off',
    estimatedCost: 300,
    status: 'Confirmed',
    createdAt: '2024-06-01'
  }
];

// --- ABOUT PAGE MOCK DATA ---
export const ABOUT_MILESTONES: Milestone[] = [
  { year: '2020', title: 'Founded', description: 'Started as a small garage focusing on EV modifications.' },
  { year: '2022', title: 'First AI Product', description: 'Launched the AutoPilot V1 kit, revolutionizing aftermarket automation.' },
  { year: '2023', title: 'Expansion', description: 'Opened 3 new service hubs across the West Coast.' },
  { year: '2024', title: 'Global Recognition', description: 'Awarded "Top AutoTech Innovator" and served 10,000+ customers.' }
];

export const ABOUT_TEAM: AboutTeamMember[] = [
  { id: 'tm1', name: 'Elena Rodriguez', role: 'CEO & Founder', bio: 'Former robotics engineer with a passion for autonomous driving systems.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop' },
  { id: 'tm2', name: 'David Chen', role: 'Head of Engineering', bio: 'Expert in embedded systems and AI, leading our R&D department.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop' },
  { id: 'tm3', name: 'Sarah Jones', role: 'Customer Experience', bio: 'Ensuring every client interaction is smooth, transparent, and helpful.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop' }
];

export const ABOUT_AWARDS: Award[] = [
  { id: 'aw1', title: 'AutoTech Innovator 2024', issuer: 'Tech Weekly', year: '2024', icon: 'fa-trophy' },
  { id: 'aw2', title: 'Best EV Service Center', issuer: 'Auto Review', year: '2023', icon: 'fa-star' },
  { id: 'aw3', title: 'Green Business Cert', issuer: 'EcoAlliance', year: '2022', icon: 'fa-leaf' }
];

// --- FAQ MOCK DATA ---
export const MOCK_FAQS: FAQItem[] = [
  { id: 'f1', question: 'How do I track my order?', answer: 'You can track your order status in real-time from the "My Account" section or by using the tracking number sent to your email.', category: 'Orders', helpfulCount: 15, notHelpfulCount: 1, isPublished: true },
  { id: 'f2', question: 'Do you offer international shipping?', answer: 'Yes, we ship globally! Shipping costs and times vary depending on the destination. You can see the estimated cost at checkout.', category: 'Shipping', helpfulCount: 32, notHelpfulCount: 2, isPublished: true },
  { id: 'f3', question: 'What is your return policy?', answer: 'We offer a 30-day return policy for unused items in original packaging. Custom automation kits may have specific return conditions.', category: 'Returns', helpfulCount: 8, notHelpfulCount: 0, isPublished: true },
  { id: 'f4', question: 'How do I book a car service?', answer: 'Simply navigate to the "Services" page, select your desired service, and choose a convenient time slot.', category: 'Services', helpfulCount: 22, notHelpfulCount: 5, isPublished: true },
  { id: 'f5', question: 'Are your technicians certified?', answer: 'Absolutely. All our technicians undergo rigorous training and are certified to handle both mechanical repairs and software diagnostics.', category: 'General', helpfulCount: 19, notHelpfulCount: 0, isPublished: true },
  { id: 'f6', question: 'Can I pay with Mobile Money?', answer: 'Yes, we accept major Mobile Money providers including MTN, Airtel, M-Pesa, and more.', category: 'Payment', helpfulCount: 45, notHelpfulCount: 3, isPublished: true }
];

// --- TIKTOK & SOCIAL MOCK DATA ---

export const MOCK_TIKTOK_POSTS: TikTokPost[] = [
  {
    id: 'tt1',
    title: 'Autopilot Demo',
    caption: 'Hands-free driving on the highway! 🚗💨 #Tesla #Autopilot #FutureTech',
    hashtags: ['#Tesla', '#Autopilot', '#FutureTech', '#CarAutomate'],
    status: 'Posted',
    assignedTo: 'Mike Ross',
    scheduledDate: '2024-05-20',
    analytics: { views: 15400, likes: 2300, shares: 450, comments: 120, watchTime: '18s avg' },
    createdAt: '2024-05-18'
  },
  {
    id: 'tt2',
    title: 'Workshop Tour',
    caption: 'Behind the scenes at our Silicon Valley hub. Check out the new diagnostic bots! 🤖',
    hashtags: ['#Workshop', '#MechanicLife', '#Tech'],
    status: 'Scheduled',
    assignedTo: 'Sarah Connor',
    scheduledDate: '2024-05-28',
    createdAt: '2024-05-24'
  },
  {
    id: 'tt3',
    title: 'Customer Reaction',
    caption: 'Wait for the surprise at the end when she sees her new rims! 🔥',
    hashtags: ['#CarMods', '#Reaction', '#HappyCustomer'],
    status: 'Review',
    assignedTo: 'John Doe',
    createdAt: '2024-05-25'
  },
  {
    id: 'tt4',
    title: '5 Maintenance Tips',
    caption: 'Top 5 things you need to check before a road trip.',
    hashtags: ['#CarTips', '#Maintenance', '#RoadTrip'],
    status: 'Idea',
    assignedTo: 'Mike Ross',
    createdAt: '2024-05-26'
  }
];

export const MOCK_TWITTER_TWEETS: TwitterTweet[] = [
  {
    id: 'tw1',
    content: 'Excited to announce our new partnership with Tesla! 🚗⚡ Expect faster parts delivery and exclusive upgrades. #Tesla #Partnership #CarAutomate',
    status: 'Posted',
    assignedTo: 'John Doe',
    isThread: false,
    analytics: { impressions: 12500, likes: 450, retweets: 120, replies: 35, clicks: 200 },
    createdAt: '2024-05-25'
  },
  {
    id: 'tw2',
    content: 'Which feature do you value most in a car?\n\n1. Speed 🏎️\n2. Safety 🛡️\n3. Tech 🤖\n4. Comfort 🛋️\n\nVote below! 👇',
    status: 'Scheduled',
    assignedTo: 'Mike Ross',
    isThread: false,
    scheduledDate: '2024-05-30',
    createdAt: '2024-05-26'
  },
  {
    id: 'tw3',
    content: 'Thread: 5 Signs your EV battery needs attention. 🧵👇',
    status: 'Draft',
    assignedTo: 'Sarah Connor',
    isThread: true,
    createdAt: '2024-05-26'
  }
];

export const MOCK_SOCIAL_ANALYTICS: SocialAnalytics[] = [
  { platform: 'TikTok', followers: 12500, growth: 15, totalViews: 450000, engagementRate: 8.5 },
  { platform: 'Instagram', followers: 8200, growth: 5, totalViews: 120000, engagementRate: 4.2 },
  { platform: 'YouTube', followers: 3500, growth: 2, totalViews: 85000, engagementRate: 3.1 },
  { platform: 'Facebook', followers: 5000, growth: 0.5, totalViews: 20000, engagementRate: 1.5 },
  { platform: 'Twitter', followers: 6200, growth: 3.5, totalViews: 150000, engagementRate: 5.8 }
];

export const MOCK_SERVICE_PACKAGES: ServicePackage[] = [
    { id: 'sp1', name: 'Express Oil Change', price: 89.99, description: 'Synthetic oil, filter replacement, and 20-point inspection.', includes: ['Oil Filter', '5 Quarts Oil', 'Disposal Fee'], laborCode: 'L-101' },
    { id: 'sp2', name: 'Full Automation Diagnostic', price: 149.99, description: 'Complete sensor calibration and firmware check.', includes: ['Sensor Calibration', 'ECU Scan', 'Report'], laborCode: 'L-305' },
    { id: 'sp3', name: 'Brake Service (Front)', price: 299.99, description: 'Replace front pads and resurface rotors.', includes: ['Ceramic Pads', 'Hardware Kit', 'Fluid Top-off'], laborCode: 'L-202' },
    { id: 'sp4', name: 'Tire Rotation & Balance', price: 49.99, description: 'Extend tire life with precision balancing.', includes: ['Weights', 'TPMS Reset'], laborCode: 'L-105' },
    { id: 'sp5', name: 'Detailing Package', price: 199.99, description: 'Interior deep clean and exterior wax.', includes: ['Wash', 'Wax', 'Vacuum', 'Leather Condition'], laborCode: 'L-401' },
];