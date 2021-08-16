import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

const ormconfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'testnestjs',
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true
}

export default ormconfig;
