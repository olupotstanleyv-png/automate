



export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'automation' | 'parts' | 'accessories' | 'cars';
  image: string;
  images?: string[];
  description: string;
  rating: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ComplianceDocument {
  id: string;
  type: 'Insurance' | 'Registration' | 'Pollution';
  number: string;
  expiryDate: string; // ISO Date YYYY-MM-DD
  fileUrl?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  engineType: string; // e.g., V8, Electric, Hybrid
  category: string; // e.g., Sedan, SUV, Sports
  price: number;
  images: string[];
  status: 'Available' | 'Booked' | 'In-Service' | 'Unavailable' | 'Sold';
  documents: {
    rc: string | null; // Registration Certificate
    insurance: string | null;
    serviceHistory: string | null;
  };
  compliance?: ComplianceDocument[];
  mileage: number;
  lastServiceDate?: string;
  nextServiceMileage?: number;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: 'Scheduled' | 'Emergency' | 'Inspection';
  date: string; // Start date
  description: string;
  cost: number;
  status: 'Scheduled' | 'In-Progress' | 'Completed';
  serviceCenter: string;
  completionDate?: string;
}

export interface CustomerActivity {
  id: string;
  type: 'order' | 'booking' | 'service';
  item: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface CustomerTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'resolved' | 'rejected';
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseVerified: boolean;
  licenseImage?: string;
  paymentMethod?: string; // e.g., "Visa ending 4242"
  joinDate: string;
  totalSpend: number;
  status: 'Active' | 'Blocked' | 'Pending';
  history: CustomerActivity[];
  tickets: CustomerTicket[];
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  vehicleId: string;
  vehicleName: string;
  type: 'Rental' | 'Sale';
  startDate: string;
  endDate?: string;
  totalAmount: number;
  status: BookingStatus;
  notes?: string;
}

export type UserRole = 'Admin' | 'Manager' | 'Service Advisor' | 'Driver' | 'Sales' | 'Technician' | 'Accountant';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar?: string;
  joinDate: string;
  baseSalary: number;
  commissionRate: number; // Percentage (e.g., 5 for 5%)
}

// New Interface for Public Team Members
export interface PublicTeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Management' | 'Sales' | 'Service' | 'Engineering' | 'Support';
  bio: string;
  image: string;
  status: 'Active' | 'Inactive';
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  certifications?: string[];
  isFeatured: boolean; // For spotlight
  joinDate: string;
  
  // Optional professional details
  yearsOfExperience?: number;
  specializations?: string[];
  portfolioLink?: string;
}

export interface StaffTask {
  id: string;
  staffId: string;
  staffName: string;
  title: string;
  description: string;
  status: 'Pending' | 'In-Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

export interface AttendanceRecord {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'Present' | 'Late' | 'Absent' | 'Leave';
  hoursWorked: number;
}

export interface PayrollEntry {
  id: string;
  staffId: string;
  staffName: string;
  month: string;
  baseSalary: number;
  commission: number;
  bonus: number;
  deductions: number;
  total: number;
  status: 'Pending' | 'Processed';
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  module: string; // e.g., 'Vehicles', 'Bookings', 'Staff'
  timestamp: string;
  details: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: 'Rental' | 'Sale' | 'Service' | 'Maintenance' | 'Refund' | 'Deposit';
  status: 'Completed' | 'Pending' | 'Failed';
  method: PaymentMethodType;
  referenceId?: string; // Link to Booking ID or Order ID
}

export type NotificationType = 'Email' | 'SMS' | 'WhatsApp';
export type NotificationStatus = 'Sent' | 'Failed' | 'Pending' | 'Scheduled';

export interface NotificationLog {
  id: string;
  recipient: string; // Name or Phone/Email
  type: NotificationType;
  category: 'Booking' | 'Payment' | 'Service' | 'Alert' | 'Marketing';
  message: string;
  status: NotificationStatus;
  timestamp: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  channels: NotificationType[]; // e.g., ['Email', 'WhatsApp']
  trigger: 'Booking Created' | 'Payment Received' | 'Service Due' | 'Document Expiry' | '30 Days Inactive';
  isActive: boolean;
}

// --- ORDER & CHECKOUT TYPES ---

export type DeliveryMethod = 'Shipping' | 'Pickup' | 'DineIn' | 'MobileService' | 'Valet';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';
export type OrderStatus = 'Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Ready' | 'OutForDelivery' | 'Delivered' | 'Served' | 'Cancelled';
export type PaymentMethodType = 'Credit Card' | 'PayPal' | 'Mobile Money' | 'Bank Transfer' | 'EFT' | 'COD' | 'PayOnPickup' | 'BNPL' | 'UPI' | 'QR Code' | 'Cash';

export interface Order {
  id: string;
  customerId?: string; // Optional for guest checkout
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  items: CartItem[];
  
