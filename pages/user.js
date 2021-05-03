import axios from 'axios';
import { useEffect, useState } from 'react';
import { get as getCookie, remove as removeCookie } from 'es-cookie';
import { useRouter } from 'next/router';

export default function User() {
	const router = useRouter();

	const [data, setData] = useState(null);

	useEffect(() => {
		loadUser();
	}, []);

	function loadUser() {
		const token = getCookie('token');
		axios
			.get('/api/user', {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				setData(response.data);
			})
			.catch((err) => {
				console.log(err.response);
				alert(`An error occurred: ${err}`);
			});
	}

	async function signout() {
		const token = getCookie('token');
		const response = await axios.get('/api/user/signout', {
			headers: {
				Authorization: token,
			},
		});
		removeCookie('token');
		router.push('/');
	}

	return (
		<div className="flex flex-wrap flex-col justify-center content-center items-center h-screen w-full p-4 dark:bg-dark-primary">
			{data != null ? (
				<div className="flex border border-transparent shadow-xl bg-gray-200 dark:bg-dark-secondary rounded-3xl justify-center">
					<div className="flex flex-col text-center items-center justify-center p-4 px-10 dark:text-white">
						<img
							src={data.avatar}
							className="border rounded-full -mt-10 border-transparent"
							width="60px"
							height="60px"
						></img>
						<p className="text-2xl font-bold mt-2">{data.name || data.email}</p>
						{typeof data.name !== 'string' ? (
							<p></p>
						) : (
							<p className="text-gray-400">{data.email}</p>
						)}
						<p className="mt-2">
							This is your profile. There should be an email address, a profile
							picture and maybe your name. <br />
							Well yeah, that's it. I don't know what I can do with it atm, but
							it's really cool!
							<br />
							<br />
							What's special here (in this example) is that it actually created
							a database entry for the user and the session
							<br />
							to technically that's all you need to get started now.
							<br />
							Alles Identity is only used for signing in.
						</p>
						<a
							onClick={signout}
							className="p-4 bg-red-500 border border-transparent rounded-xl text-white mt-4 hover:bg-red-600"
						>
							Sign out
						</a>
					</div>
				</div>
			) : (
				<img src="/svg/loading.svg"></img>
			)}
		</div>
	);
}
