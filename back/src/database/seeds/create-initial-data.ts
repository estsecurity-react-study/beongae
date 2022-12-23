import { Seeder /*, SeederFactoryManager */ } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(UserEntity);
    await userRepository.insert([
      {
        userId: 'admin',
        password: 'admin',
        // userName: null,
      },
    ]);
  }
}
