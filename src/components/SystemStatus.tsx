

import React, { useState, useEffect, useCallback } from 'react';
import { FaGlobe, FaRobot, FaUsers, FaBell, FaCheckCircle, FaExclamationTriangle, FaChartBar, FaServer, FaDatabase, FaCloud, FaCalendarAlt } from 'react-icons/fa';
import { BiRefresh } from 'react-icons/bi';
import { FaCog, FaHistory, FaInfoCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Logo from '../assets/images/npc.png';
import StatusBar from '../components/StatusBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ServiceStatus {
  name: string;
  status: 'operational' | 'partial' | 'major';
  icon: React.ElementType;
}

const SystemStatus: React.FC = () => {
  const [overallStatus, setOverallStatus] = useState<'operational' | 'partial' | 'major'>('operational');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'incidents'>('overview');
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Website', status: 'operational', icon: FaGlobe },
    { name: 'API', status: 'operational', icon: FaServer },
    { name: 'Database', status: 'operational', icon: FaDatabase },
    { name: 'AI Services', status: 'operational', icon: FaRobot },
    { name: 'Cloud Storage', status: 'operational', icon: FaCloud },
  ]);

  const [dailyStatus, setDailyStatus] = useState<Record<string, ('operational' | 'partial' | 'major')[]>>({
    'Official Website': ['operational', 'operational', 'operational', 'operational', 'operational', 'operational', 'operational'],
    'Mazs Artificial Intelligence': ['operational', 'partial', 'operational', 'operational', 'operational', 'operational', 'operational'],
    'Theta Social Media': ['operational', 'operational', 'operational', 'major', 'operational', 'operational', 'operational'],
  });

  const refreshStatus = useCallback(() => {
    setLastRefresh(new Date());
    // Simulate updating service statuses
    const updatedServices = services.map(service => ({
      ...service,
      status: Math.random() > 0.8 ? 'partial' : 'operational'
    } as ServiceStatus));
    setServices(updatedServices);
    
    // Update overall status based on service statuses
    const hasPartial = updatedServices.some(s => s.status === 'partial');
    const hasMajor = updatedServices.some(s => s.status === 'major');
    setOverallStatus(hasMajor ? 'major' : hasPartial ? 'partial' : 'operational');

    // Update daily status (example implementation)
    setDailyStatus(prevStatus => {
      const newStatus = { ...prevStatus };
      Object.keys(newStatus).forEach(project => {
        newStatus[project] = [
          ...newStatus[project].slice(1),
          Math.random() > 0.9 ? 'partial' : 'operational'
        ];
      });
      return newStatus;
    });
  }, [services, setServices, setOverallStatus, setDailyStatus]);

  useEffect(() => {
    // Simulate periodic refresh
    const intervalId = setInterval(refreshStatus, 60000); // Refresh every minute
    return () => clearInterval(intervalId);
  }, [refreshStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 sm:p-8 pt-16 sm:pt-20">
      <header className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <img src={Logo} alt="GMTStudio" className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4" />
          <h1 className="text-2xl sm:text-3xl font-bold">GMTStudio Status</h1>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button onClick={() => setShowNotifications(!showNotifications)} className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition duration-300">
            <FaBell className="text-lg sm:text-xl" />
          </button>
          <button onClick={refreshStatus} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition duration-300">
            <BiRefresh className="text-lg sm:text-xl" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showNotifications && <NotificationsPanel />}
      </AnimatePresence>

      <StatusBar services={services} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-lg backdrop-blur-lg bg-opacity-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {overallStatus === 'operational' && <FaCheckCircle className="text-green-500 mr-3 text-2xl" />}
            {overallStatus === 'partial' && <FaExclamationTriangle className="text-yellow-500 mr-3 text-2xl" />}
            {overallStatus === 'major' && <FaExclamationTriangle className="text-red-500 mr-3 text-2xl" />}
            <h2 className="text-xl sm:text-2xl font-semibold">
              {overallStatus === 'operational' && 'All Systems Operational'}
              {overallStatus === 'partial' && 'Partial System Outage'}
              {overallStatus === 'major' && 'Major System Outage'}
            </h2>
          </div>
          <div className="text-gray-400">
            Last updated: {lastRefresh.toLocaleString()}
          </div>
        </div>
        <p className="mt-4 text-gray-400 text-lg">
          This is the status of the GMTStudio official website and related services.
        </p>
      </motion.div>

      <div className="mb-8 overflow-x-auto">
        <nav className="flex space-x-4 min-w-max">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            <FaInfoCircle className="mr-2" /> Overview
          </TabButton>
          <TabButton active={activeTab === 'performance'} onClick={() => setActiveTab('performance')}>
            <FaChartBar className="mr-2" /> Performance
          </TabButton>
          <TabButton active={activeTab === 'incidents'} onClick={() => setActiveTab('incidents')}>
            <FaHistory className="mr-2" /> Incident History
          </TabButton>
        </nav>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <DailyStatusBar dailyStatus={dailyStatus} />
              <StatusSection title="Official Website" icon={<FaGlobe />} items={[
                { name: "GMTStudio", status: 100, host: "Vercel", uptime: "99.99%", responseTime: "120ms" }
              ]} />
              <StatusSection title="Mazs Artificial Intelligence" icon={<FaRobot />} items={[
                { name: "Mazs AI", status: 98, host: "Vercel", uptime: "99.95%", responseTime: "150ms" }
              ]} />
              <StatusSection title="Theta Social Media" icon={<FaUsers />} items={[
                { name: "Theta Social Media", status: 100, host: "Vercel", uptime: "99.98%", responseTime: "100ms" }
              ]} />
            </div>
          )}

          {activeTab === 'performance' && <PerformanceMetrics />}
          {activeTab === 'incidents' && <IncidentHistory />}
        </motion.div>
      </AnimatePresence>

      <MaintenanceSchedule />
    </div>
  );
};

