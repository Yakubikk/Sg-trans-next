// Типы для принадлежности (справочник)
export interface AffiliationReference {
  id: string;
  value: string;
}

export interface CreateAffiliationReferenceRequest {
  value: string;
}

export interface UpdateAffiliationReferenceRequest {
  id: string;
  value: string;
}
