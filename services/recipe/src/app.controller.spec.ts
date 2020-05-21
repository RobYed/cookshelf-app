import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RecipeService } from './recipe/recipe.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [RecipeService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a mock recipe', () => {
      expect(appController.getRecipe()).toEqual({
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
      });
    });
  });
});
