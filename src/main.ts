import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend
  app.enableCors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
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
  console.log("🚀 Server running on http://localhost:3001")
  console.log("📚 API Documentation: http://localhost:3001/api")
}
bootstrap()
