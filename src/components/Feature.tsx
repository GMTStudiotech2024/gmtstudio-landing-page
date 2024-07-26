import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, AcademicCapIcon, LightBulbIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const eventsData = [
  {
    title: 'New Game Announce Event',
    date: 'February 01, 2025',
    description: 'The new game will be announced on February 1st 2025, which will be available to all players after the event.',
    icon: LightBulbIcon,
    color: 'bg-purple-100 dark:bg-purple-900',
    textColor: 'text-purple-600 dark:text-purple-300',
    location: 'Online Event',
    time: '2:00 PM EST',
  },
  {
    title: 'Yearly Developer Event',
    date: 'July 04, 2025',
    description: 'Yearly Developer event of GMTStudio will be held on July 4th, 2025',
    icon: AcademicCapIcon,
    color: 'bg-green-100 dark:bg-green-900',
    textColor: 'text-green-600 dark:text-green-300',
    location: 'Taipei, Taiwan',
    time: '12:00 AM EST',
  },
  {
    title: 'Application Event',
    date: 'To be confirmed',
    description: 'Announcing the Big Update for our Application',
    icon: CalendarIcon,
    color: 'bg-blue-100 dark:bg-blue-900',
    textColor: 'text-blue-600 dark:text-blue-300',
    location: 'To be announced',
    time: 'TBA',
  },
];

const eventVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const UpcomingEvents: React.FC = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  return (
    <section className="upcoming-events py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-6xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Upcoming Events
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event, index) => (
            <motion.div
              key={index}
              className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${event.color}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={eventVariants}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <event.icon className={`h-12 w-12 ${event.textColor}`} />
                  <span className={`text-sm font-semibold ${event.textColor}`}>{event.date}</span>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${event.textColor}`}>{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <button 
                    className={`mt-4 px-4 py-2 rounded-full ${event.textColor} border border-current hover:bg-opacity-10 hover:bg-current transition-colors duration-300`}
                    onClick={() => setExpandedEvent(expandedEvent === index ? null : index)}
                  >
                    {expandedEvent === index ? 'Less Info' : 'More Info'}
                  </button>
                  <ChevronDownIcon 
                    className={`h-6 w-6 ${event.textColor} transition-transform duration-300 ${expandedEvent === index ? 'transform rotate-180' : ''}`}
                  />
                </div>
                <AnimatePresence>
                  {expandedEvent === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-current"
                    >
                      <p className={`${event.textColor} font-semibold`}>Location: {event.location}</p>
                      <p className={`${event.textColor} font-semibold`}>Time: {event.time}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
