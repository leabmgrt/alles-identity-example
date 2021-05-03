import db from '.';

const { DataTypes } = require('sequelize');

const user = (db) => {
	db.User = db.define('user', {
		id: {
			primaryKey: true,
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	db.User.hasMany(db.Session);
	db.Session.belongsTo(db.User);
};

export default user;
