import { Users } from './src/users/users.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345',
  database: 'test',
  entities: [Users],
  synchronize: true,
  migrations: ['migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
};

export default config;
