import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  AllowNull,
} from "sequelize-typescript"

@Table({
  tableName: "shifts",
  timestamps: true,
})
export class Shift extends Model<Shift> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  shiftName: string

  @AllowNull(true)
  @Column(DataType.TEXT)
  description: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(7),
    allowNull: false,
  })
  color: string

  @AllowNull(false)
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  startTime: string

  @AllowNull(false)
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  endTime: string

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  days: string[]

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  requiredAgents: number

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date
}
