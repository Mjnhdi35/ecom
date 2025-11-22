import { Global, Module, OnModuleInit } from '@nestjs/common';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { DataSource } from 'typeorm';

@Global()
@Module({ imports: [TypeOrmModule.forRoot(typeOrmConfig)] })
export class DatabaseModule implements OnModuleInit {
  constructor(
    @InjectDataSource()
    private readonly ds: DataSource,
  ) {}

  async onModuleInit() {
    if (!this.ds.isInitialized) {
      await this.ds.initialize();
    }
    await this.runHealthCheck();
  }

  private async runHealthCheck() {
    await this.ds.query('SELECT 1');
  }
}
