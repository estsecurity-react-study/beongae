import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
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
