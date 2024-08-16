interface Intent {
  patterns: string[];
  responses: string[];
}

class MultilayerPerceptron {
  private layers: number[];
  private weights: number[][][];
  private biases: number[][];

  constructor(layers: number[]) {
    this.layers = layers;
    this.weights = [];
    this.biases = [];

    for (let i = 1; i < layers.length; i++) {
      this.weights.push(Array(layers[i]).fill(0).map(() => 
        Array(layers[i-1]).fill(0).map(() => Math.random() - 0.5)
      ));
      this.biases.push(Array(layers[i]).fill(0).map(() => Math.random() - 0.5));
    }
  }

  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  private sigmoidDerivative(x: number): number {
    return x * (1 - x);
  }

  predict(input: number[]): number[] {
    let activation = input;
    for (let i = 0; i < this.weights.length; i++) {
      const currentActivation = activation; // Create a local copy
      let newActivation = [];
      for (let j = 0; j < this.weights[i].length; j++) {
        const sum = this.weights[i][j].reduce((sum, weight, k) => sum + weight * currentActivation[k], 0) + this.biases[i][j];
        newActivation.push(this.sigmoid(sum));
      }
      activation = newActivation;
    }
    return activation;
  }

  train(input: number[], target: number[], learningRate: number = 0.1) {
    // Forward pass
    let activations = [input];
    let weightedSums = [];

    for (let i = 0; i < this.weights.length; i++) {
      let newActivation = [];
      let newWeightedSum = [];
      for (let j = 0; j < this.weights[i].length; j++) {
        const sum = this.weights[i][j].reduce((sum, weight, k) => sum + weight * activations[i][k], 0) + this.biases[i][j];
        newWeightedSum.push(sum);
        newActivation.push(this.sigmoid(sum));
      }
      weightedSums.push(newWeightedSum);
      activations.push(newActivation);
    }

    // Backward pass
    let deltas = [activations[activations.length - 1].map((output, i) => 
      (output - target[i]) * this.sigmoidDerivative(output)
    )];

    for (let i = this.weights.length - 1; i > 0; i--) {
      let layerDelta = [];
      for (let j = 0; j < this.weights[i-1].length; j++) {
        const error = this.weights[i].reduce((sum, neuronWeights, k) => sum + neuronWeights[j] * deltas[0][k], 0);
        layerDelta.push(error * this.sigmoidDerivative(activations[i][j]));
      }
      deltas.unshift(layerDelta);
    }

    // Update weights and biases
    for (let i = 0; i < this.weights.length; i++) {
      for (let j = 0; j < this.weights[i].length; j++) {
        for (let k = 0; k < this.weights[i][j].length; k++) {
          this.weights[i][j][k] -= learningRate * deltas[i][j] * activations[i][k];
        }
        this.biases[i][j] -= learningRate * deltas[i][j];
      }
    }
  }
}

const intents: Intent[] = [
  {
    patterns: ['hello', 'hi', 'hey'],
    responses: ['Hello! How can I help you today?', 'Hi there! What can I do for you?'],
  },
  {
    patterns: ['bye', 'goodbye', 'see you'],
    responses: ['Goodbye! Have a great day!', 'See you later! Take care!'],
  },
  {
    patterns: ['what is gmtstudio', 'tell me about gmtstudio'],
    responses: ['GMTStudio is a platform that offers various services, including an AI WorkSpace and a social media platform called Theta.'],
  },
  {
    patterns: ['what is mazs', 'tell me about mazs'],
    responses: ['Mazs is a platform that offers various services, including an AI WorkSpace and a social media platform called Theta.'],
  },
  {
    patterns: ['what services does gmtstudio offer', 'gmtstudio services'],
    responses: ['GMTStudio offers a range of services including an AI WorkSpace for advanced AI development and a social media platform called Theta.'],
  },
  {
    patterns: ['tell me about theta', 'what is theta platform'],
    responses: ['Theta is a social media platform developed by GMTStudio. It offers unique features for connecting and sharing content with others.'],
  },
  {
    patterns: ['how can I use the AI WorkSpace', 'AI WorkSpace features'],
    responses: ['The AI WorkSpace is a powerful tool for AI development. You can use it to train models, run experiments, and collaborate on AI projects.'],
  },
  {
    patterns: ['who created gmtstudio', 'gmtstudio founders'],
    responses: ['GMTStudio was created by a team of innovative developers and AI enthusiasts. The exact founders are not publicly disclosed.'],
  },
  {
    patterns: ['is gmtstudio free', 'gmtstudio pricing'],
    responses: ['GMTStudio offers both free and premium services. Some features are available for free, while others may require a subscription.'],
  },
  {
    patterns: ['how to get started with gmtstudio', 'gmtstudio for beginners'],
    responses: ['To get started with GMTStudio, you can sign up on our website. We offer tutorials and documentation to help beginners get acquainted with our services.'],
  },
  {
    patterns: ['what are the features of theta', 'theta platform features'],
    responses: ["Theta offers features like personalized content feeds, secure messaging, and community groups. It's designed to provide a unique social experience."],
  },
  {
    patterns: ['how secure is gmtstudio', 'gmtstudio security'],
    responses: ['GMTStudio takes security seriously. We use encryption, regular security audits, and follow best practices to protect user data and privacy.'],
  },
  {
    patterns: ['can I develop my own AI models', 'custom AI development'],
    responses: ["Yes, GMTStudio's AI WorkSpace allows you to develop and train custom AI models. You can use various tools and frameworks for your AI projects."],
  },
  {
    patterns: ['what programming languages are supported', 'coding languages in gmtstudio'],
    responses: ["GMTStudio supports multiple programming languages including Python, JavaScript, and R for AI development. The specific languages may vary based on the service you're using."],
  },
  {
    patterns: ['is there a mobile app', 'gmtstudio on mobile'],
    responses: ['Yes, GMTStudio offers mobile apps for both iOS and Android, allowing you to access certain features on the go. The Theta platform is fully mobile-compatible.'],
  },
];

