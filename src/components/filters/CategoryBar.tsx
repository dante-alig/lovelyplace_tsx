import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMartiniGlass,
  faUtensils,
  faTicket,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

type CategoryType = 'drink' | 'eat' | 'fun';

interface CategoryBarProps {
  categorieItems: CategoryType;
  handleCategoryChange: (category: CategoryType) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categorieItems, handleCategoryChange }) => {
  return (
    <div className="category-bar-box">
      <div className="category-bar">
        <div
          className={categorieItems === "drink" ? "drink-activ" : "drink"}
          onClick={() => handleCategoryChange("drink")}
        >
          Prendre un verre
          <FontAwesomeIcon icon={faMartiniGlass} />
        </div>
        <div
          className={categorieItems === "eat" ? "eat-activ" : "eat"}
          onClick={() => handleCategoryChange("eat")}
        >
          Manger ensemble
          <FontAwesomeIcon icon={faUtensils} />
        </div>
        <div
          className={categorieItems === "fun" ? "fun-activ" : "fun"}
          onClick={() => handleCategoryChange("fun")}
        >
          Partager une activité <FontAwesomeIcon icon={faTicket} />
        </div>
        <Link to="/premium" style={{ textDecoration: "none" }}>
          <div className="premium-member">
            Reservé aux membres <FontAwesomeIcon icon={faLock} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryBar;
