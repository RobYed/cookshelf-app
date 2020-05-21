import { Id } from '../common/typed-id';

export type RecipeId = Id<Recipe>;

export interface Recipe {
  id: RecipeId;
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

export type IngredientId = Id<Ingredient>;

export interface Ingredient {
  id: IngredientId;
  amount: number;
  unit: UnitOfMeasurement;
  name: string;
}

export type UnitOfMeasurementId = Id<UnitOfMeasurement>;

export interface UnitOfMeasurement {
  id: UnitOfMeasurementId;
  name: string;
}

export type TagId = Id<Tag>;

export interface Tag {
  id: TagId;
  name: string;
}
