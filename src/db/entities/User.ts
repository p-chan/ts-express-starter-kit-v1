import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm'

import bcrypt from 'bcrypt'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number

  @Index({ unique: true })
  @Column({ name: 'email', length: 254, charset: 'utf8' })
  email!: string

  @Column({ name: 'name', length: 48 })
  name!: string

  @Index({ unique: true })
  @Column({ name: 'screen_name', length: 24 })
  screenName!: string

  @Column({ name: 'hashed_password', length: 60 })
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
