import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: auth 로 이동(register), 여기는 admin만 접근 가능한 create 로 변경
  @ApiOperation({ summary: '회원가입' })
  @Post()
  join(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateProfileDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateProfileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.usersService.softDelete(id);
  // }
}
