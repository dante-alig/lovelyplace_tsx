import React from "react";
import { motion, Variants } from "framer-motion";

interface AdvantageProps {
  title: string;
  description: string;
  videoSrc: string;
  fadeInUp: Variants;
}

const Advantage: React.FC<AdvantageProps> = ({ title, description, videoSrc, fadeInUp }) => {
  return (
    <motion.div className="advantages" variants={fadeInUp}>
      <div className="advantages-infos">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
      <div className="advantages-block">
        <video autoPlay loop muted>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </motion.div>
  );
};

export default Advantage;
