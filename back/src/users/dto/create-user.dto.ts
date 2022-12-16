import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'elle0510@gmail.com',
    description: '아이디는 이메일을 사용',
    required: true,
  })
  userId: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: '안형노',
    description: '사용자 이름',
  })
  userName: string;
}
