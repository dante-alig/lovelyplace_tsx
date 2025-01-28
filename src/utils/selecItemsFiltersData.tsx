import React from 'react';
import {
  eatItemsFiltersData,
  drinkItemsFiltersData,
  funItemsFiltersData,
} from "./itemsFiltersData";

type CategoryType = 'eat' | 'drink' | 'fun';

export const selecItemsFiltersData = (categorieItems: CategoryType) => {
  switch (categorieItems) {
    case "eat":
      return eatItemsFiltersData;
    case "drink":
      return drinkItemsFiltersData;
    case "fun":
      return funItemsFiltersData;
    default:
      return [];
  }
};
