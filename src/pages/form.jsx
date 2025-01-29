import { useState, useEffect } from "react";
import { sendForm } from "../services/sendForm";
import { filterCategories } from "../utils/filterCategories";

const Form = () => {
  // NOM DU LIEU
  const [locationName, setLocationName] = useState("");

  // ADRESSE DU LIEU
  const [locationAddress, setLocationAddress] = useState("");

  // DESCRIPTION DU LIEU
  const [locationDescription, setLocationDescription] = useState("");

  // ASTUCES (4 astuces maximum)
  const [tips, setTips] = useState(["", "", "", ""]);

  // NOM DU RESEAU SOCIAL (INSTAGRAM PAR EXEMPLE)
  const [socialmedia, setSocialmedia] = useState("");

  // PHOTOS DU LIEU
  const [photos, setPhotos] = useState([]);

  // APERÇUS DES PHOTOS
  const [photoPreviews, setPhotoPreviews] = useState([]);

  // FOURCHETTE DE PRIX
  const [priceRange, setPriceRange] = useState("");

  // CATEGORIE DU LIEU (VERRE, MANGER, ACTIVITE)
  const [placeCategory, setPlaceCategory] = useState("");

  // MOTS-CLES POUR LE LIEU
  const [keywords, setKeywords] = useState([]); // Mots-clés ajoutés
  const [newKeyword, setNewKeyword] = useState(""); // Nouveau mot-clé en cours de saisie

  const [filters, setFilters] = useState([]);

  // CODE POSTAL
  const [postalCode, setPostalCode] = useState("");

  // NOTE DU LIEU
  const [rating, setRating] = useState("");

  useEffect(() => {
    // LOG DES VALEURS D'ETAT POUR LE DEBUGGING
    console.log({
      locationName,
      locationAddress,
      locationDescription,
      tips,
      socialmedia,
      photos,
      keywords,
    });
  }, [
    locationName,
    locationAddress,
    locationDescription,
    tips,
    socialmedia,
    photos,
    keywords,
  ]);

  // GESTION DE LA MODIFICATION DES ASTUCES
  const handleTipsChange = (index, value) => {
    setTips((prevTips) => {
      const updatedTips = [...prevTips];
      updatedTips[index] = value;
      return updatedTips;
    });
  };

  // GESTION DE L'AJOUT DE PHOTOS ET DE LEUR APERCU
  const handlePhotosChange = (event) => {
    const files = Array.from(event.target.files);

    setPhotos((prevPhotos) => [...prevPhotos, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  // AJOUT D'UN MOT-CLE
  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  // SUPPRESSION D'UN MOT-CLE
  const handleRemoveKeyword = (index) => {
    setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
  };

  // SOUMISSION DU FORMULAIRE
  const handleSubmit = (event) => {
    event.preventDefault();
    sendForm({
      locationName,
      locationAddress,
      locationDescription,
      tips,
      socialmedia,
      photos,
      priceRange,
      keywords,
      filters,
      postalCode,
      placeCategory,
      rating
    });
  };

  const handleFilterChange = (category, option) => {
    setFilters((prevFilters) => {
      const filterKey = `${category}:${option}`;
      return prevFilters.includes(filterKey)
        ? prevFilters.filter((filter) => filter !== filterKey)
        : [...prevFilters, filterKey];
    });
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* SELECTION DE LA CATEGORIE DU LIEU */}
          <div className="form-position">
            <label htmlFor="placeCategory">Catégorie :</label>
            <select
              id="placeCategory"
              value={placeCategory}
              onChange={(event) => setPlaceCategory(event.target.value)}
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="prendre_un_verre">Prendre un verre</option>
              <option value="manger_ensemble">Manger ensemble</option>
              <option value="partager_une_activité">
                Partager une activité
              </option>
            </select>
          </div>

          {/* NOM DU LIEU */}
          <div className="form-position">
            <input
              id="locationName"
              type="text"
              placeholder="Nom du lieu"
              value={locationName}
              onChange={(event) => setLocationName(event.target.value)}
            />
          </div>

          {/* AJOUT DE PHOTOS */}
          <div className="form-position">
            <label htmlFor="photos">Ajouter des photos :</label>
            <input
              id="photos"
              type="file"
              multiple
              onChange={handlePhotosChange}
            />
          </div>

          {/* APERCU DES PHOTOS */}
          <div className="photo-previews">
            {photoPreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Aperçu de la photo ${index + 1}`}
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
            ))}
          </div>

          {/* ADRESSE DU LIEU */}
          <div className="form-position">
            <input
              id="locationAddress"
              type="text"
              placeholder="Adresse du lieu"
              value={locationAddress}
              onChange={(event) => setLocationAddress(event.target.value)}
            />
          </div>

          {/* CODE POSTAL */}
          <div className="form-position">
            <input
              id="postalCode"
              type="text"
              placeholder="Code postal"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
            />
          </div>

          {/* NOTE DU LIEU */}
          <div className="form-position">
            <label htmlFor="rating">Note :</label>
            <input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              placeholder="Note du lieu"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            />
          </div>

          {/* DESCRIPTION DU LIEU */}
          <div className="form-position">
            <input
              id="locationDescription"
              type="text"
              placeholder="Description du lieu"
              value={locationDescription}
              onChange={(event) => setLocationDescription(event.target.value)}
            />
          </div>

          {/* FOURCHETTE DE PRIX */}
          <div className="form-position">
            <label htmlFor="priceRange">Fourchette de prix :</label>
            <select
              id="priceRange"
              value={priceRange}
              onChange={(event) => setPriceRange(event.target.value)}
            >
              <option value="">Sélectionner</option>
              <option value="7€">7€</option>
              <option value="10€">10€</option>
              <option value="15€">15€</option>
              <option value="20€">20€</option>
              <option value="25€">25€</option>
              <option value="35€ et +">35€ et + </option>
            </select>
          </div>

          {/* ASTUCES POUR LE LIEU */}
          {[0, 1, 2, 3].map((index) => (
            <div className="form-position" key={index}>
              <input
                type="text"
                placeholder={`Astuce ${index + 1}`}
                value={tips[index] || ""}
                onChange={(event) =>
                  handleTipsChange(index, event.target.value)
                }
              />
            </div>
          ))}

          {/* RESEAU SOCIAL INSTAGRAM */}
          <div className="form-position">
            <input
              id="instagram"
              type="text"
              placeholder="Instagram"
              value={socialmedia}
              onChange={(event) => setSocialmedia(event.target.value)}
            />
          </div>

          {/* AJOUT DES MOTS-CLES */}
          <div className="form-position">
            <label>Mots-clés :</label>
            <input
              type="text"
              placeholder="Ajouter un mot-clé"
              value={newKeyword}
              onChange={(event) => setNewKeyword(event.target.value)}
            />
            <button type="button" onClick={handleAddKeyword}>
              Ajouter
            </button>
            <div className="keywords-list">
              {keywords.map((keyword, index) => (
                <span key={index} className="keyword-item">
                  {keyword}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(index)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* FILTRES PAR CATÉGORIE */}
          <div className="form-position">
            <h3>Filtres :</h3>
            {Object.entries(filterCategories).map(([category, options]) => (
              <div key={category} className="filter-category">
                <h4>{category}</h4>
                {options.map((option, index) => (
                  <div key={index} className="filter-option">
                    <input
                      type="checkbox"
                      id={`filter-${category}-${index}`}
                      value={option}
                      checked={filters.includes(`${category}:${option}`)}
                      onChange={() => handleFilterChange(category, option)}
                    />
                    <label htmlFor={`filter-${category}-${index}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* BOUTON DE SOUMISSION */}
          <button type="submit">Valider</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
