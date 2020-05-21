import { Injectable } from '@nestjs/common';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  updateRecipe(): Recipe {
    return this.getMockRecipe();
  }

  getRecipe(): Recipe {
    return this.getMockRecipe();
  }

  private getMockRecipe(): Recipe {
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
