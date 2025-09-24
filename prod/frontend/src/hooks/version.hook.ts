import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { versionApi } from "@/api/version";

// Query keys
export const versionKeys = {
  all: ["version"] as const,
};

// Hooks
export const useVersion = () => {
  return useQuery({
    queryKey: versionKeys.all,
    queryFn: versionApi.getVersion,
  });
};

export const useRefreshVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: versionApi.getVersion,
    onSuccess: (data) => {
      queryClient.setQueryData(versionKeys.all, data);
    },
  });
};
