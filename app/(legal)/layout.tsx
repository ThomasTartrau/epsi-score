import Logo from "@/components/custom/logo";
import React from "react";

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-4 flex justify-center">
        <Logo size="xl" />
      </div>
      <main className="prose lg:prose-xl">{children}</main>
    </div>
  );
};

export default LegalLayout;
