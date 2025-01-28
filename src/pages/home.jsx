import { useState, useContext, useEffect, useRef } from "react";

import Items from "../components/items/Items";
import ModalFilter from "../components/filters/ModalFilter";
import MapLocation from "../components/map/MapLocation";
import CategoryBar from "../components/filters/CategoryBar";
import FiltersBar from "../components/filters/FiltersBar";
import MobileNotice from "../components/layout/MobileNotice";

import { MyContext } from "../context/myContext";

import { fetchDataItems } from "../services/fetchDataItems";

const Home = () => {
  const {
    items,
    setItems,
    setLoadingData,
    categorieItems,
    setCategorieItems,
    filterParams,
    setFilterParams,
  } = useContext(MyContext);

  const [buttonActiv, setButtonActiv] = useState(null);
  const [openMap, setOpenMap] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    fetchDataItems(setItems, setLoadingData, categorieItems, filterParams);
  }, [categorieItems, filterParams]);

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  const handleCategoryChange = (category) => {
    setCategorieItems(category);
    setFilterParams(null);
  };

  return (
    <div className="home-container">
      <MobileNotice />

      <CategoryBar
        categorieItems={categorieItems}
        handleCategoryChange={handleCategoryChange}
      />

      <FiltersBar
        setFilterParams={setFilterParams}
        setButtonActiv={setButtonActiv}
        buttonActiv={buttonActiv}
        setCategorieItems={setCategorieItems}
        openMap={openMap}
        setOpenMap={setOpenMap}
        setShowModal={setShowModal}
        categorieItems={categorieItems}
      />

      {!openMap ? (
        <div className="items-container">
          <div className="items-box">
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item) => <Items key={item._id} item={item} />)
            ) : (
              <div>Aucun item trouvé</div>
            )}
          </div>
        </div>
      ) : (
        <div className="geoloc-container">
          <MapLocation />
          <div className="geoloc"></div>
        </div>
      )}

      {showModal && (
        <ModalFilter modalRef={modalRef} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default Home;
