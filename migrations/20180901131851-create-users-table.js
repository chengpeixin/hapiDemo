'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'users',
    {
      id:{
        type:Selection.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      nick_name:Sequelize.STRING,
      avatar_url:Sequelize.STRING,
      gender:Selection.INTEGER,
      open_id:Sequelize.STRING,
      session_key:Sequelize.STRING,
      created_at:Sequelize.DATE,
      updated_at:Sequelize.DATE
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};
