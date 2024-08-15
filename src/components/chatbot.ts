interface Intent {
  patterns: string[];
  responses: string[];
}

class SimpleNeuralNetwork {
  private weights: number[];

  constructor(inputSize: number) {
    this.weights = Array(inputSize).fill(0).map(() => Math.random() - 0.5);
  }

  predict(input: number[]): number {
    return input.reduce((sum, value, index) => sum + value * this.weights[index], 0);
  }

  train(input: number[], target: number, learningRate: number = 0.1) {
    const prediction = this.predict(input);
    const error = target - prediction;
    this.weights = this.weights.map((weight, index) => weight + learningRate * error * input[index]);
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
];

const network = new SimpleNeuralNetwork(10); // Adjust input size as needed

function trainNetwork() {
  for (let i = 0; i < 1000; i++) {
    intents.forEach(intent => {
      intent.patterns.forEach(pattern => {
        const input = encodeInput(pattern);
        const target = intents.indexOf(intent) / intents.length;
        network.train(input, target);
      });
    });
  }
}

function encodeInput(query: string): number[] {
  // Improved encoding: use word presence instead of letter count
  const words = query.toLowerCase().split(/\s+/);
  return intents.map(intent => 
    intent.patterns.some(pattern => words.some(word => pattern.includes(word))) ? 1 : 0
  );
}

export async function processChatbotQuery(query: string): Promise<string> {
  const lowercaseQuery = query.toLowerCase();
  const input = encodeInput(lowercaseQuery);
  const prediction = network.predict(input);
  const matchedIntent = intents[Math.floor(prediction * intents.length)];
  
  const response = matchedIntent
    ? matchedIntent.responses[Math.floor(Math.random() * matchedIntent.responses.length)]
    : "I'm sorry, I don't understand that query. Can you please rephrase or ask something else?";

  return typeResponse(response);
}

async function typeResponse(response: string): Promise<string> {
  let typedResponse = '';
  for (const char of response) {
    typedResponse += char;
    await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 30)); // Random delay between 30-80ms
  }
  return typedResponse;
}

// Train the network when the module is loaded
trainNetwork();

console.log("Mazs AI v1.0 mini initialized and trained!");

// New function to handle user input and generate responses
export async function handleUserInput(userInput: string): Promise<string> {
  console.log("User:", userInput);
  const response = await processChatbotQuery(userInput);
  console.log("Mazs AI:", response);
  return response;
}

// Example usage (you can remove this in production)
async function exampleConversation() {
  await handleUserInput("Hello");
  await handleUserInput("What is GMTStudio?");
  await handleUserInput("Goodbye");
}

exampleConversation();