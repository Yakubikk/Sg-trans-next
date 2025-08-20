"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { partTypesConfig } from "@/lib/directories";

export default function PartTypesPage() {
  return <DirectoryManager config={partTypesConfig} />;
}
