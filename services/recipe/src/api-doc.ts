import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Creates an API documentation based on the application controller implementations
 *
 * @param app Nest app created by the NestFactory
 */
export function configureDocumentBuilder(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Cookshelf API')
    .setDescription(
      'This is the API documentation for the Cookshelf recipes app',
    )
    .setLicense(
      'MIT',
      'https://github.com/RobYed/cookshelf-app/blob/master/LICENSE',
    )
    .setVersion('1.0.0')
    .addTag('recipe', 'A generic description of a single recipe')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
