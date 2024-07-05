import React from 'react';
import './CEOIntroduction.css'; // Import custom styles

interface CEO {
  name: string;
  position: string;
  description: string;
  imageUrl: string;
  color: string; // Add color property
}

const ceos: CEO[] = [
  {
    name: 'Alston Chang',
    position: 'Chief Executive Officer',
    description: 'HI guys I am one of the creator of GMTStudio, my job is to arrange Meeting and Coding, they called me duck.',
    imageUrl: 'https://example.com/john.jpg', // Replace with actual image URLs
    color: 'bg-purple-400',
  },
  {
    name: 'Lucus Yeh',
    position: 'Chief Executive Officer',
    description: 'I am one of the creator of GMTStudio, I am one year older than Alston and Willy. My nickname is Leaves.',
    imageUrl: 'https://example.com/jane.jpg',
    color: 'bg-blue-400',
  },
  {
    name: 'Willy Lin',
    position: 'Chief Executive Officer',
    description: 'Hola, I am also one of the creators of GMTStudio, they called me Mu Mu Xiao, it is the Chinese version of Rowlet.',
    imageUrl: 'https://example.com/alex.jpg',
    color: 'bg-green-400',
  },
];

const CEOIntroduction: React.FC = () => {
  return (
    <div className="ceo-introduction">
      <h1 className="text-center text-4xl font-bold mb-8 pt-10 text-white">Meet Our Leadership Team</h1>
      <div className="flex flex-wrap justify-center space-x-0 md:space-x-8">
        {ceos.map((ceo, index) => (
          <div key={index} className={`relative overflow-hidden w-60 h-80 m-4 rounded-3xl cursor-pointer text-2xl font-bold ${ceo.color} ceo-card`}>
            <div className="z-10 absolute w-full h-full peer"></div>
            <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-purple-300 transition-all duration-500"></div>
            <div className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-purple-300 transition-all duration-500">
              <div className="p-2">
                <div className="font-bold">{ceo.name}</div>
                <div className="text-sm">{ceo.position}</div>
                <div className="text-xs">{ceo.description}</div>
              </div>
            </div>
            <div className="w-full h-full items-center justify-center flex uppercase text-white">{ceo.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CEOIntroduction;
