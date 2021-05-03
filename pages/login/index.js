import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
const { Identity } = require('@alleshq/identity');
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
	const router = useRouter();
	const [isStartingSession, setIsStartingSession] = useState(false);
	const [currentStateString, setCurrentStateString] = useState('');

	async function startFlow() {
		setCurrentStateString('Fetching url...');
		setIsStartingSession(true);

		axios
			.get('/api/startFlow')
			.then((response) => {
				router.push(response.data.url);
			})
			.catch((err) => {
				console.log(err);
				alert(`An error occurred: ${err}`);
			});
	}

	return (
		<div>
			<Head>
				<title>Login | Alles Identity Example</title>
			</Head>

			<div>
				<div className="flex flex-wrap flex-col justify-center content-center items-center h-screen w-full p-4 dark:bg-dark-primary dark:text-white">
					<h1 className="text-3xl font-bold text-center">Sign in</h1>
					<p className="mt-2 mb-1">
						Welcome! This is an example application to test the{' '}
						<a
							href="https://identity.alles.cx/"
							target="_blank"
							className="text-blue-500 underline"
						>
							Alles Identity
						</a>{' '}
						Authentication flow.
					</p>
					<p>
						By clicking the button below you'll start an authentication flow
						where you can enter your email address and authenticate.
					</p>
					{isStartingSession ? (
						<div className="m-2 justify-center flex flex-col">
							<img src="/svg/loading.svg"></img>
							<p className="text-gray-500 dark:text-gray-400 mt-2">
								{currentStateString}
							</p>
						</div>
					) : (
						<a
							className="m-4 p-3 border border-gray-400 rounded-xl bg-white shadow-lg border-grey hover:bg-gray-100 transition-colors dark:bg-dark-secondary dark:border-transparent dark:hover:bg-dark-tertiary"
							onClick={startFlow}
						>
							Authenticate with Alles
						</a>
					)}
					<p className="text-gray-400 text-center">
						A user record will be created in an external database along with a
						session token. This data will be cleared from time to time.
						<br /> If you have any privacy concerns, please feel free to reach
						out on{' '}
						<a
							href="https://twitter.com/leabmgrt"
							target="_blank"
							className="text-blue-500 underline"
						>
							Twitter
						</a>{' '}
						or via{' '}
						<a
							href="mailto:lea@abmgrt.dev"
							target="_blank"
							className="text-blue-500 underline"
						>
							email
						</a>{' '}
						^^
					</p>
				</div>
			</div>
		</div>
	);
}
