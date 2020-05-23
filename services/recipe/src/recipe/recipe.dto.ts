import { Id } from '../common/typed-id';
import { ApiProperty } from '@nestjs/swagger';

export type RecipeId = Id<RecipeDto>;
export type UnitOfMeasurementId = Id<UnitOfMeasurementDto>;

export type RecipeStatus = 'DRAFT' | 'FINAL' | 'DELETED';

export class UnitOfMeasurementDto {
  @ApiProperty({ type: Number })
  id!: UnitOfMeasurementId;

  @ApiProperty({ example: 'gram' })
  name!: string;
}

export class IngredientDto {
  @ApiProperty({ example: 250 })
  amount!: number;

  @ApiProperty({ type: UnitOfMeasurementDto })
  unit!: UnitOfMeasurementDto;

  @ApiProperty({ example: 'Spaghetti' })
  name!: string;
}

export class RecipeDto {
  @ApiProperty({
    type: Number,
    description: 'Recipe Identifier. Will be set when saved',
  })
  id?: RecipeId;

  @ApiProperty({ example: 'Spaghetti Aglio e Olio' })
  name!: string;

  @ApiProperty({ example: 'Fast, healthy and delicious meal' })
  description!: string;

  @ApiProperty({ type: [IngredientDto], minimum: 1 })
  ingredients!: IngredientDto[];

  @ApiProperty({ minimum: 1, example: ['Cook spaghetti in the boiling water'] })
  instructions!: string[];

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1552056776-9b5657118ca4',
  })
  imageUrls!: string[];

  @ApiProperty({ example: ['italian', 'vegetarian'] })
  tags!: string[];

  @ApiProperty({ enum: ['DRAFT', 'FINAL', 'DELETED'] })
  status!: RecipeStatus;

  @ApiProperty({
    example:
      'Add some fresh tomato while cooking to have some light and tasty sauce',
  })
  note?: string;

  @ApiProperty({
    example: 'https://www.allrecipes.com/recipe/222000/spaghetti-aglio-e-olio/',
  })
  originalSource?: string;
}
