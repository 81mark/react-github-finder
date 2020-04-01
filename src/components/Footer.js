import React from 'react';

const year = new Date();

export default function Footer() {
	return (
		<div>
			<footer className='mt-5 p-3 text-center bg-light'>
				GitHub Finder &copy; {year.getFullYear()}
			</footer>
		</div>
	);
}
