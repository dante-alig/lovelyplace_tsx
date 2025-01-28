import React from "react";
import { motion } from "framer-motion";

type AnimationDirection = 'left' | 'right';

interface HookItemsProps {
  title: string;
  content: string;
  imageSrc: string;
  isReversed?: boolean;
  animationDirection?: AnimationDirection;
  classType?: string;
}

interface SlideAnimation {
  hidden: {
    opacity: number;
    x: number;
  };
  visible: {
    opacity: number;
    x: number;
  };
}

const HookItems: React.FC<HookItemsProps> = ({
  title,
  content,
  imageSrc,
  isReversed = false,
  animationDirection = "right",
  classType,
}) => {
  const slideAnimation: SlideAnimation = {
    hidden: {
      opacity: 0,
      x: animationDirection === "right" ? 50 : -50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const ContentSection: React.FC = () => (
    <div className={classType}>
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );

  const ImageSection: React.FC = () => (
    <div className="hook-item-img">
      <img src={imageSrc} alt={title} />
    </div>
  );

  return (
    <motion.div
      className="hook-container"
      initial="hidden"
      whileInView="visible"
      variants={slideAnimation}
      transition={{ duration: 0.6 }}
    >
      {isReversed ? (
        <>
          <ContentSection />
          <ImageSection />
        </>
      ) : (
        <>
          <ImageSection />
          <ContentSection />
        </>
      )}
    </motion.div>
  );
};

export default HookItems;