  // Financials
  subtotal: number;
  tax: number;
  deliveryFee: number;
  serviceCharge: number;
  total: number;
  
  // Delivery Details
  deliveryMethod: DeliveryMethod;
  shippingAddress?: {
    street: string;
    city: string;
    zip: string;
    state: string;
  };
  pickupLocation?: string; // Branch Name
  pickupTime?: string;
  tableNumber?: string; // For Dine-In
  
  // Payment
  paymentMethod: PaymentMethodType;
  paymentProvider?: string; // e.g. "MTN", "Visa", "Chase", "PayPal"
  paymentStatus: PaymentStatus;
  transactionId?: string;
  
  // Workflow
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  
  // Admin Tracking
  trackingNumber?: string;
  assignedTo?: string; // Driver or Server name
}

// --- POS SPECIFIC TYPES ---

export type POSOrderType = 'Rental' | 'Sale' | 'Service' | 'Parts';
export type POSWorkflowStage = 'INTAKE' | 'WORK_ORDER' | 'ESTIMATE' | 'PAYMENT' | 'SUCCESS';

export interface POSItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'Service' | 'Product';
  code?: string; // Labor code or SKU
}

export interface WorkOrder {
  id: string;
  vehicleId: string;
  vehicleDetails: { make: string; model: string; vin: string; mileage: number };
  customerId?: string;
  technicianId?: string;
  items: POSItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'In-Progress' | 'Completed';
  notes: string;
  createdAt: string;
}

export interface POSSession {
  id: string;
  staffId: string;
  staffName?: string;
  startTime: string;
  endTime?: string;
  startCash: number;
  endCash?: number;
  totalSales: number;
  status: 'Open' | 'Closed';
  
  // Active Workflow State
  currentStage?: POSWorkflowStage;
  activeWorkOrder?: WorkOrder | null;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  includes: string[];
  laborCode: string;
}

// --- SUPPORT / CONTACT TYPES ---

export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface TicketReply {
  id: string;
  sender: string; // 'Customer' or 'Staff'
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string; // Initial message
  status: TicketStatus;
  priority: TicketPriority;
  category: 'Support' | 'Inquiry' | 'Complaint' | 'Feedback' | 'Sales';
  createdAt: string;
  replies: TicketReply[];
}

// --- HOMEPAGE CONTENT TYPES ---

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g. "Car Enthusiast"
  text: string;
  rating: number;
  image?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string; // e.g. "20% OFF"
  expiry: string;
  image: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// --- ABOUT PAGE TYPES ---
export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface AboutTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  icon: string;
}

// --- FAQ TYPES ---
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpfulCount: number;
  notHelpfulCount: number;
  isPublished: boolean;
}

export type PageView = 'home' | 'shop' | 'services' | 'about' | 'contact' | 'faq' | 'admin' | 'cart' | 'wishlist' | 'checkout' | 'order-success' | 'team' | 'blog';

// --- SETTINGS TYPES ---

export interface GeneralSettings {
  storeAddress: string;
  supportEmail: string;
  supportPhone: string;
  country: string;
  currency: string;
  timezone: string;
}

export interface TaxRate {
  id: string;
  country: string;
  state: string;
  rate: number; // percentage
  name: string;
  priority: number;
  compound: boolean;
  shipping: boolean;
}

export interface TaxSettings {
  enabled: boolean;
  pricesIncludeTax: boolean;
  taxBasedOn: 'shipping' | 'billing' | 'store';
  rates: TaxRate[];
  classes: string[]; // e.g. ["Standard", "Zero Rate", "Car Rental"]
}

export interface ShippingZone {
  id: string;
  name: string;
  regions: string[]; // List of country codes or states
  methods: {
    id: string;
    type: 'flat_rate' | 'free_shipping' | 'local_pickup';
    title: string;
    cost: number;
    enabled: boolean;
  }[];
}

export interface PaymentMethodConfig {
  id: string;
  title: string;
  enabled: boolean;
  description: string;
  testMode: boolean;
}