interface StatusSectionProps {
  title: string;
  icon: React.ReactNode;
  items: StatusItemProps[];
}

interface StatusItemProps {
  name: string;
  status: number;
  host: string;
  uptime: string;
  responseTime: string;
}

const StatusSection: React.FC<StatusSectionProps> = ({ title, icon, items }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-50">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <StatusItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const StatusItem: React.FC<StatusItemProps> = ({ name, status, host, uptime, responseTime }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${status === 100 ? 'bg-green-500' : 'bg-yellow-500'} mr-3`}></div>
        <span className="font-medium">{name}</span>
      </div>
      <div className="text-gray-400 text-sm">
        <span className="mr-4">Host: {host}</span>
        <span className="mr-4">Uptime: {uptime}</span>
        <span>Response Time: {responseTime}</span>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
      active ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const PerformanceMetrics: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <FaChartBar className="mr-2" /> Performance Metrics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Average Response Time" value="135ms" change="-5%" />
        <MetricCard title="Requests per Minute" value="1,240" change="+3%" />
        <MetricCard title="Error Rate" value="0.02%" change="-0.01%" />
      </div>
      <ResponseTimeChart />
    </div>
  );
};

const MetricCard: React.FC<{ title: string; value: string; change: string }> = ({ title, value, change }) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-50">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`text-sm flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
        {change}
      </div>
    </div>
  );
};

const ResponseTimeChart: React.FC = () => {
  const data = {
    labels: ['1h ago', '45m ago', '30m ago', '15m ago', 'Now'],
    datasets: [
      {
        label: 'Response Time (ms)',
        data: [150, 140, 160, 130, 135],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-50">
      <h3 className="text-xl font-semibold mb-4">Response Time Trend</h3>
      <Line data={data} options={options} />
    </div>
  );
};

const IncidentHistory: React.FC = () => {
  const incidents = [
    { title: "API Latency Increase", status: "Resolved", date: "2023-04-15", details: "Increased latency in API responses due to database issues." },
    { title: "Website Downtime", status: "Resolved", date: "2023-03-28", details: "Complete outage of the main website due to server failure." },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaHistory className="mr-2" /> Incident History
      </h2>
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-50">
        {incidents.map((incident, index) => (
          <div key={index} className="py-4 border-b border-gray-700 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-lg">{incident.title}</div>
              <div className="bg-green-600 text-xs font-semibold px-2 py-1 rounded-full">
                {incident.status}
              </div>
            </div>
            <div className="text-sm text-gray-400 mb-2">{incident.date}</div>
            <div className="text-gray-300">{incident.details}</div>
            <button className="mt-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
              View full report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MaintenanceSchedule: React.FC = () => {
  const maintenanceEvents = [
    { date: '2023-05-01', time: '02:00 AM UTC', duration: '2 hours', description: 'Database optimization' },
    { date: '2023-05-15', time: '03:00 AM UTC', duration: '1 hour', description: 'Security updates' },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaCog className="mr-2" /> Upcoming Maintenance
      </h2>
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-50">
        {maintenanceEvents.map((event, index) => (
          <div key={index} className="py-4 border-b border-gray-700 last:border-b-0">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold">{event.date} at {event.time}</div>
              <div className="text-sm text-gray-400">Duration: {event.duration}</div>
            </div>
            <div className="text-gray-300">{event.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotificationsPanel: React.FC = () => {
  const notifications = [
    { id: 1, message: "Scheduled maintenance in 2 days", type: "info" },
    { id: 2, message: "API performance improved by 15%", type: "success" },
    { id: 3, message: "Minor latency issues resolved", type: "warning" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg backdrop-blur-lg bg-opacity-50"
    >
      <h3 className="text-xl font-semibold mb-3">Notifications</h3>
      {notifications.map((notification) => (
        <div key={notification.id} className={`p-2 mb-2 rounded ${
          notification.type === 'info' ? 'bg-blue-600' :
          notification.type === 'success' ? 'bg-green-600' :
          'bg-yellow-600'
        }`}>
          {notification.message}
        </div>
      ))}
    </motion.div>
  );
};

interface DailyStatusBarProps {
  dailyStatus: Record<string, ('operational' | 'partial' | 'major')[]>;
}

const DailyStatusBar: React.FC<DailyStatusBarProps> = ({ dailyStatus }) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg backdrop-blur-lg bg-opacity-50 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaCalendarAlt className="mr-2" /> Daily Status
      </h2>
      <div className="space-y-4">
        {Object.entries(dailyStatus).map(([project, statuses]) => (
          <div key={project} className="min-w-max">
            <h3 className="text-lg font-semibold mb-2">{project}</h3>
            <div className="flex">
              {statuses.map((status, index) => (
                <div key={index} className="flex-1 text-center" style={{ minWidth: '2rem' }}>
                  <div className={`w-4 h-4 sm:w-6 sm:h-6 mx-auto rounded-full ${
                    status === 'operational' ? 'bg-green-500' :
                    status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div className="text-xs mt-1">{days[index]}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;