"use client";

import { Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from "@/components/ui";
import { useCurrentUser } from "@/api";

const UserInfoCard = () => {
  const { data: user } = useCurrentUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Информация о пользователе</span>
        </CardTitle>
        <CardDescription>Ваша учетная запись и права доступа</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {user && (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Полное имя</p>
              <p className="text-lg">
                {user.firstName} {user.lastName} {user.patronymic}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Роли</p>
              <div className="flex flex-wrap gap-2">
                {user.roles.map((role) => (
                  <Badge key={role.id} variant="secondary">
                    {role.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { UserInfoCard };
export default UserInfoCard;
