import React from 'react';
import { searchLocations } from "../services/sendForm";
import { fetchDataItems } from "../services/fetchDataItems";

type CategoryType = "drink" | "eat" | "fun" | "filter-nearby";

type LocationItem = any; // TODO: Define proper type based on your data structure

const formatSearchQuery = (value: string): string => {
  // Enlever les caractères spéciaux sauf les espaces et les accents
  const formattedValue = value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
    .replace(/[^\w\s-]/g, '') // Garder lettres, chiffres, espaces et tirets
    .replace(/\s+/g, ' '); // Remplacer multiple espaces par un seul

  return formattedValue;
};

export const handleSearch = async (
  value: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setItems: React.Dispatch<React.SetStateAction<LocationItem[]>>,
  setCategorieItems: React.Dispatch<React.SetStateAction<CategoryType>>
): Promise<void> => {
  setSearchQuery(value);

  if (value.trim()) {
    try {
      const formattedValue = formatSearchQuery(value);
      if (formattedValue.length > 0) {
        console.log('Recherche avec la valeur formatée:', formattedValue);
        await searchLocations(formattedValue, setItems);
      } else {
        console.log('Recherche invalide après formatage');
        setItems([]);
      }
    } catch (error) {
      console.error("Erreur de recherche:", error);
      setItems([]);
    }
  } else {
    setCategorieItems("drink");
    await fetchDataItems(setItems, undefined, "drink");
  }
};

export const handleSearchChange = (
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setItems: React.Dispatch<React.SetStateAction<LocationItem[]>>,
  setCategorieItems: React.Dispatch<React.SetStateAction<CategoryType>>
) => {
  return async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    await handleSearch(value, setSearchQuery, setItems, setCategorieItems);
  };
};
