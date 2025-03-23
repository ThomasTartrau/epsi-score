import { useRouter } from "next/navigation";
import { object, string } from "zod";

const getEmailSchema = () =>
  string({ required_error: "Email est requis" })
    .min(1, "Email est requis")
    .email("Email invalide");

export const signInSchema = object({
  email: getEmailSchema(),
});

export type RouterType = ReturnType<typeof useRouter>;
