export type CategoryType = 'eat' | 'drink' | 'fun';

export interface FilterParams {
  filters: string[];
}

export interface FilterData {
  id: number;
  name: string;
  filterCategorieKey: string;
  filterCategorieValue: string;
  categorie: CategoryType;
}
