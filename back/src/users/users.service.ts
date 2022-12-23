import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(12); // default 10
    const { password } = createUserDto;
    const hashPassword = await bcrypt.hash(password, salt);

    const createUser = this.usersRepository.create({ ...createUserDto, password: hashPassword });
    return this.usersRepository.save(createUser);
  }

  findById(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  findByUserId(userId: string) {
    return this.usersRepository.findOne({
      where: { userId },
    });
  }
}
