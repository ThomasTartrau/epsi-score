"use client";

import { authClient } from "@/lib/auth/client";

export default function LogoutPage() {
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <button onClick={handleSignOut}>
      <p>Déconnexion</p>
    </button>
  );
}
