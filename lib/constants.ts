export const ENVIRONMENT = process.env.NODE_ENV;
export const APP_NAME =
  ENVIRONMENT === "production" ? "Template" : "Dev - Template";
export const APP_DESCRIPTION =
  ENVIRONMENT === "production"
    ? "La description de l'application"
    : "La description de l'application en mode développement";
export const AUTHENTICATED_URL = "/dashboard";
