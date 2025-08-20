"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { stampNumbersConfig } from "@/lib/directories/stamp-numbers.config";

export default function StampNumbersPage() {
  return <DirectoryManager config={stampNumbersConfig} />;
}
