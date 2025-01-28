import { useEffect, useContext, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { fetchDataSelectedItem } from "../services/fetchDataItems";
import { editPhotosForm, deletePhoto } from "../services/sendForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeywordsModal from "../components/modals/KeywordsModal";
import FiltersModal from "../components/modals/FiltersModal";
import AddressModal from "../components/modals/AddressModal";
import DescriptionModal from "../components/modals/DescriptionModal";
import { getPlaceSchedule } from "../services/askSchedule";
import { formatInstagramUsername } from "../utils/formatInstagramUsername";

const SelectedLocation = () => {
  const { idLocation } = useParams();

  const {
    selectedItem = {},
    setSelectedItem,
    adminLogin,
    schedule,
    setSchedule,
  } = useContext(MyContext) || {};

  const [showModal, setShowModal] = useState(false);
  const [isKeywordsModalOpen, setIsKeywordsModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Veuillez sélectionner une image avant de soumettre.");
      return;
    }

    editPhotosForm(idLocation, selectedFile);
    console.log("Image envoyée :", selectedFile);

    setSelectedFile(null);
    setPreviewImage(null);
    setShowModal(false);
  };

  const handleAddressUpdate = (newAddress, newPostalCode) => {
    setSelectedItem({
      ...selectedItem,
      locationAddress: newAddress,
      postalCode: newPostalCode,
    });
  };

  const handleDescriptionUpdate = (newDescription) => {
    setSelectedItem({
      ...selectedItem,
      locationDescription: newDescription,
    });
  };

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
          {/* TODO: Extraire en composant AdminEditButtons */}
          {adminLogin && (
            <div>
              <div
                className="editkeywords"
                onClick={() => setIsKeywordsModalOpen(true)}
              >
                éditer les mots clés
              </div>
              <div
                className="editkeywords"
                onClick={() => setIsFiltersModalOpen(true)}
              >
                éditer les filtres
              </div>
            </div>
          )}

          {/* TODO: Extraire en composant LocationHeader */}
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

          {/* TODO: Extraire en composant LocationAddress */}
          <p className="icon-box">
            <span>
              <FontAwesomeIcon
                className="fa-location-icon"
                icon="fa-solid fa-location-dot"
              />
            </span>
            <span>{`${selectedItem.locationAddress}, ${selectedItem.postalCode}`}</span>
          </p>

          {/* TODO: Extraire en composant OpeningStatus */}
          <p className="layer-box">
            <span>
              <FontAwesomeIcon
                className="fa-layer-icon"
                icon="fa-regular fa-clock"
              />
              {schedule && schedule.status === "not_found"
                ? "Indisponible"
                : schedule &&
                  schedule.opening_hours &&
                  schedule.opening_hours.open_now
                ? `Ouvert actuellement`
                : "Fermé actuellement"}
            </span>
          </p>

          {/* TODO: Extraire en composant InstagramLink */}
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

          {/* TODO: Extraire en composant LocationTips */}
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

          {/* TODO: Extraire en composant PremiumContent */}
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

          {/* TODO: Extraire en composant EditModals */}
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

      {/* TODO: Extraire en composant ImageEditModal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleToggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Éditer l'emplacement</h2>
            <p>Contenu de la modale ici</p>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            {previewImage && (
              <div className="image-preview">
                <img
                  src={previewImage}
                  alt="Prévisualisation"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}

            <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
              Envoyer
            </button>
            <button onClick={handleToggleModal}>Fermer</button>
          </div>
        </div>
      )}

      {/* TODO: Extraire en composant LocationGallery */}
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
