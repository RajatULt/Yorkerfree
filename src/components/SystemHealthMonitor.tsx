import React, { useState, useEffect } from 'react';
import { Card, Progress, Alert, Badge, Timeline, Statistic, Row, Col } from 'antd';
import { 
  Server, 
  Database, 
  Wifi, 
  HardDrive, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  Monitor
} from 'lucide-react';
import { systemMetrics, systemAlerts, performanceMetrics } from '../data/superAdminData';

interface SystemHealthMonitorProps {
  refreshInterval?: number;
}

const SystemHealthMonitor: React.FC<SystemHealthMonitorProps> = ({ 
  refreshInterval = 30000 
}) => {
  const [currentMetrics, setCurrentMetrics] = useState(systemMetrics);
  const [alerts, setAlerts] = useState(systemAlerts);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setCurrentMetrics(prev => ({
        ...prev,
        serverLoad: Math.max(30, Math.min(90, prev.serverLoad + (Math.random() - 0.5) * 10)),
        databaseConnections: Math.max(20, Math.min(100, prev.databaseConnections + Math.floor((Math.random() - 0.5) * 10))),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 1000),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() - 0.5) * 0.1))
      }));
      setLastUpdated(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return 'red';
    if (value >= thresholds.warning) return 'orange';
    return 'green';
  };

  const getSystemStatus = () => {
    const criticalIssues = alerts.filter(alert => alert.type === 'critical' && !alert.resolved).length;
    const warningIssues = alerts.filter(alert => alert.type === 'warning' && !alert.resolved).length;
    
    if (criticalIssues > 0) return { status: 'critical', color: 'red', text: 'Critical Issues' };
    if (warningIssues > 0) return { status: 'warning', color: 'orange', text: 'Warnings' };
    return { status: 'healthy', color: 'green', text: 'All Systems Operational' };
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <Card title="System Status Overview">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className="text-center">
              <div className={`text-4xl mb-2 ${
                systemStatus.color === 'green' ? 'text-green-500' : 
                systemStatus.color === 'orange' ? 'text-orange-500' : 'text-red-500'
              }`}>
                {systemStatus.status === 'healthy' ? <CheckCircle size={48} /> : <AlertTriangle size={48} />}
              </div>
              <div className="font-semibold">{systemStatus.text}</div>
              <div className="text-sm text-gray-500">Last updated: {lastUpdated.toLocaleTimeString()}</div>
            </div>
          </Col>
          
          <Col span={18}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic
                  title="System Uptime"
                  value={currentMetrics.systemUptime}
                  prefix={<Clock size={16} />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Total Users"
                  value={currentMetrics.totalUsers}
                  prefix={<Activity size={16} />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="API Calls Today"
                  value={currentMetrics.apiCalls}
                  prefix={<Zap size={16} />}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* Performance Metrics */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <Server size={20} className="text-blue-500" />
                Server Load
              </span>
              <Badge 
                color={getStatusColor(currentMetrics.serverLoad, { warning: 70, critical: 85 })} 
                text={`${currentMetrics.serverLoad}%`} 
              />
            </div>
            <Progress 
              percent={currentMetrics.serverLoad} 
              strokeColor={getStatusColor(currentMetrics.serverLoad, { warning: 70, critical: 85 })}
              showInfo={false}
            />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <Database size={20} className="text-green-500" />
                DB Connections
              </span>
              <Badge 
                color={getStatusColor(currentMetrics.databaseConnections, { warning: 80, critical: 95 })} 
                text={`${currentMetrics.databaseConnections}/100`} 
              />
            </div>
            <Progress 
              percent={currentMetrics.databaseConnections} 
              strokeColor={getStatusColor(currentMetrics.databaseConnections, { warning: 80, critical: 95 })}
              showInfo={false}
            />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <HardDrive size={20} className="text-purple-500" />
                Disk Usage
              </span>
              <Badge color="green" text="45%" />
            </div>
            <Progress percent={45} strokeColor="green" showInfo={false} />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <Monitor size={20} className="text-orange-500" />
                Error Rate
              </span>
              <Badge 
                color={getStatusColor(currentMetrics.errorRate, { warning: 1, critical: 3 })} 
                text={`${currentMetrics.errorRate.toFixed(2)}%`} 
              />
            </div>
            <Progress 
              percent={currentMetrics.errorRate * 20} 
              strokeColor={getStatusColor(currentMetrics.errorRate, { warning: 1, critical: 3 })}
              showInfo={false}
            />
          </Card>
        </Col>
      </Row>

      {/* Active Alerts */}
      <Card title="Active Alerts">
        <div className="space-y-3">
          {alerts.filter(alert => !alert.resolved).map(alert => (
            <Alert
              key={alert.id}
              type={alert.type === 'critical' ? 'error' : alert.type === 'warning' ? 'warning' : 'info'}
              message={alert.title}
              description={
                <div>
                  <p>{alert.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                    {alert.assignedTo && ` • Assigned to: ${alert.assignedTo}`}
                  </p>
                </div>
              }
              showIcon
              closable
              onClose={() => {
                setAlerts(prev => prev.map(a => 
                  a.id === alert.id ? { ...a, resolved: true } : a
                ));
              }}
            />
          ))}
          
          {alerts.filter(alert => !alert.resolved).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
              <p>No active alerts. All systems are running smoothly.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Recent Activity Timeline */}
      <Card title="Recent System Activity">
        <Timeline>
          <Timeline.Item color="green">
            <div className="text-sm">
              <div className="font-medium">System backup completed successfully</div>
              <div className="text-gray-500">2 hours ago</div>
            </div>
          </Timeline.Item>
          <Timeline.Item color="blue">
            <div className="text-sm">
              <div className="font-medium">Database optimization completed</div>
              <div className="text-gray-500">4 hours ago</div>
            </div>
          </Timeline.Item>
          <Timeline.Item color="orange">
            <div className="text-sm">
              <div className="font-medium">High memory usage detected and resolved</div>
              <div className="text-gray-500">6 hours ago</div>
            </div>
          </Timeline.Item>
          <Timeline.Item color="green">
            <div className="text-sm">
              <div className="font-medium">Security patch applied successfully</div>
              <div className="text-gray-500">1 day ago</div>
            </div>
          </Timeline.Item>
        </Timeline>
      </Card>
    </div>
  );
};

export default SystemHealthMonitor;