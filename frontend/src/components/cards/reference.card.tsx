import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ReferenceCardProps {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
}

export function ReferenceCard({ 
  href, 
  title, 
  subtitle, 
  description, 
  icon: Icon, 
  bgColor 
}: ReferenceCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer">
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 ${bgColor} rounded-md flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
