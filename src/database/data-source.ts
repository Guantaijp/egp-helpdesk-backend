import { DataSource } from "typeorm"
import { Shift } from "../shifts/entities/shift.entity"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME || "jpgua",
  password: process.env.DB_PASSWORD || "12345678",
  database: process.env.DB_NAME || "shift_management",
  entities: [Shift],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: false,
})
