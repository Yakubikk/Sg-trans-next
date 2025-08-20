"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { partStatusesConfig } from "@/lib/directories";

export default function PartStatusesPage() {
  return <DirectoryManager config={partStatusesConfig} />;
}
