import { boolean, object, string } from "zod";

const getPasswordSchema = (
  type: "password" | "confirmPassword" | "currentPassword",
) =>
  string({ required_error: `${type} est requis` })
    .min(8, `${type} doit contenir au moins 8 caractères`)
    .max(32, `${type} ne peut pas dépasser 32 caractères`);

const getEmailSchema = () =>
  string({ required_error: "L&apos;email est requis" })
    .min(1, "L&apos;email est requis")
    .email("Email invalide");

const getNameSchema = () =>
  string({ required_error: "Le nom est requis" })
    .min(1, "Le nom est requis")
    .max(50, "Le nom doit contenir moins de 50 caractères");

const getImageSchema = () => string().optional();

const getRevokeOtherSessionsSchema = () => boolean().optional();

export const updateProfileSchema = object({
  name: getNameSchema(),
  image: getImageSchema(),
});

export const updateEmailSchema = object({
  email: getEmailSchema(),
});

export const updatePasswordSchema = object({
  revokeOtherSessions: getRevokeOtherSessionsSchema(),
  currentPassword: getPasswordSchema("currentPassword"),
  password: getPasswordSchema("password"),
  confirmPassword: getPasswordSchema("confirmPassword"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});
