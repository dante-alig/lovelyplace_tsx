import React from 'react';

export const formatAddressForSchedule = (
  locationName: string,
  locationAddress: string,
  postalCode: string
): string => {
  if (!locationName || !locationAddress || !postalCode) return '';
  return `${locationName}, ${locationAddress}, ${postalCode}`;
};
