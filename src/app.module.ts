import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ShiftsModule } from "./shifts/shifts.module"
import { DatabaseModule } from "./database/database.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ShiftsModule,
  ],
})
export class AppModule {}
