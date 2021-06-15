import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as morgan from "morgan";
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("auth");

    app.enableCors({});

    app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));

    app.use(morgan("dev"));

    await app.listen(80);
}
bootstrap();
