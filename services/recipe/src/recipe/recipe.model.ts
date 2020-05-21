import { Id } from '../common/typed-id';

export interface Recipe {
  id: Id<Recipe>;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrls: string[];
  tags: Tag[];
  note: string;
  status: RecipeStatus;
  originalSource: string;
}

export type RecipeStatus = 'DRAFT' | 'FINAL' | 'DELETED';

export interface Ingredient {
  id: Id<Ingredient>;
  amount: number;
  unit: UnitOfMeasurement;
  name: string;
}

export interface UnitOfMeasurement {
  id: Id<UnitOfMeasurement>;
  name: string;
}

export interface Tag {
  id: Id<Tag>;
  name: string;
}
