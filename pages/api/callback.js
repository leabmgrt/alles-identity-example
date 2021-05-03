import axios from 'axios';
const db = require('../../utils/db');
import { v4 as uuidv4 } from 'uuid';
const jwt = require('jsonwebtoken');

export default async (req, res) => {
	const { code } = req.body;

	if (typeof code !== 'string')
		return res.status(400).json({ err: 'badRequest' });

	axios
		.get(`https://identity.alles.cx/a/v1/profile?code=${code}`, {
			headers: {
				authorization:
					'Basic ' +
					Buffer.from(
						`${process.env.ALLESID_CLIENTID}:${process.env.ALLESID_SECRET}`
					).toString('base64'),
			},
		})
		.then(async (response) => {
			if (!response.data.hasOwnProperty('id'))
				return res.status(400).json({ err: 'noId' });

			var user;

			const existingUser = await db.User.findOne({
				where: {
					id: response.data.id,
				},
			});

			if (!existingUser) {
				const newUser = await db.User.create({
					id: response.data.id,
					name: response.data.name ?? null,
					avatar: response.data.avatar,
					email: response.data.email,
				});
				user = newUser;
			} else {
				user = existingUser;
			}

			const newSession = await db.Session.create({
				id: uuidv4(),
				timestamp: Math.floor(Date.now()),
			});

			user.addSession(newSession);

			const jwtToken = jwt.sign(
				{ session: newSession.id },
				process.env.JWT_TOKEN
			);
			res.status(200).json({ session: jwtToken });
		})
		.catch((err) => {
			return res.status(400).json({ err: err });
		});
};
