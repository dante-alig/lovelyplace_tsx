import React, { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import logo from "../../assets/images/lovelyplaceparis.png";
import { logout, isAuthenticated } from "../../services/auth";
import Login from "../modals/Login";
import { handleSearchChange } from "../../utils/handleSearch";

type CategoryType = "drink" | "eat" | "fun" | "filter-nearby";

interface FilterParams {
  filters?: string[];
  address?: string;
  maxDistance?: number;
  [key: string]: any;
}

interface MyContextType {
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  setCategorieItems: React.Dispatch<React.SetStateAction<CategoryType>>;
  setAdminLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams | null>>;
}

const Header: React.FC = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setItems, setCategorieItems, setAdminLogin, setFilterParams } =
    useContext<MyContextType>(MyContext);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authenticated = isAuthenticated();
    setIsLoggedIn(authenticated);
    setAdminLogin(authenticated);
  }, [setAdminLogin]);

  const toggleModal = (): void => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setShowModal(!showModal);
    }
  };

  const closeModalOnClickOutside = (
    e: React.MouseEvent<HTMLDivElement>
  ): void => {
    if ((e.target as HTMLDivElement).className === "modal-overlay") {
      setShowModal(false);
    }
  };

  const handleLogout = (): void => {
    logout();
    setIsLoggedIn(false);
    setAdminLogin(false);
  };

  const isHomePage = location.pathname === "/";

  const renderAuthButton = (): JSX.Element => (
    <div className="header-profil" onClick={toggleModal}>
      <motion.div
        whileHover={{
          scale: 1.2,
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 },
        }}
      >
        <FontAwesomeIcon icon={isLoggedIn ? faSignOutAlt : faUser} />
      </motion.div>
      <p>{isLoggedIn ? "Déconnexion" : "Connexion"}</p>
    </div>
  );

  return (
    <div className="header">
      {isHomePage ? (
        <div className="header-container">
          <div className="header-logo">
            <Link
              to="/"
              onClick={() => {
                setCategorieItems("drink");
                setFilterParams(null);
              }}
            >
              <img src={logo} alt="logo" className="img" />
            </Link>
          </div>
          <div className="header-search">
            <input
              type="text"
              placeholder="Rechercher un lieu ou une activité..."
              value={searchQuery}
              onChange={handleSearchChange(
                setSearchQuery,
                setItems,
                setCategorieItems
              )}
              className="header-search-input"
            />
          </div>
          {renderAuthButton()}
        </div>
      ) : (
        <div className="header-container-location">
          <div className="header-logo">
            <Link to="/">
              <img src={logo} alt="logo" className="img" />
            </Link>
          </div>
          {renderAuthButton()}
        </div>
      )}

      {showModal && !isLoggedIn && (
        <Login
          closeModalOnClickOutside={closeModalOnClickOutside}
          setShowModal={setShowModal}
          setIsLoggedIn={setIsLoggedIn}
          setAdminLogin={setAdminLogin}
        />
      )}
    </div>
  );
};

export default Header;
