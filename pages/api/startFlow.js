import axios from 'axios';

export default async (req, res) => {
	axios
		.post(
			'https://identity.alles.cx/a/v1/flow',
			{
				callback: process.env.ALLESID_CALLBACK,
			},
			{
				headers: {
					authorization:
						'Basic ' +
						Buffer.from(
							`${process.env.ALLESID_CLIENTID}:${process.env.ALLESID_SECRET}`
						).toString('base64'),
				},
			}
		)
		.then((response) => {
			return res.status(200).json({
				url: `https://identity.alles.cx/login?flow=${response.data.token}`,
			});
		})
		.catch((err) => {
			return res.status(400).json({ err: err });
		});
};
