import { get as getCookie } from 'es-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Start() {
	const router = useRouter();

	useEffect(() => {
		const token = getCookie('token');
		if (typeof token !== 'string') return router.push('/login');
		return router.push('/user');
	});
	return (
		<div className="flex flex-wrap flex-col justify-center content-center items-center h-screen w-full p-4 dark:bg-dark-primary">
			<img src="/svg/loading.svg"></img>
		</div>
	);
}
