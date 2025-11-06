import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule, {
      logger: ["error", "warn", "log"],
    });

    app.setGlobalPrefix("api");

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );

    const config = new DocumentBuilder()
      .setTitle("Food Delivery API Documentation")
      .setDescription("REST API for Food Delivery Service")
      .setVersion("1.0.0")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    await app.listen(PORT);
    console.log(
      `Server started at http://localhost:${PORT}/api`
    );
    console.log(
      `Swagger docs: http://localhost:${PORT}/api/docs`
    );
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

start();
