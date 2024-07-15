import React from 'react';

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

const SocialIcon: React.FC<{ type: 'linkedin' | 'twitter' | 'github', url: string }> = ({ type, url }) => {
  const iconPath = {
    linkedin: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z",
    twitter: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d={iconPath[type]} />
      </svg>
    </a>
  );
};

const CEOCard: React.FC<{ ceo: CEO }> = ({ ceo }) => {
  return (
    <div className={`w-full sm:w-96 rounded-lg overflow-hidden shadow-lg ${ceo.color} text-white`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-center mb-4">
          <img className="w-24 h-24 rounded-full object-cover" src={ceo.imageUrl} alt={ceo.name} />
        </div>
        <div className="font-bold text-xl mb-2 text-center">{ceo.name}</div>
        <p className="text-gray-200 text-base text-center mb-4">{ceo.position}</p>
        <p className="text-white text-sm mb-4">{ceo.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {ceo.skills.map((skill, index) => (
            <span key={index} className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-center space-x-4">
        {ceo.socialMedia.linkedin && <SocialIcon type="linkedin" url={ceo.socialMedia.linkedin} />}
        {ceo.socialMedia.twitter && <SocialIcon type="twitter" url={ceo.socialMedia.twitter} />}
        {ceo.socialMedia.github && <SocialIcon type="github" url={ceo.socialMedia.github} />}
      </div>
    </div>
  );
};

const CEOIntroduction: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Meet Our Leadership Team</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {ceos.map((ceo, index) => (
          <CEOCard key={index} ceo={ceo} />
        ))}
      </div>
    </div>
  );
};

export default CEOIntroduction;