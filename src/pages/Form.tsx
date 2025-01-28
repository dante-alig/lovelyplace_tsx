import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { sendForm } from "../services/sendForm";
import { filterCategories } from "../utils/filterCategories";

type PlaceCategory = "prendre_un_verre" | "manger_ensemble" | "partager_une_activité" | "";
type PriceRange = "7€" | "10€" | "15€" | "20€" | "25€" | "35€ et +" | "";

const Form: React.FC = () => {
  // NOM DU LIEU
  const [locationName, setLocationName] = useState<string>("");

  // ADRESSE DU LIEU
  const [locationAddress, setLocationAddress] = useState<string>("");

  // DESCRIPTION DU LIEU
  const [locationDescription, setLocationDescription] = useState<string>("");

  // ASTUCES (4 astuces maximum)
  const [tips, setTips] = useState<string[]>(["", "", "", ""]);

  // NOM DU RESEAU SOCIAL (INSTAGRAM PAR EXEMPLE)
  const [socialmedia, setSocialmedia] = useState<string>("");

  // PHOTOS DU LIEU
  const [photos, setPhotos] = useState<File[]>([]);

  // APERÇUS DES PHOTOS
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  // FOURCHETTE DE PRIX
  const [priceRange, setPriceRange] = useState<PriceRange>("");

  // CATEGORIE DU LIEU (VERRE, MANGER, ACTIVITE)
  const [placeCategory, setPlaceCategory] = useState<PlaceCategory>("");

  // MOTS-CLES POUR LE LIEU
  const [keywords, setKeywords] = useState<string[]>([]); // Mots-clés ajoutés
  const [newKeyword, setNewKeyword] = useState<string>("");

  const [filters, setFilters] = useState<string[]>([]);

  // CODE POSTAL
  const [postalCode, setPostalCode] = useState<string>("");

  // NOTE DU LIEU
  const [rating, setRating] = useState<string>("");

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
  const handleTipsChange = (index: number, value: string): void => {
    setTips((prevTips) => {
      const updatedTips = [...prevTips];
      updatedTips[index] = value;
      return updatedTips;
    });
  };

  // GESTION DE L'AJOUT DE PHOTOS ET DE LEUR APERCU
  const handlePhotosChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setPhotos((prevPhotos) => [...prevPhotos, ...files]);

      const previews = files.map((file) => URL.createObjectURL(file));
      setPhotoPreviews((prevPreviews) => [...prevPreviews, ...previews]);
    }
  };

  // AJOUT D'UN MOT-CLE
  const handleAddKeyword = (): void => {
    if (newKeyword.trim()) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  // SUPPRESSION D'UN MOT-CLE
  const handleRemoveKeyword = (index: number): void => {
    setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
  };

  // SOUMISSION DU FORMULAIRE
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    sendForm(
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
    );
  };

  const handleFilterChange = (category: string, option: string): void => {
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
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setPlaceCategory(event.target.value as PlaceCategory)
              }
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
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setLocationName(event.target.value)
              }
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
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setLocationAddress(event.target.value)
              }
            />
          </div>

          {/* CODE POSTAL */}
          <div className="form-position">
            <input
              id="postalCode"
              type="text"
              placeholder="Code postal"
              value={postalCode}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPostalCode(event.target.value)
              }
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
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setRating(event.target.value)
              }
            />
          </div>

          {/* DESCRIPTION DU LIEU */}
          <div className="form-position">
            <input
              id="locationDescription"
              type="text"
              placeholder="Description du lieu"
              value={locationDescription}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setLocationDescription(event.target.value)
              }
            />
          </div>

          {/* FOURCHETTE DE PRIX */}
          <div className="form-position">
            <label htmlFor="priceRange">Fourchette de prix :</label>
            <select
              id="priceRange"
              value={priceRange}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setPriceRange(event.target.value as PriceRange)
              }
            >
              <option value="">Sélectionner</option>
              <option value="7€">7€</option>
              <option value="10€">10€</option>
              <option value="15€">15€</option>
              <option value="20€">20€</option>
              <option value="25€">25€</option>
              <option value="35€ et +">35€ et +</option>
            </select>
          </div>

          {/* ASTUCES POUR LE LIEU */}
          {[0, 1, 2, 3].map((index) => (
            <div className="form-position" key={index}>
              <input
                type="text"
                placeholder={`Astuce ${index + 1}`}
                value={tips[index] || ""}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
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
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSocialmedia(event.target.value)
              }
            />
          </div>

          {/* AJOUT DES MOTS-CLES */}
          <div className="form-position">
            <label>Mots-clés :</label>
            <input
              type="text"
              placeholder="Ajouter un mot-clé"
              value={newKeyword}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewKeyword(event.target.value)
              }
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
                {options.map((option: string, index: number) => (
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
