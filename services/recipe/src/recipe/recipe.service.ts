import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Recipe, RecipeId } from './recipe.entity';
import { RecipeDto } from './recipe.dto';
import { Repository, FindManyOptions, Like, FindConditions, In } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ) {
    this.recipeRepository.save(Recipe.build(this.getMockRecipe()));
  }

  async updateRecipe(recipe: RecipeDto): Promise<RecipeDto> {
    if (!recipe.id) {
      throw new Error('No id supplied');
    }
    if (!(await this.exists(recipe.id))) {
      throw new Error('Recipe not found');
    }
    const savedRecipe = await this.recipeRepository.save(Recipe.build(recipe));
    return RecipeDto.build(savedRecipe);
  }

  async createRecipe(recipe: RecipeDto): Promise<RecipeDto> {
    const savedRecipe = await this.recipeRepository.save(Recipe.build(recipe));
    return RecipeDto.build(savedRecipe);
  }

  async getRecipes(name: string | undefined, tags: string[]): Promise<RecipeDto[]> {
    let result: Recipe[] | null = null;
    if (name) {
      result = await this.recipeRepository.find({ name: Like(name) });
    }
    if (tags.length > 0) {
      result = await this.recipeRepository.find({ tags: In(tags) });
    }
    if (!result) {
      result = await this.recipeRepository.find() || [];
    }
    return result.map(RecipeDto.build);
  }

  async getRecipeById(recipeId: RecipeId): Promise<RecipeDto | null> {
    const result = await this.recipeRepository.findOne(recipeId as string);
    return result ? RecipeDto.build(result) : null;
  }

  async deleteRecipe(recipeId: RecipeId): Promise<void> {
    await this.recipeRepository.delete(recipeId as string);
    return Promise.resolve();
  }

  async saveImage(
    recipeId: RecipeId,
    image: Express.Multer.File,
  ): Promise<void> {
    const recipe = await this.recipeRepository.findOne(recipeId as string);
    if (!recipe) {
      throw new Error(`Recipe with id ${recipeId} does not exist`);
    }
    // TODO: save image in file storage
    const imageUrl = 'some/url/from/storage/';
    recipe.imageUrls.push(imageUrl);
    return Promise.resolve();
  }

  async getTags(): Promise<string[]> {
    const recipes = await this.recipeRepository.find();
    return this.listOfUniqueValues(recipes.map(recipe => recipe.tags).flat());
  }

  private listOfUniqueValues(array: string[]): string[] {
    return [...new Set(array)];
  }

  private async exists(recipeId: RecipeId): Promise<boolean> {
    return (
      (await this.recipeRepository.findOne(recipeId as string)) !== undefined
    );
  }

  private getMockRecipe(): RecipeDto {
    return {
      id: '1',
      name: 'Spaghetti Aglio e Olio',
      description: 'Fast, healthy and delicious',
      ingredients: [
        {
          amount: 250,
          unit: 'gram',
          name: 'spaghetti',
        },
      ],
      instructions: [
        'Cook spaghetti in boiling water'
      ],
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
