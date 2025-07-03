import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', style, onClick }) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;