import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './recipe.dto';

describe('Recipe Controller', () => {
  let controller: RecipeController;
  let recipeService: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [RecipeService],
    }).compile();

    recipeService = module.get<RecipeService>(RecipeService);
    controller = module.get<RecipeController>(RecipeController);
  });

  describe('updateRecipe()', () => {
    it('should call recipe service to update a recipe', () => {
      // Arrange
      const expected = createRecipe();
      jest.spyOn(recipeService, 'updateRecipe').mockReturnValue(expected);

      // Act
      const result = controller.updateRecipe(createRecipe());

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('createRecipe()', () => {
    it('should call recipe service to create a new recipe', () => {
      // Arrange
      const expected = createRecipe();
      jest.spyOn(recipeService, 'createRecipe').mockReturnValue(expected);

      // Act
      const result = controller.createRecipe(createRecipe(9999));

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('getRecipes()', () => {
    it('should call recipe service to get a list of mock recipes', () => {
      // Arrange
      const expected = [createRecipe(1), createRecipe(2)];
      jest.spyOn(recipeService, 'getRecipes').mockReturnValue(expected);

      // Act
      const result = controller.getRecipes();

      // Asser
      expect(result).toEqual(expected);
    });

    it('should call recipe service to get list of mock recipes filtered by name', () => {
      // Arrange
      const expected = [createRecipe(1), createRecipe(2)];
      const nameFilterValue = 'Aglio Alio';
      jest.spyOn(recipeService, 'getRecipes').mockReturnValue(expected);

      // Act
      const result = controller.getRecipes(nameFilterValue);

      // Asser
      expect(recipeService.getRecipes).toHaveBeenCalledWith(
        nameFilterValue,
        [],
      );
      expect(result).toEqual(expected);
    });

    it('should call recipe service to get a list of mock recipes filtered by multiple tags', () => {
      // Arrange
      const expected = [createRecipe(1), createRecipe(2)];
      const tagsFilterValue = ['Italian'];
      jest.spyOn(recipeService, 'getRecipes').mockReturnValue(expected);

      // Act
      const result = controller.getRecipes(undefined, tagsFilterValue);

      // Asser
      expect(recipeService.getRecipes).toHaveBeenCalledWith(
        undefined,
        tagsFilterValue,
      );
      expect(result).toEqual(expected);
    });

    it('should convert a single tag to a list before calling recipe service', () => {
      // Arrange
      const tagsFilterValue = 'Italian';
      jest.spyOn(recipeService, 'getRecipes').mockReturnValue([createRecipe()]);

      // Act
      controller.getRecipes(undefined, tagsFilterValue);

      // Asser
      expect(recipeService.getRecipes).toHaveBeenCalledWith(undefined, [
        'Italian',
      ]);
    });

    it('should convert comma separated tags to a list before calling recipe service', () => {
      // Arrange
      const tagsFilterValue = 'Italian,Vegetarian';
      jest.spyOn(recipeService, 'getRecipes').mockReturnValue([createRecipe()]);

      // Act
      controller.getRecipes(undefined, tagsFilterValue);

      // Assert
      expect(recipeService.getRecipes).toHaveBeenCalledWith(undefined, [
        'Italian',
        'Vegetarian',
      ]);
    });
  });

  describe('getRecipeById()', () => {
    it('should call recipe service to get a recipe by id', () => {
      // Arrange
      const expected = createRecipe();
      jest.spyOn(recipeService, 'getRecipeById').mockReturnValue(expected);

      // Act
      const result = controller.getRecipeById(1234);

      // Assert
      expect(recipeService.getRecipeById).toHaveBeenCalledWith(1234);
      expect(result).toEqual(expected);
    });
  });

  describe('deleteRecipe()', () => {
    it('should call recipe service to delete a recipe by id', () => {
      // Arrange
      jest.spyOn(recipeService, 'deleteRecipe');

      // Act
      controller.deleteRecipe(1234);

      // Assert
      expect(recipeService.deleteRecipe).toHaveBeenCalledWith(1234);
    });
  });

  describe('saveImage()', () => {
    it('should call recipe service to save an image file', () => {
      // Arrange
      const file: Express.Multer.File = {
        originalname: 'best-spaghetti-image.png',
      } as Express.Multer.File;
      jest.spyOn(recipeService, 'saveImage').mockReturnValue();

      // Act
      controller.saveImage(1234, file);

      // Assert
      expect(recipeService.saveImage).toHaveBeenCalledWith(1234, file);
    });
  });

  describe('getTags()', () => {
    it('should call recipe service to return all unique tags', () => {
      // Arrange
      const expected = ['Italian', 'Vegetarian', 'Meat'];
      jest.spyOn(recipeService, 'getTags').mockReturnValue(expected);

      // Act
      const result = controller.getTags();

      // Assert
      expect(result).toEqual(expected);
    });
  });

  function createRecipe(id = '1234'): RecipeDto {
    return {
      id,
      name: 'Spaghetti Aglio e Olio',
      description: 'Fast, healthy and delicious',
      ingredients: [
        {
          amount: 1,
          unit: 'pound',
          name: 'spaghetti',
        },
      ],
      instructions: [],
      imageUrls: [],
      tags: ['Italian'],
      note:
        'Add some fresh tomato while cooking to have some light and tasty sauce',
      status: 'DRAFT',
      originalSource:
        'https://www.allrecipes.com/recipe/222000/spaghetti-aglio-e-olio/',
    };
  }
});
