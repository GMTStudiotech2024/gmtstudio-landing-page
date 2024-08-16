import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaHome, FaInfoCircle, FaLightbulb, FaBookmark, FaShare, FaCheck, FaTimes, FaQuestionCircle, FaSearch, FaStar, FaCertificate, FaUserGraduate, FaReact, FaNodeJs, FaPython, FaGitAlt,FaCode } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';

const tutorial = [
  {
    title: "Step 1: Introduction",
    content: "In this tutorial, you will learn how to design a website using AI tools like ChatGPT and Claude.",
    code: null
  },
  {
    title: "Step 2: Crafting Effective Prompts",
    content: `Crafting effective prompts is crucial when working with AI. Here's an example prompt:`,
    code: `You are a full-stack developer with extensive experience. Build a website using React JS, Tailwind CSS, and TypeScript. The website is a landing page for a project I created. Can you provide a step-by-step guide on how to make it, including the file structure for easy understanding?`
  },
  {
    title: "Step 3: Preparation Essentials",
    content: `You will need the following tools:`,
    code: `- Visual Studio Code
- Access to fresh water to stay hydrated
- A calm and focused mind
- Be ready to use keyboard shortcuts like Ctrl+A, Ctrl+C, and Ctrl+V`
  },
  {
    title: "Step 4: Handling Mistakes",
    content: `It's normal for AI to make mistakes. Here are some steps to address them:`,
    code: `- Use the VS Code extension called Cody to help with bugs and errors.
- Summon a Duck to assist you by using the Live Share extension for collaborative debugging.
- Always tell the AI to enhance and expand on its responses to achieve better results.`
  },
  {
    title: "Step 5: Conclusion",
    content: "Now you know the basics of designing a website using AI. Practice crafting effective prompts and using the tools mentioned to create your own projects.",
    code: null
  }
];