const network = new MultilayerPerceptron([10, 16, 8, intents.length]);

function trainNetwork() {
  const epochs = 2500;
  const learningRate = 0.1;

  for (let epoch = 0; epoch < epochs; epoch++) {
    let totalLoss = 0;

    intents.forEach((intent, intentIndex) => {
      intent.patterns.forEach(pattern => {
        const input = encodeInput(pattern);
        const target = Array(intents.length).fill(0);
        target[intentIndex] = 1;

        network.train(input, target, learningRate);

        const prediction = network.predict(input);
        totalLoss += prediction.reduce((sum, output, i) => sum + Math.pow(output - target[i], 2), 0);
      });
    });

    if (epoch % 100 === 0) {
      console.log(`Epoch ${epoch}, Loss: ${totalLoss}`);
    }
  }
}

function encodeInput(query: string): number[] {
  const words = query.toLowerCase().split(/\s+/);
  const wordSet = new Set(words);
  return intents.map(intent => 
    intent.patterns.some(pattern => 
      pattern.split(/\s+/).some(word => wordSet.has(word))
    ) ? 1 : 0
  );
}

// Simple sentiment analysis
function analyzeSentiment(text: string): number {
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'happy', 'pleased'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'disappointing', 'sad', 'unhappy', 'angry'];
  
  const words = text.toLowerCase().split(/\s+/);
  let sentiment = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) sentiment += 1;
    if (negativeWords.includes(word)) sentiment -= 1;
  });
  
  return sentiment / words.length;
}

// Add context awareness
class ConversationContext {
  private context: string[] = [];
  private maxContextLength = 5;

  addToContext(message: string) {
    this.context.push(message);
    if (this.context.length > this.maxContextLength) {
      this.context.shift();
    }
  }

  getContext(): string {
    return this.context.join(' ');
  }

  clear() {
    this.context = [];
  }
}

const conversationContext = new ConversationContext();

// Improve response selection
function selectResponse(intent: Intent, sentiment: number): string {
  const positiveResponses = intent.responses.filter(r => r.includes('!'));
  const neutralResponses = intent.responses.filter(r => !r.includes('!') && !r.includes('?'));
  const negativeResponses = intent.responses.filter(r => r.includes('?'));

  let selectedResponses: string[];
  if (sentiment > 0.3) {
    selectedResponses = positiveResponses.length > 0 ? positiveResponses : neutralResponses;
  } else if (sentiment < -0.3) {
    selectedResponses = negativeResponses.length > 0 ? negativeResponses : neutralResponses;
  } else {
    selectedResponses = neutralResponses.length > 0 ? neutralResponses : intent.responses;
  }

  return selectedResponses[Math.floor(Math.random() * selectedResponses.length)];
}

// Simple fallback mechanism
function getFallbackResponse(query: string): string {
  const fallbackResponses = [
    "I'm not sure I understand. Could you please rephrase that?",
    "I don't have information about that. Is there something else I can help with?",
    "That's an interesting question, but it's outside my current knowledge. Can we talk about GMTStudio or its services?",
    "I'm still learning and don't have an answer for that. Would you like to know about our AI WorkSpace or Theta platform instead?",
  ];
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

// Update processChatbotQuery function
export function processChatbotQuery(query: string): string {
  const lowercaseQuery = query.toLowerCase();
  const input = encodeInput(lowercaseQuery);
  const prediction = network.predict(input);
  const maxProbability = Math.max(...prediction);
  const matchedIntentIndex = prediction.indexOf(maxProbability);
  const matchedIntent = intents[matchedIntentIndex];
  
  const sentiment = analyzeSentiment(query);
  conversationContext.addToContext(query);

  let response: string;
  if (matchedIntent && maxProbability > 0.7) {
    response = selectResponse(matchedIntent, sentiment);
  } else if (maxProbability > 0.5) {
    response = "I'm not entirely sure, but here's what I think: " + selectResponse(matchedIntent, sentiment);
  } else {
    response = getFallbackResponse(query);
  }

  conversationContext.addToContext(response);
  return response;
}

export function handleUserInput(userInput: string): Promise<string> {
  console.log("User:", userInput);
  return Promise.resolve(processChatbotQuery(userInput));
}

export function getConversationSuggestions(): string[] {
  return [
    "Tell me about GMTStudio",
    "What features does Theta offer?",
    "How can I use the AI WorkSpace?",
    "Is there a mobile app for GMTStudio?",
    "What programming languages are supported?",
  ];
}

export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    return new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
  };
}

export const debouncedHandleUserInput = debounce(handleUserInput, 300);

// Train the network when the module is loaded
trainNetwork();

console.log("Mazs AI v1.2 mini initialized and trained!");