import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  content: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <Card 
      ref={cardRef}
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl border-t-4 border-blue-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
        <Icon className="w-12 h-12 mb-4" />
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <CardDescription className="text-gray-600 mb-4">
          {description}
        </CardDescription>
        <p className="text-gray-700">
          {content}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;