const courses = [

    {
      id: 'apic',
      title: 'APIC Fundamentals',
      icon: FaCode,
      color: 'text-purple-500',
      lessons: [
        {
          title: "Introduction to APIC",
          content: "APIC (Application Programming Interface Code) refers to the code that implements or interacts with APIs. It's crucial for integrating different software systems and services.",
          code: null
        },
        {
          title: "APIC Best Practices",
          content: "When working with APIC, follow these best practices: use clear naming conventions, implement proper error handling, and ensure secure authentication methods.",
          code: `// Example of a well-structured API endpoint
  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  });`
        },
        {
          title: "Mazs AI v1.0 anatra mini",
          content: "Here's an example of the Mazs AI v1.0 anatra mini code. Note that this is a simplified version and would need to be adapted for use in the current project.",
          code: `// Mazs AI v1.0 anatra mini
  class MazsAI {
    constructor() {
      this.intents = [
        {
          patterns: ['hello', 'hi', 'hey'],
          responses: ['Hello! How can I help you?', 'Hi there!']
        },
        // ... more intents ...
      ];
    }
  
    findIntent(input) {
      input = input.toLowerCase();
      for (let intent of this.intents) {
        if (intent.patterns.some(pattern => input.includes(pattern))) {
          return intent;
        }
      }
      return null;
    }
  
    generateResponse(input) {
      const intent = this.findIntent(input);
      if (intent) {
        return intent.responses[Math.floor(Math.random() * intent.responses.length)];
      }
      return "I'm not sure how to respond to that.";
    }
  }
  
  const ai = new MazsAI();
  console.log(ai.generateResponse("Hello there!"));`
        }
      ]
    },
  {
    id: 'html',
    title: 'HTML Basics',
    icon: FaHtml5,
    color: 'text-orange-500',
    lessons: [
      {
        title: "Introduction to HTML",
        content: "HTML (HyperText Markup Language) is the standard markup language for creating web pages.",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a paragraph.</p>
</body>
</html>`
      },
      {
        title: "HTML Elements and Tags",
        content: "Learn about various HTML elements and tags used to structure web content.",
        code: `<header>
  <h1>Website Title</h1>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h2>Article Title</h2>
    <p>Article content goes here...</p>
  </article>
</main>
<footer>
  <p>&copy; 2023 Your Website</p>
</footer>`
      },
      {
        title: "HTML Forms",
        content: "Create interactive forms to collect user input using HTML form elements.",
        code: `<form action="/submit" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="message">Message:</label>
  <textarea id="message" name="message" required></textarea>

  <button type="submit">Send</button>
</form>`
      }
    ]
  },
  {
    id: 'css',
    title: 'CSS Fundamentals',
    icon: FaCss3Alt,
    color: 'text-blue-500',
    lessons: [
      {
        title: "Getting Started with CSS",
        content: "CSS (Cascading Style Sheets) is used to style and layout web pages.",
        code: `body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
  text-align: center;
}

p {
  line-height: 1.6;
  margin-bottom: 15px;
}`
      },
      {
        title: "CSS Box Model",
        content: "Understanding the CSS box model and how it affects layout.",
        code: `.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 2px solid #333;
  margin: 10px;
}

.content-box {
  box-sizing: content-box;
}

.border-box {
  box-sizing: border-box;
}`
      },
      {
        title: "CSS Flexbox",
        content: "Learn how to create flexible layouts using CSS Flexbox.",
        code: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  flex: 1;
  padding: 20px;
  margin: 10px;
  background-color: #f0f0f0;
}`
      }
    ]
  },
  {
    id: 'javascript',
    title: 'JavaScript Essentials',
    icon: FaJs,
    color: 'text-yellow-500',
    lessons: [
      {
        title: "Introduction to JavaScript",
        content: "JavaScript is a programming language that enables interactive web pages.",
        code: `// Variables and basic operations
let name = 'John';
const age = 30;
console.log('Hello, ' + name + '! You are ' + age + ' years old.');

// Functions
function greet(person) {
  return 'Hello, ' + person + '!';
}

console.log(greet('Alice'));`
      },
      {
        title: "JavaScript Arrays and Objects",
        content: "Learn how to work with arrays and objects in JavaScript.",
        code: `// Arrays
let fruits = ['apple', 'banana', 'orange'];
fruits.push('grape');
console.log(fruits.length);

// Objects
let person = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'swimming'],
  greet: function() {
    console.log('Hello, my name is ' + this.name);
  }
};

person.greet();`
      },
      {
        title: "Asynchronous JavaScript",
        content: "Understanding asynchronous programming with Promises and async/await.",
        code: `function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched successfully');
    }, 2000);
  });
}

async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

getData();`
      }
    ]
  },
  {
    id: 'react',
    title: 'React Fundamentals',
    icon: FaReact,
    color: 'text-blue-400',
    lessons: [
      {
        title: "Introduction to React",
        content: "React is a popular JavaScript library for building user interfaces.",
        code: `import React from 'react';
import ReactDOM from 'react-dom';

function HelloWorld() {
  return <h1>Hello, World!</h1>;
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));`
      },
      {
        title: "React Components and Props",
        content: "Learn how to create and use React components with props.",
        code: `import React from 'react';

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}

export default App;`
      },
      {
        title: "React State and Hooks",
        content: "Managing component state using React Hooks.",
        code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;`
      }
    ]
  },
  {
    id: 'typescript',
    title: 'TypeScript Essentials',
    icon: SiTypescript,
    color: 'text-blue-700',
    lessons: [
      {
        title: "Getting Started with TypeScript",
        content: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
        code: `// Basic Types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];

// Function with types
function add(x: number, y: number): number {
  return x + y;
}`
      },
      {
        title: "TypeScript Interfaces and Classes",
        content: "Learn how to use interfaces and classes in TypeScript.",
        code: `interface Person {
  name: string;
  age: number;
}

class Employee implements Person {
  constructor(public name: string, public age: number, private department: string) {}

  introduce() {
    return \`Hi, I'm \${this.name}, \${this.age} years old, working in \${this.department}.\`;
  }
}

const john = new Employee("John", 30, "IT");
console.log(john.introduce());`
      },
      {
        title: "Generics in TypeScript",
        content: "Understanding and using generics for flexible and reusable code.",
        code: `function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
console.log(output);

interface GenericInterface<T> {
  (arg: T): T;
}

function identity2<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericInterface<number> = identity2;
console.log(myIdentity(123));`
      }
    ]
  },
  {
    id: 'nodejs',
    title: 'Node.js Basics',
    icon: FaNodeJs,
    color: 'text-green-600',
    lessons: [
      {
        title: "Introduction to Node.js",
        content: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
        code: `const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(\`Server running at http://\${hostname}:\${port}/\`);
});`
      },
      {
        title: "Node.js Modules and Packages",
        content: "Learn how to use and create Node.js modules and packages.",
        code: `// myModule.js
module.exports = {
  greet: function(name) {
    console.log('Hello, ' + name);
  }
};

// app.js
const myModule = require('./myModule');
myModule.greet('Alice');`
      },
      {
        title: "Express.js Basics",
        content: "Create a simple web server using Express.js.",
        code: `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}/\`);
});`
      }
    ]
  },
  {
    id: 'python',
    title: 'Python Programming',
    icon: FaPython,
    color: 'text-yellow-600',
    lessons: [
      {
        title: "Python Basics",
        content: "Python is a high-level, interpreted programming language known for its simplicity and readability.",
        code: `# Variables and data types
name = "John Doe"
age = 30
height = 1.75
is_student = True

# Basic operations
print(f"Hello, {name}!")
print(f"In 5 years, you will be {age + 5} years old.")

# Conditional statement
if is_student:
    print("Good luck with your studies!")
else:
    print("Hope you're enjoying your work!")`
      },
      {
        title: "Python Lists and Dictionaries",
        content: "Learn how to work with lists and dictionaries in Python.",
        code: `# Lists
fruits = ['apple', 'banana', 'orange']
fruits.append('grape')
print(len(fruits))

# Dictionaries
person = {
  'name': 'John',
  'age': 30,
  'hobbies': ['reading', 'swimming'],
  'greet': lambda: print('Hello, my name is ' + person['name'])
}

person['greet']()`
      },
      {
        title: "Python Functions and Modules",
        content: "Create and use functions and modules in Python.",
        code: `# my_module.py
def greet(name):
    print('Hello, ' + name)

# app.py
import my_module
my_module.greet('Alice')`
      }
    ]
  },
  {
    id: 'git',
    title: 'Git Version Control',
    icon: FaGitAlt,
    color: 'text-red-500',
    lessons: [
      {
        title: "Git Fundamentals",
        content: "Git is a distributed version control system for tracking changes in source code during software development.",
        code: `# Initialize a new Git repository
git init

# Add files to the staging area
git add .

# Commit changes
git commit -m "Initial commit"

# Create and switch to a new branch
git checkout -b feature-branch

# Push changes to a remote repository
git push origin feature-branch`
      },
      {
        title: "Git Branching and Merging",
        content: "Learn how to create, merge, and resolve conflicts in Git branches.",
        code: `# Create a new branch
git branch new-feature

# Switch to the new branch
git checkout new-feature

# Make changes and commit
git add .
git commit -m "Added new feature"

# Switch back to the main branch
git checkout main

# Merge the new feature branch
git merge new-feature

# Resolve merge conflicts (if any)
# ...

# Commit the merged changes
git commit -m "Merged new feature"`
      },
      {
        title: "Git Workflow and Best Practices",
        content: "Learn about common Git workflows and best practices for team collaboration.",
        code: `# Fetch the latest changes from the remote repository
git fetch origin

# Merge changes from the remote main branch
git merge origin/main

# Rebase your branch onto the latest main
git rebase origin/main

# Squash multiple commits into one
git rebase -i HEAD~3

# Stash changes temporarily
git stash

# Apply stashed changes
git stash apply`
      }
    ]
  }
];

const Learning: React.FC = () => {
  const [mode, setMode] = useState<'courses' | 'tutorial'>('courses');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bookmarkedSteps, setBookmarkedSteps] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [userProgress, setUserProgress] = useState({
    completedCourses: 0,
    totalPoints: 0,
    level: 'Beginner',
  });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const nextLesson = () => {
    if (currentLesson < selectedCourse.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (courses.indexOf(selectedCourse) < courses.length - 1) {
      setSelectedCourse(courses[courses.indexOf(selectedCourse) + 1]);
      setCurrentLesson(0);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (courses.indexOf(selectedCourse) > 0) {
      setSelectedCourse(courses[courses.indexOf(selectedCourse) - 1]);
      setCurrentLesson(courses[courses.indexOf(selectedCourse) - 1].lessons.length - 1);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleBookmark = (stepIndex: number) => {
    setBookmarkedSteps(prev => 
      prev.includes(stepIndex) ? prev.filter(i => i !== stepIndex) : [...prev, stepIndex]
    );
  };

  const shareStep = (stepIndex: number) => {
    const stepInfo = selectedCourse.lessons[stepIndex];
    const shareText = `Check out this step in the ${selectedCourse.title} tutorial: ${stepInfo.title}`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Step info copied to clipboard!');
    });
  };

  const updateUserProgress = (completedLessons: number) => {
    setUserProgress(prevProgress => ({
      ...prevProgress,
      completedCourses: Math.floor(completedLessons / courses.reduce((acc, course) => acc + course.lessons.length, 0) * courses.length),
      totalPoints: completedLessons * 10,
      level: completedLessons > 20 ? 'Advanced' : completedLessons > 10 ? 'Intermediate' : 'Beginner',
    }));
  };

  const markStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => {
      const newCompletedSteps = new Set(prev);
      newCompletedSteps.add(stepIndex);
      const completedLessons = Array.from(newCompletedSteps).length;
      updateUserProgress(completedLessons);
      return Array.from(newCompletedSteps);
    });
  };

  const handleQuizSubmit = () => {
    // Simple quiz logic - you can expand this based on your needs
    if (quizAnswer.toLowerCase().includes('effective prompts')) {
      setFeedback('Correct! Great job!');
      markStepComplete(currentLesson);
    } else {
      setFeedback('Not quite. Try again!');
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || filter === course.id)
  );

  const renderHeader = () => (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">CodeMaster</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-2 px-4 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Courses</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="typescript">TypeScript</option>
            <option value="nodejs">Node.js</option>
            <option value="python">Python</option>
            <option value="git">Git</option>
          </select>
          <div className="flex items-center space-x-2">
            <FaUserGraduate className="text-blue-500" />
            <span className="font-semibold">{userProgress.level}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">{userProgress.totalPoints} pts</span>
          </div>
        </div>
      </div>
    </header>
  );

  const renderCourseCard = (course: typeof courses[0]) => (
    <motion.div
      key={course.id}
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <course.icon className={`text-4xl ${course.color} mb-4`} />
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {course.lessons.length} lessons
        </p>
        <button
          onClick={() => {
            setSelectedCourse(course);
            setCurrentLesson(0);
            setMode('courses');
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Start Learning
        </button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {completedSteps.filter(step => 
              courses.findIndex(c => c.id === course.id) === Math.floor(step / course.lessons.length)
            ).length} / {course.lessons.length} completed
          </span>
          <FaCertificate className={`${
            completedSteps.filter(step => 
              courses.findIndex(c => c.id === course.id) === Math.floor(step / course.lessons.length)
            ).length === course.lessons.length ? 'text-green-500' : 'text-gray-400'
          }`} />
        </div>
      </div>
    </motion.div>
  );

  const renderCourseGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {filteredCourses.map(renderCourseCard)}
    </div>
  );

  const renderQuiz = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg"
    >
      <h3 className="text-2xl font-bold mb-4">Quick Quiz</h3>
      <p className="mb-4">What's the most important aspect of working with AI for web design?</p>
      <input
        type="text"
        value={quizAnswer}
        onChange={(e) => setQuizAnswer(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
        placeholder="Your answer..."
      />
      <button
        onClick={handleQuizSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
      {feedback && (
        <p className={`mt-4 ${feedback.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>
          {feedback}
        </p>
      )}
    </motion.div>
  );

  const renderCourseSelection = () => (
    <div className="flex justify-center space-x-4 mb-8">
      {courses.map((course) => (
        <motion.button
          key={course.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedCourse(course);
            setCurrentLesson(0);
          }}
          className={`px-4 py-2 rounded-lg flex items-center ${
            selectedCourse.id === course.id ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          <course.icon className={`mr-2 ${course.color}`} />
          {course.title}
        </motion.button>
      ))}
    </div>
  );

  const renderModeSelection = () => (
    <div className="flex justify-center space-x-4 mb-8 pt-20">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMode('courses')}
        className={`px-4 py-2 rounded-lg ${mode === 'courses' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
      >
        Courses
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMode('tutorial')}
        className={`px-4 py-2 rounded-lg ${mode === 'tutorial' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
      >
        AI Web Design Tutorial
      </motion.button>
    </div>
  );

  const renderContent = () => {
    if (mode === 'courses') {
      return (
        <>
          {renderCourseSelection()}
          <motion.div 
            className="flex justify-between items-center mb-12 space-x-4 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedCourse.lessons.map((lesson, index) => (
              <motion.div 
                key={index} 
                className="flex-1 relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentLesson(index)}
              >
                <motion.div 
                  className={`w-full h-3 rounded-full ${
                    completedSteps.includes(index) 
                      ? 'bg-green-500' 
                      : index <= currentLesson 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
                <motion.div 
                  className={`text-xs mt-2 absolute w-full text-center ${
                    completedSteps.includes(index) 
                      ? 'text-green-500' 
                      : index <= currentLesson 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {lesson.title}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLesson}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="mb-12 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl relative"
              ref={contentRef}
            >
              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleBookmark(currentLesson)}
                  className={`p-2 rounded-full ${bookmarkedSteps.includes(currentLesson) ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-700'}`}
                  data-tooltip-id="bookmark-tooltip"
                  data-tooltip-content={bookmarkedSteps.includes(currentLesson) ? "Remove bookmark" : "Bookmark this step"}
                >
                  <FaBookmark className="text-gray-800 dark:text-gray-200" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => shareStep(currentLesson)}
                  className="p-2 rounded-full bg-blue-500"
                  data-tooltip-id="share-tooltip"
                  data-tooltip-content="Share this step"
                >
                  <FaShare className="text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => markStepComplete(currentLesson)}
                  className={`p-2 rounded-full ${completedSteps.includes(currentLesson) ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                  data-tooltip-id="complete-tooltip"
                  data-tooltip-content={completedSteps.includes(currentLesson) ? "Mark as incomplete" : "Mark as complete"}
                >
                  {completedSteps.includes(currentLesson) ? <FaCheck className="text-white" /> : <FaTimes className="text-gray-800 dark:text-gray-200" />}
                </motion.button>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">{selectedCourse.lessons[currentLesson].title}</h2>
              <p className="text-xl mb-6 leading-relaxed">{selectedCourse.lessons[currentLesson].content}</p>
              {selectedCourse.lessons[currentLesson].code && (
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg text-left overflow-x-auto">
                    <code className="text-sm text-gray-800 dark:text-gray-200">{selectedCourse.lessons[currentLesson].code}</code>
                  </pre>
                  <button 
                    onClick={() => navigator.clipboard.writeText(selectedCourse.lessons[currentLesson].code || '')}
                    className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-md opacity-70 hover:opacity-100 transition-opacity"
                    data-tooltip-id="copy-tooltip"
                    data-tooltip-content="Copy code"
                  >
                    Copy
                  </button>
                </motion.div>
              )}
              {!showQuiz && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuiz(true)}
                  className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                  <FaQuestionCircle className="mr-2" /> Take a Quick Quiz
                </motion.button>
              )}
              <AnimatePresence>
                {showQuiz && renderQuiz()}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </>
      );
    } else {
      return (
        <>
          <motion.div 
            className="flex justify-between items-center mb-12 space-x-4 pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tutorial.map((step, index) => (
              <motion.div 
                key={index} 
                className="flex-1 relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentTutorialStep(index)}
              >
                <motion.div 
                  className={`w-full h-3 rounded-full ${
                    index <= currentTutorialStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
                <motion.div 
                  className={`text-xs mt-2 absolute w-full text-center ${
                    index <= currentTutorialStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {step.title}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTutorialStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="mb-12 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl relative"
              ref={contentRef}
            >
              <h2 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">{tutorial[currentTutorialStep].title}</h2>
              <p className="text-xl mb-6 leading-relaxed">{tutorial[currentTutorialStep].content}</p>
              {tutorial[currentTutorialStep].code && (
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg text-left overflow-x-auto">
                    <code className="text-sm text-gray-800 dark:text-gray-200">{tutorial[currentTutorialStep].code}</code>
                  </pre>
                  <button 
                    onClick={() => navigator.clipboard.writeText(tutorial[currentTutorialStep].code || '')}
                    className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-md opacity-70 hover:opacity-100 transition-opacity"
                    data-tooltip-id="copy-tooltip"
                    data-tooltip-content="Copy code"
                  >
                    Copy
                  </button>
                </motion.div>
              )}
              {!showQuiz && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuiz(true)}
                  className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                  <FaQuestionCircle className="mr-2" /> Take a Quick Quiz
                </motion.button>
              )}
              <AnimatePresence>
                {showQuiz && renderQuiz()}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </>
      );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {renderHeader()}
      <div className="max-w-6xl w-full mt-20">
        {renderModeSelection()}
        {mode === 'courses' && renderCourseGrid()}
        {renderContent()}
        <div className="flex justify-between mt-8">
          <motion.button
            onClick={prevLesson}
            disabled={mode === 'courses' ? currentLesson === 0 && courses.indexOf(selectedCourse) === 0 : currentTutorialStep === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft className="mr-2" /> Previous
          </motion.button>
          <motion.button
            onClick={nextLesson}
            disabled={mode === 'courses' ? currentLesson === selectedCourse.lessons.length - 1 && courses.indexOf(selectedCourse) === courses.length - 1 : currentTutorialStep === tutorial.length - 1}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next <FaChevronRight className="ml-2" />
          </motion.button>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link to="/" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
            <FaHome className="inline-block mr-2" />
            Home
          </Link>
          <Link to="/about" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
            <FaInfoCircle className="inline-block mr-2" />
            About
          </Link>
          <button
            onClick={toggleDarkMode}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
          >
            <FaLightbulb className="inline-block mr-2" />
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      <Tooltip id="bookmark-tooltip" />
      <Tooltip id="share-tooltip" />
      <Tooltip id="copy-tooltip" />
      <Tooltip id="complete-tooltip" />
    </div>
  );
};

export default Learning;