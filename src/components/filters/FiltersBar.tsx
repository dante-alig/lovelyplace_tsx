import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faMap,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import ItemsFilters from "./ItemsFilters";
import { selecItemsFiltersData } from "../../utils/selecItemsFiltersData";

type CategoryType = 'drink' | 'eat' | 'fun';

interface FilterParams {
  [key: string]: string | string[];
}

interface FiltersBarProps {
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams>>;
  setButtonActiv: React.Dispatch<React.SetStateAction<number[]>>;
  buttonActiv: number[];
  setCategorieItems: React.Dispatch<React.SetStateAction<CategoryType>>;
  openMap: boolean;
  setOpenMap: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  categorieItems: CategoryType;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  setFilterParams,
  setButtonActiv,
  buttonActiv,
  setCategorieItems,
  openMap,
  setOpenMap,
  setShowModal,
  categorieItems,
}) => {
  const filtersRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right'): void => {
    if (filtersRef.current) {
      const scrollAmount = 200;
      const currentScroll = filtersRef.current.scrollLeft;
      filtersRef.current.scrollTo({
        left:
          direction === "right"
            ? currentScroll + scrollAmount
            : currentScroll - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="filters-bar">
      <div className="arrow" onClick={() => handleScroll("left")}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <div className="direct-filters" ref={filtersRef}>
        {Array.isArray(selecItemsFiltersData(categorieItems)) &&
          selecItemsFiltersData(categorieItems).map((filter) => (
            <ItemsFilters
              key={filter.id}
              filterData={filter}
              setFilterParams={setFilterParams}
              setButtonActiv={setButtonActiv}
              buttonActiv={buttonActiv}
              numberTab={filter.id}
              setCategorieItems={setCategorieItems}
            />
          ))}
      </div>
      <div className="arrow" onClick={() => handleScroll("right")}>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>

      <div
        className={!openMap ? "map" : "map-closed"}
        onClick={() => setOpenMap(!openMap)}
      >
        {!openMap ? "Regarder sur une carte" : "Fermer la carte"}
        <FontAwesomeIcon className="fa-map" icon={faMap} />
      </div>

      <div className="filter-icon" onClick={() => setShowModal(true)}>
        Filtres
        <FontAwesomeIcon icon={faSliders} />
      </div>
    </div>
  );
};

export default FiltersBar;
