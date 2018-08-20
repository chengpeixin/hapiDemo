
if (process.env.NODE_ENV === 'production'){
  require('env2')('./.env.prod');
}else {
  require('env2')('./.env')
}
const { env } = process;

module.exports = {
  "development":{
    "username":env.MYSQL_USERNAME,
    "password":env.MYSQL_PASSWORD,
    "database":env.MYSQL_DB_NAME,
    "host":env.MYSQL_HOST,
    "pord":env.MYSQL_PORD,
    "dialect":'mysql'
  },
  "production":{
    "username":env.MYSQL_USERNAME,
    "password":env.MYSQL_PASSWORD,
    "database":env.MYSQL_DB_NAME,
    "host":env.MYSQL_HOST,
    "pord":env.MYSQL_PORD,
    "dialect":'mysql'
  }
}


// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "database_development",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }
