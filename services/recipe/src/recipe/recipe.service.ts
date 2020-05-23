import { Injectable } from '@nestjs/common';
import { RecipeDto, RecipeId } from './recipe.dto';

@Injectable()
export class RecipeService {
  private recipes: Map<RecipeId, RecipeDto> = new Map();

  constructor() {
    this.recipes.set(1, this.getMockRecipe());
  }

  get recipeList(): RecipeDto[] {
    return Array.from(this.recipes.values());
  }

  updateRecipe(recipe: RecipeDto): RecipeDto {
    if (!recipe.id) {
      throw new Error('No id supplied');
    }
    if (!this.recipes.has(recipe.id)) {
      throw new Error('Recipe not found');
    }
    this.recipes.set(recipe.id, recipe);
    return recipe;
  }

  createRecipe(recipe: RecipeDto): RecipeDto {
    const recipeId = this.recipes.size + 1;
    this.recipes.set(recipeId, { ...recipe, id: recipeId });
    return recipe;
  }

  getRecipes(name?: string, tags?: string[]): RecipeDto[] {
    let result = this.recipeList;
    if (name) {
      result = result.filter(recipe => recipe.name.includes(name));
    }
    if (tags) {
      // filter recipes which contain all tag names
      result = result.filter(recipe =>
        tags.every(tag => recipe.tags.includes(tag)),
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

  getTags(): string[] {
    return this.listOfUniqueValues(
      this.recipeList.map(recipe => recipe.tags).flat(),
    );
  }

  private listOfUniqueValues(array: string[]): string[] {
    return [...new Set(array)];
  }

  private getMockRecipe(): RecipeDto {
    return {
      id: 1,
      name: 'Spaghetti Aglio e Olio',
      description: 'Fast, healthy and delicious',
      ingredients: [
        {
          amount: 250,
          unit: { id: 1, name: 'gram' },
          name: 'spaghetti',
        },
      ],
      instructions: [],
      imageUrls: ['https://images.unsplash.com/photo-1552056776-9b5657118ca4'],
      tags: ['Italian'],
      note:
        'Add some fresh tomato while cooking to have some light and tasty sauce',
      status: 'DRAFT',
      originalSource:
        'https://www.allrecipes.com/recipe/222000/spaghetti-aglio-e-olio/',
    };
  }
}
