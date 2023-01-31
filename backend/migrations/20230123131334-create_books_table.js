'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("books", {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      author: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING(255),
        defaultValue:
          "https://upload.wikimedia.org/wikipedia/commons/b/bd/Draw_book.png",
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable("books");

  }
};
