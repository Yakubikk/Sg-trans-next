"use client";

// Временная заглушка - нужно создать полную конфигурацию
"use client";

import { DirectoryManager } from "@/components/directory-manager";
import { wagonTypesConfig } from "@/lib/directories/wagon-types.config";

export default function WagonTypesPage() {
  return <DirectoryManager config={wagonTypesConfig} />;
}
