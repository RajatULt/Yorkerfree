import React, { useState } from "react";
import {
  Shield,
  Users,
  TrendingUp,
  AlertTriangle,
  Settings,
  Award,
  FileText,
  BarChart3,
  PieChart,
  Globe,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  DollarSign,
  Calendar,
  Home,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Search,
  Filter,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Database,
  Server,
  Monitor,
  Wifi,
  HardDrive,
  Activity,
  Bell,
  MessageSquare,
  Image,
  Video,
  BookOpen,
  Share2,
  Link,
  ExternalLink,
  Zap,
  Target,
  Briefcase,
  UserPlus,
  Save,
  RefreshCw,
  MoreHorizontal
} from "lucide-react";
import {
  Table,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Card,
  Statistic,
  Progress,
  Tag,
  Switch,
  Rate,
  DatePicker,
  InputNumber,
  Tabs,
  Drawer,
  Divider,
  Avatar,
  Badge,
  Tooltip,
  Popconfirm,
  Upload as AntUpload,
  message,
  Space,
  Row,
  Col,
  Timeline,
  Alert,
  Spin,
  Empty,
  List,
  Collapse,
  Radio,
  Checkbox,
  Slider
} from "antd";
import NotificationSystem from './NotificationSystem';
import { useToast } from './ToastNotification';
import { basicAdmins, agents, complaints, offers } from "../data/admins";
import { additionalAgents, additionalComplaints, additionalOffers, systemAnalytics } from '../data/extendedMockData';
import { bookings, performanceMetrics } from "../data/bookings";
import { additionalBookings } from '../data/extendedMockData';
import { cruises } from '../data/cruises';
import { additionalCruises } from '../data/extendedMockData';
import { hotels } from '../data/hotels';
import { additionalHotels } from '../data/extendedMockData';
import type { BasicAdmin, Agent, Complaint, Offer } from "../data/admins";
import type { Booking } from "../data/bookings";
import type { Cruise } from "../data/cruises";
import type { Hotel } from "../data/hotels";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;

interface SuperAdminDashboardProps {
  userRole: string;
  onLogout: () => void;
  onBack: () => void;
}

interface SystemSettings {
  maintenanceMode: boolean;
  allowNewRegistrations: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  autoBackup: boolean;
  debugMode: boolean;
  maxFileSize: number;
  sessionTimeout: number;
  passwordPolicy: {
    minLength: number;
    requireSpecialChars: boolean;
    requireNumbers: boolean;
    requireUppercase: boolean;
  };
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'Draft' | 'Published' | 'Archived';
  publishDate: string;
  tags: string[];
  views: number;
  likes: number;
}

