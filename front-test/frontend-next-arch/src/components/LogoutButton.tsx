"use client";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function LogoutButton() {
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        // Clear auth cache
        queryClient.removeQueries({ queryKey: ["auth"] });
        toast.success("Вы успешно вышли из системы");
        // Redirect to guest page
        window.location.href = "/guest";
      } else {
        toast.error("Ошибка при выходе");
      }
    } catch {
      toast.error("Ошибка соединения");
    }
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Выйти
    </Button>
  );
}
