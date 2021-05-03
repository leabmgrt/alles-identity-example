import axios from 'axios';
import { useEffect } from 'react';
import { set as setCookie } from 'es-cookie';
import { useRouter } from 'next/router';

export default function LoginCallback({ code }) {
	const randomTitles = [
		'Almost there!',
		'spinny loading animation, fun',
		'beep boop',
		'deploying deadly neurotoxin',
		'Powerup initiated',
		'$ rm -rf /',
		'ARE WE THERE YET???',
	];

	const router = useRouter();

	useEffect(() => {
		axios
			.post('/api/callback', { code: code })
			.then((response) => {
				if (response.data.hasOwnProperty('session')) {
					setCookie('token', response.data.session, { expires: 7 });
					router.push('/');
				} else {
					alert('session token not returned :(');
					router.push('/');
				}
			})
			.catch((err) => {
				alert(`An error occurred: ${err}`);
				router.push('/');
			});
	}, []);
	return (
		<div className="flex flex-wrap flex-col justify-center content-center items-center h-screen w-full p-4 dark:bg-dark-primary dark:text-white">
			{typeof code !== 'string' ? (
				<div className="justify-center text-center">
					<h1 className="text-3xl font-bold">Oh no...</h1>
					<p>
						Something went terribly wrong. But don't worry, just try again! :')
					</p>
					<a className="text-blue-500 underline" href="/">
						Try again
					</a>
				</div>
			) : (
				<div class="flex flex-col justify-center text-center">
					<h1 className="text-3xl font-bold">
						{randomTitles[
							Math.floor(Math.random() * randomTitles.length)
						].toString()}
					</h1>
					<p>Just a few more seconds, then we're ready!</p>
					<img src="/svg/loading.svg" className="m-4"></img>
				</div>
			)}
		</div>
	);
}

LoginCallback.getInitialProps = async (context) => {
	return { code: context.query.code };
};
