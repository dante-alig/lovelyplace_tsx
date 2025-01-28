import React from 'react';

export const formatInstagramUsername = (username: string | null | undefined): string => {
  if (!username) return "";
  return username.startsWith("@") ? username.substring(1) : username;
};
