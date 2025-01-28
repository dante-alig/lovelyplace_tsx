import React, { useState } from "react";
import { updateAddress } from "../../services/sendForm";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationId: string;
  currentAddress?: string;
  currentPostalCode?: string;
  onAddressUpdate: (address: string, postalCode: string) => void;
}

interface UpdateAddressResponse {
  locationAddress: string;
  postalCode: string;
  [key: string]: any;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  locationId,
  currentAddress,
  currentPostalCode,
  onAddressUpdate,
}) => {
  const [address, setAddress] = useState<string>(currentAddress || "");
  const [postalCode, setPostalCode] = useState<string>(currentPostalCode || "");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const result = await updateAddress(locationId, postalCode, address) as UpdateAddressResponse;
      onAddressUpdate(result.locationAddress, result.postalCode);
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
          <h2>Modifier l'adresse</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="address">Adresse :</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                placeholder="Entrez l'adresse"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Code postal :</label>
              <input
                id="postalCode"
                type="text"
                value={postalCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostalCode(e.target.value)}
                placeholder="Code postal (5 chiffres)"
                className="form-input"
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="modal-footer">
              <button type="submit" className="submit-button">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
