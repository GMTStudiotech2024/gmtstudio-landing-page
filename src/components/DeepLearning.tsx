import React, { useState, useCallback, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaBrain, FaChartLine, FaCog, FaSmile, FaMeh, FaFrown, FaLightbulb, FaUpload, FaPlay, FaPause } from 'react-icons/fa';

class NeuralNetwork {
  layers: number[];
  weights: number[][][];
  biases: number[][];

  constructor(layers: number[]) {
    this.layers = layers;
    this.weights = [];
    this.biases = [];

    for (let i = 1; i < layers.length; i++) {
      this.weights.push(Array.from({ length: layers[i] }, () => 
        Array.from({ length: layers[i-1] }, () => Math.random() - 0.5)
      ));
      this.biases.push(Array.from({ length: layers[i] }, () => Math.random() - 0.5));
    }
  }

  forward(input: number[]): number[] {
    return this.weights.reduce((prevOutput, layerWeights, layerIndex) => {
      return layerWeights.map((neuronWeights, neuronIndex) => {
        const sum = neuronWeights.reduce((acc, weight, inputIndex) => 
          acc + weight * prevOutput[inputIndex], 0);
        return Math.tanh(sum + this.biases[layerIndex][neuronIndex]);
      });
    }, input);
  }

  train(input: number[], target: number[]): number {
    const output = this.forward(input);
    const error = target.map((t, i) => t - output[i]);
    const delta = error.map((e, i) => e * (1 - output[i] ** 2));

    for (let i = this.layers.length - 2; i >= 0; i--) {
      const layerWeights = this.weights[i];
      const layerBiases = this.biases[i];
      const layerOutput = i === 0 ? input : this.forward(input).slice(0, this.layers[i]);

      const layerDelta: number[] = i === this.layers.length - 2 ? delta : 
        layerWeights.map((neuronWeights) => 
          neuronWeights.reduce((sum: number, weight: number, inputIndex: number) => 
            sum + weight * delta[inputIndex], 0) * (1 - Math.pow(layerOutput[neuronWeights.indexOf(neuronWeights[0])], 2))
        );

      for (let j = 0; j < layerWeights.length; j++) {
        for (let k = 0; k < layerWeights[j].length; k++) {
          layerWeights[j][k] += 0.1 * layerDelta[j] * layerOutput[k];
        }
        layerBiases[j] += 0.1 * layerDelta[j];
      }
    }

    return error.reduce((sum, e) => sum + e ** 2, 0) / target.length;
  }
}

interface Intent {
  name: string;
  patterns: string[];
  responses: string[];
}

const intents: Intent[] = [
  {
    name: 'greeting',
    patterns: ['hi', 'hello', 'hey', 'greetings'],
    responses: ['Hello! How can I assist you with neural networks today?', 'Hi there! Ready to explore some AI concepts?']
  },
  {
    name: 'farewell',
    patterns: ['bye', 'goodbye', 'see you', 'farewell'],
    responses: ['Goodbye! Feel free to return if you have more questions.', 'See you later! Don\'t forget to practice what you\'ve learned.']
  },
  {
    name: 'thanks',
    patterns: ['thank you', 'thanks', 'appreciate it'],
    responses: ['You\'re welcome! I\'m glad I could help.', 'It\'s my pleasure to assist you in learning about neural networks.']
  },
  {
    name: 'neural_network_info',
    patterns: ['what is a neural network', 'explain neural network', 'how do neural networks work'],
    responses: ['A neural network is a computational model inspired by the human brain. It consists of interconnected nodes (neurons) that process and transmit information.', 'Neural networks are a type of machine learning algorithm that can learn patterns from data. They\'re used in various applications like image recognition and natural language processing.']
  },
  {
    name: 'training_info',
    patterns: ['how to train', 'explain training', 'what is network training'],
    responses: ['Training a neural network involves feeding it data and adjusting its internal parameters to minimize the difference between its predictions and the actual outcomes.', 'Network training is the process of teaching the neural network to recognize patterns in data. It usually involves many iterations of forward and backward passes through the network.']
  }
];

const sentimentWords = {
  positive: ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'happy', 'love', 'like', 'best'],
  negative: ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'dislike', 'poor', 'disappointing', 'unfortunate'],
  neutral: ['okay', 'fine', 'average', 'moderate', 'neutral', 'normal', 'standard', 'common', 'regular', 'typical']
};

const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;

  words.forEach(word => {
    if (sentimentWords.positive.includes(word)) score++;
    if (sentimentWords.negative.includes(word)) score--;
  });

  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
};

const recognizeIntent = (text: string): Intent | null => {
  const lowercaseText = text.toLowerCase();
  for (const intent of intents) {
    if (intent.patterns.some(pattern => lowercaseText.includes(pattern))) {
      return intent;
    }
  }
  return null;
};

interface TrainingExample {
  input: string;
  output: string;
}

