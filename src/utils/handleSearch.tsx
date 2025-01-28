import React from 'react';
import { searchLocations } from "../services/sendForm";
import { fetchDataItems } from "../services/fetchDataItems";

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
type LocationItem = any; // TODO: Define proper type based on your data structure

export const handleSearch = async (
  value: string,
  setSearchQuery: SetStateAction<string>,
  setItems: SetStateAction<LocationItem[]>,
  setCategorieItems: SetStateAction<string>
): Promise<void> => {
  setSearchQuery(value);

  if (value.trim()) {
    try {
      await searchLocations(value, setItems);
    } catch (error) {
      console.error("Erreur de recherche:", error);
    }
  } else {
    setCategorieItems("drink");
    const items = await fetchDataItems("drink");
    setItems(items);
  }
};

export const handleSearchChange = (
  setSearchQuery: SetStateAction<string>,
  setItems: SetStateAction<LocationItem[]>,
  setCategorieItems: SetStateAction<string>
): (e: React.ChangeEvent<HTMLInputElement>) => Promise<void> => {
  return async (e) => {
    await handleSearch(
      e.target.value,
      setSearchQuery,
      setItems,
      setCategorieItems
    );
  };
};
