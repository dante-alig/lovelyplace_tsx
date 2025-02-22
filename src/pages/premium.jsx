import React from "react";
import { motion } from "framer-motion";
import HookItems from "../components/items/HookItems";
import Advantage from "../components/premium/Advantage";
import { handleSubscription } from "../services/payment";
import video1 from "../assets/videos/1.mp4";
import video2 from "../assets/videos/2.mp4";
import video3 from "../assets/videos/3.mp4";
import video4 from "../assets/videos/4.mp4";
import ct1 from "../assets/images/ct1.jpg";
import ct4 from "../assets/images/ct4.jpg";
import ct5 from "../assets/images/ct5.jpg";
import ct6 from "../assets/images/ct6.jpg";
import ct7 from "../assets/images/ct7.jpg";
import ct9 from "../assets/images/ct9.jpg";
import ct10 from "../assets/images/ct10.jpg";
import ct11 from "../assets/images/ct11.jpg";
import hook1 from "../assets/images/hook1.jpg";

const Premium = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="premium-container">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        devenez membre premium
      </motion.h3>
      <motion.div
        className="advantages-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Accédez à des avantages exclusifs pour des rendez-vous parfaits
      </motion.div>
      <motion.div
        className="advantages-container"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <Advantage
          title="Superpouvoirs"
          description="Des conseils d'experts pour séduire avec confiance et authenticité."
          videoSrc={video4}
          fadeInUp={fadeInUp}
        />
        <Advantage
          title="Planification"
          description="Des outils stratégiques pour planifier vos rendez-vous sans stress."
          videoSrc={video2}
          fadeInUp={fadeInUp}
        />
        <Advantage
          title="Verres gratuit"
          description="Bénéficiez de réductions exclusives sur vos consommations."
          videoSrc={video3}
          fadeInUp={fadeInUp}
        />
        <Advantage
          title="Cadeaux"
          description="Une nouvelle surprise chaque mois dans votre espace."
          videoSrc={video1}
          fadeInUp={fadeInUp}
        />
      </motion.div>
      <motion.div
        className="premium-hook"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hook">
          Voici tout ce que vous avez déjà raté parmis notre contenue exclusif.
        </div>
      </motion.div>

      <HookItems
        title="Comment organiser une journée entière à Paris pour un premier rendez-vous inoubliable"
        content="Un premier rendez-vous peut être intimidant, mais avec un planning bien pensé, vous pouvez transformer cette journée en une expérience mémorable et magique. Voici un itinéraire complet pour une journée à Paris, mêlant détente, découverte et romantisme."
        imageSrc={ct7}
        animationDirection="left"
        classType="hook-item"
      />

      <HookItems
        title="Comment choisir le bon endroit en fonction de sa personnalité ?"
        content="Choisir le lieu parfait pour un rendez-vous peut sembler difficile, surtout si vous voulez qu'il reflète les goûts et la personnalité de la personne que vous invitez. Mais avec un peu d'observation et une touche de créativité, il est possible de trouver un endroit qui correspond parfaitement à ses préférences. Voici un guide pour sélectionner le lieu idéal en fonction de différents types de personnalité."
        imageSrc={ct6}
        isReversed={true}
        classType="hook-item-2"
      />

      <HookItems
        title="Top 5 des dates parfaites sous la pluie à Paris : quand le mauvais temps devient un atout"
        content="La pluie à Paris a un charme unique. Plutôt que de la laisser gâcher vos plans, pourquoi ne pas transformer un jour gris en une expérience romantique et inoubliable ? Voici cinq idées de rendez-vous à Paris qui brillent, même sous la pluie."
        imageSrc={ct5}
        animationDirection="left"
        classType="hook-item"
      />

      <HookItems
        title="les meilleurs plans pour un rendez-vous romantique sans se ruiner"
        content="Paris est souvent considérée comme une ville d'élégance et de glamour, mais pas besoin de vider votre compte en banque pour vivre un moment magique à deux. La ville regorge d’endroits merveilleux pour une soirée à deux. Mais quoi de mieux qu’un petit bonus pour pimenter votre date ? Aujourd’hui, on partage avec vous une offre spéciale pour surprendre votre partenaire sans exploser votre budget."
        imageSrc={ct10}
        isReversed={true}
        classType="hook-item-2"
      />

      <HookItems
        title="Les coins cachés de Paris où s’embrasser en toute intimité"
        content="Paris, la ville de l’amour, regorge de lieux iconiques pour les couples, mais saviez-vous qu’elle cache aussi des endroits plus secrets, parfaits pour un baiser loin des foules ? Si vous cherchez des lieux où vous pouvez profiter d’un moment complice avec votre partenaire en toute tranquillité, voici une sélection des meilleurs coins intimes de la capitale"
        imageSrc={ct4}
        animationDirection="left"
        classType="hook-item"
      />

      <HookItems
        title="Comment transformer une simple rencontre en un moment inoubliable ?"
        content="Le premier rendez-vous est un moment décisif, une opportunité de faire bonne impression et de créer une connexion significative. Mais comment transformer une simple rencontre en un souvenir marquant qui donne envie à l’autre de vous revoir ? Voici un guide pratique pour faire de votre rendez-vous un moment inoubliable."
        imageSrc={ct1}
        isReversed={true}
        classType="hook-item-2"
      />

      <HookItems
        title="La liste des bars ou soirées où le premier verre est offert"
        content="Vous pensiez qu'à Paris tout se paye (cher) ? Détrompez-vous ! La ville fait parfois preuve de générosité pour les aventuriers futés. De soirées spéciales à des happy hours malins, voici tous les bons plans pour déguster un verre gratuitement dans la capitale !"
        imageSrc={ct9}
        animationDirection="left"
        classType="hook-item"
      />

      <HookItems
        title="Et si c’était un fiasco ? Nos astuces pour sauver un premier rendez-vous qui tourne mal"
        content="Les premiers rendez-vous peuvent parfois déraper : une blague ratée, des silences gênants, ou un manque d’alchimie... Pas de panique ! Mieux encore, un début chaotique peut se transformer en belle expérience, à condition de garder son calme et d’appliquer quelques astuces simples. Prête à sauver la soirée ? Suis le guide !"
        imageSrc={ct5}
        isReversed={true}
        classType="hook-item-2"
      />

      <HookItems
        title="Votre 3e cocktail OFFERT dans les meilleurs bars de Paris (Code promo exclusif)"
        content="Paris, la ville de l’amour et des lumières, regorge d’endroits merveilleux pour une soirée à deux. Mais quoi de mieux qu’un petit bonus pour pimenter votre date ? Aujourd’hui, on partage avec vous une offre spéciale pour surprendre votre partenaire sans exploser votre budget."
        imageSrc={ct11}
        animationDirection="left"
        classType="hook-item"
      />

      <HookItems
        title="Les 5 bars parisiens où il y a (vraiment) le plus de filles celibataires !"
        content="Tout le monde n’a pas eu la chance d’avoir accès à notre précieux contenu la première fois... Mais on est sympa, et on vous offre une seconde chance ! Si Cupidon vous a un peu boudé ces derniers temps, on est là pour vous aider à rectifier le tir. Cette fois, il est peut-être temps de tourner la roue de la chance et de faire un date INCROYABLE. Et parce que Paris regorge d’endroits magiques pour les rencontres, on a décidé de vous faciliter la tâche"
        imageSrc={hook1}
        isReversed={true}
        classType="hook-item-2"
      />

      <motion.div
        className="sticky-premium-bar"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button className="sticky-premium-button" onClick={handleSubscription}>
          <h3>7,99€ /an</h3>
          <span>Je m'inscris</span>
        </button>
      </motion.div>
      <div className="bottom"></div>
    </div>
  );
};

export default Premium;
