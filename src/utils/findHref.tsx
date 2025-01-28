import React from 'react';

export const extractHref = (htmlString: string): string | null => {
  const hrefRegex = /href=["']([^"']+)["']/;
  const match = htmlString.match(hrefRegex);
  return match ? match[1] : null;
};
