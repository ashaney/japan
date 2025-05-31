"use client";

import React from 'react';
import { getTagColor } from '../lib/tagUtils';

interface TagProps {
  name: string;
  onClick?: (tag: string) => void;
  isActive?: boolean;
  showLabel?: boolean;
}

const Tag: React.FC<TagProps> = ({ name, onClick, isActive = false, showLabel = true }) => {
  const colorClass = getTagColor(name);
  
  const handleClick = () => {
    if (onClick) {
      onClick(name);
    }
  };
  
  return (
    <span 
      className={`journal-tag ${colorClass} ${isActive ? 'active' : ''}`} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {showLabel ? name : ''}
    </span>
  );
};

export default Tag;
