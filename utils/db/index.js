const Sequelize = require('sequelize');
const mariadb = require('mariadb');
import user from './User';
import session from './Session';
const db = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'mariadb',
		dialectModule: mariadb,
		dialectOptions: {
			timezone: 'Etc/GMT0',
		},
	}
);

module.exports = db;

session(db);
user(db);

/*require('./Session')(db);
require('./User')(db);*/

db.sync();
