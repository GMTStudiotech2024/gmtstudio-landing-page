import React, { useEffect, useState, useRef, useCallback } from 'react';
import './CustomCursor.css';

interface CustomCursorProps {
  isDarkMode: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isDarkMode }) => {
  const [cursorState, setCursorState] = useState({
    click: false,
    hover: false,
    cursorLine: false,
    cursorButton: false,
  });
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const updateCursorState = useCallback((newState: Partial<typeof cursorState>) => {
    setCursorState(prevState => ({ ...prevState, ...newState }));
  }, []);

  const moveCursor = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  }, []);

  const handleMouseInteraction = useCallback((e: MouseEvent, isOver: boolean) => {
    const target = e.target as Element;
    if (target.matches('button, a, [role="button"]')) {
      updateCursorState({ cursorButton: isOver, hover: isOver });
    } else if (target.matches('p, span, input, textarea')) {
      updateCursorState({ cursorLine: isOver });
    }
  }, [updateCursorState]);

  useEffect(() => {
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', () => updateCursorState({ click: true }));
    document.addEventListener('mouseup', () => updateCursorState({ click: false }));
    document.addEventListener('mouseover', e => handleMouseInteraction(e, true));
    document.addEventListener('mouseout', e => handleMouseInteraction(e, false));

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', () => updateCursorState({ click: true }));
      document.removeEventListener('mouseup', () => updateCursorState({ click: false }));
      document.removeEventListener('mouseover', e => handleMouseInteraction(e, true));
      document.removeEventListener('mouseout', e => handleMouseInteraction(e, false));
    };
  }, [moveCursor, handleMouseInteraction, updateCursorState]);

  const cursorColor = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
  const cursorBorderColor = isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
  

  const cursorClasses = [
    'custom-cursor',
    cursorState.click && 'click',
    cursorState.hover && 'hover',
    cursorState.cursorLine && 'cursor--text',
    cursorState.cursorButton && 'cursor-button',
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={cursorRef} 
      className={cursorClasses} 
      style={{ 
        pointerEvents: 'none',
        backgroundColor: cursorColor,
        borderColor: cursorBorderColor
      }} 
    />
  );
};

export default CustomCursor;
