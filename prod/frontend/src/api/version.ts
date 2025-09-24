import { api } from "@/lib/api";

interface VersionResponse {
  frontend: string;
  backend: string;
}

export const versionApi = {
  getVersion: async (): Promise<VersionResponse> => {
    const response = await api.get<VersionResponse>("api/version");
    return response.data;
  },
};
