import React from 'react';

export const getFirstSentence = (text: string): string => {
  if (!text) return '';
  const firstSentenceMatch = text.match(/.*?[.!?]/);
  return firstSentenceMatch
    ? `${firstSentenceMatch[0].trim()}...`
    : `${text.trim()}...`;
};
