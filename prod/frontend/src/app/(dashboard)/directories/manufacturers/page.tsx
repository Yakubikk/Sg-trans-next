"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { manufacturersConfig } from "@/lib/directories";

export default function ManufacturersPage() {
  return <DirectoryManager config={manufacturersConfig} />;
}
