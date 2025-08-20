"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { registrarsConfig } from "@/lib/directories";

export default function RegistrarsPage() {
  return <DirectoryManager config={registrarsConfig} />;
}
