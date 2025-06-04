import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { Shift } from "../shifts/models/shift.model"

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: "postgres",
        host: configService.get("DB_HOST", "localhost"),
        port: configService.get("DB_PORT", 5432),
        username: configService.get("DB_USERNAME", "jpgua"),
        password: configService.get("DB_PASSWORD", "12345678"),
        database: configService.get("DB_NAME", "shift_management"),
        models: [Shift],
        autoLoadModels: true,
        synchronize: configService.get("NODE_ENV") === "development",
        logging: configService.get("NODE_ENV") === "development" ? console.log : false,
        define: {
          timestamps: true,
          underscored: false,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
