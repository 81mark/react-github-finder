import React from 'react';

export const Profile = ({ profile }) => {
	// To format the date nicely
	const createdString = new Date(profile.created_at);
	return (
		<>
			<div className='card card-body mb-3'>
				<div className='row'>
					<div className='col-md-3'>
						<img
							className='img-fluid mb-2'
							alt={'Avatar for ' + profile.login}
							src={
								profile.avatar_url
									? profile.avatar_url
									: process.env.PUBLIC_URL + '/no-user.png'
							}
						/>
						<a
							href={profile.html_url}
							target='_blank'
							rel='noopener noreferrer'
							className='btn btn-primary btn-block mb-4'
						>
							View Profile
						</a>
					</div>
					{profile.createdString ? (
						<div className='col-md-9'>
							<span className='badge badge-primary'>
								Public Repos: {profile.public_repos}
							</span>
							<span className='badge badge-secondary'>
								Public Gists: {profile.public_gists}
							</span>
							<span className='badge badge-success'>
								Followers: {profile.followers}
							</span>
							<span className='badge badge-info'>
								Following: {profile.following}
							</span>
							<br />
							<br />
							<ul className='list-group'>
								<li className='list-group-item'>Company: {profile.company}</li>
								<li className='list-group-item'>
									Website/Blog: {profile.blog}
								</li>
								<li className='list-group-item'>
									Location: {profile.location}
								</li>
								<li className='list-group-item'>
									Member Since: {createdString.toDateString()}
								</li>
							</ul>
						</div>
					) : (
						<div className='col-md-9'>
							<h4 className='text-center'>No User Profile</h4>
						</div>
					)}
				</div>
			</div>
			<h3 className='page-heading mb-3'>Latest Repos</h3>
		</>
	);
};
