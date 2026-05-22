import "reflect-metadata";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { ApiExceptionFilter } from "./common/errors/api-exception.filter";
import { AppConfig } from "./config/app-config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfig);

  app.use(cookieParser());
  app.enableCors({
    origin: config.frontendOrigin,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.useGlobalFilters(new ApiExceptionFilter());

  await app.listen(config.port);
  new Logger("Bootstrap").log(
    `Backend Auth API listening on port ${config.port} (${config.nodeEnv})`
  );
}

void bootstrap();
