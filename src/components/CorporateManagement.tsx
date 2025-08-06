import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  InputNumber, 
  Space, 
  Tag, 
  Avatar, 
  Statistic, 
  Row, 
  Col,
  Tooltip,
  Popconfirm,
  Progress,
  List,
  Badge
} from 'antd';
import { 
  Building, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  MapPin,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Award,
  FileText,
  Download
} from 'lucide-react';
import { corporateClients } from '../data/superAdminData';
import type { CorporateClient } from '../data/superAdminData';
import { useToast } from './ToastNotification';

const { TextArea } = Input;
const { Option } = Select;

interface CorporateManagementProps {
  onClientSelect?: (client: CorporateClient) => void;
}

const CorporateManagement: React.FC<CorporateManagementProps> = ({ onClientSelect }) => {
  const { showSuccess, showError } = useToast();
  const [clients, setClients] = useState<CorporateClient[]>(corporateClients);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<CorporateClient | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCreateClient = async (values: any) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newClient: CorporateClient = {
        id: `corp${Date.now()}`,
        ...values,
        totalBookings: 0,
        totalRevenue: 0,
        status: 'Pending' as const
      };
      
      setClients(prev => [...prev, newClient]);
      showSuccess("Client Created", "Corporate client has been created successfully");
      setShowModal(false);
      form.resetFields();
    } catch (error) {
      showError("Error", "Failed to create corporate client");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClient = (client: CorporateClient) => {
    setSelectedClient(client);
    form.setFieldsValue({
      ...client,
      contractStartDate: client.contractStartDate,
      contractEndDate: client.contractEndDate
    });
    setShowModal(true);
  };

  const handleDeleteClient = async (clientId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setClients(prev => prev.filter(client => client.id !== clientId));
      showSuccess("Client Deleted", "Corporate client has been deleted successfully");
    } catch (error) {
      showError("Error", "Failed to delete corporate client");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Company',
      key: 'company',
      render: (record: CorporateClient) => (
        <div className="flex items-center gap-3">
          <Avatar icon={<Building />} size={40} />
          <div>
            <div className="font-semibold">{record.name}</div>
            <div className="text-sm text-gray-500">{record.industry}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Contact Person',
      key: 'contact',
      render: (record: CorporateClient) => (
        <div>
          <div className="font-medium">{record.contactPerson}</div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Mail size={12} />
            {record.email}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Phone size={12} />
            {record.phone}
          </div>
        </div>
      )
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (record: CorporateClient) => (
        <div>
          <div className="text-sm mb-1">
            <span className="font-medium">{record.totalBookings}</span> bookings
          </div>
          <div className="text-sm mb-1">
            <span className="font-medium text-green-600">
              ₹{record.totalRevenue.toLocaleString('en-IN')}
            </span> revenue
          </div>
          <div className="text-sm">
            <span className="font-medium text-blue-600">{record.discountRate}%</span> discount
          </div>
        </div>
      )
    },
    {
      title: 'Contract',
      key: 'contract',
      render: (record: CorporateClient) => (
        <div>
          <div className="text-sm">
            Start: {new Date(record.contractStartDate).toLocaleDateString()}
          </div>
          <div className="text-sm">
            End: {new Date(record.contractEndDate).toLocaleDateString()}
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'Active' ? 'green' : 
          status === 'Pending' ? 'orange' : 'red'
        }>
          {status}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: CorporateClient) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              size="small" 
              icon={<Eye size={14} />} 
              onClick={() => onClientSelect?.(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Client">
            <Button 
              size="small" 
              icon={<Edit size={14} />} 
              onClick={() => handleEditClient(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this client?"
            onConfirm={() => handleDeleteClient(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Client">
              <Button size="small" danger icon={<Trash2 size={14} />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const totalRevenue = clients.reduce((sum, client) => sum + client.totalRevenue, 0);
  const totalBookings = clients.reduce((sum, client) => sum + client.totalBookings, 0);
  const activeClients = clients.filter(client => client.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Clients"
              value={clients.length}
              prefix={<Building className="text-blue-500" size={20} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Clients"
              value={activeClients}
              prefix={<Users className="text-green-500" size={20} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Bookings"
              value={totalBookings}
              prefix={<Calendar className="text-orange-500" size={20} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
              prefix={<DollarSign className="text-purple-500" size={20} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Top Performers */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Top Performing Clients" extra={<Award className="text-yellow-500" />}>
            <List
              dataSource={clients
                .sort((a, b) => b.totalRevenue - a.totalRevenue)
                .slice(0, 5)
              }
              renderItem={(client, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Badge count={index + 1} color="gold">
                        <Avatar icon={<Building />} />
                      </Badge>
                    }
                    title={client.name}
                    description={`₹${client.totalRevenue.toLocaleString('en-IN')} revenue • ${client.totalBookings} bookings`}
                  />
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Growth</div>
                    <div className="text-green-600 font-semibold">+12%</div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col span={12}>
          <Card title="Industry Distribution">
            <div className="space-y-4">
              {Array.from(new Set(clients.map(c => c.industry))).map(industry => {
                const industryClients = clients.filter(c => c.industry === industry);
                const percentage = (industryClients.length / clients.length) * 100;
                
                return (
                  <div key={industry}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{industry}</span>
                      <span className="text-sm text-gray-500">
                        {industryClients.length} clients ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress percent={percentage} size="small" />
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Table */}
      <Card 
        title="Corporate Clients" 
        extra={
          <Space>
            <Button icon={<Download size={16} />}>Export</Button>
            <Button 
              type="primary" 
              icon={<Plus size={16} />} 
              onClick={() => {
                setSelectedClient(null);
                form.resetFields();
                setShowModal(true);
              }}
            >
              Add Client
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={clients}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          loading={loading}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={selectedClient ? "Edit Corporate Client" : "Add Corporate Client"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setSelectedClient(null);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateClient}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Company Name"
                rules={[{ required: true, message: 'Please enter company name' }]}
              >
                <Input placeholder="Enter company name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="industry"
                label="Industry"
                rules={[{ required: true, message: 'Please select industry' }]}
              >
                <Select placeholder="Select industry">
                  <Option value="Information Technology">Information Technology</Option>
                  <Option value="Manufacturing">Manufacturing</Option>
                  <Option value="Healthcare">Healthcare</Option>
                  <Option value="Finance">Finance</Option>
                  <Option value="Education">Education</Option>
                  <Option value="Retail">Retail</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contactPerson"
                label="Contact Person"
                rules={[{ required: true, message: 'Please enter contact person name' }]}
              >
                <Input placeholder="Enter contact person name" />
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
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="discountRate"
                label="Discount Rate (%)"
                rules={[{ required: true, message: 'Please enter discount rate' }]}
              >
                <InputNumber min={0} max={50} placeholder="Discount rate" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <TextArea rows={3} placeholder="Enter company address" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contractStartDate"
                label="Contract Start Date"
                rules={[{ required: true, message: 'Please select start date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contractEndDate"
                label="Contract End Date"
                rules={[{ required: true, message: 'Please select end date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {selectedClient ? 'Update' : 'Create'} Client
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CorporateManagement;