import React from "react";
import axios from "axios";

const BASE_URL = "http://site--back-lovelyplace-main--dqd24mcv82s5.code.run";

interface LocationItem {
  _id: string;
  name: string;
  address: string;
}

type CategoryType = "drink" | "eat" | "fun";

interface FilterParams {
  [key: string]: string | number | boolean;
}

export const fetchDataItems = async (
  setItems: React.Dispatch<React.SetStateAction<LocationItem[]>>,
  setLoadingData?: React.Dispatch<React.SetStateAction<boolean>>,
  categorieItems?: CategoryType,
  filterParams?: FilterParams
): Promise<void> => {
  try {
    setLoadingData?.(true);

    const queryString = filterParams
      ? new URLSearchParams(filterParams as Record<string, string>).toString()
      : "";
    const url = `${BASE_URL}/categories/${categorieItems}${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await axios.get<LocationItem[]>(url);
    const data = response.data;

    setItems(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  } finally {
    setLoadingData?.(false);
  }
};

export const fetchDataSelectedItem = async (
  idLocation: string,
  setSelectedItem: React.Dispatch<React.SetStateAction<LocationItem | null>>
): Promise<LocationItem | null> => {
  try {
    const response = await axios.get<LocationItem>(
      `${BASE_URL}/location/items/${idLocation}`
    );
    const location = response.data;

    setSelectedItem(location);
    return location;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'élément :", error);
    alert("Une erreur est survenue lors de la récupération de la location.");
    return null;
  }
};
