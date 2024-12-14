"use client"
import React, { useState, useRef, useEffect } from 'react';

const TruncateText = ({ text, maxLength = 10 }: {text:string, maxLength:number}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  
  useEffect(() => {
    if (isHovered && containerRef.current && tooltipRef.current) {
      // @ts-ignore
      const containerRect = containerRef.current.getBoundingClientRect();
      // @ts-ignore
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      setTooltipPosition({
        top: -tooltipRect.height - 10,
        left: Math.min(0, window.innerWidth - containerRect.left - tooltipRect.width)
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="truncate inline-block max-w-full">
        {truncatedText}
      </span>
      {isHovered && text.length > maxLength && (
        <div
          ref={tooltipRef}
          className="fixed bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg z-50 whitespace-nowrap border border-gray-200"
          style={{
            // @ts-ignore
            top: `${containerRef.current.getBoundingClientRect().top + tooltipPosition.top}px`,
            // @ts-ignore
            left: `${containerRef.current.getBoundingClientRect().left + tooltipPosition.left}px`,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default TruncateText;