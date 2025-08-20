"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { repairTypesConfig } from "@/lib/directories";

export default function RepairTypesPage() {
  return <DirectoryManager config={repairTypesConfig} />;
}
