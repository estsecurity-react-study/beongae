import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(12); // default 10
    const { password } = createUserDto;
    const hashPassword = await bcrypt.hash(password, salt);

    const createUser = this.userRepository.create({ ...createUserDto, password: hashPassword });
    return this.userRepository.save(createUser);
  }
}
