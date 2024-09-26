import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage2 from '../assetss/GMTStudio_p.png';

const NEWS18: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToBlog = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img 
            src={blogImage2} 
            alt="Theta Social Media Application" 
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mazs AI v1.3.5 Anatra update</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <img src="/api/placeholder/40/40" alt="Author" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <span>By Alston Chang, Chief Executive Officer</span>
                <span className="mx-2">•</span>
                <span>April 01, 2024</span>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p className="lead text-xl mb-6">
                New update for Mazs AI, we added some new features and new UI for it.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Project Highlights</h2>
              <p>
                 we updated Mazs AI to version 1.3.5, here are some key changes:
                <p>We have added Math solver to Mazs AI, which can solve math problem and generate math problem.</p>
                <p>The three model Anatra, Canard, and pato are still exist but will not be available in official website. the original model will be Mazs AI v1.3.5 anatra, which is our enhanced version of the original model.</p>
                </p>
                <h2>Mazs AI v1.3.5 Anatra model information</h2>
                <h3 className="text-xl font-semibold mt-6 mb-3">Model Architecture</h3>
                <p>
                  Mazs AI v1.3.5 Anatra is built on a sophisticated multi-layered architecture:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Multilayer Perceptron (MLP) for intent classification</li>
                  <li>Advanced Natural Language Processor for understanding and generation</li>
                  <li>Generative Adversarial Network (GAN) for response refinement</li>
                  <li>Reinforcement Learning (RL) Agent for continuous improvement</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Word Embeddings with 100-dimensional vectors</li>
                  <li>TF-IDF Vectorization for query analysis</li>
                  <li>N-gram Analysis for improved language generation</li>
                  <li>Sentiment Analysis using a custom lexicon</li>
                  <li>Basic Named Entity Recognition</li>
                  <li>Topic Modeling for contextual understanding</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Model Specifications</h3>
                <p>
                  While compact compared to large language models, Mazs AI v1.3.5 Anatra boasts:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Extensible vocabulary that grows with training</li>
                  <li>MLP architecture with layers: [10, 16, 8, number_of_intents]</li>
                  <li>Encoder-Decoder network for language processing</li>
                  <li>Expandable knowledge base</li>
                  <li>Estimated few million parameters</li>
                </ul>

                <p className="mt-4">
                  This focused design allows Mazs AI v1.3.5 Anatra to excel in GMTStudio-specific tasks while maintaining strong general conversational abilities.
                </p>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">We look forward to sharing more details about this exciting new project with you soon. Thank you for your continued support.</p>
                <p className="font-semibold text-black dark:text-white">Also, We added some easter in the website, please find it and enjoy the reward.</p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <button 
          onClick={handleBackToBlog} 
          className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Back to Blog
        </button>
      </footer>
    </div>
  );
}

export default NEWS18;
