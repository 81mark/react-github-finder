import React, { useState, useEffect } from 'react';
import { Alert } from './Alert';
import { Profile } from './Profile';
import { Repos } from './Repos';
import axios from 'axios';

export default function Content() {
	// State is where we set our bits!
	const [userText, setText] = useState('');
	const [profile, setProfile] = useState([]);
	const [repos, setRepos] = useState([]);
	const [alertMessage, setAlert] = useState('');
	const [alertClass, setAlertClass] = useState('');
	const [noUser, setUser] = useState(false);

	// useEffect is where we call our api/functions that need refreshing (dynamic)
	useEffect(() => {
		if (userText !== '') {
			getProfiles(userText);
		}
		if (!noUser && userText !== '') {
			getRepos(userText);
		}
		if (noUser || userText === '') {
			const wait = setTimeout(() => {
				setAlert('');
				setProfile([]);
				setRepos([]);
				setText('');
			}, 1500);
			return () => clearTimeout(wait);
		}
	}, [userText, noUser]);

	const getProfiles = async (userText) => {
		try {
			// const results = await axios(`/api/v1/profile-search?q=${userText}`);
			const results = await axios(
				`https://picture-proxy.herokuapp.com/api/v1/profile-search?q=${userText}`
			);
			if (results.data.success === true) {
				setAlert('');
				setUser(false);
				setProfile(await results.data.profile);
			} else if (results.data.success === false) {
				setUser(true);
				setAlert('No user was found!', setAlertClass('alert alert-warning'));
			}
		} catch (error) {
			setUser(true);
			setAlert(
				`Server Error with status of ${error.response.status} whilst fetching profiles`,
				setAlertClass('alert alert-danger')
			);
		}
	};

	// 	`https://api.github.com/users/${userText}/repos?per_page=${repos_count}&sort=${repos_sort}&client_id=${client_id}&client_secret=${secret}`
	const getRepos = async (userText) => {
		try {
			const results = await axios(
				// As we use a proxy in package.json no localhost
				// `/api/v1/repo-search?q=${userText}`
				`https://picture-proxy.herokuapp.com/api/v1/repo-search?q=${userText}`
			);
			if (results.data.success === true) {
				setRepos(await results.data.repos);
			}
		} catch (error) {
			if (error.response.status === 404) {
				setAlert('No repos were found!', setAlertClass('alert alert-warning'));
			} else {
				setAlert(
					`Server Error with status of ${error.response.status} whilst fetching repos`,
					setAlertClass('alert alert-danger')
				);
			}
		}
	};

	return (
		<div>
			<div className='container searchContainer'>
				<Alert alertMessage={alertMessage} alertClass={alertClass} />
				<div className='search card card-body'>
					<h1>Search GitHub Users</h1>
					<p className='lead'>
						Enter a username to fetch a user profile and repos.
					</p>
					<input
						type='text'
						className='form-control'
						placeholder='GitHub username...'
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<br />
				<div id='profile'>
					<Profile key={profile.id} profile={profile} />
					<div id='repos'>
						{repos.map((repo) => (
							<Repos key={repo.id} repo={repo} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
