module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5531,
  username: 'root',
  password: 'toor',
  database: 'projectx',
  entities: ['./src/modules/users/entities/user.entity.ts'],
  synchronize: true,
  logging: 'all',
};
