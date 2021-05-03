const auth = require('../../../utils/auth');
const db = require('../../../utils/db');

export default async (req, res) => {
	const authorization = req.headers.authorization;
	const validAuth = await auth(authorization);
	if (!validAuth) return res.status(401).json({ err: 'badAuthorization' });

	const user = await db.User.findOne({
		where: {
			id: validAuth.userId,
		},
	});

	if (!user) return res.status(404).json({ err: 'missingResource' });

	return res.status(200).json(user);
};