function preprocessText(text: string): number[] {
  // Simple preprocessing: convert to lowercase and count character occurrences
  const lowercaseText = text.toLowerCase();
  const charCounts = new Array(26).fill(0);
  for (let char of lowercaseText) {
    const charCode = char.charCodeAt(0) - 97;
    if (charCode >= 0 && charCode < 26) {
      charCounts[charCode]++;
    }
  }
  return charCounts;
}

const DeepLearning: React.FC = () => {
  const [network, setNetwork] = useState<NeuralNetwork>(new NeuralNetwork([26, 10, 1]));
  const [trainingData, setTrainingData] = useState<[number, number, number][]>([]);
  const [nlTrainingData, setNLTrainingData] = useState<TrainingExample[]>([]);
  const [epochs, setEpochs] = useState<number>(0);
  const [loss, setLoss] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai', message: string, sentiment?: 'positive' | 'negative' | 'neutral' }[]>([]);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [datasetName, setDatasetName] = useState<string>('');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const trainNetwork = useCallback(() => {
    console.log("Training started");
    console.log("Training data:", trainingData);
    console.log("NL Training data:", nlTrainingData);

    if (trainingData.length === 0 && nlTrainingData.length === 0) {
      alert("Please add training data first!");
      return;
    }

    setIsTraining(true);
    setIsPaused(false);
    const newNetwork = new NeuralNetwork(nlTrainingData.length > 0 ? [26, 10, 1] : [2, 4, 1]);
    const newLoss: number[] = [];

    const runEpoch = (i: number) => {
      if (i >= 1000 || isPaused) {
        setIsTraining(false);
        console.log("Training finished or paused");
        return;
      }

      let epochLoss = 0;
      try {
        if (trainingData.length > 0) {
          trainingData.forEach(([x1, x2, y]) => {
            const input = [x1, x2];
            const target = [y];
            epochLoss += newNetwork.train(input, target);
          });
        } else if (nlTrainingData.length > 0) {
          nlTrainingData.forEach(({ input, output }) => {
            const processedInput = preprocessText(input);
            const target = [output === 'positive' ? 1 : 0];
            epochLoss += newNetwork.train(processedInput, target);
          });
        }
        
        const dataLength = trainingData.length || nlTrainingData.length;
        newLoss.push(epochLoss / dataLength);
        setEpochs(i + 1);
        setLoss([...newLoss]);
        setNetwork(newNetwork);

        console.log(`Epoch ${i + 1} completed. Loss: ${epochLoss / dataLength}`);

        requestAnimationFrame(() => runEpoch(i + 1));
      } catch (error) {
        console.error("Error during training:", error);
        setIsTraining(false);
      }
    };

    runEpoch(0);
  }, [trainingData, nlTrainingData, isPaused]);

  const handleUserInput = () => {
    if (userInput.trim() === '') return;

    const sentiment = analyzeSentiment(userInput);
    const intent = recognizeIntent(userInput);
    const newMessage = { type: 'user' as const, message: userInput, sentiment };
    setChatHistory(prev => [...prev, newMessage]);

    const [x1, x2] = userInput.split(',').map(Number);
    if (!isNaN(x1) && !isNaN(x2)) {
      const prediction = network.forward([x1, x2])[0];
      const aiMessage = { type: 'ai' as const, message: `Prediction: ${prediction.toFixed(4)}` };
      setChatHistory(prev => [...prev, aiMessage]);
    } else if (nlTrainingData.length > 0) {
      const processedInput = preprocessText(userInput);
      const prediction = network.forward(processedInput)[0];
      const sentiment = prediction > 0.5 ? 'positive' : 'negative';
      const aiMessage = { type: 'ai' as const, message: `Sentiment prediction: ${sentiment} (${prediction.toFixed(4)})` };
      setChatHistory(prev => [...prev, aiMessage]);
    } else if (intent) {
      const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
      const aiMessage = { type: 'ai' as const, message: response };
      setChatHistory(prev => [...prev, aiMessage]);
    } else {
      let aiMessage: { type: 'ai', message: string };
      if (sentiment === 'positive') {
        aiMessage = { type: 'ai' as const, message: "I'm glad you're feeling positive! If you'd like to use the neural network, please enter two numbers separated by a comma. Otherwise, feel free to ask me about neural networks!" };
      } else if (sentiment === 'negative') {
        aiMessage = { type: 'ai' as const, message: "I'm sorry you're feeling negative. Let's try to cheer you up! Would you like to learn more about neural networks or try a prediction?" };
      } else {
        aiMessage = { type: 'ai' as const, message: "If you'd like to use the neural network, please enter two numbers separated by a comma. You can also ask me questions about neural networks!" };
      }
      setChatHistory(prev => [...prev, aiMessage]);
    }

    setUserInput('');
  };

  const addTrainingData = () => {
    console.log("Adding training data:", userInput);
    const [x1, x2] = userInput.split(',').map(Number);
    if (!isNaN(x1) && !isNaN(x2)) {
      const y = x1 + x2 > 1 ? 1 : 0;  // Simple logic for demonstration
      setTrainingData(prev => {
        const newData: [number, number, number][] = [...prev, [x1, x2, y]];
        console.log("Updated training data:", newData);
        return newData;
      });
      const aiMessage = { type: 'ai' as const, message: `Added training data: [${x1}, ${x2}] -> ${y}` };
      setChatHistory(prev => [...prev, aiMessage]);
    } else {
      console.log("Invalid input for training data");
    }
    setUserInput('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const lines = content.split('\n').filter(line => line.trim() !== '');
        
        if (lines[0].includes(',')) {
          // Numeric dataset
          const newData: [number, number, number][] = lines.map(line => {
            const [x1, x2, y] = line.split(',').map(Number);
            return [x1, x2, y];
          }).filter((row): row is [number, number, number] => 
            row.length === 3 && row.every(val => !isNaN(val))
          );
          
          setTrainingData(newData);
          setNLTrainingData([]);
          console.log("Parsed numeric data:", newData);
        } else {
          // Natural language dataset
          const newData: TrainingExample[] = lines.map(line => {
            const [input, output] = line.split('\t');
            return { input: input.trim(), output: output.trim() };
          }).filter(example => example.input && example.output);
          
          setNLTrainingData(newData);
          setTrainingData([]);
          console.log("Parsed NL data:", newData);
        }
        
        setDatasetName(file.name);
        const aiMessage = { type: 'ai' as const, message: `Uploaded dataset: ${file.name} with ${lines.length} samples.` };
        setChatHistory(prev => [...prev, aiMessage]);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white pt-20">
        Mazs AI v1.0 anatra playground 
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaRobot className="mr-2" /> Chat with AI
          </h2>
          <div className="h-96 overflow-y-auto mb-4 bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <AnimatePresence>
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <span className={`inline-block p-2 rounded-lg ${
                    msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    {msg.type === 'user' ? (
                      <>
                        <FaUser className="inline mr-2" />
                        {msg.message}
                        {msg.sentiment && (
                          <span className="ml-2">
                            {msg.sentiment === 'positive' && <FaSmile className="inline text-yellow-400" />}
                            {msg.sentiment === 'negative' && <FaFrown className="inline text-red-400" />}
                            {msg.sentiment === 'neutral' && <FaMeh className="inline text-gray-400" />}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <FaRobot className="inline mr-2" />
                        {msg.message}
                      </>
                    )}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>
          <div className="flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
              className="flex-grow p-2 border rounded-l dark:bg-gray-700 dark:text-white"
              placeholder="Enter numbers for prediction or ask about neural networks"
            />
            <button
              onClick={handleUserInput}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
          <button
            onClick={addTrainingData}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full"
          >
            Add as Training Data
          </button>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaBrain className="mr-2" /> Network Training
          </h2>
          <p className="mb-4">Numeric Training Data: {trainingData.length} samples</p>
          <p className="mb-4">NL Training Data: {nlTrainingData.length} samples</p>
          <p className="mb-4">Dataset: {datasetName || 'No dataset uploaded'}</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".csv,.txt"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors w-full mb-2 flex items-center justify-center"
          >
            <FaUpload className="mr-2" /> Upload Dataset
          </button>
          <button
            onClick={() => {
              console.log("Training button clicked");
              isTraining ? setIsPaused(!isPaused) : trainNetwork();
            }}
            disabled={trainingData.length === 0 && nlTrainingData.length === 0}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full ${
              trainingData.length === 0 && nlTrainingData.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isTraining ? (isPaused ? <><FaPlay className="mr-2" /> Resume Training</> : <><FaPause className="mr-2" /> Pause Training</>) : <><FaPlay className="mr-2" /> Start Training</>}
          </button>
          <p className="mt-4">Epochs: {epochs}</p>
          <p>Latest Loss: {loss[loss.length - 1]?.toFixed(4) || 'N/A'}</p>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaChartLine className="mr-2" /> Training Progress
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={loss.map((value, index) => ({ epoch: index, loss: value }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loss" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCog className="mr-2" /> Network Configuration
          </h2>
          <p>Input Layer: 2 neurons</p>
          <p>Hidden Layer: 4 neurons</p>
          <p>Output Layer: 1 neuron</p>
          <p>Activation Function: Hyperbolic Tangent (tanh)</p>
          <button
            onClick={() => setShowTips(!showTips)}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors w-full flex items-center justify-center"
          >
            <FaLightbulb className="mr-2" /> {showTips ? 'Hide Tips' : 'Show Tips'}
          </button>
          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-yellow-100 dark:bg-yellow-900 p-4 rounded"
              >
                <ul className="list-disc pl-5">
                  <li>Enter two numbers between 0 and 1, separated by a comma (e.g., 0.3,0.7)</li>
                  <li>Add multiple data points before training for better results</li>
                  <li>The network predicts 1 if the sum of inputs is greater than 1, otherwise 0</li>
                  <li>Watch the loss decrease as the network learns</li>
                  <li>Try different input combinations to test the trained network</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default DeepLearning;