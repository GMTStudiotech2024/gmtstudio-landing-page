declare module '*.mp4' {
    const src: string;
    export default src;
  }
  declare module 'node-nlp';
  declare module '@heroicons/react/24/solid';
declare module '@heroicons/react/24/outline';
declare module 'cohere-ai' {
  export class CohereClient {
    constructor(options: { token: string });
    chat(params: any): Promise<any>;
    // Add other methods as needed
  }
}