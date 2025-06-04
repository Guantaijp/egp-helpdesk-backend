import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("shifts")
export class Shift {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 255 })
  name: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column({ type: "varchar", length: 7 })
  color: string

  @Column({ type: "time" })
  startTime: string

  @Column({ type: "time" })
  endTime: string

  @Column({ type: "simple-array" })
  days: string[]

  @Column({ type: "int", default: 1 })
  requiredAgents: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
