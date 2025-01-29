import axios from "axios";

const BASE_URL =
  "https://site--portfolio-lovelyplace-backend--dqd24mcv82s5.code.run";

interface GeocodingResponse {
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  locationDescription?: string;
  photo?: string;
  id?: string;
}

export const addressToCoordinates = async (
  address: string,
  key: string,
  locationDescription?: string,
  photo?: string,
  id?: string
): Promise<GeocodingResponse | null> => {
  try {
    const response = await axios.post<GeocodingResponse>(
      `${BASE_URL}/geocode`,
      {
        address,
        key,
        locationDescription,
        photo,
        id,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la géolocalisation :",
      error instanceof Error ? error.message : "Unknown error"
    );
    return null;
  }
};
