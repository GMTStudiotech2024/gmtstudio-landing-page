import React from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'partial' | 'major';
  icon: React.ElementType;
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
    <div className="bg-gray-800 rounded-lg p-4 mb-6 shadow-lg">
      <div className="flex flex-wrap justify-between">
        {services.map((service, index) => (
          <div key={index} className="flex items-center mr-6 mb-2">
            <service.icon className="mr-2 text-gray-400" />
            <span className="mr-2">{service.name}:</span>
            {getStatusIcon(service.status)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;