// --- SOCIAL MEDIA INTEGRATION TYPES ---
export type SocialPlatform = 'TikTok' | 'Facebook' | 'Instagram' | 'YouTube';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  handle: string; // username, page name, or channel name
  email: string;
  status: 'Connected' | 'Pending' | 'Error';
  accountType?: string; // Business, Creator, Personal
  avatar?: string;
  connectedAt: string;
}

export interface SiteSettings {
  name: string;
  logoUrl: string;
  
  // Wizard State
  setupWizardCompleted: boolean;
  
  // Detailed Config
  general: GeneralSettings;
  tax: TaxSettings;
  shipping: {
    zones: ShippingZone[];
    options: any;
  };
  payments: {
    methods: PaymentMethodConfig[];
  };
  emails: {
    senderName: string;
    senderEmail: string;
    notifications: {
      newOrder: boolean;
      cancelledOrder: boolean;
      refund: boolean;
    };
  };
  socialAccounts: SocialAccount[];
}

// --- SERVICE BOOKING TYPES ---
export enum ServiceType {
  Maintenance = 'General Maintenance',
  Repair = 'Mechanical Repair',
  Inspection = 'Diagnostic Inspection',
  Custom = 'Custom Automation',
  OilChange = 'Oil Change'
}

export type ServiceStatus = 'Pending' | 'Confirmed' | 'In-Progress' | 'Completed' | 'Cancelled';

export interface ServiceBooking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  vehicle: {
    make: string;
    model: string;
    year: number;
    vin?: string;
  };
  
  serviceType: ServiceType;
  description?: string; // User notes
  
  date: string;
  timeSlot: string;
  
  deliveryMethod: 'Drop-off' | 'Mobile' | 'Valet';
  address?: string; // For Mobile/Valet
  
  estimatedCost: number;
  status: ServiceStatus;
  
  technicianId?: string;
  createdAt: string;
}

// --- TIKTOK & SOCIAL MEDIA WORKFLOW TYPES ---

export type TikTokPostStatus = 'Idea' | 'Planning' | 'Creation' | 'Review' | 'Scheduled' | 'Posted';

export interface TikTokPost {
  id: string;
  title: string;
  caption: string;
  hashtags: string[];
  status: TikTokPostStatus;
  assignedTo: string;
  scheduledDate?: string;
  mediaUrl?: string; // Optional mockup for video URL
  analytics?: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    watchTime: string; // e.g., "15s avg"
  };
  createdAt: string;
}

// --- TWITTER WORKFLOW TYPES ---
export type TwitterTweetStatus = 'Draft' | 'Review' | 'Scheduled' | 'Posted';

export interface TwitterTweet {
  id: string;
  content: string; // Max 280 chars
  media?: string[]; // Image URLs
  status: TwitterTweetStatus;
  assignedTo: string;
  scheduledDate?: string;
  isThread: boolean;
  analytics?: {
    impressions: number;
    likes: number;
    retweets: number;
    replies: number;
    clicks: number;
  };
  createdAt: string;
}

export interface SocialAnalytics {
  platform: 'TikTok' | 'Instagram' | 'Facebook' | 'YouTube' | 'Twitter';
  followers: number;
  growth: number; // Percentage
  totalViews: number; // Or Impressions for Twitter
  engagementRate: number;
}
// --- BLOG TYPES ---
export type BlogStatus = 'Draft' | 'Review' | 'Published' | 'Archived';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML or Markdown
  excerpt: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  
  publishDate?: string;
  date?: string;
  createdAt: string;
  updatedAt: string;
}

// --- USER ROLE & PERMISSION TYPES ---

export type Permission = 'View' | 'Edit' | 'Create' | 'Delete' | 'Approve' | 'Export';

export interface RolePermissions {
  [module: string]: Permission[]; // e.g. "Orders": ["View", "Edit"]
}

export interface SystemRole {
  id: string;
  name: string; // e.g. "Manager", "Technician"
  description: string;
  permissions: RolePermissions;
  isSystem: boolean; // Cannot be deleted
}

export type StaffStatus = 'Active' | 'Inactive' | 'Pending Approval' | 'Suspended';

// Note: StaffMember interface already exists but we might need to extend it 
// with specific permission overrides or linked SystemRole ID if we were using a relational DB.
// For now, we use the `role` string in StaffMember to map to SystemRole.name.

// --- GALLERY TYPES ---
export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}