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
import { RecipeId } from './recipe.entity';
import { RecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiConsumes, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';


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
  @ApiOperation({ summary: 'Update an existing recipe' })
  @ApiOkResponse({ description: 'Recipe successfully updated', type: RecipeDto })
  @ApiBadRequestResponse({ description: 'Invalid recipe or missing id' })
  @ApiNotFoundResponse({ description: 'Recipe not found' })
  updateRecipe(@Body() recipe: RecipeDto): Promise<RecipeDto> {
    return this.recipeService.updateRecipe(recipe);
  }

  /**
   * Add a new recipe to the cookshelf
   *
   * @param recipe Recipe object that needs to be added to the cookshelf
   */
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Add a new recipe to the cookshelf' })
  @ApiCreatedResponse({ description: 'Recipe successfully created', type: RecipeDto })
  @ApiBadRequestResponse({ description: 'Invalid recipe' })
  createRecipe(@Body() recipe: RecipeDto): Promise<RecipeDto> {
    return this.recipeService.createRecipe(recipe);
  }

  /**
   * Get a list of recipes optionally filtered by name or tags
   *
   * @param name Name to filter by
   * @param tags One or more tags to filter by
   */
  @Get()
  @ApiOperation({ summary: 'Get a list of recipes optionally filtered by name or tags' })
  @ApiQuery({ name: 'name', type: String, required: false })
  @ApiQuery({ name: 'tags', type: [String], required: false })
  @ApiOkResponse({ description: 'Recipe(s) found', type: [RecipeDto] })
  @ApiNoContentResponse({ description: 'No recipe found' })
  @ApiBadRequestResponse({ description: 'Invalid parameter value(s)'})
  getRecipes(
    @Query('name') name?: string,
    @Query('tags') tags?: string | string[],
  ): Promise<RecipeDto[]> {
    return this.recipeService.getRecipes(name, this.convertToParamList(tags));
  }

  /**
   * Find recipe by ID. Returns a single recipe
   *
   * @param recipeId ID of recipe to return
   */
  @Get(':recipeId')
  @ApiOperation({ summary: 'Find recipe by ID. Returns a single recipe' })
  @ApiParam({ name: 'recipeId', type: Number })
  @ApiOkResponse({ description: 'Recipe found', type: RecipeDto })
  @ApiNotFoundResponse({ description: 'Recipe not found' })
  getRecipeById(@Param('recipeId') recipeId: RecipeId): Promise<RecipeDto | null> {
    return this.recipeService.getRecipeById(recipeId);
  }

  /**
   * Delete a recipe
   *
   * @param recipeId Recipe id to delete
   */
  @Delete(':recipeId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a recipe' })
  @ApiParam({ name: 'recipeId', type: Number })
  @ApiResponse({ status: 204, description: 'Recipe successfully deleted' })
  @ApiNotFoundResponse({ description: 'Recipe not found' })
  deleteRecipe(@Param('recipeId') recipeId: RecipeId): void {
    this.recipeService.deleteRecipe(recipeId);
  }

  /**
   * Save an image to a specific recipe
   *
   * @param recipeId ID of recipe to update
   */
  @Post(':recipeId/image')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Save an image to a specific recipe' })
  @ApiBody({ description: 'Image file' })
  @ApiParam({ name: 'recipeId', type: Number })
  @ApiCreatedResponse({ description: 'Image successfully saved'})
  @ApiBadRequestResponse({ description: 'The image file is malformed' })
  saveImage(
    @Param('recipeId') recipeId: RecipeId,
    @UploadedFile() image: Express.Multer.File,
  ): void {
    this.recipeService.saveImage(recipeId, image);
  }

  /**
   * Get a list of all unique tags of existing recipes
   */
  @Get('tag')
  @ApiOperation({ summary: 'Get a list of all unique tags of existing recipes' })
  @ApiOkResponse({ description: 'Tags found' })
  getTags(): Promise<string[]> {
    return this.recipeService.getTags();
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
