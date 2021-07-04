const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_SCHEMA || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL == 'true',
    },
  }
);

const Customer = sequelize.define('Customer', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['non-active', 'prospective', 'current'],
    defaultValue: 'current',
  },
});

const Notes = sequelize.define('Notes', {
  note: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Notes.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'id' });

module.exports = {
  sequelize: sequelize,
  Customer,
  Notes,
};
