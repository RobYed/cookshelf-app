import { RecipeDto } from './recipe.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeService],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
  });

  describe('getTags()', () => {
    it('should return unique tags of all recipes', () => {
      // Arrange
      service.createRecipe(createRecipe(1, ['Italian']));
      service.createRecipe(createRecipe(2, ['Italian', 'Vegetarian']));
      service.createRecipe(createRecipe(3, ['Spanish']));

      // Act
      const result = service.getTags();

      // Assert
      expect(result).toEqual(['Italian', 'Vegetarian', 'Spanish'])
    });
  });

  function createRecipe(id = 1234, tags: string[]): RecipeDto {
    return {
      id,
      name: 'Spaghetti Aglio e Olio',
      description: 'Fast, healthy and delicious',
      ingredients: [
        {
          amount: 1,
          unit: { id: 1, name: 'pound' },
          name: 'spaghetti',
        },
      ],
      instructions: [],
      imageUrls: [],
      tags,
      note:
        'Add some fresh tomato while cooking to have some light and tasty sauce',
      status: 'DRAFT',
      originalSource:
        'https://www.allrecipes.com/recipe/222000/spaghetti-aglio-e-olio/',
    };
  }
});
