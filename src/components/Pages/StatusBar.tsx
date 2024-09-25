import React from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
interface ServiceStatus {
  name: string;
  status: 'operational' | 'partial' | 'major';
  icon: React.ElementType;
  description?: string; // Optional description for tooltips
}

interface StatusBarProps {
  services: ServiceStatus[];
}

const StatusBar: React.FC<StatusBarProps> = ({ services }) => {
  const getStatusIcon = (status: 'operational' | 'partial' | 'major') => {
    switch (status) {
      case 'operational':
        return <FaCheckCircle className="text-green-500" />;
      case 'partial':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'major':
        return <FaExclamationTriangle className="text-red-500" />;
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg p-4 mb-6 shadow-lg sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center mr-4 mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors duration-300"
            data-tip={service.description || `${service.name} is currently ${service.status}`}
          >
            <service.icon className="mr-2 text-gray-200" />
            <span className="mr-2">{service.name}:</span>
            {getStatusIcon(service.status)}
          </div>
        ))}
      </div>
      <Tooltip place="bottom" />
    </div>
  );
};

export default StatusBar;