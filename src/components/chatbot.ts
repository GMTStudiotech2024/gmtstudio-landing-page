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
];

const network = new MultilayerPerceptron([10, 16, 8, intents.length]);

function trainNetwork() {
  const epochs = 5000;
  const learningRate = 0.05;

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
  const maxProbability = Math.max(...prediction);
  const matchedIntentIndex = prediction.indexOf(maxProbability);
  const matchedIntent = intents[matchedIntentIndex];
  
  const response = matchedIntent && maxProbability > 0.5
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

// Comment out or remove this line:
// exampleConversation();