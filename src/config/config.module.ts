import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".dev.env", ".prod.env", ".env"],
    }),
  ],
})
export class CustomConfigModule {}
