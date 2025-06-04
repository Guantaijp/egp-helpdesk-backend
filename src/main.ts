import { NestFactory } from "@nestjs/core"
import { ValidationPipe, Logger } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const logger = new Logger("Bootstrap")
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
  })

  // Enable CORS for frontend
  app.enableCors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })

  // Global validation pipe with debug logging
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // Don't strip non-whitelisted properties
      forbidNonWhitelisted: false, // Don't throw errors for non-whitelisted properties
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        logger.debug(`Validation errors: ${JSON.stringify(errors)}`)
        return errors
      },
    }),
  )

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Shift Management API")
    .setDescription("API for managing work shifts and schedules")
    .setVersion("1.0")
    .addTag("shifts")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(3001)
  logger.log("🚀 Server running on http://localhost:3001")
  logger.log("📚 API Documentation: http://localhost:3001/api")
   logger.log("🗄️ Database: PostgreSQL with Sequelize")
}
bootstrap()
