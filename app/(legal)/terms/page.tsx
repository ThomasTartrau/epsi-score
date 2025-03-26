import { TERMS_OF_SERVICE_LAST_UPDATED } from "@/lib/constants";
import React from "react";

const TermsOfServicePage = () => {
  return (
    <div>
      <h2 className="mb-6 text-4xl font-semibold text-gray-800">
        Conditions d&apos;<strong>utilisation</strong>
      </h2>
      <div className="space-y-4 font-medium text-gray-700">
        <p className="mb-4">
          <strong>Dernière mise à jour:</strong> {TERMS_OF_SERVICE_LAST_UPDATED}
        </p>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">1. Introduction</h3>
          <p>
            Bienvenue sur <strong>EpsiScore</strong>, l’application officielle
            de l’événement <em>Open Innovation</em> organisé par l’EPSI Nantes.
            En accédant et en utilisant cette application, vous acceptez les
            présentes <strong>Conditions d&apos;utilisation</strong>.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">
            2. Utilisation de l’application
          </h3>
          <ul className="list-disc pl-6">
            <li>
              <strong>EpsiScore</strong> est destiné uniquement aux participants
              de l’événement <em>Open Innovation</em>.
            </li>
            <li>
              L’utilisateur s’engage à fournir une{" "}
              <strong>adresse e-mail valide</strong>.
            </li>
            <li>
              Toute utilisation <strong>frauduleuse</strong> ou{" "}
              <strong>abusive</strong> de l’application est interdite.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">
            3. Collecte et gestion des données
          </h3>
          <p>
            Nous collectons uniquement l’adresse e-mail des utilisateurs.{" "}
            <strong>
              Toutes les données seront supprimées à la fin de l’événement.
            </strong>
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">4. Responsabilité</h3>
          <ul className="list-disc pl-6">
            <li>
              <strong>EpsiScore</strong> est fourni “tel quel”, sans garantie de
              fonctionnement ininterrompu.
            </li>
            <li>
              L’organisateur de l’événement ne pourra être tenu responsable en
              cas de <strong>bug</strong>, de <strong>perte de données</strong>{" "}
              ou d’indisponibilité temporaire de l’application.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">
            5. Modifications des Conditions d’utilisation
          </h3>
          <p>
            Nous nous réservons le droit de modifier ces{" "}
            <strong>Conditions d’utilisation</strong> à tout moment. Les mises à
            jour seront communiquées via l’application.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">6. Contact</h3>
          <p>
            Pour toute question relative à l’utilisation de l’application, vous
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
    </div>
  );
};

export default TermsOfServicePage;
