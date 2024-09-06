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

  // Add a new method for batch training
  batchTrain(inputs: number[][], targets: number[][], learningRate: number = 0.1, batchSize: number = 32) {
    for (let i = 0; i < inputs.length; i += batchSize) {
      const batchInputs = inputs.slice(i, i + batchSize);
      const batchTargets = targets.slice(i, i + batchSize);
      
      let gradients = this.weights.map(layer => layer.map(neuron => neuron.map(() => 0)));
      let biasGradients = this.biases.map(layer => layer.map(() => 0));

      for (let j = 0; j < batchInputs.length; j++) {
        const [deltaGradients, deltaBiasGradients] = this.backpropagate(batchInputs[j], batchTargets[j]);
        
        gradients = gradients.map((layer, l) => 
          layer.map((neuron, n) => 
            neuron.map((grad, w) => grad + deltaGradients[l][n][w])
          )
        );
        
        biasGradients = biasGradients.map((layer, l) => 
          layer.map((bias, n) => bias + deltaBiasGradients[l][n])
        );
      }

      // Update weights and biases with averaged gradients
      const batchLearningRate = learningRate / batchInputs.length;
      this.weights = this.weights.map((layer, l) => 
        layer.map((neuron, n) => 
          neuron.map((weight, w) => weight - batchLearningRate * gradients[l][n][w])
        )
      );
      
      this.biases = this.biases.map((layer, l) => 
        layer.map((bias, n) => bias - batchLearningRate * biasGradients[l][n])
      );
    }
  }

  // Helper method for backpropagation
  private backpropagate(input: number[], target: number[]): [number[][][], number[][]] {
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

    // Calculate gradients
    let gradients = this.weights.map((layer, i) => 
      layer.map((neuron, j) => 
        neuron.map((_, k) => deltas[i][j] * activations[i][k])
      )
    );

    let biasGradients = deltas;

    return [gradients, biasGradients];
  }
}

// New class for text processing and generation
class NaturalLanguageProcessor {
  private vocabulary: Set<string>;
  private wordFrequency: Map<string, number>;
  private bigramFrequency: Map<string, Map<string, number>>;
  private trigramFrequency: Map<string, Map<string, Map<string, number>>>;
  private wordVectors: Map<string, number[]>;
  private idf: Map<string, number>;
  private documents: string[];

  constructor() {
    this.vocabulary = new Set();
    this.wordFrequency = new Map();
    this.bigramFrequency = new Map();
    this.trigramFrequency = new Map();
    this.wordVectors = new Map();
    this.idf = new Map();
    this.documents = [];
  }

  trainOnText(text: string) {
    const words = this.tokenize(text);
    this.documents.push(text);
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      this.vocabulary.add(word);
      this.wordFrequency.set(word, (this.wordFrequency.get(word) || 0) + 1);
      
      if (i < words.length - 1) {
        const nextWord = words[i + 1];
        if (!this.bigramFrequency.has(word)) {
          this.bigramFrequency.set(word, new Map());
        }
        const bigramMap = this.bigramFrequency.get(word)!;
        bigramMap.set(nextWord, (bigramMap.get(nextWord) || 0) + 1);
      }

      if (i < words.length - 2) {
        const nextWord = words[i + 1];
        const nextNextWord = words[i + 2];
        if (!this.trigramFrequency.has(word)) {
          this.trigramFrequency.set(word, new Map());
        }
        if (!this.trigramFrequency.get(word)!.has(nextWord)) {
          this.trigramFrequency.get(word)!.set(nextWord, new Map());
        }
        const trigramMap = this.trigramFrequency.get(word)!.get(nextWord)!;
        trigramMap.set(nextNextWord, (trigramMap.get(nextNextWord) || 0) + 1);
      }
    }

