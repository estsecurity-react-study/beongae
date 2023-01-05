import { Test, TestingModule } from '@nestjs/testing';
import { AuthKakaoController } from './auth-kakao.controller';

describe('AuthKakaoController', () => {
  let controller: AuthKakaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthKakaoController],
    }).compile();

    controller = module.get<AuthKakaoController>(AuthKakaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
