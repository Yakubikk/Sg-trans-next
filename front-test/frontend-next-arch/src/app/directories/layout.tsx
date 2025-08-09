import { getSession } from "@/server/auth";
import { DirectoriesBreadcrumb } from "@/app/directories/breadcrumb-client";

interface DirectoriesLayoutProps {
  children: React.ReactNode;
}

export default async function DirectoriesLayout({ children }: DirectoriesLayoutProps) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="sticky top-0 z-50">
        <DirectoriesBreadcrumb userEmail={session?.email} />
      </div>

      <main className="container mx-auto px-4 py-2">{children}</main>
    </div>
  );
}
