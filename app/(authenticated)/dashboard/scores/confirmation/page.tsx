import { Metadata } from "next";
import ConfirmationClient from "./_components/confirmation.client";

export const metadata: Metadata = {
  title: "Confirmation de note",
  description: "Confirmation de note",
};

export default function ConfirmationPage() {
  return (
    <main className="flex flex-col gap-3">
      <ConfirmationClient />
    </main>
  );
}
