import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm'

import { Length, IsEmail } from 'class-validator'

import bcrypt from 'bcrypt'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number

  @Index({ unique: true })
  @Column({ name: 'email', length: 254, charset: 'utf8' })
  @IsEmail()
  email!: string

  @Column({ name: 'name', length: 48 })
  @Length(1, 48)
  name!: string

  @Index({ unique: true })
  @Length(1, 24)
  @Column({ name: 'screen_name', length: 24 })
  screenName!: string

  @Column({ name: 'hashed_password', length: 60 })
  @Length(1, 60)
  hashedPassword!: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    this.hashedPassword = hashedPassword
  }
}
