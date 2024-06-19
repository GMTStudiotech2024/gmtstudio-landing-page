import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';
import video from '../assets/images/blogImage1.mp4';

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleMuteUnmute = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      setIsMuted(videoElement.muted);
    }
  };

  const handleFullScreen = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (!document.fullscreenElement) {
        videoElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <section id="hero" className="pt-20 pb-10 bg-gray-50 dark:bg-gray-900 h-screen flex items-center relative">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0" data-aos="fade-right">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="animated-gradient">GMTStudio</span>
          </h1>
          <h2 className="text-3xl mb-6 bg-gradient-to-r from-purple-500 to-purple-900 dark:bg-gradient-to-r dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Beyond Code, Beyond Limits.
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Enhanced Tools and applications to make your life easier.
          </p>
          <a href="#OurProjects" className="inline-block px-8 py-3  font-semibold rounded-lg shadow-md bg-black dark:bg-white text-white dark:text-black ">
            Learn More 
          </a>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center relative" data-aos="fade-left">
          <div className="absolute inset-0 animated-gradient-b opacity-50 rounded-lg shadow-lg"></div>
          <div className="relative z-10 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden">
            <video ref={videoRef} id="heroVideo" className="rounded-lg w-full" controls>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-2 left-2 flex space-x-2">
              <button
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="p-2 bg-gray-800 bg-opacity-75 rounded-full text-white hover:bg-gray-700 transition duration-300"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
            <div className="absolute bottom-2 left-2 flex space-x-2">
              <button
                onClick={handleMuteUnmute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="p-2 bg-gray-800 bg-opacity-75 rounded-full text-white hover:bg-gray-700 transition duration-300"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <button
                onClick={handleFullScreen}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                className="p-2 bg-gray-800 bg-opacity-75 rounded-full text-white hover:bg-gray-700 transition duration-300"
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
