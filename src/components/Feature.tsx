import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, AcademicCapIcon, LightBulbIcon, ChevronDownIcon, MapPinIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

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
    attendees: 5000,
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
    attendees: 1000,
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
    attendees: 'TBA',
  },
];

const eventVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const UpcomingEvents: React.FC = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  return (
    <section className="upcoming-events py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold mb-16 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Upcoming Events
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={eventVariants}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${event.color}`}>
                    <event.icon className={`h-6 w-6 ${event.textColor}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{event.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{event.description}</p>
                <motion.button 
                  className="w-full mt-4 px-4 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => setExpandedEvent(expandedEvent === index ? null : index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedEvent === index ? 'Less Info' : 'More Info'}
                </motion.button>
                <AnimatePresence>
                  {expandedEvent === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center mb-2">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <p className="text-gray-700 dark:text-gray-300">{event.location}</p>
                      </div>
                      <div className="flex items-center mb-2">
                        <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <p className="text-gray-700 dark:text-gray-300">{event.time}</p>
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <p className="text-gray-700 dark:text-gray-300">Expected Attendees: {event.attendees}</p>
                      </div>
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
