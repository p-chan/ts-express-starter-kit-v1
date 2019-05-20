import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { User } from './User'

@Entity('applications')
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'name', length: 64 })
  name!: string

  @Index({ unique: true })
  @Column({ name: 'client_id', length: 64 })
  clientId!: string

  @Column({ name: 'client_secret', length: 64 })
  clientSecret!: string

  @ManyToOne(type => User)
  @JoinColumn({ name: 'owner_user_id', referencedColumnName: 'id' })
  ownerUserId!: User

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
