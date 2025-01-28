import React from 'react';
import axios, { AxiosError } from "axios";

const BASE_URL = "https://site--portfolio-lovelyplace-backend--dqd24mcv82s5.code.run";

interface LocationData {
  locationName: string;
  locationAddress: string;
  locationDescription: string;
  tips: string[];
  socialmedia?: string;
  mediaLink: Record<string, string>;
  hours: Record<string, string>;
  priceRange: string;
  keywords: string[];
  filters: Record<string, string[]>;
  postalCode?: string;
  placeCategory?: string;
  photos?: File[];
}

interface LocationResponse {
  _id: string;
  photos: string[];
  [key: string]: any;
}

type SetItemsFunction = React.Dispatch<React.SetStateAction<LocationResponse[]>>;

export const sendForm = async ({
  locationName,
  locationAddress,
  locationDescription,
  tips,
  socialmedia,
  mediaLink,
  photos,
  hours,
  priceRange,
  keywords,
  filters,
  postalCode,
  placeCategory
}: LocationData): Promise<void> => {
  if (!locationName || !locationAddress || !locationDescription || !priceRange) {
    alert("Vous devez remplir tous les champs obligatoires.");
    return;
  }

  if (
    typeof mediaLink !== "object" ||
    typeof hours !== "object" ||
    typeof filters !== "object" ||
    !Array.isArray(keywords)
  ) {
    alert("Les champs mediaLink, hours, filters, et keywords doivent être des objets ou des tableaux.");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("locationName", locationName);
    formData.append("locationAddress", locationAddress);
    formData.append("locationDescription", locationDescription);
    formData.append("tips", JSON.stringify(tips));
    formData.append("socialmedia", socialmedia || "");
    formData.append("mediaLink", JSON.stringify(mediaLink));
    formData.append("hours", JSON.stringify(hours));
    formData.append("priceRange", priceRange);
    formData.append("keywords", JSON.stringify(keywords));
    formData.append("filters", JSON.stringify(filters));
    formData.append("postalCode", postalCode || "");
    formData.append("placeCategory", placeCategory || "");

    if (photos && photos.length) {
      photos.forEach((photo) => {
        formData.append("photos", photo);
        console.log("La photo existe >>>", photo);
      });
    }

    const response = await axios.post<LocationResponse>(`${BASE_URL}/location`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Réponse du serveur:", response.data);
    alert("Données enregistrées avec succès !");
    console.log("Données envoyées:", {
      locationName,
      locationAddress,
      locationDescription,
      tips,
      socialmedia,
      mediaLink,
      hours,
      priceRange,
      keywords,
      filters,
      postalCode,
      placeCategory,
      photos,
    });
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Erreur lors de l'envoi du formulaire:", error);

    if (axiosError.response) {
      console.error("Détails de l'erreur:", axiosError.response.data);
      alert(
        `Une erreur est survenue: ${
          axiosError.response.data.message || "Erreur inconnue"
        }`
      );
    } else {
      alert("Une erreur est survenue lors de l'enregistrement des données.");
    }
  }
};

export const editPhotosForm = async (
  idLocation: string,
  selectedFile: File
): Promise<LocationResponse> => {
  try {
    const formData = new FormData();

    if (selectedFile) {
      console.log("selectedFile >>>", selectedFile);
      formData.append("photos", selectedFile);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.put<LocationResponse>(
      `${BASE_URL}/items/${idLocation}`,
      formData,
      config
    );

    console.log("Réponse du serveur:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la location:", error);
    throw error;
  }
};

export const deletePhoto = async (
  idLocation: string,
  photoUrl: string
): Promise<string[]> => {
  try {
    const response = await axios.delete<LocationResponse>(
      `${BASE_URL}/items/${idLocation}/photo`,
      {
        data: { photoUrl },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Photo supprimée avec succès :", response.data);
      return response.data.photos;
    }
    throw new Error("La suppression a échoué");
  } catch (error) {
    console.error("Erreur lors de la suppression de la photo :", error);
    throw error;
  }
};

export const updateKeywords = async (
  idLocation: string,
  action: 'add' | 'remove',
  keywords: string[]
): Promise<LocationResponse> => {
  try {
    const response = await axios.put<LocationResponse>(
      `${BASE_URL}/items/${idLocation}/keywords`,
      {
        action,
        keywords,
      }
    );

    if (response.status === 200) {
      console.log("Keywords mis à jour avec succès");
      return response.data;
    }
    throw new Error("La mise à jour a échoué");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des keywords:", error);
    throw error;
  }
};

export const updateFilters = async (
  idLocation: string,
  action: 'add' | 'remove',
  filters: Record<string, string[]>
): Promise<LocationResponse> => {
  try {
    const response = await axios.put<LocationResponse>(
      `${BASE_URL}/items/${idLocation}/filters`,
      {
        action,
        filters,
      }
    );

    if (response.status === 200) {
      console.log("Filtres mis à jour avec succès");
      return response.data;
    }
    throw new Error("La mise à jour a échoué");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des filtres:", error);
    throw error;
  }
};

export const updateAddress = async (
  idLocation: string,
  postalCode: string,
  locationAddress: string
): Promise<LocationResponse> => {
  try {
    const response = await axios.put<LocationResponse>(
      `${BASE_URL}/items/${idLocation}/address`,
      {
        postalCode,
        locationAddress,
      }
    );

    if (response.status === 200) {
      console.log("Adresse mise à jour avec succès");
      return response.data;
    }
    throw new Error("La mise à jour a échoué");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'adresse:", error);
    throw error;
  }
};

export const updateDescription = async (
  idLocation: string,
  locationDescription: string
): Promise<LocationResponse> => {
  try {
    const response = await axios.put<LocationResponse>(
      `${BASE_URL}/items/${idLocation}/description`,
      {
        locationDescription,
      }
    );

    if (response.status === 200) {
      console.log("Description mise à jour avec succès");
      return response.data;
    }
    throw new Error("La mise à jour a échoué");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la description:", error);
    throw error;
  }
};

export const searchLocations = async (
  searchQuery: string,
  setItems: SetItemsFunction
): Promise<void> => {
  try {
    const response = await axios.get<LocationResponse[]>(
      `${BASE_URL}/search?q=${encodeURIComponent(searchQuery)}`
    );

    if (response.status === 200) {
      setItems(response.data);
    } else {
      throw new Error("La recherche a échoué");
    }
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    setItems([]);
  }
};
