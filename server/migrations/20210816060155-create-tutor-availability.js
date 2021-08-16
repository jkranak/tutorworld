'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('tutorAvailabilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tutorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monday: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: false,
      },
      tuesday: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: false,
      },
      wednesday: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: false,
      },
      thursday: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: false,
      },
      friday: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: false,
      },
      saturday: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: false,
      },
      sunday: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tutorAvailabilities');
  }
};