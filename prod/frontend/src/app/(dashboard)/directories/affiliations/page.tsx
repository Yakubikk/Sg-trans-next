import { DirectoryManager } from "@/components/directory-manager";
import { affiliationsConfig } from "@/lib/directories";

export default function AffiliationsPage() {
  return <DirectoryManager config={affiliationsConfig} />;
}
