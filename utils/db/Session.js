const { DataTypes } = require('sequelize');

const session = (db) => {
	db.Session = db.define('session', {
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			allowNull: false,
		},
		timestamp: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	});
};

export default session;
