import React, { useState } from 'react';
import './CEOIntroduction.css';

interface CEO {
  name: string;
  position: string;
  description: string;
  imageUrl: string;
  color: string;
  skills: string[];
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const ceos: CEO[] = [
  {
    name: 'Alston Chang',
    position: 'Chief Executive Officer',
    description: 'HI guys I am one of the creator of GMTStudio, my job is to arrange Meeting and Coding, they called me duck.',
    imageUrl: 'https://example.com/alston.jpg',
    color: 'bg-purple-400',
    skills: ['Leadership', 'Project Management', 'Coding'],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/alston-chang',
      twitter: 'https://twitter.com/alston_chang',
      github: 'https://github.com/alston-chang',
    },
  },
  {
    name: 'Lucus Yeh',
    position: 'Chief Executive Officer',
    description: 'I am one of the creator of GMTStudio, I am one year older than Alston and Willy. My nickname is Leaves.',
    imageUrl: 'https://example.com/lucus.jpg',
    color: 'bg-blue-400',
    skills: ['Strategy', 'Business Development', 'Marketing'],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/lucus-yeh',
      twitter: 'https://twitter.com/lucus_yeh',
    },
  },
  {
    name: 'Willy Lin',
    position: 'Chief Executive Officer',
    description: 'Hola, I am also one of the creators of GMTStudio, they called me Mu Mu Xiao, it is the Chinese version of Rowlet.',
    imageUrl: 'https://example.com/willy.jpg',
    color: 'bg-green-400',
    skills: ['Innovation', 'Product Development', 'Team Building'],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/willy-lin',
      github: 'https://github.com/willy-lin',
    },
  },
];

const CEOIntroduction: React.FC = () => {
  const [selectedCEO, setSelectedCEO] = useState<CEO | null>(null);

  return (
    <div className="ceo-introduction">
      <h1 className="text-center text-5xl font-bold mb-8 pt-10 text-white">Meet Our Leadership Team</h1>
      <div className="flex flex-wrap justify-center space-x-0 md:space-x-8">
        {ceos.map((ceo, index) => (
          <div
            key={index}
            className={`relative overflow-hidden w-72 h-96 m-4 rounded-3xl cursor-pointer text-2xl font-bold ${ceo.color} ceo-card`}
            onClick={() => setSelectedCEO(ceo)}
          >
            <div className="z-10 absolute w-full h-full peer"></div>
            <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-opacity-30 bg-white transition-all duration-500"></div>
            <div className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-opacity-30 bg-white transition-all duration-500">
              <div className="p-4">
                <div className="font-bold">{ceo.name}</div>
                <div className="text-sm">{ceo.position}</div>
                <div className="text-xs mt-2">{ceo.description}</div>
              </div>
            </div>
            <div className="w-full h-full items-center justify-center flex flex-col uppercase text-white">
              <img src={ceo.imageUrl} alt={ceo.name} className="w-32 h-32 rounded-full mb-4 object-cover" />
              {ceo.name}
            </div>
          </div>
        ))}
      </div>
      {selectedCEO && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg p-8 max-w-2xl w-full ${selectedCEO.color}`}>
            <button
              className="float-right text-2xl font-bold"
              onClick={() => setSelectedCEO(null)}
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4">{selectedCEO.name}</h2>
            <p className="text-xl mb-2">{selectedCEO.position}</p>
            <p className="mb-4">{selectedCEO.description}</p>
            <h3 className="text-xl font-bold mb-2">Skills:</h3>
            <ul className="list-disc list-inside mb-4">
              {selectedCEO.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <div className="flex space-x-4">
              {selectedCEO.socialMedia.linkedin && (
                <a href={selectedCEO.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  LinkedIn
                </a>
              )}
              {selectedCEO.socialMedia.twitter && (
                <a href={selectedCEO.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                  Twitter
                </a>
              )}
              {selectedCEO.socialMedia.github && (
                <a href={selectedCEO.socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CEOIntroduction;