export const ENVIRONMENT = process.env.NODE_ENV;
export const APP_NAME =
  ENVIRONMENT === "production" ? "EpsiScore" : "Dev - EpsiScore";
export const APP_DESCRIPTION =
  ENVIRONMENT === "production"
    ? "Classement en temps réel des équipes participant à l'évènement OpenInnovation de l'EPSI Nantes."
    : "Classement en temps réel des équipes participant à l'évènement OpenInnovation de l'EPSI Nantes en mode développement.";
export const AUTHENTICATED_URL = "/dashboard";
