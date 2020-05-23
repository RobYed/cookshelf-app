import {
  Controller,
  Put,
  Get,
  Body,
  Post,
  HttpCode,
  Query,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipeDto, RecipeId } from './recipe.dto';
import { RecipeService } from './recipe.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * Update an existing recipe
   *
   * @param recipe Recipe object that needs to be updated
   */
  @Put()
  updateRecipe(@Body() recipe: RecipeDto): RecipeDto {
    return this.recipeService.updateRecipe(recipe);
  }

  /**
   * Add a new recipe to the cookshelf
   *
   * @param recipe Recipe object that needs to be added to the cookshelf
   */
  @Post()
  @HttpCode(201)
  createRecipe(@Body() recipe: RecipeDto): RecipeDto {
    return this.recipeService.createRecipe(recipe);
  }

  /**
   * Get a list of recipes. Filter by name or tags.
   *
   * @param name Name to filter by
   * @param tags One or more tags to filter by
   */
  @Get()
  getRecipes(
    @Query('name') name?: string,
    @Query('tags') tags?: string | string[],
  ): RecipeDto[] {
    return this.recipeService.getRecipes(name, this.convertToParamList(tags));
  }

  /**
   * Find recipe by ID. Returns a single recipe.
   *
   * @param recipeId ID of recipe to return
   */
  @Get(':recipeId')
  getRecipeById(@Param('recipeId') recipeId: RecipeId): RecipeDto | null {
    return this.recipeService.getRecipeById(recipeId);
  }

  /**
   * Deletes a recipe
   *
   * @param recipeId Recipe id to delete
   */
  @Delete(':recipeId')
  @HttpCode(204)
  deleteRecipe(@Param('recipeId') recipeId: RecipeId): void {
    this.recipeService.deleteRecipe(recipeId);
  }

  /**
   * Saves an image to a specific recipe
   *
   * @param recipeId ID of recipe to update
   */
  @Post(':recipeId/image')
  @UseInterceptors(FileInterceptor('file'))
  saveImage(
    @Param('recipeId') recipeId: RecipeId,
    @UploadedFile() image: Express.Multer.File,
  ): void {
    this.recipeService.saveImage(recipeId, image);
  }

  private convertToParamList(param?: string | string[]): string[] {
    if (typeof param === 'string') {
      return param.split(',');
    } else if (Array.isArray(param)) {
      return param;
    } else {
      return [];
    }
  }
}
