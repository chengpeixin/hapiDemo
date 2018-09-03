const { env } = process;

module.exports = {
  HOST: env.HOST,
  PORT: env.PORT,
  wxAppid:env.wxAppid,
  wxSecret:env.wxSecret,
  jwtSecret:env.jwtSecret
};