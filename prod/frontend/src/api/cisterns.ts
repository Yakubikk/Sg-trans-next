import { api } from '@/lib/api';
import type {
  RailwayCisternDetailDTO,
  CreateRailwayCisternDTO,
  UpdateRailwayCisternDTO,
  CisternsFilter,
  PaginatedCisternsResponse,
} from '@/types/cisterns';

const CISTERNS_ENDPOINT = '/api/railway-cisterns';

export const cisternsApi = {
  // Get paginated list of cisterns
  getAll: async (filter?: CisternsFilter): Promise<PaginatedCisternsResponse> => {
    const params = new URLSearchParams();
    
    // Note: search is not supported by /detailed/paged endpoint
    // if (filter?.search) params.append('search', filter.search);
    if (filter?.manufacturerId) params.append('manufacturerId', filter.manufacturerId);
    if (filter?.typeId) params.append('typeId', filter.typeId);
    if (filter?.ownerId) params.append('ownerId', filter.ownerId);
    if (filter?.affiliationId) params.append('affiliationId', filter.affiliationId);
    if (filter?.page) params.append('page', filter.page.toString());
    if (filter?.pageSize) params.append('pageSize', filter.pageSize.toString());

    const queryString = params.toString();
    const url = queryString ? `${CISTERNS_ENDPOINT}/detailed/paged?${queryString}` : `${CISTERNS_ENDPOINT}/detailed/paged`;
    
    const response = await api.get<PaginatedCisternsResponse>(url);
    return response.data;
  },

  // Get cistern by ID
  getById: async (id: string): Promise<RailwayCisternDetailDTO> => {
    const response = await api.get<RailwayCisternDetailDTO>(`${CISTERNS_ENDPOINT}/${id}`);
    return response.data;
  },

  // Create new cistern
  create: async (data: CreateRailwayCisternDTO): Promise<RailwayCisternDetailDTO> => {
    const response = await api.post<RailwayCisternDetailDTO>(CISTERNS_ENDPOINT, data);
    return response.data;
  },

  // Update cistern
  update: async (id: string, data: UpdateRailwayCisternDTO): Promise<RailwayCisternDetailDTO> => {
    const response = await api.put<RailwayCisternDetailDTO>(`${CISTERNS_ENDPOINT}/${id}`, data);
    return response.data;
  },

  // Delete cistern
  delete: async (id: string): Promise<void> => {
    await api.delete(`${CISTERNS_ENDPOINT}/${id}`);
  },

  // Search cisterns by number prefix
  search: async (prefix: string): Promise<RailwayCisternDetailDTO[]> => {
    if (!prefix.trim()) {
      return [];
    }
    const response = await api.get<RailwayCisternDetailDTO[]>(`${CISTERNS_ENDPOINT}/detailed/search?prefix=${encodeURIComponent(prefix)}`);
    return response.data;
  },

  // Get all cistern numbers
  getAllNumbers: async (): Promise<string[]> => {
    const response = await api.get<string[]>(`${CISTERNS_ENDPOINT}/numbers`);
    return response.data;
  },
};
