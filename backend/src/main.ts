import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe, Logger } from '@nestjs/common';

/**
 * Función principal que inicializa la aplicación NestJS
 * Configura:
 * - CORS para permitir peticiones desde otros dominios
 * - Validación global de DTOs
 * - Puerto de escucha (por defecto 3010)
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    logger.log('Iniciando la aplicación...');
    const app = await NestFactory.create(AppModule);
    
    // Habilitar CORS para permitir peticiones desde otros dominios
    app.enableCors();
    
    // Configurar validación global de DTOs
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      transform: true, // Transforma automáticamente los tipos
      forbidNonWhitelisted: true // Rechaza peticiones con propiedades no definidas
    }));
    
    // Configurar puerto de escucha
    const port = process.env.PORT || 3010;
    await app.listen(port);
    
    // Mostrar información de inicio
    logger.log(`Application is running on: http://localhost:${port}`);
    logger.log('Rutas disponibles:');
    logger.log('- GET /positions/:id/candidates');
    logger.log('- PUT /positions/:positionId/candidates/:candidateId/stage');
  } catch (error) {
    logger.error('Failed to start the application:', error);
    process.exit(1);
  }
}
bootstrap(); 