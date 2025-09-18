import React from 'react';

interface SEOHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  semanticRole?: 'main-title' | 'section-title' | 'subsection-title' | 'service-title';
  priority?: 'high' | 'medium' | 'low';
}

const SEOHeading = ({ 
  level, 
  children, 
  className = '',
  id,
  semanticRole = 'section-title',
  priority = 'medium'
}: SEOHeadingProps) => {
  
  // Generate optimized classes based on semantic role and priority
  const getSemanticClasses = () => {
    const baseClasses = className;
    
    // Add semantic importance for screen readers
    const priorityClasses = {
      high: 'font-bold',
      medium: 'font-semibold', 
      low: 'font-medium'
    };
    
    return `${baseClasses} ${priorityClasses[priority]}`.trim();
  };

  // Generate proper heading attributes
  const headingProps = {
    className: getSemanticClasses(),
    id,
    itemProp: semanticRole === 'main-title' ? 'headline' : undefined,
    role: semanticRole === 'main-title' ? 'banner' : undefined,
  };

  // Render appropriate heading level
  switch (level) {
    case 1:
      return <h1 {...headingProps}>{children}</h1>;
    case 2:
      return <h2 {...headingProps}>{children}</h2>;
    case 3:
      return <h3 {...headingProps}>{children}</h3>;
    case 4:
      return <h4 {...headingProps}>{children}</h4>;
    case 5:
      return <h5 {...headingProps}>{children}</h5>;
    case 6:
      return <h6 {...headingProps}>{children}</h6>;
    default:
      return <h2 {...headingProps}>{children}</h2>;
  }
};

export default SEOHeading;