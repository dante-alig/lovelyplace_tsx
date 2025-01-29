import React, { useState } from "react";
import { updateFilters } from "../../services/sendForm";

type FilterAction = 'add' | 'remove';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationId: string;
  currentFilters: string[];
  onFiltersUpdate: (filters: string[]) => void;
}

interface UpdateFiltersResponse {
  filters: string[];
  [key: string]: any;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  locationId,
  currentFilters,
  onFiltersUpdate,
}) => {
  const [filterKey, setFilterKey] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddFilter = async (): Promise<void> => {
    if (!filterKey.trim() || !filterValue.trim()) {
      setError("La clé et la valeur sont requises");
      return;
    }

    try {
      const updatedFilters = await updateFilters(
        locationId,
        "add",
        { [filterKey]: [filterValue] }
      ) as UpdateFiltersResponse;
      onFiltersUpdate(updatedFilters.filters);
      setFilterKey("");
      setFilterValue("");
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erreur lors de l'ajout du filtre");
      }
    }
  };

  const handleRemoveFilter = async (filterString: string): Promise<void> => {
    try {
      const updatedFilters = await updateFilters(
        locationId,
        "remove",
        { filters: [filterString] }
      ) as UpdateFiltersResponse;
      onFiltersUpdate(updatedFilters.filters);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erreur lors de la suppression du filtre");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && filterKey.trim() && filterValue.trim()) {
      handleAddFilter();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Gérer les filtres</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="filter-inputs">
            <div className="filter-input-group">
              <input
                type="text"
                value={filterKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterKey(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Clé du filtre (ex: Décoration)"
                className="filter-input"
              />
              <input
                type="text"
                value={filterValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Valeur du filtre (ex: Cosy)"
                className="filter-input"
              />
              <button
                onClick={handleAddFilter}
                className="add-filter-button"
                disabled={!filterKey.trim() || !filterValue.trim()}
              >
                Ajouter
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="current-filters">
            <h3>Filtres actuels :</h3>
            <div className="filters-list">
              {currentFilters.map((filter, index) => {
                const [key, value] = filter.split(":");
                return (
                  <div key={index} className="filter-item">
                    <span>
                      {key}: {value}
                    </span>
                    <button
                      onClick={() => handleRemoveFilter(filter)}
                      className="remove-filter-button"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
