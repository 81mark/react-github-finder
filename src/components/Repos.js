import React from 'react';

export const Repos = ({ repo }) => {
	return (
		<div className='card card-body mb-2'>
			<div className='row'>
				<div className='col-md-6'>
					<a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
						{repo.name}
					</a>
				</div>
				<div className='col-md-6'>
					<span className='badge badge-primary'>
						Stars: {repo.stargazers_count}
					</span>
					<span className='badge badge-secondary'>
						Watchers: {repo.watchers_count}
					</span>
					<span className='badge badge-success'>Forks: {repo.forks_count}</span>
				</div>
			</div>
		</div>
	);
};
