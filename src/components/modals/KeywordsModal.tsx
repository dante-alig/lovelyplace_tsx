import React, { useState } from "react";
import { updateKeywords } from "../../services/sendForm";

type KeywordAction = 'add' | 'remove';

interface KeywordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationId: string;
  currentKeywords: string[];
  onKeywordsUpdate: (keywords: string[]) => void;
}

interface UpdateKeywordsResponse {
  keywords: string[];
  [key: string]: any;
}

const KeywordsModal: React.FC<KeywordsModalProps> = ({
  isOpen,
  onClose,
  locationId,
  currentKeywords,
  onKeywordsUpdate,
}) => {
  const [newKeyword, setNewKeyword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddKeyword = async (): Promise<void> => {
    if (!newKeyword.trim()) {
      setError("Le mot-clé ne peut pas être vide");
      return;
    }

    try {
      const updatedKeywords = await updateKeywords(
        locationId,
        "add",
        [newKeyword]
      ) as UpdateKeywordsResponse;
      onKeywordsUpdate(updatedKeywords.keywords);
      setNewKeyword("");
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erreur lors de l'ajout du mot-clé");
      }
    }
  };

  const handleRemoveKeyword = async (keyword: string): Promise<void> => {
    try {
      const updatedKeywords = await updateKeywords(
        locationId,
        "remove",
        [keyword]
      ) as UpdateKeywordsResponse;
      onKeywordsUpdate(updatedKeywords.keywords);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erreur lors de la suppression du mot-clé");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Gérer les mots-clés</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="keyword-input-container">
            <input
              type="text"
              value={newKeyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewKeyword(e.target.value)}
              placeholder="Nouveau mot-clé"
              className="keyword-input"
            />
            <button onClick={handleAddKeyword} className="add-keyword-button">
              Ajouter
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="current-keywords">
            <h3>Mots-clés actuels :</h3>
            <div className="keywords-list">
              {currentKeywords.map((keyword, index) => (
                <div key={index} className="keyword-item">
                  <span>{keyword}</span>
                  <button
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="remove-keyword-button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordsModal;
