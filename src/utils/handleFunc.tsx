import { Dispatch, SetStateAction } from "react";
import { editPhotosForm } from "../services/sendForm";

interface SelectedItem {
  locationAddress?: string;
  postalCode?: string;
  locationDescription?: string;
  [key: string]: any;
}

interface HandleFuncProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  setPreviewImage: Dispatch<SetStateAction<string | null>>;
  selectedFile: File | null;
  idLocation: string;
  selectedItem: SelectedItem;
  setSelectedItem: Dispatch<SetStateAction<SelectedItem>>;
}

interface HandleFuncReturn {
  handleToggleModal: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleAddressUpdate: (newAddress: string, newPostalCode: string) => void;
  handleDescriptionUpdate: (newDescription: string) => void;
}

export const handleFunc = ({
  showModal,
  setShowModal,
  setSelectedFile,
  setPreviewImage,
  selectedFile,
  idLocation,
  selectedItem,
  setSelectedItem,
}: HandleFuncProps): HandleFuncReturn => {
  const handleToggleModal = (): void => {
    setShowModal(!showModal);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleSubmit = (): void => {
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

  const handleAddressUpdate = (
    newAddress: string,
    newPostalCode: string
  ): void => {
    setSelectedItem({
      ...selectedItem,
      locationAddress: newAddress,
      postalCode: newPostalCode,
    });
  };

  const handleDescriptionUpdate = (newDescription: string): void => {
    setSelectedItem({
      ...selectedItem,
      locationDescription: newDescription,
    });
  };

  return {
    handleToggleModal,
    handleFileChange,
    handleSubmit,
    handleAddressUpdate,
    handleDescriptionUpdate,
  };
};
