import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm'
import { User } from './User'
import { Application } from './Application'

@Entity('refresh_tokens')
export class RefreshTokens extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Index({ unique: true })
  @Column({ name: 'token', length: 128 })
  token!: string

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId!: User

  @ManyToOne(type => Application)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  clientId!: Application

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @Column({ name: 'revoked_at' })
  revokedAt!: Date
}
