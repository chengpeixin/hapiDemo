const Hapi = require('hapi');
require('env2')('./.env');
const config = require('./config');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination')
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');
const routers = require('./routes')
const server = new Hapi.Server();
// 命令行增加颜色
const colors = require('colors')
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'red',
  info: 'green',
  data: 'blue',
  help: 'cyan',
  warn: 'yellow',
  debug: 'magenta',
  error: 'red'
})
// 配置服务器启动host与端口
server.connection({
  port: config.PORT,
  host: config.HOST,
});
const init = async () => {
  await server.register([
    hapiAuthJWT2,
    ...pluginHapiSwagger,
    pluginHapiPagination
  ])
  pluginHapiAuthJWT2(server)
  server.route([
    ...routers
  ]);
  // 启动服务
  await server.start();
  console.log(`port:${config.HOST+':'+config.PORT} \nAPIDocs:${config.HOST+':'+config.PORT}/documentation`.info);
};

console.log(...routers)
init();