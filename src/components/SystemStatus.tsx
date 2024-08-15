import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaGlobe, FaMusic, FaDiscord } from 'react-icons/fa';
import Logo from '../assets/images/npc.png';

const SystemStatus: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-20">
      <header className="flex items-center mb-8">
        <img src={Logo} alt="GMTStudio" className="w-12 h-12 mr-4" />
        <h1 className="text-3xl font-bold">GMTStudio</h1>
      </header>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-3 text-2xl" />
            <h2 className="text-2xl font-semibold">All Systems Operational</h2>
          </div>
          <div className="text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
        <p className="mt-4 text-gray-400 text-lg">
          This is the status of the GMTStudio official website and related services.
        </p>
        <div className="mt-6 flex space-x-4">
          <a href="https://gmt-studio-ai-workspace.vercel.app/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            🌐 Visit Official Website
          </a>
          <a href="#" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            📊 View Incident History
          </a>
        </div>
      </div>

      <div className="space-y-8">
        <StatusSection title="Official Website" items={[
          { name: "GMTStudio", status: 100, host: "Vercel", uptime: "99.99%", responseTime: "120ms" }
        ]} />

        <StatusSection title="Mazs Artificial Intelligence" items={[
          { name: "Mazs AI", status: 98, host: "Vercel", uptime: "99.95%", responseTime: "150ms" }
        ]} />

        <StatusSection title="Theta Social Media" items={[
          { name: "Theta Social Media", status: 100, host: "Vercel", uptime: "99.98%", responseTime: "100ms" }
        ]} />
      </div>
    </div>
  );
};

interface StatusItemProps {
  name: string;
  status: number;
  host?: string;
  certExpiry?: number;
  details?: string;
  uptime?: string;
  responseTime?: string;
}

const StatusSection: React.FC<{ title: string; items: StatusItemProps[] }> = ({ title, items }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {items.map((item, index) => (
        <StatusItem key={index} {...item} />
      ))}
    </div>
  );
};

const StatusItem: React.FC<StatusItemProps> = ({ name, status, host, certExpiry, details, uptime, responseTime }) => {
  const getStatusIcon = () => {
    switch (name) {
      case 'Official Website':
        return <FaGlobe />;
      case 'Mazs AI ':
        return <FaMusic />;
      case 'Theta Social media':
        return <FaDiscord />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 98) return 'bg-green-500';
    if (status >= 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className={`${getStatusColor(status)} w-3 h-3 rounded-full mr-2`}></span>
          <span className="font-semibold text-lg">{name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`${getStatusColor(status)} text-sm font-semibold px-2 py-1 rounded-full`}>
            {status}%
          </span>
          {host && (
            <span className="bg-purple-600 text-xs font-semibold px-2 py-1 rounded-full">
              {host}
            </span>
          )}
          {certExpiry && (
            <span className="bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
              Cert Exp: {certExpiry}d
            </span>
          )}
        </div>
      </div>
      <DailyStatusBlocks status={status} />
    </div>
  );
};

const DailyStatusBlocks: React.FC<{ status: number }> = ({ status }) => {
  const [blocks, setBlocks] = useState<string[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateBlocks = () => {
      const newBlocks = [...Array(50)].map(() => {
        const random = Math.random() * 100;
        if (random < 95) return 'normal';
        return 'error';
      });
      setBlocks(newBlocks);
      setLastUpdateTime(new Date());
    };

    generateBlocks();
    const interval = setInterval(generateBlocks, 3600000);
    return () => clearInterval(interval);
  }, []);

  const getBlockColor = (state: string) => {
    switch (state) {
      case 'normal': return 'bg-green-400';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const handleMouseEnter = (e: React.MouseEvent, state: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipContent(state.charAt(0).toUpperCase() + state.slice(1));
    setTooltipPosition({ x: rect.left, y: rect.bottom + window.scrollY });
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
  };

  const getTimeDifference = () => {
    const diff = new Date().getTime() - lastUpdateTime.getTime();
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  };

  return (
    <div className="mt-4 relative">
      <div className="flex items-center space-x-2">
        <div className="w-full bg-gray-900 h-5 rounded-sm overflow-hidden flex">
          {blocks.map((block, index) => (
            <div
              key={index}
              className={`inline-block w-[2%] h-full ${getBlockColor(block)} border-r border-gray-900 cursor-pointer transition-all duration-200 hover:opacity-80`}
              onMouseEnter={(e) => handleMouseEnter(e, block)}
              onMouseLeave={handleMouseLeave}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-1">
        <div className="text-xs text-gray-400">
          {getTimeDifference()}
        </div>
        <div className="text-xs text-gray-400">
          now
        </div>
      </div>
      {tooltipContent && (
        <div
          className="absolute bg-gray-800 text-white px-2 py-1 rounded text-xs z-10 pointer-events-none"
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default SystemStatus;