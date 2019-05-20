import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number

  @Index({ unique: true })
  @Column({ name: 'email', length: 254, charset: 'utf8' })
  email!: string

  @Column({ name: 'name', length: 64 })
  username!: string

  @Index({ unique: true })
  @Column({ name: 'screen_name', length: 64 })
  screenName!: string

  @Column({ name: 'hashed_password' })
  hashedPassword!: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
