/**
 * Created by cristian on 25/02/15.
 */
module.exports = {
  checkDelay: 5000,
  ftpOptions:{
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'user',
    pass: process.env.PASS || 'pass',
    remotePath: '/kwitansicsv'
  }
};
