"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { wagonModelsConfig } from "@/lib/directories/wagon-models.config";

export default function WagonModelsPage() {
  return <DirectoryManager config={wagonModelsConfig} />;
}
