import React from 'react';

interface AdminEditButtonsProps {
  setIsKeywordsModalOpen: (isOpen: boolean) => void;
  setIsFiltersModalOpen: (isOpen: boolean) => void;
}

const AdminEditButtons: React.FC<AdminEditButtonsProps> = ({
  setIsKeywordsModalOpen,
  setIsFiltersModalOpen
}) => {
  return (
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
  );
};

export default AdminEditButtons;
