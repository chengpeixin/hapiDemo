const config = require('../config');

const validate = (decoded, request, callback) => {
  let error;
  // decoded 为 JWT payload 被解码后的数据
  const userId = decoded.userId || {};
  // 增加接口权限

  if (!userId) {
    return callback(error, false, userId);
  }
  return callback(error, true, {
    userId,
  });
};

module.exports = (server) => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.appSecret,
    validateFunc: validate,
  });
  server.auth.default('jwt');
};