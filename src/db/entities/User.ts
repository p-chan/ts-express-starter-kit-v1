import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  BeforeInsert
} from 'typeorm'

import { Length, IsEmail, MaxLength, MinLength } from 'class-validator'

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

  @MinLength(8)
  @MaxLength(72)
  @Column({ name: 'password', length: 60 })
  password!: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  static async comperePassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }

  @BeforeInsert()
  async beforeInsert() {
    await this.hashPassword()
  }
}
