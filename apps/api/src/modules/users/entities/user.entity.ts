import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from '../../../core/entities/date.entity';

@Entity({ name: 'users' })
export class User extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 30, nullable: false })
  password: string;
}
