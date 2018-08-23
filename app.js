const Hapi = require('hapi');
require('env2')('./.env');
const config = require('./config');
const routesHelloHapi = require('./routes/hello-hapi');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination')
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
const routeUsers = require('./routes/user')
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');

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
    // 创建一个简单的hello hapi接口
    ...routesHelloHapi,
    ...routesShops,
    ...routesOrders,
    ...routeUsers
  ]);
  // 启动服务
  await server.start();
  console.log(`服务启动成功:${config.HOST+':'+config.PORT} \n接口文档地址:${config.HOST+':'+config.PORT}/documentation`.info);
};

init();