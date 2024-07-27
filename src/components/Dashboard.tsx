import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Bell,
  Home,
  Folder,
  Mail,
  Calendar,
  CheckSquare,
  BarChart,
  Clock,
  Terminal
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [projects, setProjects] = useState<ProjectProgress[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isTopBarExpanded, setIsTopBarExpanded] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [mailMessages, setMailMessages] = useState<{ subject: string, from: string }[]>([]);
  const [tasks, setTasks] = useState<{ id: number, text: string, completed: boolean }[]>([]);
  const [pomodoroTime, setPomodoroTime] = useState<number>(1500);
  const [pomodoroTimer, setPomodoroTimer] = useState<NodeJS.Timeout | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulating fetching notifications
    setNotifications([
      { id: 1, message: "Nothing is here ! ", time: "2 hours ago" },
      { id: 2, message: "UI Update", time: "2 days ago" },
      { id: 3, message: "Idea Update", time: "10 day ago" },
    ]);

    // Simulating fetching project progress
    setProjects([
      { name: "Story Vending Machine", progress: 1 },
      { name: "RPG Pixel Game Develop", progress: 10 },
      { name: "Code snippet", progress: 0 },
    ]);

    // Simulating fetching mail messages
    setMailMessages([
      { subject: "New Message", from: "user@example.com" },
      { subject: "Weekly Newsletter", from: "newsletter@example.com" },
      { subject: "Project Update", from: "team@example.com" },
    ]);

    // Simulating fetching tasks
    setTasks([
      { id: 1, text: "Complete project proposal", completed: false },
      { id: 2, text: "Review code changes", completed: false },
      { id: 3, text: "Update documentation", completed: false },
      { id: 4, text: "Schedule team meeting", completed: false },
    ]);

    // Simulating terminal output
    setTerminalOutput([
      "$ Welcome to GMT Studio OS Terminal",
      "$ Type 'help' for a list of commands",
    ]);
  }, []);

  const goToHome = useCallback(() => {
    setActiveSection('home');
    setOpenApp(null);
    expandTopBar();
  }, []);

  const openFiles = useCallback(() => {
    setActiveSection('files');
    setOpenApp('Files');
    expandTopBar();
  }, []);

  const openMail = useCallback(() => {
    setActiveSection('mail');
    setOpenApp('Mail');
    expandTopBar();
  }, []);

  const openCalendar = useCallback(() => {
    setActiveSection('calendar');
    setOpenApp('Calendar');
    expandTopBar();
  }, []);

  const openTasks = useCallback(() => {
    setActiveSection('tasks');
    setOpenApp('Tasks');
    expandTopBar();
  }, []);

  const openAnalytics = useCallback(() => {
    setActiveSection('analytics');
    setOpenApp('Analytics');
    expandTopBar();
  }, []);

  const openPomodoro = useCallback(() => {
    setActiveSection('pomodoro');
    setOpenApp('Pomodoro');
    expandTopBar();
  }, []);

  const openMazsAi = useCallback(() => {
    window.location.href = 'https://gmt-studio-ai-workspace.vercel.app/';
  }, []);

  const expandTopBar = useCallback(() => {
    setIsTopBarExpanded(true);
    setTimeout(() => {
      setIsTopBarExpanded(false);
    }, 1500);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    const timer = setTimeout(() => {
      setIsTopBarExpanded(true);
    }, 2000);
    setHoverTimer(timer);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    if (isTopBarExpanded) {
      setTimeout(() => {
        setIsTopBarExpanded(false);
      }, 1500);
    }
  }, [hoverTimer, isTopBarExpanded]);

  const handleTaskToggle = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handlePomodoroStart = () => {
    if (pomodoroTimer) return;
    const timer = setInterval(() => {
      setPomodoroTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setPomodoroTimer(null);
          return 1500;
        }
        return prevTime - 1;
      });
    }, 1000);
    setPomodoroTimer(timer);
  };

  const handlePomodoroStop = () => {
    if (pomodoroTimer) {
      clearInterval(pomodoroTimer);
      setPomodoroTimer(null);
    }
  };

  const handlePomodoroReset = () => {
    handlePomodoroStop();
    setPomodoroTime(1500);
  };

  const handleTerminalCommand = (command: string) => {
    setTerminalOutput([...terminalOutput, `$ ${command}`, `$ Command not found: ${command}`]);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white `}>
      {/* Top Bar with Dynamic Island Notch */}
      <div 
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 backdrop-blur-md z-50 transition-all duration-300 ease-in-out ${isTopBarExpanded ? 'w-96 h-24 rounded-3xl' : 'w-48 h-8 rounded-b-3xl'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-center items-center h-full px-4 relative">
          {isTopBarExpanded ? (
            <div className="text-white text-center">
              <div className="font-semibold text-lg mb-2">GMT Studio OS</div>
              <div>{openApp || currentTime.toLocaleTimeString()}</div>
            </div>
          ) : (
            <div className="text-white text-sm">
              {openApp || currentTime.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-12 px-8 py-8 ">
        {activeSection === 'home' ? (
          <>
            <h1 className="text-3xl font-semibold mb-6 mt-14">Welcome, Developer!</h1>
            
            {/* Widgets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Widget title="Projects" icon={<Folder />} content={
                <ul>
                  {projects.map((project, index) => (
                    <li key={index} className="mb-2">
                      <p className="font-medium">{project.name}</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              } />
              <Widget title="Notifications" icon={<Bell />} content={
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification.id} className="mb-2">
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </li>
                  ))}
                </ul>
              } />
              <Widget title="Team" icon={<Users />} content={
                <ul>
                  <li className="mb-2">Alston Chang - Development Team</li>
                  <li className="mb-2">Lucus Yeh - Database/Contact Team</li>
                  <li className="mb-2">Willy Lin - Design Team</li>
                </ul>
              } />
            </div>
          </>
        ) : (
          <div className="mt-14">
            <h2 className="text-2xl font-semibold mb-4">{openApp}</h2>
            {openApp === 'Files' && (
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <Folder className="mx-auto mb-2" />
                  <p>Documents</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <Folder className="mx-auto mb-2" />
                  <p>Projects</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                  <Folder className="mx-auto mb-2" />
                  <p>Downloads</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <Folder className="mx-auto mb-2" />
                  <p>Archives</p>
                </div>
              </div>
            )}
            {openApp === 'Mail' && (
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                {mailMessages.map((message, index) => (
                  <div key={index} className="mb-4 pb-2 border-b">
                    <p className="font-bold">{message.subject}</p>
                    <p className="text-sm text-gray-500">From: {message.from}</p>
                  </div>
                ))}
              </div>
            )}
            {openApp === 'Calendar' && (
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div className="grid grid-cols-7 gap-2 text-center">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="font-bold">{day}</div>
                  ))}
                  {Array.from({length: 31}, (_, i) => i + 1).map(date => (
                    <div key={date} className="p-2 border rounded-lg">{date}</div>
                  ))}
                </div>
              </div>
            )}
            {openApp === 'Tasks' && (
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <ul>
                  {tasks.map(task => (
                    <li key={task.id} className="flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        className="mr-2" 
                        checked={task.completed} 
                        onChange={() => handleTaskToggle(task.id)} 
                      />
                      <span>{task.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {openApp === 'Analytics' && (
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Project Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Task Completion Rate</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
              </div>
            )}
            {openApp === 'Pomodoro' && (
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-6xl font-bold mb-4">{`${Math.floor(pomodoroTime / 60)}:${String(pomodoroTime % 60).padStart(2, '0')}`}</div>
                <div className="flex justify-center space-x-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handlePomodoroStart}>Start</button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handlePomodoroStop}>Stop</button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handlePomodoroReset}>Reset</button>
                </div>
              </div>
            )}
            {openApp === 'Mazs Ai' && (
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
                <a href="https://gmt-studio-ai-workspace.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Go to Mazs Ai
                </a>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-2 flex space-x-4">
        <DockIcon icon={<Home />} label="Home" onClick={goToHome} active={activeSection === 'home'} />
        <DockIcon icon={<Folder />} label="Files" onClick={openFiles} active={activeSection === 'files'} />
        <DockIcon icon={<Mail />} label="Mail" onClick={openMail} active={activeSection === 'mail'} />
        <DockIcon icon={<Calendar />} label="Calendar" onClick={openCalendar} active={activeSection === 'calendar'} />
        <DockIcon icon={<CheckSquare />} label="Tasks" onClick={openTasks} active={activeSection === 'tasks'} />
        <DockIcon icon={<BarChart />} label="Analytics" onClick={openAnalytics} active={activeSection === 'analytics'} />
        <DockIcon icon={<Clock />} label="Pomodoro" onClick={openPomodoro} active={activeSection === 'pomodoro'} />
        <DockIcon icon={<Terminal />} label="Mazs Ai" onClick={openMazsAi} active={activeSection === 'mazsai'} />
      </div>
    </div>
  );
};

interface WidgetProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, icon, content }) => (
  <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
    <div className="flex items-center mb-4">
      <div className="mr-4 text-blue-500">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <div>{content}</div>
  </div>
);

interface DockIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}

const DockIcon: React.FC<DockIconProps> = ({ icon, label, onClick, active }) => (
  <div className="group relative">
    <button 
      className={`p-2 rounded-full ${active ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600'} hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-200 ease-in-out transform group-hover:scale-110`}
      onClick={onClick}
    >
      {icon}
    </button>
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
      {label}
    </span>
  </div>
);

export default Dashboard;
