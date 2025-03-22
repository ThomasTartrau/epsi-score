import { useRouter } from "next/navigation";
import { object, string } from "zod";

const getPasswordSchema = (type: "password" | "confirmPassword") =>
  string({ required_error: `${type} est requis` })
    .min(8, `${type} doit contenir au moins 8 caractères`)
    .max(32, `${type} ne peut pas dépasser 32 caractères`);

const getEmailSchema = () =>
  string({ required_error: "Email est requis" })
    .min(1, "Email est requis")
    .email("Email invalide");

const getNameSchema = () =>
  string({ required_error: "Nom est requis" })
    .min(1, "Nom est requis")
    .max(50, "Le nom doit contenir moins de 50 caractères");

export const signUpSchema = object({
  name: getNameSchema(),
  email: getEmailSchema(),
  password: getPasswordSchema("password"),
  confirmPassword: getPasswordSchema("confirmPassword"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export const signInSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema("password"),
});

export const forgotPasswordSchema = object({
  email: getEmailSchema(),
});

export const resetPasswordSchema = object({
  password: getPasswordSchema("password"),
  confirmPassword: getPasswordSchema("confirmPassword"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type RouterType = ReturnType<typeof useRouter>;
