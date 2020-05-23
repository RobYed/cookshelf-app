import { Injectable } from '@nestjs/common';
import { RecipeDto, RecipeId } from './recipe.dto';

@Injectable()
export class RecipeService {
  private recipes: Map<RecipeId, RecipeDto> = new Map();

  constructor() {
    this.recipes.set(1, this.getMockRecipe());
  }

  updateRecipe(recipe: RecipeDto): RecipeDto {
    this.recipes.set(recipe.id, recipe);
    return recipe;
  }

  createRecipe(recipe: RecipeDto): RecipeDto {
    const recipeId = this.recipes.size + 1;
    this.recipes.set(recipeId, { ...recipe, id: recipeId });
    return recipe;
  }

  getRecipes(name?: string, tags?: string[]): RecipeDto[] {
    let result = Array.from(this.recipes.values());
    if (name) {
      result = result.filter(recipe => recipe.name.includes(name));
    }
    if (tags) {
      // filter recipes which contain all tag names
      result = result.filter(recipe =>
        tags.every(tag =>
          recipe.tags.map(currTag => currTag.name).includes(tag),
        ),
      );
    }
    return result;
  }

  getRecipeById(recipeId: RecipeId): RecipeDto | null {
    return this.recipes.get(recipeId) || null;
  }

  deleteRecipe(recipeId: RecipeId): void {
    this.recipes.delete(recipeId);
  }

  saveImage(recipeId: RecipeId, image: Express.Multer.File): void {
    if (!this.recipes.has(recipeId)) {
      throw new Error(`Recipe with id ${recipeId} does not exist`);
    }
    // TODO: save image in file storage
    const imageUrl = 'some/url/from/storage/';
    this.recipes.get(recipeId)?.imageUrls.push(imageUrl);
  }

  private getMockRecipe(): RecipeDto {
    return {
      id: 1,
      name: 'Spaghetti Aglio e Olio',
      description: 'Fast, healthy and delicious',
      ingredients: [
        {
          id: 1,
          amount: 1,
          unit: { id: 1, name: 'pound' },
          name: 'spaghetti',
        },
      ],
      instructions: [],
      imageUrls: [],
      tags: [{ id: 1, name: 'Italian ' }],
      note:
        'Add some fresh tomato while cooking to have some light and tasty sauce',
      status: 'DRAFT',
      originalSource:
        'https://www.allrecipes.com/recipe/222000/spaghetti-aglio-e-olio/',
    };
  }
}
