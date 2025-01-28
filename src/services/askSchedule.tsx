import React from 'react';
import axios, { AxiosError } from "axios";
import { formatAddressForSchedule } from "../utils/adressForSchedule";

interface Schedule {
  status?: 'not_found';
  [key: string]: any; // À remplacer par la structure exacte de vos données d'horaires
}

type SetScheduleFunction = React.Dispatch<React.SetStateAction<Schedule>>;

export const getPlaceSchedule = async (
  locationName: string,
  locationAddress: string,
  postalCode: string,
  setSchedule: SetScheduleFunction
): Promise<Schedule> => {
  const BASE_URL = "https://site--back-lovelyplace-main--dqd24mcv82s5.code.run";
  try {
    const formattedAddress = formatAddressForSchedule(
      locationName,
      locationAddress,
      postalCode
    );

    if (!formattedAddress) {
      throw new Error("Nom du lieu, adresse et code postal requis");
    }

    const response = await axios.post<Schedule>(`${BASE_URL}/place/hours`, {
      address: formattedAddress,
    });

    if (!response.data) {
      throw new Error("Pas de données reçues du serveur");
    }

    setSchedule(response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      if (axiosError.response.status === 404) {
        const notFoundSchedule: Schedule = { status: 'not_found' };
        setSchedule(notFoundSchedule);
        return notFoundSchedule;
      }
      throw new Error(
        (axiosError.response.data as any).error ||
        (axiosError.response.data as any).message ||
        "Erreur lors de la récupération des horaires"
      );
    } else if (axiosError.request) {
      throw new Error("Pas de réponse du serveur");
    } else {
      throw new Error(axiosError.message || "Erreur de connexion au serveur");
    }
  }
};
