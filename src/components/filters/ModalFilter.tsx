import React, { useContext } from "react";
import { MyContext } from "../../context/myContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

type CategoryType = "drink" | "eat" | "fun" | "filter-nearby";
type PlaceCategory =
  | "prendre_un_verre"
  | "manger_ensemble"
  | "partager_une_activité"
  | null;

interface FilterParams {
  address?: string;
  maxDistance?: number;
  placeCategory?: PlaceCategory;
  [key: string]: any;
}

interface ModalFilterProps {
  modalRef: React.RefObject<HTMLDivElement>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MyContextType {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setCategorieItems: React.Dispatch<React.SetStateAction<CategoryType>>;
  categorieItems: CategoryType;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams | null>>;
  filterParams: FilterParams | null;
}

const ModalFilter: React.FC<ModalFilterProps> = ({
  modalRef,
  setShowModal,
}) => {
  const {
    address,
    setAddress,
    setCategorieItems,
    categorieItems,
    setFilterParams,
    filterParams,
  } = useContext<MyContextType>(MyContext);

  const chooseCategory = (category: CategoryType): PlaceCategory => {
    if (category === "drink") {
      return "prendre_un_verre";
    } else if (category === "eat") {
      return "manger_ensemble";
    } else if (category === "fun") {
      return "partager_une_activité";
    } else {
      return null;
    }
  };

  const handleApplyFilters = (): void => {
    if (address) {
      setFilterParams({
        ...filterParams,
        address: address,
        maxDistance: 100,
        placeCategory: chooseCategory(categorieItems),
      });
      setCategorieItems("filter-nearby");
    }
    setShowModal(false);
  };

  return (
    <div className="modal-overlay-filter">
      <div className="modal-filter-content" ref={modalRef}>
        <h2>Filtres</h2>
        <div className="modal-adress">
          <div>
            <p>Trouver des lieux ou des activités proche d'une adresse</p>
            <FontAwesomeIcon icon={faLocationCrosshairs} />
          </div>

          <input
            type="text"
            placeholder="entrer une adresse"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
          />
        </div>
        <div className="button-box">
          <div
            onClick={() => {
              setShowModal(false);
              setCategorieItems("drink");
              setFilterParams(null);
            }}
          ></div>
          <button className="button-filter" onClick={handleApplyFilters}>
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
