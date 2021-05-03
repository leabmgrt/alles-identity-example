const jwt = require('jsonwebtoken');
import db from './db';

module.exports = async (token) => {
	if (typeof token !== 'string') return;
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
		const fetchedSession = await db.Session.findOne({
			where: {
				id: decodedToken.session,
			},
		});
		if (!fetchedSession) return;
		return fetchedSession;
	} catch (err) {
		return;
	}
};
