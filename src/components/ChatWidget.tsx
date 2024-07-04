import React, { useState, useRef, useEffect } from 'react';
import "../components/st.css"
const responses: { [key: string]: string } = {
  greeting: "Hello! How can I assist you today?",
  help: "Sure, I'm here to help! What do you need assistance with?",
  who_are_you: "I'm Mazs AI v0.1.5, your virtual assistant. How can I help you?",
  name: "I'm Mazs AI v0.1.5, your virtual assistant.",
  quiz_capitals: "Sure! Let's start a quiz. What is the capital of France?",
  python_script: "I can help you with Python scripts. For example, here's a script for sending daily email reports.",
  comfort_friend: "Here's a message to comfort a friend: 'I'm here for you, always.'",
  plan_relaxing_day: "To plan a relaxing day, start with a good breakfast, a walk in nature, and some meditation.",
  weather_today: "I'm not connected to the internet, but you can check your local weather forecast online.",
  tell_joke: "Why don't scientists trust atoms? Because they make up everything!",
  book_recommendation: "I recommend 'To Kill a Mockingbird' by Harper Lee. It's a classic!",
  favorite_movie: "One of my favorite movies is 'Inception' directed by Christopher Nolan.",
  news_update: "I'm not connected to the internet, but you can check the latest news on your preferred news website.",
  health_tip: "Remember to stay hydrated, exercise regularly, and get enough sleep.",
  motivational_quote: "Here's a motivational quote: 'The only way to do great work is to love what you do.' - Steve Jobs",
  programming_help: "I can assist with programming questions. What do you need help with?",
  math_problem: "Sure, I can help with math problems. What do you need assistance with?",
  translate: "I can help translate text. What do you need translated and into which language?",
  favorite_book: "One of my favorite books is '1984' by George Orwell.",
  time_management: "To manage your time effectively, prioritize tasks, set clear goals, and take breaks.",
  random_fact: "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.",
  technology_trend: "A current technology trend is the rise of artificial intelligence and machine learning in various industries.",
  history_question: "Sure, I can help with history questions. What do you need to know?",
  cooking_recipe: "I can help with recipes. What dish are you interested in cooking?",
  travel_recommendation: "I recommend visiting Kyoto, Japan. It's known for its beautiful temples, gardens, and traditional tea houses.",
  workout_routine: "For a balanced workout routine, include cardio, strength training, and flexibility exercises.",
  mental_health_tip: "Remember to take breaks, practice mindfulness, and seek support when needed.",
  productivity_tip: "To boost productivity, break tasks into smaller steps and take regular breaks.",
  fun_fact: "Fun fact: A group of flamingos is called a 'flamboyance'.",
  science_fact: "Science fact: The speed of light is approximately 299,792 kilometers per second.",
  space_fact: "Space fact: Jupiter is the largest planet in our solar system.",
  animal_fact: "Animal fact: An octopus has three hearts and blue blood.",
  geography_fact: "Geography fact: Australia is both a country and a continent.",
  music_recommendation: "I recommend listening to 'Bohemian Rhapsody' by Queen. It's a timeless classic.",
  art_recommendation: "I recommend looking into the works of Vincent van Gogh. 'Starry Night' is particularly famous.",
  movie_recommendation: "I recommend watching 'The Shawshank Redemption'. It's a great movie."
};

const patterns: { [key: string]: RegExp } = {
  greeting: /\b(hi|hello|hey|hola)\b/i,
  help: /\b(help|assist)\b/i,
  who_are_you: /\b(who are you|what are you|who is this)\b/i,
  name: /\b(your name|who are you|what are you called)\b/i,
  quiz_capitals: /\b(quiz me on world capitals|capitals quiz)\b/i,
  python_script: /\b(python script for daily email reports|help with python)\b/i,
  comfort_friend: /\b(message to comfort a friend|comforting message)\b/i,
  plan_relaxing_day: /\b(plan a relaxing day|relaxing day plan)\b/i,
  my_name_is: /\b(my name is (\w+))\b/i,
  weather_today: /\b(weather today|current weather)\b/i,
  tell_joke: /\b(tell me a joke|make me laugh)\b/i,
  book_recommendation: /\b(recommend me a book|book recommendation)\b/i,
  favorite_movie: /\b(favorite movie|movie you like)\b/i,
  news_update: /\b(latest news|news update)\b/i,
  health_tip: /\b(health tip|health advice)\b/i,
  motivational_quote: /\b(motivational quote|inspire me)\b/i,
  programming_help: /\b(programming help|code help|programming question)\b/i,
  math_problem: /\b(math problem|help with math|solve this math)\b/i,
  translate: /\b(translate|translation|translate this)\b/i,
  favorite_book: /\b(favorite book|book you like)\b/i,
  time_management: /\b(time management|manage time|time tips)\b/i,
  random_fact: /\b(random fact|tell me a fact|interesting fact)\b/i,
  technology_trend: /\b(technology trend|latest tech|tech update)\b/i,
  history_question: /\b(history question|ask about history|history fact)\b/i,
  cooking_recipe: /\b(cooking recipe|recipe for|how to cook)\b/i,
  travel_recommendation: /\b(travel recommendation|place to visit|travel tip)\b/i,
  workout_routine: /\b(workout routine|exercise plan|workout tips)\b/i,
  mental_health_tip: /\b(mental health tip|mental well-being|mental health advice)\b/i,
  productivity_tip: /\b(productivity tip|boost productivity|productivity advice)\b/i,
  fun_fact: /\b(fun fact|interesting fact|did you know)\b/i,
  science_fact: /\b(science fact|science information|science trivia)\b/i,
  space_fact: /\b(space fact|space information|space trivia)\b/i,
  animal_fact: /\b(animal fact|animal information|animal trivia)\b/i,
  geography_fact: /\b(geography fact|geography information|geography trivia)\b/i,
  music_recommendation: /\b(recommend me a song|music recommendation|song you like)\b/i,
  art_recommendation: /\b(recommend me art|art recommendation|art you like)\b/i,
  movie_recommendation: /\b(recommend me a movie|movie recommendation|movie you like)\b/i
};

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const newMessages = [...messages, { sender: 'user', text: inputValue }];
    setMessages(newMessages);
    setInputValue('');

    const response = getResponse(inputValue);
    if (response) {
      setMessages([...newMessages, { sender: 'bot', text: response }]);
    }
  };

  const getResponse = (input: string) => {
    for (const key in patterns) {
      if (patterns[key].test(input)) {
        return responses[key];
      }
    }
    return "I'm sorry, I didn't understand that. Can you please rephrase?";
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 max-w-md mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-col h-[400px]">
        <div className="px-4 py-3 border-b dark:border-zinc-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
              Mazs AI v0.1.5
            </h2>
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Online
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'bot' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`${
                  message.sender === 'bot'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-white'
                } px-4 py-2 rounded-lg max-w-xs`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="px-4 py-3 border-t dark:border-zinc-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
