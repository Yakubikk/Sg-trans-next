"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { locationsConfig } from "@/lib/directories";

export default function LocationsPage() {
  return <DirectoryManager config={locationsConfig} />;
}