interface SocialMedia {
  platform: string;
  handle: string;
  followers: number;
  posts: number;
  engagement: number;
  status: 'Active' | 'Inactive';
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  userRole,
  onLogout,
  onBack,
}) => {
  // Toast notifications
  const { showSuccess, showError, showInfo, ToastContainer } = useToast();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCruiseModal, setShowCruiseModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showSystemLogsModal, setShowSystemLogsModal] = useState(false);
  
  // Selected items
  const [selectedUser, setSelectedUser] = useState<Agent | null>(null);
  const [selectedCruise, setSelectedCruise] = useState<Cruise | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  
  // Form instances
  const [userForm] = Form.useForm();
  const [cruiseForm] = Form.useForm();
  const [blogForm] = Form.useForm();
  const [settingsForm] = Form.useForm();
  
  // Combine all data
  const allAgents = [...agents, ...additionalAgents];
  const allComplaints = [...complaints, ...additionalComplaints];
  const allOffers = [...offers, ...additionalOffers];
  const allBookings = [...bookings, ...additionalBookings];
  const allCruises = [...cruises, ...additionalCruises];
  const allHotels = [...hotels, ...additionalHotels];
  
  // Mock system settings
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    maintenanceMode: false,
    allowNewRegistrations: true,
    emailNotifications: true,
    smsNotifications: true,
    autoBackup: true,
    debugMode: false,
    maxFileSize: 10,
    sessionTimeout: 30,
    passwordPolicy: {
      minLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true
    }
  });
  
  // Mock blog posts
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "blog1",
      title: "Top 10 Cruise Destinations for 2024",
      content: "Discover the most amazing cruise destinations...",
      author: "Travel Team",
      status: "Published",
      publishDate: "2024-03-15",
      tags: ["cruises", "destinations", "travel"],
      views: 1250,
      likes: 89
    },
    {
      id: "blog2",
      title: "Luxury Hotel Trends in India",
      content: "Exploring the latest trends in luxury hospitality...",
      author: "Hospitality Expert",
      status: "Draft",
      publishDate: "2024-03-20",
      tags: ["hotels", "luxury", "trends"],
      views: 0,
      likes: 0
    }
  ]);
  
  // Mock social media data
  const [socialMediaAccounts, setSocialMediaAccounts] = useState<SocialMedia[]>([
    {
      platform: "Instagram",
      handle: "@yorkeholidays",
      followers: 25400,
      posts: 342,
      engagement: 4.2,
      status: "Active"
    },
    {
      platform: "Facebook",
      handle: "Yorke Holidays",
      followers: 18900,
      posts: 156,
      engagement: 3.8,
      status: "Active"
    },
    {
      platform: "Twitter",
      handle: "@yorkeholidays",
      followers: 12300,
      posts: 892,
      engagement: 2.9,
      status: "Active"
    }
  ]);
  
  // Mock system logs
  const systemLogs = [
    {
      id: "log1",
      timestamp: "2024-03-15 10:30:25",
      level: "INFO",
      module: "Authentication",
      message: "User login successful: john.smith@yorkeholidays.com",
      ip: "192.168.1.100"
    },
    {
      id: "log2",
      timestamp: "2024-03-15 10:28:15",
      level: "WARNING",
      module: "Payment",
      message: "Payment gateway timeout for booking BK001",
      ip: "192.168.1.105"
    },
    {
      id: "log3",
      timestamp: "2024-03-15 10:25:42",
      level: "ERROR",
      module: "Database",
      message: "Connection pool exhausted - scaling up",
      ip: "internal"
    }
  ];
  
  // Handle user management
  const handleCreateUser = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess("User Created", "New user has been created successfully");
      setShowUserModal(false);
      userForm.resetFields();
    } catch (error) {
      showError("Error", "Failed to create user");
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditUser = (user: Agent) => {
    setSelectedUser(user);
    userForm.setFieldsValue(user);
    setShowUserModal(true);
  };
  
  const handleDeleteUser = async (userId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      showSuccess("User Deleted", "User has been deleted successfully");
    } catch (error) {
      showError("Error", "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };
  
  // Handle cruise management
  const handleCreateCruise = async (values: any) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess("Cruise Created", "New cruise has been added successfully");
      setShowCruiseModal(false);
      cruiseForm.resetFields();
    } catch (error) {
      showError("Error", "Failed to create cruise");
    } finally {
      setLoading(false);
    }
  };
  
  // Handle blog management
  const handleCreateBlogPost = async (values: any) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newPost: BlogPost = {
        id: `blog${Date.now()}`,
        ...values,
        author: "Super Admin",
        views: 0,
        likes: 0
      };
      setBlogPosts(prev => [...prev, newPost]);
      showSuccess("Blog Post Created", "New blog post has been created successfully");
      setShowBlogModal(false);
      blogForm.resetFields();
    } catch (error) {
      showError("Error", "Failed to create blog post");
    } finally {
      setLoading(false);
    }
  };
  
  // Handle settings update
  const handleUpdateSettings = async (values: any) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSystemSettings(prev => ({ ...prev, ...values }));
      showSuccess("Settings Updated", "System settings have been updated successfully");
      setShowSettingsModal(false);
    } catch (error) {
      showError("Error", "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };
  
  // Filter functions
  const filteredAgents = allAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCruises = allCruises.filter(cruise =>
    cruise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cruise.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cruise.to.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Table columns
  const userColumns = [
    {
      title: 'Avatar',
      key: 'avatar',
      render: (record: Agent) => (
        <Avatar style={{ backgroundColor: '#1890ff' }}>
          {record.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Agent, b: Agent) => a.name.localeCompare(b.name)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : status === 'Pending' ? 'orange' : 'red'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (record: Agent) => (
        <Tag color={record.performance.grade === 'A' ? 'green' : record.performance.grade === 'B' ? 'orange' : 'red'}>
          Grade {record.performance.grade}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Agent) => (
        <Space>
          <Tooltip title="Edit User">
            <Button size="small" icon={<Edit size={14} />} onClick={() => handleEditUser(record)} />
          </Tooltip>
          <Tooltip title="View Details">
            <Button size="small" icon={<Eye size={14} />} />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete User">
              <Button size="small" danger icon={<Trash2 size={14} />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ];
  
  const cruiseColumns = [
    {
      title: 'Image',
      key: 'image',
      render: (record: Cruise) => (
        <Avatar shape="square" size={64} src={record.image} />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Cruise, b: Cruise) => a.name.localeCompare(b.name)
    },
    {
      title: 'Route',
      key: 'route',
      render: (record: Cruise) => `${record.from} → ${record.to}`
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} nights`
    },
    {
      title: 'Price',
      dataIndex: 'pricePerPerson',
      key: 'price',
      render: (price: number) => `₹${price.toLocaleString('en-IN')}`
    },
    {
      title: 'Cruise Line',
      dataIndex: 'cruiseLine',
      key: 'cruiseLine'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Cruise) => (
        <Space>
          <Tooltip title="Edit Cruise">
            <Button size="small" icon={<Edit size={14} />} />
          </Tooltip>
          <Tooltip title="View Details">
            <Button size="small" icon={<Eye size={14} />} />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this cruise?"
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Cruise">
              <Button size="small" danger icon={<Trash2 size={14} />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="bg-[#f9fafb] text-gray-800 flex min-h-screen">
      {/* Toast Notifications */}
      <ToastContainer />
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 border-r fixed top-0 left-0 h-full flex flex-col items-center py-6 z-40 overflow-y-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
          <span className="text-white font-bold text-xl">YH</span>
        </div>
        <h1 className="text-center text-sm text-yellow-600 font-semibold leading-tight px-3 mb-6">
          Yorke Holidays
          <br />
          Services Pvt. Ltd.
        </h1>
        <nav className="flex flex-col gap-2 w-full px-4">
          {[
            {
              key: "overview",
              label: "Overview",
              icon: <BarChart3 size={16} />,
            },
            { key: "users", label: "Manage Users", icon: <Users size={16} /> },
            {
              key: "performance",
              label: "Manage Cruises",
              icon: <FileText size={16} />,
            },
            {
              key: "profile",
              label: "User Profiles",
              icon: <UserCheck size={16} />,
            },
            { key: "account", label: "System Settings", icon: <Settings size={16} /> },
            { key: "corporate", label: "Corporate", icon: <Award size={16} /> },
            { key: "blog", label: "Blog Management", icon: <BookOpen size={16} /> },
            { key: "social", label: "Social Media", icon: <Globe size={16} /> },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
          ${
            activeTab === item.key
              ? "bg-gray-200 text-purple-700"
              : "hover:bg-gray-100 text-gray-700"
          }`}
            >
              <span className="bg-white p-1 rounded-md shadow-sm">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="ps-64 w-full">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b bg-white shadow-sm w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center text-purple-600 font-semibold text-lg"
            >
              <Home size={20} className="mr-2" />
              Super Admin Dashboard
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Welcome back</p>
            <h1 className="font-bold text-lg">Super Admin</h1>
          </div>
          <div className="flex gap-4">
            {/* Notification System */}
            <NotificationSystem userId="super-admin" />
            
            <Button 
              className="text-sm font-medium" 
              type="default"
              icon={<Activity size={16} />}
              onClick={() => setShowSystemLogsModal(true)}
            >
              System Logs
            </Button>
            <Button 
              className="bg-purple-100 text-purple-700 border-none hover:text-purple-900"
              icon={<Settings size={16} />}
              onClick={() => setShowSettingsModal(true)}
            >
              Control Panel
            </Button>
            <Button
              danger
              type="text"
              onClick={onLogout}
              className="flex items-center"
              icon={<LogOut size={16} />}
            >
              Logout
            </Button>
          </div>
        </header>

        {/* Main Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
          <Card
            bordered
            className="bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setActiveTab('users')}
          >
            <Statistic
              title={<span className="text-white">Total Users</span>}
              value={systemAnalytics.totalUsers}
              valueStyle={{ color: "white" }}
              prefix={<Users className="text-white" size={20} />}
              suffix={<span className="text-xs text-white ml-1">+12.5%</span>}
            />
          </Card>
          <Card
            bordered
            className="bg-gradient-to-br from-teal-500 to-green-400 text-white shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setActiveTab('overview')}
          >
            <Statistic
              title={<span className="text-white">Active Users</span>}
              value={systemAnalytics.activeUsers}
              valueStyle={{ color: "white" }}
              prefix={<UserCheck className="text-white" size={20} />}
              suffix={<span className="text-xs text-white ml-1">+15.03%</span>}
            />
          </Card>
          <Card
            bordered
            className="bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setActiveTab('performance')}
          >
            <Statistic
              title={<span className="text-white">Total Bookings</span>}
              value={systemAnalytics.totalBookings}
              valueStyle={{ color: "white" }}
              prefix={<Calendar className="text-white" size={20} />}
              suffix={<span className="text-xs text-white ml-1">+8.7%</span>}
            />
          </Card>
          <Card
            bordered
            className="bg-gradient-to-br from-orange-500 to-red-400 text-white shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setActiveTab('overview')}
          >
            <Statistic
              title={<span className="text-white">Revenue</span>}
              value={systemAnalytics.totalRevenue / 1000000}
              valueStyle={{ color: "white" }}
              prefix={<DollarSign className="text-white" size={20} />}
              suffix={<span className="text-xs text-white ml-1">M +6.08%</span>}
            />
          </Card>
        </section>

        {/* Tab Content */}
        <div className="px-8 pb-12">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">System Overview</h2>
                <Space>
                  <Button icon={<RefreshCw size={16} />}>Refresh</Button>
                  <Button type="primary" icon={<Download size={16} />}>Export Report</Button>
                </Space>
              </div>
              
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="System Health" className="h-full">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <Server size={16} className="text-green-500" />
                          Server Status
                        </span>
                        <Tag color="green">Online</Tag>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <Database size={16} className="text-blue-500" />
                          Database
                        </span>
                        <Tag color="green">Connected</Tag>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <Wifi size={16} className="text-orange-500" />
                          API Gateway
                        </span>
                        <Tag color="green">Active</Tag>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <HardDrive size={16} className="text-purple-500" />
                          Storage
                        </span>
                        <Progress percent={75} size="small" />
                      </div>
                    </div>
                  </Card>
                </Col>
                
                <Col span={12}>
                  <Card title="Recent Activity" className="h-full">
                    <Timeline size="small">
                      <Timeline.Item color="green">
                        <div className="text-sm">
                          <div className="font-medium">New user registered</div>
                          <div className="text-gray-500">2 minutes ago</div>
                        </div>
                      </Timeline.Item>
                      <Timeline.Item color="blue">
                        <div className="text-sm">
                          <div className="font-medium">Cruise booking confirmed</div>
                          <div className="text-gray-500">5 minutes ago</div>
                        </div>
                      </Timeline.Item>
                      <Timeline.Item color="orange">
                        <div className="text-sm">
                          <div className="font-medium">System backup completed</div>
                          <div className="text-gray-500">1 hour ago</div>
                        </div>
                      </Timeline.Item>
                    </Timeline>
                  </Card>
                </Col>
              </Row>
              
              <div className="mt-6">
                <Card title="Performance Metrics">
                  <Row gutter={[16, 16]}>
                    {allAgents.slice(0, 6).map((agent) => (
                      <Col span={8} key={agent.id}>
                        <Card size="small" className="bg-white shadow">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-md font-semibold">{agent.name}</div>
                              <div className="text-xs text-gray-400">{agent.region}</div>
                            </div>
                            <Tag
                              color={
                                agent.performance.grade === "A"
                                  ? "green"
                                  : agent.performance.grade === "B"
                                  ? "orange"
                                  : "red"
                              }
                            >
                              {agent.performance.grade}
                            </Tag>
                          </div>
                          <div className="mt-4 text-sm">
                            <div className="flex justify-between">
                              <span>Bookings</span>
                              <span>{agent.performance.totalBookings}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Revenue</span>
                              <span>
                                ₹{agent.performance.totalSales.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Success Rate</span>
                              <span>{agent.performance.successRate}%</span>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </div>
            </div>
          )}
          
          {/* Users Management Tab */}
          {activeTab === "users" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">User Management</h2>
                <Space>
                  <Input.Search
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 250 }}
                  />
                  <Button type="primary" icon={<Plus size={16} />} onClick={() => setShowUserModal(true)}>
                    Add User
                  </Button>
                  <Button icon={<Download size={16} />}>Export</Button>
                </Space>
              </div>
              
              <Card>
                <Table
                  columns={userColumns}
                  dataSource={filteredAgents}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                  loading={loading}
                />
              </Card>
            </div>
          )}
          
          {/* Cruise Management Tab */}
          {activeTab === "performance" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Cruise Management</h2>
                <Space>
                  <Input.Search
                    placeholder="Search cruises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 250 }}
                  />
                  <Button type="primary" icon={<Plus size={16} />} onClick={() => setShowCruiseModal(true)}>
                    Add Cruise
                  </Button>
                  <Button icon={<Download size={16} />}>Export</Button>
                </Space>
              </div>
              
              <Card>
                <Table
                  columns={cruiseColumns}
                  dataSource={filteredCruises}
                  rowKey="id"
                  pagination={{ pageSize: 8 }}
                  loading={loading}
                />
              </Card>
            </div>
          )}
          
          {/* User Profiles Tab */}
          {activeTab === "profile" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">User Profiles & Analytics</h2>
                <Button icon={<Download size={16} />}>Export Analytics</Button>
              </div>
              
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Card title="User Distribution">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Travel Agents</span>
                        <Badge count={allAgents.length} color="blue" />
                      </div>
                      <div className="flex justify-between">
                        <span>Basic Admins</span>
                        <Badge count={basicAdmins.length} color="green" />
                      </div>
                      <div className="flex justify-between">
                        <span>Super Admins</span>
                        <Badge count={1} color="red" />
                      </div>
                    </div>
                  </Card>
                </Col>
                
                <Col span={8}>
                  <Card title="Regional Distribution">
                    <div className="space-y-3">
                      {systemAnalytics.topDestinations.map((dest, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{dest.name}</span>
                          <div className="flex items-center gap-2">
                            <Progress percent={(dest.bookings / 500) * 100} size="small" style={{ width: 60 }} />
                            <span className="text-sm">{dest.bookings}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
                
                <Col span={8}>
                  <Card title="Performance Grades">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          Grade A
                        </span>
                        <span>{allAgents.filter(a => a.performance.grade === 'A').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          Grade B
                        </span>
                        <span>{allAgents.filter(a => a.performance.grade === 'B').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          Grade C
                        </span>
                        <span>{allAgents.filter(a => a.performance.grade === 'C').length}</span>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          
          {/* Blog Management Tab */}
          {activeTab === "blog" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Blog Management</h2>
                <Button type="primary" icon={<Plus size={16} />} onClick={() => setShowBlogModal(true)}>
                  Create Post
                </Button>
              </div>
              
              <Row gutter={[16, 16]}>
                {blogPosts.map((post) => (
                  <Col span={8} key={post.id}>
                    <Card
                      actions={[
                        <Eye key="view" onClick={() => showInfo("Views", `This post has ${post.views} views`)} />,
                        <Edit key="edit" onClick={() => {
                          setSelectedBlogPost(post);
                          blogForm.setFieldsValue(post);
                          setShowBlogModal(true);
                        }} />,
                        <Trash2 key="delete" onClick={() => {
                          setBlogPosts(prev => prev.filter(p => p.id !== post.id));
                          showSuccess("Deleted", "Blog post deleted successfully");
                        }} />
                      ]}
                    >
                      <Card.Meta
                        title={post.title}
                        description={
                          <div>
                            <p className="text-gray-600 mb-2">{post.content.substring(0, 100)}...</p>
                            <div className="flex justify-between items-center">
                              <Tag color={post.status === 'Published' ? 'green' : 'orange'}>
                                {post.status}
                              </Tag>
                              <span className="text-sm text-gray-500">{post.publishDate}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm">Views: {post.views}</span>
                              <span className="text-sm">Likes: {post.likes}</span>
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          
          {/* Social Media Tab */}
          {activeTab === "social" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Social Media Management</h2>
                <Button type="primary" icon={<Plus size={16} />} onClick={() => setShowSocialModal(true)}>
                  Add Platform
                </Button>
              </div>
              
              <Row gutter={[16, 16]}>
                {socialMediaAccounts.map((account, index) => (
                  <Col span={8} key={index}>
                    <Card>
                      <div className="text-center">
                        <div className="text-2xl mb-2">
                          {account.platform === 'Instagram' && '📷'}
                          {account.platform === 'Facebook' && '📘'}
                          {account.platform === 'Twitter' && '🐦'}
                        </div>
                        <h3 className="text-lg font-semibold">{account.platform}</h3>
                        <p className="text-gray-600 mb-4">{account.handle}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-semibold text-blue-600">{account.followers.toLocaleString()}</div>
                            <div className="text-gray-500">Followers</div>
                          </div>
                          <div>
                            <div className="font-semibold text-green-600">{account.posts}</div>
                            <div className="text-gray-500">Posts</div>
                          </div>
                          <div>
                            <div className="font-semibold text-orange-600">{account.engagement}%</div>
                            <div className="text-gray-500">Engagement</div>
                          </div>
                          <div>
                            <Tag color={account.status === 'Active' ? 'green' : 'red'}>
                              {account.status}
                            </Tag>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <Button size="small" icon={<Edit size={14} />}>Edit</Button>
                          <Button size="small" icon={<BarChart3 size={14} />}>Analytics</Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          
          {/* Corporate Tab */}
          {activeTab === "corporate" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Corporate Management</h2>
                <Button type="primary" icon={<Plus size={16} />}>Add Corporate Client</Button>
              </div>
              
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="Corporate Clients" className="h-full">
                    <List
                      dataSource={[
                        { name: "TCS Limited", bookings: 45, revenue: "₹25,00,000" },
                        { name: "Infosys Technologies", bookings: 32, revenue: "₹18,50,000" },
                        { name: "Wipro Corporation", bookings: 28, revenue: "₹15,75,000" }
                      ]}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon={<Building />} />}
                            title={item.name}
                            description={`${item.bookings} bookings • ${item.revenue} revenue`}
                          />
                          <Button size="small">Manage</Button>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                
                <Col span={12}>
                  <Card title="Corporate Packages" className="h-full">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">Executive Package</h4>
                        <p className="text-gray-600">Premium corporate travel solutions</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-green-600 font-semibold">₹50,000/month</span>
                          <Button size="small">Edit</Button>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">Business Package</h4>
                        <p className="text-gray-600">Standard corporate travel package</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-green-600 font-semibold">₹30,000/month</span>
                          <Button size="small">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
      
      {/* User Modal */}
      <Modal
        title={selectedUser ? "Edit User" : "Create New User"}
        open={showUserModal}
        onCancel={() => {
          setShowUserModal(false);
          setSelectedUser(null);
          userForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={userForm}
          layout="vertical"
          onFinish={handleCreateUser}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="region"
                label="Region"
                rules={[{ required: true, message: 'Please select region' }]}
              >
                <Select placeholder="Select region">
                  <Option value="Delhi">Delhi</Option>
                  <Option value="Mumbai">Mumbai</Option>
                  <Option value="Chennai">Chennai</Option>
                  <Option value="Bangalore">Bangalore</Option>
                  <Option value="Kolkata">Kolkata</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                  <Option value="Pending">Pending</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          
          <Form.Item
            name="address"
            label="Address"
          >
            <TextArea rows={3} placeholder="Enter address" />
          </Form.Item>
          
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowUserModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {selectedUser ? 'Update' : 'Create'} User
            </Button>
          </div>
        </Form>
      </Modal>
      
      {/* Cruise Modal */}
      <Modal
        title="Add New Cruise"
        open={showCruiseModal}
        onCancel={() => {
          setShowCruiseModal(false);
          cruiseForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={cruiseForm}
          layout="vertical"
          onFinish={handleCreateCruise}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Cruise Name"
                rules={[{ required: true, message: 'Please enter cruise name' }]}
              >
                <Input placeholder="Enter cruise name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cruiseLine"
                label="Cruise Line"
                rules={[{ required: true, message: 'Please enter cruise line' }]}
              >
                <Input placeholder="Enter cruise line" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="from"
                label="From"
                rules={[{ required: true, message: 'Please enter departure port' }]}
              >
                <Input placeholder="Departure port" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="to"
                label="To"
                rules={[{ required: true, message: 'Please enter destination port' }]}
              >
                <Input placeholder="Destination port" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="duration"
                label="Duration (nights)"
                rules={[{ required: true, message: 'Please enter duration' }]}
              >
                <InputNumber min={1} max={30} placeholder="Duration" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="pricePerPerson"
                label="Price Per Person (₹)"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber min={1000} style={{ width: '100%' }} placeholder="Price per person" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="shipType"
                label="Ship Type"
                rules={[{ required: true, message: 'Please select ship type' }]}
              >
                <Select placeholder="Select ship type">
                  <Option value="Luxury Ship">Luxury Ship</Option>
                  <Option value="Family Ship">Family Ship</Option>
                  <Option value="Premium Ship">Premium Ship</Option>
                  <Option value="Mega Ship">Mega Ship</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={4} placeholder="Enter cruise description" />
          </Form.Item>
          
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowCruiseModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Cruise
            </Button>
          </div>
        </Form>
      </Modal>
      
      {/* Settings Modal */}
      <Modal
        title="System Settings"
        open={showSettingsModal}
        onCancel={() => setShowSettingsModal(false)}
        footer={null}
        width={700}
      >
        <Form
          form={settingsForm}
          layout="vertical"
          initialValues={systemSettings}
          onFinish={handleUpdateSettings}
        >
          <Tabs defaultActiveKey="general">
            <TabPane tab="General" key="general">
              <Form.Item name="maintenanceMode" valuePropName="checked">
                <Checkbox>Maintenance Mode</Checkbox>
              </Form.Item>
              <Form.Item name="allowNewRegistrations" valuePropName="checked">
                <Checkbox>Allow New Registrations</Checkbox>
              </Form.Item>
              <Form.Item name="emailNotifications" valuePropName="checked">
                <Checkbox>Email Notifications</Checkbox>
              </Form.Item>
              <Form.Item name="smsNotifications" valuePropName="checked">
                <Checkbox>SMS Notifications</Checkbox>
              </Form.Item>
              <Form.Item name="autoBackup" valuePropName="checked">
                <Checkbox>Auto Backup</Checkbox>
              </Form.Item>
            </TabPane>
            
            <TabPane tab="Security" key="security">
              <Form.Item name="sessionTimeout" label="Session Timeout (minutes)">
                <InputNumber min={5} max={120} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="maxFileSize" label="Max File Size (MB)">
                <InputNumber min={1} max={100} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Password Policy">
                <Form.Item name={['passwordPolicy', 'minLength']} label="Minimum Length">
                  <InputNumber min={6} max={20} />
                </Form.Item>
                <Form.Item name={['passwordPolicy', 'requireSpecialChars']} valuePropName="checked">
                  <Checkbox>Require Special Characters</Checkbox>
                </Form.Item>
                <Form.Item name={['passwordPolicy', 'requireNumbers']} valuePropName="checked">
                  <Checkbox>Require Numbers</Checkbox>
                </Form.Item>
                <Form.Item name={['passwordPolicy', 'requireUppercase']} valuePropName="checked">
                  <Checkbox>Require Uppercase Letters</Checkbox>
                </Form.Item>
              </Form.Item>
            </TabPane>
          </Tabs>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setShowSettingsModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Settings
            </Button>
          </div>
        </Form>
      </Modal>
      
      {/* Blog Modal */}
      <Modal
        title={selectedBlogPost ? "Edit Blog Post" : "Create Blog Post"}
        open={showBlogModal}
        onCancel={() => {
          setShowBlogModal(false);
          setSelectedBlogPost(null);
          blogForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={blogForm}
          layout="vertical"
          onFinish={handleCreateBlogPost}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <Input placeholder="Enter blog post title" />
          </Form.Item>
          
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter content' }]}
          >
            <TextArea rows={8} placeholder="Enter blog post content" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="Draft">Draft</Option>
                  <Option value="Published">Published</Option>
                  <Option value="Archived">Archived</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="publishDate"
                label="Publish Date"
                rules={[{ required: true, message: 'Please select publish date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select mode="tags" placeholder="Enter tags" />
          </Form.Item>
          
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowBlogModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {selectedBlogPost ? 'Update' : 'Create'} Post
            </Button>
          </div>
        </Form>
      </Modal>
      
      {/* System Logs Modal */}
      <Modal
        title="System Logs"
        open={showSystemLogsModal}
        onCancel={() => setShowSystemLogsModal(false)}
        footer={[
          <Button key="refresh" icon={<RefreshCw size={16} />}>Refresh</Button>,
          <Button key="export" icon={<Download size={16} />}>Export</Button>,
          <Button key="close" onClick={() => setShowSystemLogsModal(false)}>Close</Button>
        ]}
        width={1000}
      >
        <div className="space-y-4">
          <div className="flex gap-4">
            <Select defaultValue="all" style={{ width: 120 }}>
              <Option value="all">All Levels</Option>
              <Option value="info">INFO</Option>
              <Option value="warning">WARNING</Option>
              <Option value="error">ERROR</Option>
            </Select>
            <Select defaultValue="all" style={{ width: 150 }}>
              <Option value="all">All Modules</Option>
              <Option value="auth">Authentication</Option>
              <Option value="payment">Payment</Option>
              <Option value="database">Database</Option>
            </Select>
            <Input.Search placeholder="Search logs..." style={{ width: 250 }} />
          </div>
          
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {systemLogs.map((log) => (
              <div key={log.id} className="mb-2">
                <span className={`${
                  log.level === 'ERROR' ? 'text-red-400' : 
                  log.level === 'WARNING' ? 'text-yellow-400' : 
                  'text-green-400'
                }`}>
                  [{log.timestamp}] {log.level} [{log.module}] {log.message}
                </span>
                {log.ip && <span className="text-gray-400"> - IP: {log.ip}</span>}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SuperAdminDashboard;