    this.updateIDF();
    this.generateWordEmbeddings();
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase().match(/\b(\w+)\b/g) || [];
  }

  private updateIDF() {
    this.vocabulary.forEach(word => {
      const documentFrequency = this.documents.filter(doc => doc.includes(word)).length;
      this.idf.set(word, Math.log(this.documents.length / (1 + documentFrequency)));
    });
  }

  private generateWordEmbeddings() {
    const vectorSize = 100;
    const contextWindow = 2;
    const learningRate = 0.01;
    const iterations = 5;

    // Initialize word vectors
    this.vocabulary.forEach(word => {
      this.wordVectors.set(word, Array.from({ length: vectorSize }, () => Math.random() - 0.5));
    });

    // Train word vectors using skip-gram model
    for (let iter = 0; iter < iterations; iter++) {
      this.documents.forEach(doc => {
        const words = this.tokenize(doc);
        for (let i = 0; i < words.length; i++) {
          const currentWord = words[i];
          for (let j = Math.max(0, i - contextWindow); j <= Math.min(words.length - 1, i + contextWindow); j++) {
            if (i !== j) {
              const contextWord = words[j];
              const currentVector = this.wordVectors.get(currentWord)!;
              const contextVector = this.wordVectors.get(contextWord)!;
              
              // Compute gradient and update vectors
              const dot = currentVector.reduce((sum, val, idx) => sum + val * contextVector[idx], 0);
              const error = Math.exp(dot) / (1 + Math.exp(dot)) - 1;
              
              for (let k = 0; k < vectorSize; k++) {
                currentVector[k] -= learningRate * error * contextVector[k];
                contextVector[k] -= learningRate * error * currentVector[k];
              }
            }
          }
        }
      });
    }
  }

  generateSentence(startWord: string, maxLength: number = 20): string {
    let sentence = [startWord];
    let currentWord = startWord;
    let previousWord = '';

    for (let i = 1; i < maxLength; i++) {
      let nextWord = '';
      if (this.trigramFrequency.has(previousWord) && this.trigramFrequency.get(previousWord)!.has(currentWord)) {
        const trigramCandidates = this.trigramFrequency.get(previousWord)!.get(currentWord)!;
        nextWord = this.selectNextWord(trigramCandidates);
      } else if (this.bigramFrequency.has(currentWord)) {
        const bigramCandidates = this.bigramFrequency.get(currentWord)!;
        nextWord = this.selectNextWord(bigramCandidates);
      } else {
        break;
      }

      sentence.push(nextWord);
      previousWord = currentWord;
      currentWord = nextWord;

      if (nextWord.endsWith('.') || nextWord.endsWith('!') || nextWord.endsWith('?')) break;
    }

    return sentence.join(' ');
  }

  private selectNextWord(candidates: Map<string, number>): string {
    const totalFrequency = Array.from(candidates.values()).reduce((sum, freq) => sum + freq, 0);
    let random = Math.random() * totalFrequency;
    
    for (const [word, freq] of Array.from(candidates.entries())) {
      random -= freq;
      if (random <= 0) return word;
    }

    return Array.from(candidates.keys())[0];
  }

  analyzeSentiment(text: string): { score: number, explanation: string } {
    const words = this.tokenize(text);
    const sentimentLexicon = new Map([
      ['good', 1], ['great', 2], ['excellent', 2], ['amazing', 2], ['wonderful', 2],
      ['bad', -1], ['terrible', -2], ['awful', -2], ['horrible', -2], ['disappointing', -1],
      ['happy', 1], ['sad', -1], ['angry', -2], ['pleased', 1], ['unhappy', -1]
    ]);

    let totalScore = 0;
    let explanation: string[] = [];

    words.forEach(word => {
      if (sentimentLexicon.has(word)) {
        const score = sentimentLexicon.get(word)!;
        totalScore += score;
        explanation.push(`"${word}" contributes ${score > 0 ? '+' : ''}${score}`);
      }
    });

    const normalizedScore = Math.tanh(totalScore / words.length);
    
    return {
      score: normalizedScore,
      explanation: `Sentiment score: ${normalizedScore.toFixed(2)}. ${explanation.join(', ')}.`
    };
  }

  understandQuery(query: string): { intent: string, entities: { [key: string]: string }, keywords: string[] } {
    const words = this.tokenize(query);
    const queryVector = this.getTfIdfVector(words);
    
    let bestIntent = '';
    let maxSimilarity = -Infinity;
    
    intents.forEach(intent => {
      const intentVector = this.getTfIdfVector(intent.patterns.join(' ').split(/\s+/));
      const similarity = this.cosineSimilarity(queryVector, intentVector);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        bestIntent = intent.patterns[0];
      }
    });

    const entities = this.extractEntities(query);
    const keywords = this.extractKeywords(words);

    return { intent: bestIntent, entities, keywords };
  }

  private getTfIdfVector(words: string[]): Map<string, number> {
    const tf = new Map<string, number>();
    words.forEach(word => {
      tf.set(word, (tf.get(word) || 0) + 1);
    });

    const tfidf = new Map<string, number>();
    tf.forEach((freq, word) => {
      const idf = this.idf.get(word) || Math.log(this.documents.length);
      tfidf.set(word, freq * idf);
    });

    return tfidf;
  }

  private cosineSimilarity(vec1: Map<string, number>, vec2: Map<string, number>): number {
    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;

    vec1.forEach((val1, key) => {
      const val2 = vec2.get(key) || 0;
      dotProduct += val1 * val2;
      mag1 += val1 * val1;
    });

    vec2.forEach((val2) => {
      mag2 += val2 * val2;
    });

    return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
  }

  private extractEntities(query: string): { [key: string]: string } {
    const entities: { [key: string]: string } = {};
    const dateMatch = query.match(/\b(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{2,4})\b/);
    if (dateMatch) entities['date'] = dateMatch[0];
    const nameMatch = query.match(/\b([A-Z][a-z]+ [A-Z][a-z]+)\b/);
    if (nameMatch) entities['name'] = nameMatch[0];
    const emailMatch = query.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) entities['email'] = emailMatch[0];
    return entities;
  }

  private extractKeywords(words: string[]): string[] {
    const tfidf = this.getTfIdfVector(words);
    return Array.from(tfidf.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);
  }

  generateResponse(intent: string, entities: { [key: string]: string }, keywords: string[]): string {
    const matchedIntent = intents.find(i => i.patterns.includes(intent));
    if (matchedIntent) {
      let response = matchedIntent.responses[Math.floor(Math.random() * matchedIntent.responses.length)];
      Object.entries(entities).forEach(([key, value]) => {
        response = response.replace(`{${key}}`, value);
      });
      
      // Enhance response with keywords
      const keywordSentence = this.generateSentence(keywords[0] || "Additionally", 10);
      response += " " + keywordSentence;

      return response;
    }
    return this.generateSentence("I'm not sure I understand. ", 15) + " Can you please rephrase your question?";
  }

  findMostSimilarIntent(query: string, intents: Intent[]): Intent | null {
    const { intent } = this.understandQuery(query);
    return intents.find(i => i.patterns.includes(intent)) || null;
  }
}

// Update processChatbotQuery function
export function processChatbotQuery(query: string): string {
  const { intent, entities, keywords } = nlp.understandQuery(query);
  const sentiment = nlp.analyzeSentiment(query);

  console.log(`Intent: ${intent}`);
  console.log(`Entities:`, entities);
  console.log(`Keywords:`, keywords);
  console.log(`Sentiment:`, sentiment);

  const matchedIntent = intents.find(i => i.patterns.includes(intent));
  if (matchedIntent) {
    const response = nlp.generateResponse(intent, entities, keywords);
    const emoji = sentiment.score > 0 ? " 😊" : sentiment.score < 0 ? " 🤔" : "";
    return response + emoji;
  } else {
    return nlp.generateSentence("I'm not sure I understand. ", 15) + " Can you please rephrase your question?";
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

const nlp = new NaturalLanguageProcessor();

// Train the NLP model
intents.forEach(intent => {
  intent.patterns.forEach(pattern => nlp.trainOnText(pattern));
  intent.responses.forEach(response => nlp.trainOnText(response));
});

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

console.log("Mazs AI v2.0 with NLP capabilities initialized!");