import { PRIVACY_POLICY_LAST_UPDATED } from "@/lib/constants";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div>
      <h2 className="mb-6 text-4xl font-semibold text-gray-800">
        Politique de confidentialité
      </h2>
      <div className="space-y-4 font-medium text-gray-700">
        <p className="mb-4">
          <strong>Dernière mise à jour:</strong> {PRIVACY_POLICY_LAST_UPDATED}
        </p>
        <h3 className="text-2xl font-semibold">1. Introduction</h3>
        <p>
          Bienvenue sur <strong>EpsiScore</strong>, une application développée
          pour l’événement <em>Open Innovation</em> organisé par l’EPSI Nantes.
          Nous accordons une grande importance à la protection de votre vie
          privée et nous nous engageons à traiter vos données de manière{" "}
          <strong>transparente</strong> et <strong>sécurisée</strong>.
        </p>
        <h3 className="text-2xl font-semibold">2. Données collectées</h3>
        <p>
          Nous collectons uniquement votre <strong>adresse e-mail</strong>,
          nécessaire pour l’utilisation de l’application.
        </p>
        <h3 className="text-2xl font-semibold">3. Utilisation des données</h3>
        <p>Votre adresse e-mail est utilisée uniquement pour :</p>
        <ul className="list-disc pl-6">
          <li>
            L’accès et l’identification sur l’application{" "}
            <strong>EpsiScore</strong>.
          </li>
          <li>La gestion des notes et de la participation à l’événement.</li>
        </ul>
        <h3 className="text-2xl font-semibold">
          4. Stockage et suppression des données
        </h3>
        <p>
          Vos données sont stockées de manière <strong>sécurisée</strong>{" "}
          pendant toute la durée de l’événement <em>Open Innovation</em>.{" "}
          <strong>
            À la fin de l’événement, toutes les adresses e-mail seront
            définitivement supprimées.
          </strong>
        </p>
        <h3 className="text-2xl font-semibold">5. Partage des données</h3>
        <p>
          Nous ne partageons <strong>aucune donnée</strong> avec des tiers.
        </p>
        <h3 className="text-2xl font-semibold">6. Vos droits</h3>
        <p>
          Conformément aux lois sur la protection des données, vous avez le
          droit de :
        </p>
        <ul className="list-disc pl-6">
          <li>
            Demander l’accès, la rectification ou la suppression de votre{" "}
            <strong>adresse e-mail</strong>.
          </li>
          <li>
            Nous contacter pour toute question relative à la gestion de vos
            données.
          </li>
        </ul>
        <h3 className="text-2xl font-semibold">7. Contact</h3>
        <p>
          Pour toute demande concernant cette politique de confidentialité, vous
          pouvez nous contacter à{" "}
          <a
            href="mailto:thomas@tartrau.fr"
            className="text-blue-500 hover:underline"
          >
            thomas@tartrau.fr
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
