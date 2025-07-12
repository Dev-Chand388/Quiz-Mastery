import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-md overflow-hidden';
  const hoverStyles = hover ? 'hover:shadow-lg transition-shadow duration-300 cursor-pointer' : '';
  const cardStyles = `${baseStyles} ${hoverStyles} ${className}`;
  
  return (
    <div className={cardStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '' }) => (
  <div className={`w-full overflow-hidden ${className}`}>
    <img src={src} alt={alt} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" />
  </div>
);

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold mb-2 text-gray-900 ${className}`}>{children}</h3>
);

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => (
  <p className={`text-gray-600 ${className}`}>{children}</p>
);

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gray-50 ${className}`}>{children}</div>
);

export default Object.assign(Card, {
  Image: CardImage,
  Content: CardContent,
  Title: CardTitle,
  Description: CardDescription,
  Footer: CardFooter,
});