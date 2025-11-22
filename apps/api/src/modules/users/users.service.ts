import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../../core';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(body: CreateUserDto): Promise<User> {
    const { displayName, email, password } = body;
    const existingEmail = await this.userRepo.findOne({ where: { email } });
    if (existingEmail) {
      throw new ConflictException('Field Duplicated');
    }
    const newUser = this.userRepo.create({
      displayName,
      email,
      password: await this.bcryptService.hash(password),
    });

    return await this.userRepo.save(newUser);
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    return user || null;
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async update(id: string, body: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('not found');
    }

    if (body.password) {
      body.password = await this.bcryptService.hash(body.password);
    }
    await this.userRepo.update(id, body);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('not found');
    }
    await this.userRepo.remove(user);
    return { message: 'User deleted successfully' };
  }
}
