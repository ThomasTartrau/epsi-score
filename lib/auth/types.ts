import { auth } from "./server";

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
