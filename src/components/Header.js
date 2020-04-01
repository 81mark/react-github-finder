import React from 'react';

export default function Header() {
	return (
		<div>
			<nav className='navbar navbar-dark bg-primary mb-3'>
				<div className='container body'>
					<a href={'/'} className='navbar-brand'>
						GitHub Finder
					</a>
				</div>
			</nav>
		</div>
	);
}
