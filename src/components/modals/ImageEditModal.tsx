import React from 'react';

interface ImageEditModalProps {
  onClose: () => void;
  onSubmit: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewImage: string | null;
}

const ImageEditModal: React.FC<ImageEditModalProps> = ({ 
  onClose, 
  onSubmit, 
  handleFileChange, 
  previewImage 
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
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

        <button onClick={onSubmit} style={{ marginRight: "10px" }}>
          Envoyer
        </button>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default ImageEditModal;
