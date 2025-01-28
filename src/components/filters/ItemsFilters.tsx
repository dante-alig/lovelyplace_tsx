import React, { useState, useEffect } from "react";

type CategoryType = 'eat' | 'drink' | 'fun';

interface FilterData {
  id: number;
  name: string;
  filterCategorieKey: string;
  filterCategorieValue: string;
  categorie: CategoryType;
}

interface FilterParams {
  filters: string[];
}

interface ItemsFiltersProps {
  filterData: FilterData;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams | null>>;
  buttonActiv: number | string;
  setButtonActiv: React.Dispatch<React.SetStateAction<number | string>>;
  numberTab: number;
  setCategorieItems: React.Dispatch<React.SetStateAction<CategoryType>>;
}

const ItemsFilters: React.FC<ItemsFiltersProps> = ({
  filterData,
  setFilterParams,
  buttonActiv,
  setButtonActiv,
  numberTab,
  setCategorieItems,
}) => {
  const [activ, setActiv] = useState<boolean>(true);

  useEffect(() => {
    if (filterData.categorie === "eat" || filterData.categorie === "drink") {
      setButtonActiv("");
    }
  }, [filterData.categorie, setButtonActiv]);

  return (
    <div
      className={
        buttonActiv === numberTab
          ? "itemFilters-container-hover"
          : "itemFilters-container"
      }
      onClick={() => {
        if (activ) {
          setButtonActiv(numberTab);
          setActiv(false);
          setFilterParams({
            filters: [
              `${filterData.filterCategorieKey}:${filterData.filterCategorieValue}`,
            ],
          });
          setCategorieItems(filterData.categorie);
        } else {
          setButtonActiv("");
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
