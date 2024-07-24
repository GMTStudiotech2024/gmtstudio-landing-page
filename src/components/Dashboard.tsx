import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  X, 
  Home, 
  Users, 
  Settings, 
  LogOut,
  BarChart,
  PieChart,
  TrendingUp,
  DollarSign,
  Bell,
  Calendar,
  MessageSquare
} from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  time: string;
}

interface ProjectProgress {
  name: string;
  progress: number;
}

const Dashboard: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [projects, setProjects] = useState<ProjectProgress[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulating fetching notifications
    setNotifications([
      { id: 1, message: "New project assigned", time: "2 hours ago" },
      { id: 2, message: "Meeting scheduled for tomorrow", time: "5 hours ago" },
      { id: 3, message: "Deadline reminder: Story Vending Machine", time: "1 day ago" },
    ]);

    // Simulating fetching project progress
    setProjects([
      { name: "Story Vending Machine", progress: 1 },
      { name: "RPG Pixel Game Develop", progress: 10 },
      { name: "Code snippet", progress: 0 },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 mt-14">
      {/* Header */}
      <header className="bg-white shadow-sm ">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Bell size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                  {notifications.map((notification) => (
                    <a
                      key={notification.id}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/32" alt="User avatar" />
                <span className="hidden md:inline-block font-medium text-gray-700">Developer</span>
                <ChevronDown size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Welcome back, Developer!</h2>
          <p className="text-gray-600">{currentTime.toLocaleString()}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<TrendingUp className="h-6 w-6 text-white" />} title="Projects in Queue" value="5" color="bg-indigo-500" />
          <StatCard icon={<Users className="h-6 w-6 text-white" />} title="Current Coworkers" value="7" color="bg-green-500" />
          <StatCard icon={<BarChart className="h-6 w-6 text-white" />} title="Functional Websites" value="3" color="bg-pink-500" />
          <StatCard icon={<MessageSquare className="h-6 w-6 text-white" />} title="News/Blog Posts" value="10" color="bg-blue-500" />
        </div>

        {/* Project Progress */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {projects.map((project, index) => (
              <div key={index} className="px-4 py-5 sm:px-6 border-b border-gray-200 last:border-b-0">
                <h4 className="text-md font-medium text-gray-900 mb-2">{project.name}</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-sm text-gray-600">{project.progress}% Complete</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              <ActivityItem 
                name="Alston Chang" 
                email="GMTStudiotech@gmail.com" 
                title="Chief Executive Officer" 
                team="Development Team" 
                status="Active" 
                role="CEO" 
              />
              <ActivityItem 
                name="Lucus Yeh" 
                email="GMTStudiotech@gmail.com" 
                title="Chief Executive Officer" 
                team="Database/Contact Team" 
                status="Active" 
                role="CEO" 
              />
              <ActivityItem 
                name="Willy Lin" 
                email="GMTStudiotech@gmail.com" 
                title="Chief Executive Officer" 
                team="Design Team" 
                status="Active" 
                role="CEO" 
              />
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => (
  <div className={`${color} rounded-lg shadow-lg p-5 text-white`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm uppercase font-medium">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="rounded-full bg-white bg-opacity-30 p-3">
        {icon}
      </div>
    </div>
  </div>
);

interface ActivityItemProps {
  name: string;
  email: string;
  title: string;
  team: string;
  status: string;
  role: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ name, email, title, team, status, role }) => (
  <li className="px-6 py-4">
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/40" alt="" />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{email}</div>
      </div>
    </div>
    <div className="mt-2">
      <div className="text-sm text-gray-900">{title}</div>
      <div className="text-sm text-gray-500">{team}</div>
    </div>
    <div className="mt-2 flex items-center">
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {status}
      </span>
      <span className="ml-2 text-sm text-gray-500">{role}</span>
    </div>
  </li>
);

export default Dashboard;