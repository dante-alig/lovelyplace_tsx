import React, { useState, useEffect } from "react";
import { CategoryType, FilterParams, FilterData } from '../../types/filters';

interface ItemsFiltersProps {
  filterData: FilterData;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams | null>>;
  buttonActiv: number[];
  setButtonActiv: React.Dispatch<React.SetStateAction<number[]>>;
  numberTab: number;
  setCategorieItems: React.Dispatch<React.SetStateAction<CategoryType>>;
}

const ItemsFilters: React.FC<ItemsFiltersProps> = ({
  filterData,
  setFilterParams,
  buttonActiv = [],
  setButtonActiv,
  numberTab,
  setCategorieItems,
}) => {
  const [activ, setActiv] = useState<boolean>(true);

  useEffect(() => {
    if (filterData.categorie === "eat" || filterData.categorie === "drink") {
      setButtonActiv([]);
    }
  }, [filterData.categorie, setButtonActiv]);

  return (
    <div
      className={
        Array.isArray(buttonActiv) && buttonActiv.includes(numberTab)
          ? "itemFilters-container-hover"
          : "itemFilters-container"
      }
      onClick={() => {
        if (activ) {
          setButtonActiv(Array.isArray(buttonActiv) ? [...buttonActiv, numberTab] : [numberTab]);
          setActiv(false);
          setFilterParams({
            filters: [
              `${filterData.filterCategorieKey}:${filterData.filterCategorieValue}`,
            ],
          });
          setCategorieItems(filterData.categorie);
        } else {
          setButtonActiv(buttonActiv.filter((id) => id !== numberTab));
          setActiv(true);
          setFilterParams(null);
        }
      }}
    >
      <p>{filterData.name}</p>
    </div>
  );
};

export default ItemsFilters;
