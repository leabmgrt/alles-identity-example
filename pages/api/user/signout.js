const auth = require('../../../utils/auth');
const db = require('../../../utils/db');

export default async (req, res) => {
	const authorization = req.headers.authorization;
	const validAuth = await auth(authorization);
	if (!validAuth) return res.status(401).json({ err: 'badAuthorization' });

	await db.Session.destroy({
		where: {
			id: validAuth.id,
		},
	});

	return res.status(200).json({});
};
