"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { ownersConfig } from "@/lib/directories";

export default function OwnersPage() {
  return <DirectoryManager config={ownersConfig} />;
}
