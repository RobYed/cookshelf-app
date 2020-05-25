import { ApiProperty } from '@nestjs/swagger';
import { Recipe, Ingredient, RecipeId } from './recipe.entity';

export type RecipeStatusDto = 'DRAFT' | 'FINAL' | 'DELETED';


export class IngredientDto {
  @ApiProperty({ example: 250 })
  amount!: number;

  @ApiProperty({ example: 'gram' })
  unit!: string;

  @ApiProperty({ example: 'Spaghetti' })
  name!: string;

  static build(ingredient: Ingredient): IngredientDto {
    const instance = new IngredientDto();
    instance.amount = ingredient.amount;
    instance.unit = ingredient.unit;
    instance.name = ingredient.name;
    return instance;
  }
}

export class RecipeDto {
  @ApiProperty({
    type: String,
    description: 'Recipe Identifier. Will be set when saved',
  })
  id?: RecipeId;

  @ApiProperty({ example: 'Spaghetti Aglio e Olio' })
  name!: string;

  @ApiProperty({ example: 'Fast, healthy and delicious meal' })
  description!: string;

  @ApiProperty({ type: [IngredientDto], minimum: 1 })
  ingredients: IngredientDto[] = [];

  @ApiProperty({ minimum: 1, example: ['Cook spaghetti in the boiling water'] })
  instructions!: string[];

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1552056776-9b5657118ca4',
  })
  imageUrls!: string[];

  @ApiProperty({ example: ['italian', 'vegetarian'] })
  tags!: string[];

  @ApiProperty({ enum: ['DRAFT', 'FINAL', 'DELETED'] })
  status!: RecipeStatusDto;

  @ApiProperty({
    example:
      'Add some fresh tomato while cooking to have some light and tasty sauce',
  })
  note?: string;

  @ApiProperty({
    example: 'https://www.allrecipes.com/recipe/222000/spaghetti-aglio-e-olio/',
  })
  originalSource?: string;

  static build(recipe: Recipe): RecipeDto {
    const instance = new RecipeDto();
    instance.id = recipe.id;
    instance.name = recipe.name;
    instance.description = recipe.description;
    instance.ingredients = recipe.ingredients?.map(IngredientDto.build);
    instance.instructions = recipe.instructions;
    instance.imageUrls = recipe.imageUrls;
    instance.tags = recipe.tags;
    instance.status = recipe.status;
    instance.note = recipe.note;
    instance.originalSource = recipe.originalSource;
    return instance;
  }
}
