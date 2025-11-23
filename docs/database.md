# Database & TypeORM

## Tổng quan

Dự án sử dụng **PostgreSQL 17** làm primary database và **TypeORM 0.3.x** làm ORM (Object-Relational Mapping) framework.

## PostgreSQL

### Phiên bản

- **PostgreSQL 17**: Phiên bản ổn định mới nhất

### Docker Setup

```yaml
postgres:
  image: postgres:17
  environment:
    POSTGRES_USER: dev
    POSTGRES_PASSWORD: dev
    POSTGRES_DB: shopdb
  ports:
    - '5432:5432'
```

### Connection Configuration

```typescript
{
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,  // Production: false (không dùng trong production)
  logging: false,
}
```

## TypeORM

### Configuration

#### Data Source (data-source.ts)

```typescript
export const AppDataSource = new DataSource({
  type: 'postgres',
  // ... connection config
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
```

#### Database Module

```typescript
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // ... config
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
```

### Entities

#### Base Entity: DateEntity

```typescript
export abstract class DateEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

Tất cả entities extend DateEntity để có timestamps tự động.

#### User Entity Example

```typescript
@Entity({ name: 'users' })
export class User extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;
}
```

### Decorators

#### Column Decorators

- `@PrimaryGeneratedColumn('uuid')`: UUID primary key
- `@Column()`: Regular column
- `@CreateDateColumn()`: Auto-managed created date
- `@UpdateDateColumn()`: Auto-managed updated date

#### Entity Decorators

- `@Entity({ name: 'users' })`: Table name mapping
- `@Exclude()`: Exclude from serialization (class-transformer)

### Repositories

#### Mẫu Repository

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
}
```

#### Common Operations

```typescript
// Find one
await this.userRepo.findOne({ where: { id } });

// Find by
await this.userRepo.findOneBy({ email });

// Create
const user = this.userRepo.create({ ... });
await this.userRepo.save(user);

// Update
await this.userRepo.update(id, { ... });

// Delete
await this.userRepo.remove(user);
```

## Migrations

### Migration Commands

```bash
# Generate migration
pnpm migration:generate -n MigrationName

# Run migrations
pnpm migration:run

# Revert migration
pnpm migration:revert

# Create empty migration
pnpm migration:create -n MigrationName
```

### Migration Structure

```typescript
export class MigrationName1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migration logic
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback logic
  }
}
```

### Thực hành tốt cho Migrations

- ✅ Luôn generate migrations, không bao giờ dùng `synchronize: true` trong production
- ✅ Test migrations cả up và down
- ✅ Xem lại SQL được generate trước khi commit
- ✅ Sử dụng transactions cho migrations phức tạp

## Query Builder

### TypeORM Query Builder

```typescript
const users = await this.userRepo
  .createQueryBuilder('user')
  .where('user.email = :email', { email })
  .andWhere('user.active = :active', { active: true })
  .getMany();
```

### Relations

```typescript
// Eager loading
@ManyToOne(() => User, { eager: true })
user: User;

// Lazy loading
@ManyToOne(() => User)
user: Promise<User>;

// Query with relations
await this.repo.find({
  relations: ['user'],
});
```

## Transactions

### Mẫu Transaction

```typescript
await this.dataSource.transaction(async (manager) => {
  await manager.save(user1);
  await manager.save(user2);
});
```

## Performance Optimization

### Connection Pooling

TypeORM tự động quản lý connection pool:

- Default pool size: 10
- Có thể configure trong connection options

### Indexing

```typescript
@Index()
@Column()
email: string;

// Composite index
@Index(['email', 'active'])
```

### Tối ưu Query

- Sử dụng `select` để chỉ lấy các trường cần thiết
- Sử dụng `take` và `skip` cho phân trang
- Tránh N+1 queries với relations

## Best Practices

### 1. Thiết kế Entity

- ✅ Sử dụng UUIDs cho primary keys
- ✅ Kế thừa DateEntity cho timestamps
- ✅ Sử dụng tên cột có ý nghĩa
- ✅ Thêm indexes cho các cột được query thường xuyên

### 2. Sử dụng Repository

- ✅ Inject repositories trong services
- ✅ Sử dụng transactions cho các thao tác nhiều bước
- ✅ Xử lý lỗi đúng cách

### 3. Migrations

- ✅ Generate migrations, không dùng synchronize
- ✅ Test migrations trước khi deploy
- ✅ Giữ migrations nhỏ và tập trung

### 4. Hiệu năng

- ✅ Thêm indexes cho foreign keys
- ✅ Sử dụng query builder cho các query phức tạp
- ✅ Tránh load các relations không cần thiết
- ✅ Sử dụng phân trang cho datasets lớn

### 5. Bảo mật

- ✅ Sử dụng parameterized queries (TypeORM tự động làm điều này)
- ✅ Validate input trước khi thao tác database
- ✅ Sử dụng transactions cho tính nhất quán dữ liệu

## Cải tiến Tương lai

### Tính năng dự kiến

- Database seeding
- Query logging trong development
- Chiến lược backup database
- Read replicas để mở rộng
- Giám sát database
