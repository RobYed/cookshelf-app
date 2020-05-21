import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

describe('Recipe Controller', () => {
  let controller: RecipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [RecipeService],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
  });

  describe('recipe path', () => {
    it('should return a mock recipe', () => {
      expect(controller.getRecipes()).toEqual([
        {
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
        },
      ]);
    });
  });
});
