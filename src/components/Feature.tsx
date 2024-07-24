// src/components/UpcomingEvents.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, AcademicCapIcon, LightBulbIcon } from '@heroicons/react/24/outline'; // Importing icons from Heroicons

const eventsData = [
  {
    title: 'New Game Announce Event',
    date: 'February 01, 2025',
    description: 'The new game will be announce on February 1st 2025, which will be availble to all the players after event announcing date',
    icon: LightBulbIcon, // Assigning an icon to each event
    link: '',
  },
  {
    title: 'Yearly Developer Event',
    date: 'July 04, 2025',
    description: 'Yearly Developer of GMTStudio will be held on July 4th, 2025',
    icon: AcademicCapIcon,
    link: '',
  },
  {
    title: 'Application Event',
    date: 'to be confirmed',
    description: 'Announcing the Big Update for our Application',
    icon: CalendarIcon,
    link: '',
  },
];

const eventVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const UpcomingEvents: React.FC = () => {
  return (
    <section className="upcoming-events py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">Upcoming Events</h2>
        <div className="flex flex-wrap -mx-4">
          {eventsData.map((event, index) => (
            <motion.div
              key={index}
              className="w-full md:w-1/3 px-4 mb-8 md:mb-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={eventVariants}
            >
              <div className="event-item bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="icon mb-4 flex justify-center">
                  <event.icon className="h-12 w-12 text-blue-500 dark:text-blue-300" /> {/* Icon displayed */}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{event.date}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                <a href={event.link} className="text-blue-500 dark:text-blue-400 hover:underline">
                  Not avialable Yet
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
