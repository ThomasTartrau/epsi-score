"use client";

import { Suspense } from "react";
import { Spinner } from "@/components/custom/spinner";

function DashboardContent() {
  return <div className="space-y-4 p-4">Hello</div>;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <DashboardContent />
    </Suspense>
  );
}
