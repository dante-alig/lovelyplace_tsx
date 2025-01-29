import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { fetchDataSelectedItem } from "../services/fetchDataItems";
import { deletePhoto } from "../services/sendForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeywordsModal from "../components/modals/KeywordsModal";
import FiltersModal from "../components/modals/FiltersModal";
import AddressModal from "../components/modals/AddressModal";
import DescriptionModal from "../components/modals/DescriptionModal";
import ImageEditModal from "../components/modals/ImageEditModal";
import { getPlaceSchedule } from "../services/askSchedule";
import { formatInstagramUsername } from "../utils/formatInstagramUsername";
import OpeningStatus from "../components/selectedLocation/OpeningStatus";
import { handleFunc } from "../utils/handleFunc";
import AdminEditButtons from "../components/selectedLocation/AdminEditButtons";

const SelectedLocation = () => {
  const { idLocation } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [isKeywordsModalOpen, setIsKeywordsModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const context = useContext(MyContext);
  if (!context) {
    return <div>Chargement...</div>;
  }

  const { selectedItem, setSelectedItem, adminLogin, schedule, setSchedule } =
    context;

  const navigate = useNavigate();

  const {
    handleToggleModal,
    handleFileChange,
    handleSubmit,
    handleAddressUpdate,
    handleDescriptionUpdate,
  } = handleFunc({
    showModal,
    setShowModal,
    setSelectedFile,
    setPreviewImage,
    selectedFile,
    idLocation,
    selectedItem,
    setSelectedItem,
  });

  useEffect(() => {
    setSelectedItem("");
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchDataSelectedItem(idLocation, setSelectedItem);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (
      selectedItem &&
      selectedItem.locationName &&
      selectedItem.locationAddress &&
      selectedItem.postalCode
    ) {
      getPlaceSchedule(
        selectedItem.locationName,
        selectedItem.locationAddress,
        selectedItem.postalCode,
        setSchedule
      );
    }
  }, [selectedItem]);

  return (
    <div className="selected-container">
      <div className="selected-box">
        <div className="about">
          {adminLogin && (
            <AdminEditButtons
              setIsKeywordsModalOpen={setIsKeywordsModalOpen}
              setIsFiltersModalOpen={setIsFiltersModalOpen}
            />
          )}

          <h3>{selectedItem.locationName}</h3>
          <p>{selectedItem.locationDescription}</p>
          {adminLogin && (
            <div
              className="editdescription"
              onClick={() => setIsDescriptionModalOpen(true)}
            >
              éditer la description
            </div>
          )}

          <p className="icon-box">
            <span>
              <FontAwesomeIcon
                className="fa-location-icon"
                icon="fa-solid fa-location-dot"
              />
            </span>
            <span>{`${selectedItem.locationAddress}, ${selectedItem.postalCode}`}</span>
          </p>

          <OpeningStatus schedule={schedule} />

          <div className="insta-title">
            <FontAwesomeIcon
              className="fa-instagram-icon"
              icon="fa-brands fa-instagram"
            />
            <a
              href={`https://www.instagram.com/${formatInstagramUsername(
                selectedItem.socialmedia
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedItem.socialmedia}
            </a>
          </div>

          {adminLogin && (
            <div
              className="editadress"
              onClick={() => setIsAddressModalOpen(true)}
            >
              éditer l'adresse
            </div>
          )}

          <div className="line"></div>

          <div className="tips">
            <h4>Conseils</h4>
            <ul>
              {selectedItem.tips && JSON.parse(selectedItem.tips).length > 0 ? (
                JSON.parse(selectedItem.tips).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))
              ) : (
                <li>Aucun conseil disponible pour cet endroit.</li>
              )}
            </ul>
          </div>

          <div className="reviews">
            <div>
              <FontAwesomeIcon
                className="fa-lock-icon"
                icon="fa-solid fa-lock"
              />
            </div>
            <div
              onClick={() => navigate("/premium")}
              style={{ cursor: "pointer" }}
            >
              Devient membre premium pour avoir accès à ce contenu.
            </div>
          </div>

          <KeywordsModal
            isOpen={isKeywordsModalOpen}
            onClose={() => setIsKeywordsModalOpen(false)}
            locationId={selectedItem._id}
            currentKeywords={selectedItem.keywords || []}
            onKeywordsUpdate={(updatedKeywords) => {
              setSelectedItem({
                ...selectedItem,
                keywords: updatedKeywords,
              });
            }}
          />
          <FiltersModal
            isOpen={isFiltersModalOpen}
            onClose={() => setIsFiltersModalOpen(false)}
            locationId={selectedItem._id}
            currentFilters={selectedItem.filters || []}
            onFiltersUpdate={(updatedFilters) => {
              setSelectedItem({
                ...selectedItem,
                filters: updatedFilters,
              });
            }}
          />
          <AddressModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            locationId={selectedItem._id}
            currentAddress={selectedItem.locationAddress}
            currentPostalCode={selectedItem.postalCode}
            onAddressUpdate={handleAddressUpdate}
          />
          <DescriptionModal
            isOpen={isDescriptionModalOpen}
            onClose={() => setIsDescriptionModalOpen(false)}
            locationId={selectedItem._id}
            currentDescription={selectedItem.locationDescription}
            onDescriptionUpdate={handleDescriptionUpdate}
          />
        </div>
      </div>

      {showModal && (
        <ImageEditModal
          onClose={handleToggleModal}
          onSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          previewImage={previewImage}
        />
      )}

      <div className="img-box">
        <div className="img1">
          {adminLogin && (
            <div
              className="deleted"
              aria-label={`Supprimer la photo 1`}
              onClick={() => {
                if (selectedItem.photos && selectedItem.photos[0])
                  deletePhoto(idLocation, selectedItem.photos[0]);
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </div>
          )}
          {selectedItem.photos && selectedItem.photos[0] ? (
            <img src={selectedItem.photos[0]} alt={`Photo1`} />
          ) : (
            <p>image1</p>
          )}
        </div>
        <div className="img2"></div>

        {adminLogin && (
          <div className="modal-box">
            <p onClick={handleToggleModal}>éditer les images</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedLocation;
