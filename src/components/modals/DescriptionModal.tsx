import React, { useState } from "react";
import { updateDescription } from "../../services/sendForm";

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationId: string;
  currentDescription?: string;
  onDescriptionUpdate: (description: string) => void;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  isOpen,
  onClose,
  locationId,
  currentDescription,
  onDescriptionUpdate,
}) => {
  const [description, setDescription] = useState<string>(currentDescription || "");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await updateDescription(locationId, description);
      onDescriptionUpdate(description);  
      setError("");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur est survenue");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Modifier la description</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="description">Description :</label>
              <textarea
                id="description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                placeholder="Entrez la description"
                className="form-textarea"
                rows={6}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="modal-footer">
              <button
                type="submit"
                className="submit-button"
                disabled={!description.trim()}
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
