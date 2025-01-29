import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

interface Schedule {
  status?: string;
  opening_hours?: {
    open_now: boolean;
  };
}

interface OpeningStatusProps {
  schedule: Schedule | null;
}

const OpeningStatus: React.FC<OpeningStatusProps> = ({ schedule }) => {
  return (
    <p className="layer-box">
      <span>
        <FontAwesomeIcon className="fa-layer-icon" icon={faClock} />
        {schedule && schedule.status === "not_found"
          ? "Indisponible"
          : schedule &&
            schedule.opening_hours &&
            schedule.opening_hours.open_now
          ? `Ouvert actuellement`
          : "Fermé actuellement"}
      </span>
    </p>
  );
};

export default OpeningStatus;
