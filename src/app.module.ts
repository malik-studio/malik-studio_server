import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmailsModule } from "./emails/emails.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomConfigModule } from "./config/config.module";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DEV_PG_MALIK_STUDIO_HOST"),
        port: +configService.get<string>("DEV_PG_MALIK_STUDIO_PORT"),
        username: configService.get<string>("DEV_PG_MALIK_STUDIO_USERNAME"),
        password: configService.get<string>("DEV_PG_MALIK_STUDIO_PASSWORD"),
        database: configService.get<string>("DEV_PG_MALIK_STUDIO_DATABASE"),
        entities: [],
        synchronize: configService.get<boolean>(
          "DEV_PG_MALIK_STUDIO_SYNCHRONIZE",
        ),
      }),
      inject: [ConfigService],
    }),
    EmailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
