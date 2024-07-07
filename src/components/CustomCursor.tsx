import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [click, setClick] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClick(true);
    const handleMouseUp = () => setClick(false);

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).matches('a, button')) {
        setHover(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).matches('a, button')) {
        setHover(false);
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${click ? 'click' : ''} ${hover ? 'hover' : ''}`}
      style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
    />
  );
};

export default CustomCursor;
