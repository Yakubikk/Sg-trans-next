"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { depotsConfig } from "@/lib/directories";

export default function DepotsPage() {
  return <DirectoryManager config={depotsConfig} />;
}
