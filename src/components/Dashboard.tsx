import React, { useState, useEffect, useCallback } from 'react';
import {
  Bell,
  Home,
  Folder,
  Mail,
  Calendar,
  CheckSquare,
  BarChart,
  Clock,
  Terminal,
} from 'lucide-react';
import 'tailwindcss/tailwind.css';

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
    setNotifications([
      { id: 1, message: "Nothing is here ! ", time: "2 hours ago" },
      { id: 2, message: "UI Update", time: "2 days ago" },
      { id: 3, message: "Idea Update", time: "10 day ago" },
    ]);

    setProjects([
      { name: "Story Vending Machine", progress: 1 },
      { name: "RPG Pixel Game Develop", progress: 10 },
      { name: "Code snippet", progress: 0 },
      { name: "Mazs AI", progress: 20 },
    ]);

    setMailMessages([
      { subject: "New Message", from: "user@example.com" },
      { subject: "Weekly Newsletter", from: "newsletter@example.com" },
      { subject: "Project Update", from: "team@example.com" },
    ]);

    setTasks([
      { id: 1, text: "Complete project proposal", completed: false },
      { id: 2, text: "Review code changes", completed: false },
      { id: 3, text: "Update documentation", completed: false },
      { id: 4, text: "Schedule team meeting", completed: false },
    ]);

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
const openCodeEditor = useCallback(() => {
  setActiveSection('codeEditor');
  setOpenApp('Code Editor');
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
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white`}>
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
      <main className="pt-12 px-8 py-8">
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
                  {notifications.map(notification => (
                    <li key={notification.id} className="mb-2">
                      <p className="font-medium">{notification.message}</p>
                      <span className="text-gray-500 text-sm">{notification.time}</span>
                    </li>
                  ))}
                </ul>
              } />
              <Widget title="Mails" icon={<Mail />} content={
                <ul>
                  {mailMessages.map((mail, index) => (
                    <li key={index} className="mb-2">
                      <p className="font-medium">{mail.subject}</p>
                      <span className="text-gray-500 text-sm">From: {mail.from}</span>
                    </li>
                  ))}
                </ul>
              } />
            </div>
          </>
        ) : activeSection === 'files' ? (
          <div className="space-y-4 mt-14">
            <h2 className="text-2xl font-semibold">Files</h2>
            <p>Here you can manage your files.</p>
          </div>
        ) : activeSection === 'mail' ? (
          <div className="space-y-4 mt-14">
            <h2 className="text-2xl font-semibold">Mail</h2>
            <ul>
              {mailMessages.map((mail, index) => (
                <li key={index} className="mb-2">
                  <p className="font-medium">{mail.subject}</p>
                  <span className="text-gray-500 text-sm">From: {mail.from}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : activeSection === 'calendar' ? (
          <div className="space-y-4 mt-14">
            <h2 className="text-2xl font-semibold">Calendar</h2>
            <p>Here you can manage your calendar.</p>
          </div>
        ) : activeSection === 'tasks' ? (
          <div className="space-y-4 mt-14">
            <h2 className="text-2xl font-semibold">Tasks</h2>
            <ul>
              {tasks.map(task => (
                <li key={task.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskToggle(task.id)}
                    className="mr-2"
                  />
                  <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : activeSection === 'analytics' ? (
          <div className="space-y-4 mt-14">
            <h2 className="text-2xl font-semibold">Analytics</h2>
            <p>Here you can view your analytics.</p>
          </div>
        ) : activeSection === 'pomodoro' ? (
          <div className="space-y-4 mt-14">
            <h2 className="text-2xl font-semibold">Pomodoro Timer</h2>
            <div className="text-center">
              <div className="text-4xl font-semibold mb-4">{Math.floor(pomodoroTime / 60)}:{pomodoroTime % 60 < 10 ? `0${pomodoroTime % 60}` : pomodoroTime % 60}</div>
              <div className="space-x-2">
                <button onClick={handlePomodoroStart} className="px-4 py-2 bg-green-500 text-white rounded">Start</button>
                <button onClick={handlePomodoroStop} className="px-4 py-2 bg-red-500 text-white rounded">Stop</button>
                <button onClick={handlePomodoroReset} className="px-4 py-2 bg-yellow-500 text-white rounded">Reset</button>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 p-2 bg-gray-200 dark:bg-gray-700 bg-opacity-50 backdrop-blur-md rounded-xl">
        <DockIcon icon={<Home />} onClick={goToHome} />
        <DockIcon icon={<Folder />} onClick={openFiles} />
        <DockIcon icon={<Mail />} onClick={openMail} />
        <DockIcon icon={<Calendar />} onClick={openCalendar} />
        <DockIcon icon={<CheckSquare />} onClick={openTasks} />
        <DockIcon icon={<BarChart />} onClick={openAnalytics} />
        <DockIcon icon={<Clock />} onClick={openPomodoro} />
        <DockIcon icon={<Terminal />} onClick={openMazsAi} />
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full"
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

interface WidgetProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, icon, content }) => (
  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <div className="text-gray-700 dark:text-gray-200 mr-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
    </div>
    <div>{content}</div>
  </div>
);

interface DockIconProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({ icon, onClick }) => (
  <button onClick={onClick} className="bg-gray-300 dark:bg-gray-600 p-2 rounded-full shadow-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200">
    {icon}
  </button>
);

export default Dashboard;
