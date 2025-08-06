// Super Admin specific data and interfaces

export interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalBookings: number;
  totalRevenue: number;
  systemUptime: string;
  serverLoad: number;
  databaseConnections: number;
  apiCalls: number;
  errorRate: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'pending';
}

export interface SystemAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
  assignedTo?: string;
}

export interface BackupStatus {
  id: string;
  type: 'full' | 'incremental';
  status: 'completed' | 'running' | 'failed';
  startTime: string;
  endTime?: string;
  size: string;
  location: string;
}

export interface PerformanceMetric {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkIn: number;
  networkOut: number;
  responseTime: number;
}

// Mock data
export const systemMetrics: SystemMetrics = {
  totalUsers: 1250,
  activeUsers: 892,
  totalBookings: 3456,
  totalRevenue: 45600000,
  systemUptime: "99.9%",
  serverLoad: 65,
  databaseConnections: 45,
  apiCalls: 125000,
  errorRate: 0.02
};

export const userActivities: UserActivity[] = [
  {
    id: "act1",
    userId: "ag1",
    userName: "John Smith",
    action: "User login",
    timestamp: "2024-03-15T10:30:00Z",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    status: "success"
  },
  {
    id: "act2",
    userId: "ag2",
    userName: "Amit Patel",
    action: "Booking created",
    timestamp: "2024-03-15T10:25:00Z",
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    status: "success"
  },
  {
    id: "act3",
    userId: "ag3",
    userName: "Sneha Reddy",
    action: "Password reset attempt",
    timestamp: "2024-03-15T10:20:00Z",
    ipAddress: "192.168.1.110",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)",
    status: "failed"
  }
];

export const systemAlerts: SystemAlert[] = [
  {
    id: "alert1",
    type: "warning",
    title: "High Memory Usage",
    message: "Server memory usage has exceeded 85% threshold",
    timestamp: "2024-03-15T10:15:00Z",
    resolved: false
  },
  {
    id: "alert2",
    type: "info",
    title: "Scheduled Maintenance",
    message: "System maintenance scheduled for tonight at 2:00 AM",
    timestamp: "2024-03-15T09:00:00Z",
    resolved: false
  },
  {
    id: "alert3",
    type: "critical",
    title: "Payment Gateway Error",
    message: "Payment gateway is experiencing connectivity issues",
    timestamp: "2024-03-15T08:45:00Z",
    resolved: true,
    assignedTo: "System Admin"
  }
];

export const backupStatuses: BackupStatus[] = [
  {
    id: "backup1",
    type: "full",
    status: "completed",
    startTime: "2024-03-15T02:00:00Z",
    endTime: "2024-03-15T03:30:00Z",
    size: "2.5 GB",
    location: "AWS S3 Bucket"
  },
  {
    id: "backup2",
    type: "incremental",
    status: "completed",
    startTime: "2024-03-14T02:00:00Z",
    endTime: "2024-03-14T02:15:00Z",
    size: "150 MB",
    location: "AWS S3 Bucket"
  },
  {
    id: "backup3",
    type: "full",
    status: "failed",
    startTime: "2024-03-13T02:00:00Z",
    endTime: "2024-03-13T02:05:00Z",
    size: "0 MB",
    location: "AWS S3 Bucket"
  }
];

export const performanceMetrics: PerformanceMetric[] = [
  {
    timestamp: "2024-03-15T10:00:00Z",
    cpuUsage: 65,
    memoryUsage: 78,
    diskUsage: 45,
    networkIn: 1250,
    networkOut: 890,
    responseTime: 120
  },
  {
    timestamp: "2024-03-15T09:00:00Z",
    cpuUsage: 58,
    memoryUsage: 72,
    diskUsage: 44,
    networkIn: 1100,
    networkOut: 750,
    responseTime: 110
  },
  {
    timestamp: "2024-03-15T08:00:00Z",
    cpuUsage: 62,
    memoryUsage: 75,
    diskUsage: 43,
    networkIn: 1300,
    networkOut: 920,
    responseTime: 135
  }
];

// Corporate clients data
export interface CorporateClient {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  totalBookings: number;
  totalRevenue: number;
  contractStartDate: string;
  contractEndDate: string;
  status: 'Active' | 'Inactive' | 'Pending';
  discountRate: number;
}

export const corporateClients: CorporateClient[] = [
  {
    id: "corp1",
    name: "TCS Limited",
    contactPerson: "Rajesh Kumar",
    email: "rajesh.kumar@tcs.com",
    phone: "+91 9876543210",
    address: "TCS House, Raveline Street, Fort, Mumbai",
    industry: "Information Technology",
    totalBookings: 45,
    totalRevenue: 2500000,
    contractStartDate: "2024-01-01",
    contractEndDate: "2024-12-31",
    status: "Active",
    discountRate: 15
  },
  {
    id: "corp2",
    name: "Infosys Technologies",
    contactPerson: "Priya Sharma",
    email: "priya.sharma@infosys.com",
    phone: "+91 9876543211",
    address: "Electronics City, Bangalore",
    industry: "Information Technology",
    totalBookings: 32,
    totalRevenue: 1850000,
    contractStartDate: "2024-02-01",
    contractEndDate: "2025-01-31",
    status: "Active",
    discountRate: 12
  },
  {
    id: "corp3",
    name: "Wipro Corporation",
    contactPerson: "Amit Patel",
    email: "amit.patel@wipro.com",
    phone: "+91 9876543212",
    address: "Doddakannelli, Sarjapur Road, Bangalore",
    industry: "Information Technology",
    totalBookings: 28,
    totalRevenue: 1575000,
    contractStartDate: "2024-03-01",
    contractEndDate: "2025-02-28",
    status: "Active",
    discountRate: 10
  }
];

// Content management data
export interface ContentItem {
  id: string;
  type: 'blog' | 'news' | 'promotion' | 'guide';
  title: string;
  content: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  publishDate: string;
  lastModified: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
}

export const contentItems: ContentItem[] = [
  {
    id: "content1",
    type: "blog",
    title: "Top 10 Cruise Destinations for 2024",
    content: "Discover the most amazing cruise destinations that should be on your travel list this year...",
    author: "Travel Team",
    status: "published",
    publishDate: "2024-03-15",
    lastModified: "2024-03-15T10:30:00Z",
    tags: ["cruises", "destinations", "travel", "2024"],
    views: 1250,
    likes: 89,
    comments: 23,
    featured: true
  },
  {
    id: "content2",
    type: "guide",
    title: "First Time Cruise Guide",
    content: "Everything you need to know for your first cruise experience...",
    author: "Cruise Expert",
    status: "published",
    publishDate: "2024-03-10",
    lastModified: "2024-03-12T15:20:00Z",
    tags: ["guide", "first-time", "cruises", "tips"],
    views: 890,
    likes: 67,
    comments: 15,
    featured: false
  },
  {
    id: "content3",
    type: "promotion",
    title: "Early Bird Special - Save 20%",
    content: "Book your cruise 60 days in advance and save 20% on all bookings...",
    author: "Marketing Team",
    status: "published",
    publishDate: "2024-03-12",
    lastModified: "2024-03-12T09:15:00Z",
    tags: ["promotion", "discount", "early-bird"],
    views: 2100,
    likes: 156,
    comments: 45,
    featured: true
  }
];