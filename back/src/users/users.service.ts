import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

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

  update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = this.usersRepository.create({
      id,
      ...updateUserDto,
    });
    return this.usersRepository.save(updateUser);
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    // const updateUser = await this.usersRepository.findOne({ where: { id } });
    // updateUser.hashedRefreshToken = hashedRefreshToken;
    // return this.usersRepository.save(updateUser);
    return this.usersRepository.update(id, { hashedRefreshToken });
  }
}
