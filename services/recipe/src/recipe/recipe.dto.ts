import { Id } from '../common/typed-id';

export type RecipeId = Id<RecipeDto>;

export class RecipeDto {
  id!: RecipeId;
  name!: string;
  description!: string;
  ingredients!: IngredientDto[];
  instructions!: string[];
  imageUrls!: string[];
  tags!: TagDto[];
  status!: RecipeStatus;
  note?: string;
  originalSource?: string;
}

export type RecipeStatus = 'DRAFT' | 'FINAL' | 'DELETED';

export type IngredientId = Id<IngredientDto>;

export class IngredientDto {
  id!: IngredientId;
  amount!: number;
  unit!: UnitOfMeasurementDto;
  name!: string;
}

export type UnitOfMeasurementId = Id<UnitOfMeasurementDto>;

export class UnitOfMeasurementDto {
  id!: UnitOfMeasurementId;
  name!: string;
}

export type TagId = Id<TagDto>;

export class TagDto {
  id!: TagId;
  name!: string;
}
